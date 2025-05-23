// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Offcanvas, Image, Dropdown, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Login from "./Login";
import Post from "./Post";
import Setting from "./Setting";
import apiConfig from "../apiConfig";
import profileIMG from '../img/profile-user.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

// Navigation Bar in secondary theme
// Links to the home, create, read pages and Guess Countres Game
// Links Show Which Page is Active
const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState(null); // Store user data (including profile image)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [showPost, setShowPost] = useState(false); // State for post modal
  const [showSettings, setShowSettings] = useState(false); // State for settings modal
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handlePostClose = () => setShowPost(false); // Close post modal
  const handlePostShow = () => setShowPost(true); // Open post modal

  const handleSettingsClose = () => setShowSettings(false); // Close settings modal
  const handleSettingsShow = () => setShowSettings(true);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    // Check if user is logged in (check localStorage for userId)
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      // Fetch user data (profile image) from the API
      fetchUserData(userId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch user data from API using user ID
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/users/${userId}`);
      setUserData(response.data); // Store user data including profile image URL
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Handle logout by clearing the user data from localStorage and state
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserData(null);
    setIsLoggedIn(false);
    window.location.reload(); // Reload the page
  };


  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Make sure search query is not empty
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/users/username/${searchQuery}`);
      const user = response.data;
      navigate(`/profile?id=${user.id}`); // Redirect to /profile with user ID as a query parameter
    } catch (error) { // Handle error if user not found
      console.error("User not found:", error);
      alert("User not found");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Brand href="/" style={{ padding: "0px 15px" }}>SD-Social-Media</Navbar.Brand>
          <div className="d-flex ms-auto align-items-center">
            {/* Search Bar */}
            <Form className="d-flex me-3" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: "320px" }} 
              />
            </Form>
            {/* If the user is logged in, show profile image and dropdown for logout/profile options */}
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-profile" style={{ border: "none", background: "transparent" }}>
                  <Image
                    src={userData?.profileImgUrl || profileIMG} // Display profile image
                    alt="Profile"
                    roundedCircle
                    width="40"
                    height="40"
                    style={{ cursor: "pointer" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={`/profile?id=${localStorage.getItem("userId")}`}>View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" onClick={handleLoginShow}>
                  Login
                </Button>
                <Button href="signUp" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Main Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/" onClick={handleClose} style={{ padding: "10px 15px" }}>Home</Nav.Link>
                <Nav.Link href={`/profile?id=${localStorage.getItem("userId")}`} onClick={handleClose} style={{ padding: "10px 15px" }}>Profile</Nav.Link>
                <Nav.Link onClick={() => { handleSettingsShow(); handleClose(); }} style={{ padding: "10px 15px" }}>Settings</Nav.Link>
                <Nav.Link onClick={() => { handlePostShow(); handleClose(); }}>Make A Post</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/" onClick={handleClose} style={{ padding: "10px 15px" }}>Home</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Login & Post Modal */}
      <Login showLogin={showLogin} handleLoginClose={handleLoginClose} />
      <Post showPost={showPost} handlePostClose={handlePostClose} />
      <Setting showPost={showSettings} handlePostClose={handleSettingsClose} />
    </>
  );
};
export default NavigationBar;