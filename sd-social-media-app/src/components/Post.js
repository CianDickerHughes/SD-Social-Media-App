import React, { useState } from 'react';
import axios from 'axios';

const Post = () => {
  const [userId, setUserId] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      userId: parseInt(userId), // Convert userId to an integer
      img: img,
      description: description
    };

    try {
      const result = await axios.post('http://localhost:8080/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful response
      setResponse(result.data);
      setError('');
    } catch (err) {
      // Handle error response
      setResponse(null);
      setError('Error creating post. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      {response && (
        <div>
          <h3>Post Created Successfully!</h3>
          <p>Post ID: {response.id}</p>
          <p>User ID: {response.userId}</p>
          <p>Description: {response.description}</p>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Post;
