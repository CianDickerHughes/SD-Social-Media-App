// Cian Dicker-Hughes
// G00415413

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

// props, ref
const Post = ({ showPost, handlePostClose }) => {
  const [userId, setUserId] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const postData = {
      userId: parseInt(userId), // Ensure userId is a number
      img,
      description,
    };

    try {
      const result = await axios.post('http://localhost:8080/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponse(result.data); // Set the response data
      setError(''); // Clear any previous errors
      handlePostClose(); // Close the modal after successful post
    } catch (err) {
      setResponse(null); // Clear the response data on error
      setError('Error creating post. Please try again.'); // Set the error message
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
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Form.Group>
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
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Post;
