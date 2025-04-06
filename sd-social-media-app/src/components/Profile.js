// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from "react";
import profileIMG from '../img/profile-user.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 

const Profile = () => {
  const [userData, setUserData] = useState(null); // Store user data (including profile image)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

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
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      setUserData(response.data); // Store user data including profile image URL
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

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
    <p className="mt-2">{userData?.bio || "your bio."}</p>
    <hr className="border-light" />
  </div>
  );
};

export default Profile;