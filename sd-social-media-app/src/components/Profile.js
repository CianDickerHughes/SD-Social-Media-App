// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import profileIMG from '../img/profile-user.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';


const Profile = () => {
  const [userData, setUserData] = useState(null); // Store user data (including profile image)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [posts, setPosts] = useState([]); // Store posts data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track errors

  const location = useLocation(); // Get the current location object

  // Extract user ID from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");


  // Check if user is logged in when the component mounts
  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      // Fetch user data (profile image) from the API
      fetchUserData(userId);
      // Fetch the posts for the logged-in user
      fetchUserPosts(userId); 
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, [userId]);

  // Fetch user data from API using user ID
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      setUserData(response.data); // Store user data including profile image URL
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Fetch posts for the logged-in user
  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/posts/user/${userId}`);
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user posts:", err);
      setError("Failed to load user posts");
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Return the home of the home screen
  return (
    <div className="container mt-5" style={{ backgroundColor: "#282828", color: "white", padding: "20px", borderRadius: "10px" }}>
      <div className="d-flex align-items-center">
        <div style={{ backgroundColor: "white", padding: "2px", borderRadius: "50%" }}>
          <img 
            src={userData?.profileImgUrl || profileIMG} 
            alt="Profile" 
            className="rounded-circle" 
            width="120" 
            height="120" 
          />
        </div>
        <div className="ms-4">
          <h3 className="mb-1">{userData?.name || "username"}</h3>
          <h4 className="mb-1">@{userData?.username || "username"}</h4>
          <div className="d-flex mt-2">
            <p className="me-4"><strong>{userData?.followers || 0}</strong> Followers</p>
            <p><strong>{userData?.following || 0}</strong> Following</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="mb-0">{userData?.bio || "your bio."}</p>
        <button className="btn btn-primary" onClick={() => window.location.href = "/edit"}>Edit Profile</button>
      </div>
    <hr className="border-light" />
      {/* Display Posts */}
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
          <Card.Body>
            <Card.Text className="custom-card-text">{post.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
  </div>
  );
};

export default Profile;