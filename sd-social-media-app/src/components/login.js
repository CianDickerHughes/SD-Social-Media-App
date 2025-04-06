// Cian Dicker-Hughes
// G00415413

import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios"; // Import Axios

const Login = ({ showLogin, handleLoginClose }) => {
  const [identifier, setIdentifier] = useState(""); // Email or Username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error message state

  // Async function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate identifier and password
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        identifier,
        password,
      });
      
      // Check if the response contains user data
      if (response.data) {
        //localStorage.setItem("userIdentifier", identifier); // Store identifier
        localStorage.setItem("userId", response.data.id);

        console.log("Login successful:", response.data);
        window.location.reload(); // Reload the page
        handleLoginClose();
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
          <Form.Group className="mb-3"> { /* Email or Username */ }
            <Form.Label>Email or Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3"> { /* Password */ }
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