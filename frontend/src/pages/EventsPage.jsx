import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import EventCard from "../components/EventCard";

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
