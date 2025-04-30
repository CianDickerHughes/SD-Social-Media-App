// Cian Dicker-Hughes
// G00415413

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from "../apiConfig";
import profileIMG from '../img/profile-user.svg';
import { Card, Spinner, Alert, Row } from 'react-bootstrap';

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all posts first
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseUrl}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} className="mb-4 shadow-sm custom-card">
          <Card.Header className="custom-card-header">
            <Row className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={post.profileImgUrl || profileIMG}
                  alt="Profile"
                  className="rounded-circle"
                  width="60"
                  height="60"
                />
                <div className="ms-2"> {/* Adjusted margin to control spacing */}
                  <h3 className="mb-1">{post.uname || "Unknown"}</h3>
                  <h4 className="mb-1">@{post.username || "unknown"}</h4>
                </div>
              </div>
            </Row>
          </Card.Header>
          <Card.Img
            variant="top"
            src={post.img}
            style={{ width: "500px", margin: "auto", border: "2px solid black" }}
            className="custom-card-img"
          />
          <hr className="border-light" />
          <Card.Body>
            <Card.Text className="custom-card-text">{post.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Content;
