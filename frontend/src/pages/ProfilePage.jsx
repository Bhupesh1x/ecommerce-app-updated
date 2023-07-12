import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/Profile/ProfileSidebar";

function ProfilePage() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="container">
        <ProfileSidebar />
      </div>
    </>
  );
}

export default ProfilePage;
