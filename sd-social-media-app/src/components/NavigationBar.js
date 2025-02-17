// Cian Dicker-Hughes
// G00415413

import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


// Navigation Bar in secondary theme
// Links to the home, create, read pages and Guess Countres Game
// Links Show Which Page is Active
const NavigationBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Brand href="/">SD Social Media</Navbar.Brand>
          <div className="ms-auto">
            <Button variant="outline-light" className="me-2">Login</Button>
            <Button href="/signIn" variant="outline-light">Sign Up</Button>
          </div>
        </Container>
      </Navbar>
      
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Main Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="flex-column" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
            <Nav.Link href="/" onClick={handleClose} style={{ padding: "10px 15px" }}>Home</Nav.Link>
            <Nav.Link href="/bookmark" onClick={handleClose} style={{ padding: "10px 15px" }}>Bookmark</Nav.Link>
            <Nav.Link href="/messages" onClick={handleClose} style={{ padding: "10px 15px" }}>Messages</Nav.Link>
            <Nav.Link href="/profile" onClick={handleClose} style={{ padding: "10px 15px" }}>Profile</Nav.Link>
            <Nav.Link href="/settings" onClick={handleClose} style={{ padding: "10px 15px" }}>Settings</Nav.Link>
            <Nav.Link href="/post" onClick={handleClose} style={{ padding: "10px 15px" }}>Make A Post</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
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

//<Nav.Link href="/create" style={window.location.pathname === '/create' ? activeNavLinkStyle : navLinkStyle}>Add New Country</Nav.Link>
// style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}

export default NavigationBar;

/*

return (
        <Navbar bg="secondary" data-bs-theme="light" sticky='top'>
          <Container>
            <Navbar.Brand href="/">
            
            <img src="https://upload.wikimedia.org/wikipedia/commons/archive/6/6d/20171229211557%21Earth_-_The_Noun_Project.svg" style={{ width: '250px', height: 'auto', backgroundColor: '#0D98BA', borderRadius: '180px', }} alt="Earth Icon"/>

            </Navbar.Brand>
            <Nav className="me-auto">
              
            </Nav>
          </Container>
      </Navbar>
  );

*/