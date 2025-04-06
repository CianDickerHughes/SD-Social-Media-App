// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Function to validate URL format
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const Post = ({ showPost, handlePostClose }) => {
  const [userId, setUserId] = useState(null); // Store logged-in user ID
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status


  // Check if user is logged in when the component mounts
  useEffect(() => {
    // Check if user is logged in (stored in localStorage)
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image URL
    if (!isValidUrl(img)) {
      setError('Invalid image URL');
      return;
    }
    // Validate description length
    setLoading(true);
    const postData = {
      userId: parseInt(userId),
      img,
      description,
    };

    // Send post data to the server
    try {
      const result = await axios.post('http://localhost:8080/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.data);
      setError('');
      setImg('');
      setDescription('');
    } catch (err) {
      setResponse(null);
      setError(err.response?.data?.message || 'Error creating post. Please try again.');
    } finally {
      setLoading(false);
      handlePostClose();
    }
  };

  return (
    <Modal show={showPost} onHide={handlePostClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Create a New Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      {response && <Alert variant="success">Post created successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <Alert variant="warning">Please log in to create a post.</Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ width: '100%' }}
          disabled={loading || !isLoggedIn}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
  );
};

export default Post;
