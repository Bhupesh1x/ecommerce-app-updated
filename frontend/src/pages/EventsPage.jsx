import React from "react";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import EventCard from "../components/HomePage/EventCard";

function EventsPage() {
  return (
    <div>
      <Header />
      <Navbar activeNo={3} />

      <EventCard />
      <EventCard />
    </div>
  );
}

export default EventsPage;
