// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import apiConfig from '../apiConfig';
import axios from 'axios';

const Setting = ({ showPost, handlePostClose }) => {
  const [userData, setUserData] = useState({ isPrivate: false }); // State to store user data
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(''); // State to track errors
  const [response, setResponse] = useState(''); // State to track success response

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`${apiConfig.baseUrl}/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission to update privacy setting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`${apiConfig.baseUrl}/users/private/${userId}`, { isPrivate: userData.isPrivate });
      setResponse("Account privacy updated successfully!");
    } catch (err) {
      console.error("Error updating account privacy:", err);
      setError("Failed to update account privacy");
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox change
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <Modal show={showPost} onHide={handlePostClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {response && <Alert variant="success">{response}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="isPrivate" className="mb-3">
            <Form.Switch label="Private Account" name="isPrivate" checked={userData.isPrivate} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Setting;
