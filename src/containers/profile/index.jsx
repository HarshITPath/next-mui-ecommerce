"use client";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchProfileData(token);
    }
  }, []);

  const fetchProfileData = async (token) => {
    try {
      const response = await fetch(
        "https://ecommerce-server-le5a.onrender.com/api/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setProfileData(data);
        console.log("profileData", profileData);
      } else {
        console.error("Error fetching profile data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <div>First Name : {profileData?.data?.firstName}</div>
      <div>Last Name : {profileData?.data?.lastName}</div>
      <div>Email : {profileData?.data?.email}</div>
    </div>
  );
};

export default ProfilePage;
