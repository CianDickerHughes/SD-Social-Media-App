// Cian Dicker-Hughes
// G00415413

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; 

const Content = () => {

  const [userData, setUserData] = useState(null); // Store user data (including profile image)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

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
    <div>
      <img src={userData?.profileImgUrl} alt="Profile"   className="rounded-circle"  width="100" height="100"/>
    </div>    
  );
};



export default Content;