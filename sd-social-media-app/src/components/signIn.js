// Cian Dicker-Hughes
// G00415413

import React, { useState } from "react";
import axios from "axios";
import apiConfig from "../apiConfig";

const SignUp = () => {
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send user data to the backend
    try {
      const response = await axios.post(`${apiConfig.baseUrl}/users/addUser`, {
        name,
        username,
        email,
        password,
        profileImgUrl: imageUrl,
      });

      // If user data has been send
      if (response.status === 200) {
        setMessage("User registered successfully!");
      }
    } catch (error) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#282828", color: "white" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}> { /* Name */}
          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}> { /* UserName */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}> { /* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}> { /* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}> { /* Url Profile Picture */}
          <label>Profile Picture (Optional)</label><br />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ padding: "8px", width: "80%", marginTop: "10px" }}
          />
        </div>
        { /* Deplay Url Profile Picture */}
        {imageUrl && (
          <div style={{ marginBottom: "10px" }}>
            <img src={imageUrl} alt="Profile Preview" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "lightgreen" }}>{message}</p>}
    </div>
  );
};

export default SignUp;