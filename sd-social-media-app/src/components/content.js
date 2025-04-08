// Cian Dicker-Hughes
// G00415413

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileIMG from '../img/profile-user.svg';
import { Card, Spinner, Alert, Row, Col, Image } from 'react-bootstrap';

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all posts first
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
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
        <Card key={post.id} className="mb-4 shadow-sm" style={{ width: "85%", margin: "auto" }}>
          <Card.Header>
            <Row className="align-items-center">
              <Col xs={2}>
                <img
                  src={post.profileImgUrl || profileIMG}
                  alt="Profile"
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </Col>
              <Col>
                <div className="ms-4">
                  <h3 className="mb-1">{post.uname || "Unknown"}</h3>
                  <h4 className="mb-1">@{post.username || "unknown"}</h4>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Img
            variant="top"
            src={post.img}
            style={{ width: "500px", margin: "auto", border: "2px solid black" }}
          />
          <Card.Body>
            <Card.Text style={{ fontSize: "20px" }}>{post.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Content;
