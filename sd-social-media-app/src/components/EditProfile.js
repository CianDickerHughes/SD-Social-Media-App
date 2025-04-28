// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap";

const EditProfile = () => {
    // State to manage user data and loading/error states
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        profileImgUrl: "",
        isPrivate: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Check if user is logged in when the component mounts
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
        fetchUserData(userId);
        } else {
        setError("User not logged in");
        setLoading(false);
        }
    }, []);

    // Fetch user data from API using user ID
    const fetchUserData = async (userId) => {
        try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setUserData(response.data);
        setLoading(false);
        } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setLoading(false);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        try {
        await axios.put(`http://localhost:8080/users/${userId}`, userData);
        setSuccess("Profile updated successfully!");
        } catch (err) {
        console.error("Error updating profile:", err);
        setError("Failed to update profile");
        }
    };

    // Check if user is logged in when the component mounts
    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-5" style={{ maxWidth: "600px" }}>
        <h2>Edit Profile</h2>
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
            />
            </Form.Group>

            <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
            />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            </Form.Group>

            <Form.Group controlId="bio" className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
                type="text"
                name="bio"
                value={userData.bio || ''}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group controlId="profileImgUrl" className="mb-3">
            <Form.Label>Profile Image URL</Form.Label>
            <Form.Control
                type="text"
                name="profileImgUrl"
                value={userData.profileImgUrl || ''}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group controlId="isPrivate" className="mb-3">
            <Form.Check
                type="checkbox"
                label="Private Account"
                name="isPrivate"
                checked={userData.isPrivate}
                onChange={handleChange}
            />
            </Form.Group>

            <Button variant="primary" type="submit">
            Save Changes
            </Button>
        </Form>
        </Container>
    );
};

export default EditProfile;
