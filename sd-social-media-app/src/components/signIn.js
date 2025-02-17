import React, { useState } from 'react';

const SignUp = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
      setImageUrl(""); // Clear URL input if a file is selected
    }
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    setImage(event.target.value); // Use URL directly
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Sign Up</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" placeholder="Username" style={{ padding: '8px', width: '80%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="email" placeholder="Email" style={{ padding: '8px', width: '80%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="password" placeholder="Password" style={{ padding: '8px', width: '80%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Profile Picture (Upload or Paste URL)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'block', margin: '10px auto' }} />
          <input 
            type="text" 
            placeholder="Image URL" 
            value={imageUrl} 
            onChange={handleUrlChange} 
            style={{ padding: '8px', width: '80%', marginTop: '10px' }} 
          />
        </div>

        {image && (
          <div style={{ marginBottom: '10px' }}>
            <img src={image} alt="Profile Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </div>
        )}

        <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
