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
        const postRes = await axios.get('http://localhost:8080/posts');
        const postsData = postRes.data;

        // Extract all unique userIds
        const userIds = [...new Set(postsData.map(post => post.userId))];

        // Fetch user data for each userId
        const userPromises = userIds.map(id =>
          axios.get(`http://localhost:8080/users/${id}`)
        );
        const userResponses = await Promise.all(userPromises);

        // Create a map of userId -> userData
        const userMap = {};
        userResponses.forEach(res => {
          userMap[res.data.id] = res.data;
        });

        setUsers(userMap);
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts or user data');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      {posts.map((post) => {
        const user = users[post.userId];

        return (
          <Card key={post.id} className="mb-4 shadow-sm" style={{ width: "85%",   margin: "auto" }}>
            <Card.Header>
              <Row className="align-items-center">
                <Col xs={2}>
                    <img
                      src={user?.profileImgUrl || profileIMG}
                      alt="Profile"
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                  </Col>
                <Col>
                  <div className="ms-4">
                    <h3 className="mb-1">{user?.name || "username"}</h3>
                    <h4 className="mb-1">@{user?.username || "username"}</h4>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Img variant="top" src={post.img} style={{ width: "500px", margin: "auto", border: "2px solid black" }} />
            <Card.Body>
              <Card.Text style={{ fontSize: "20px" }}>{post.description}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Content;
