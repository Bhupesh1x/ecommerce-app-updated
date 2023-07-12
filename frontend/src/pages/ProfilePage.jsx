import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileDetails from "../components/Profile/ProfileDetails";
import { useState } from "react";

function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <>
      <Header />
      <Navbar />
      <div className="container px-6 flex gap-8 py-6 lg:py-10">
        <ProfileSidebar active={active} setActive={setActive} />
        <ProfileDetails active={active} />
      </div>
    </>
  );
}

export default ProfilePage;
