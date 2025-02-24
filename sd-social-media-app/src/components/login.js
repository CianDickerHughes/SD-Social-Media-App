import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios"; // Import Axios for API requests

const Login = ({ showLogin, handleLoginClose }) => {
  const [identifier, setIdentifier] = useState(""); // Email or Username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error message state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const isEmail = identifier.includes("@"); // Check if it's an email
      const url = isEmail
        ? `http://localhost:8080/users/email/${identifier}`
        : `http://localhost:8080/users/username/${identifier}`;

      const response = await axios.get(url);

      if (response.data) {
        console.log("User found:", response.data);
        // Add password verification logic here if needed
        alert("Login successful!");
        handleLoginClose(); // Close modal on success
      } else {
        setError("User not found!");
      }
    } catch (err) {
      setError("Invalid login credentials!");
    }
  };

  return (
    <Modal show={showLogin} onHide={handleLoginClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email or Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;