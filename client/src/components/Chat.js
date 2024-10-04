import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input, Button, Typography } from "antd"; // Import necessary components from Ant Design
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

// The proxy handles the connection, so no need to specify the server URL
const socket = io();

const { Title } = Typography;

function Chat() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { message, room });
      setMessage(""); // Clear input after sending
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Back to Home Button with custom primary color */}
        <Button
          onClick={() => navigate("/")} // Navigate to home page
          className="mb-4 w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Back to Home
        </Button>

        {/* Chat Room Title */}
        <Title level={3} className="text-center text-gray-800">
          Chat Room
        </Title>

        {/* Room Input */}
        <Input
          placeholder="Enter Room Number"
          className="mb-4 h-10 px-3 border border-gray-300 rounded-lg"
          onChange={(event) => setRoom(event.target.value)}
        />

        {/* Join Room Button */}
        <Button
          type="primary"
          onClick={joinRoom}
          className="mb-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Join Room
        </Button>

        {/* Message Input */}
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mb-4 h-10 px-3 border border-gray-300 rounded-lg"
        />

        {/* Send Message Button */}
        <Button
          type="primary"
          onClick={sendMessage}
          className="mb-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          Send Message
        </Button>

        {/* Message Display */}
        <Title level={5} className="text-gray-600">
          Received Message:
        </Title>
        <div className="border p-4 rounded-md bg-gray-50 h-20 overflow-auto text-gray-700">
          {messageReceived || "No messages yet..."}
        </div>
      </div>
    </div>
  );
}

export default Chat;
