import { Button, Divider, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "This field is required",
  },
];

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      if (response?.success) {
        message.success(response?.message);
        localStorage.setItem('token', response?.data);
        window.location.href = "/";
      } else {
        throw new Error(response?.message);
      }
    } catch (err) {
      dispatch(SetLoader(false));
      message.error(err?.message);
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
          Welcome to SH MP
        </h1>
        <p className="text-gray-500 text-center mb-5">
          Please login to your account
        </p>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
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
            Login
          </Button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 font-semibold hover:underline">
                Register
              </Link>
            </span>
          </div>
        </Form>

      </div>
    </div>
  );
}

export default Login;