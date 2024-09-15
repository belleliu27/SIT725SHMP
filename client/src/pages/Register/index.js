import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "This field is required",
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      navigate("/login");
      dispatch(SetLoader(false));
      if (response?.success) {
        message.success(response?.message);
        console.log("Success Message", response?.message)
      } else {
        throw new Error(response?.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      message.error(err?.message);
      console.log("Error Message", err?.message)
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-[400px] p-8">
        <h1 className="text-3xl font-bold text-center text-purple-600">
          Create an Account
        </h1>
        <p className="text-gray-500 text-center mb-5">
          Join us by registering below
        </p>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input
              placeholder="Enter your name"
              className="border-gray-300 rounded-lg p-2"
            />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input
              placeholder="Enter your email"
              className="border-gray-300 rounded-lg p-2"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input
              type="password"
              placeholder="Enter your password"
              className="border-gray-300 rounded-lg p-2"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-3 transition-colors duration-300"
          >
            Register
          </Button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 font-semibold hover:underline">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;