// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Offcanvas, Image, Dropdown, DropdownButton } from "react-bootstrap";
import Login from "./login";
import Post from "./Post";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handlePostClose = () => setShowPost(false); // Close post modal
  const handlePostShow = () => setShowPost(true); // Open post modal

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
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
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
  
  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Brand href="/" style={{ padding: "0px 15px" }}>SD-Social-Media</Navbar.Brand>
          <div className="ms-auto">
            {/* If the user is logged in, show profile image and dropdown for logout/profile options */}
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-profile" style={{ border: "none", background: "transparent" }}>
                  <Image
                    src={userData?.profileImgUrl || profileIMG} // Display profile image
                    alt="Profile"
                    roundedCircle
                    width="40" // Size of the profile image
                    height="40"
                    style={{ cursor: "pointer" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" onClick={handleLoginShow}>
                  Login
                </Button>
                <Button href="signIn" variant="primary">
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
                <Nav.Link href="/bookmark" onClick={handleClose} style={{ padding: "10px 15px" }}>Bookmark</Nav.Link>
                <Nav.Link href="/messages" onClick={handleClose} style={{ padding: "10px 15px" }}>Messages</Nav.Link>
                <Nav.Link href="/profile" onClick={handleClose} style={{ padding: "10px 15px" }}>Profile</Nav.Link>
                <Nav.Link href="/settings" onClick={handleClose} style={{ padding: "10px 15px" }}>Settings</Nav.Link>
                <Nav.Link onClick={() => { handlePostShow(); handleClose(); }}>Make A Post</Nav.Link>
                </>
            ) : (
              <>
                <Nav.Link href="/" onClick={handleClose} style={{ padding: "10px 15px" }}>Home</Nav.Link>
                <Nav.Link href="/settings" onClick={handleClose} style={{ padding: "10px 15px" }}>Settings</Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Login & Post Modal */}
      <Login showLogin={showLogin} handleLoginClose={handleLoginClose} />
      <Post showPost={showPost} handlePostClose={handlePostClose} />
    </>
  );
};

// Default Nav link Style
const navLinkStyle = {
  textDecoration: 'none',  
  color: 'inherit',  
  fontSize: '18px' 
};

// Active Nav link Style
const activeNavLinkStyle = {
  textDecoration: 'underline',  
  color: 'inherit',  
  fontSize: '20px',
  fontWeight: 'bold'
};

export default NavigationBar;