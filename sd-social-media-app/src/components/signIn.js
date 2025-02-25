// Cian Dicker-Hughes
// G00415413

import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store file for upload
      setImageUrl(""); // Clear URL input if a file is selected
    }
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    setImage(null); // Clear file upload if a URL is entered
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Select the final image source (either uploaded file or URL)
    let finalImageUrl = imageUrl;

    if (image) {
      // If a file is uploaded, send it to a backend image upload endpoint
      const formData = new FormData();
      formData.append("file", image);

      try {
        const uploadResponse = await axios.post("http://localhost:8080/users/uploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        finalImageUrl = uploadResponse.data.imageUrl; // Get URL from the response
      } catch (error) {
        setMessage("Image upload failed");
        return;
      }
    }

    // Send user data to the backend
    try {
      const response = await axios.post("http://localhost:8080/users/addUser", {
        username,
        email,
        password,
        img: finalImageUrl,
      });

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
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "80%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Profile Picture (Upload or Paste URL)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "block", margin: "10px auto" }}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleUrlChange}
            style={{ padding: "8px", width: "80%", marginTop: "10px" }}
          />
        </div>

        {image && (
          <div style={{ marginBottom: "10px" }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Profile Preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </div>
        )}

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