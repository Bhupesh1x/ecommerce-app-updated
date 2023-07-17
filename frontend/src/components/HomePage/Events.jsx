import React from "react";
import EventCard from "./EventCard";

function Events() {
  return (
    <div className="my-12 container px-6">
      <h1 className="text-xl font-semibold pb-4">Popular Events</h1>

      <div className="w-full">
        <EventCard />
      </div>
    </div>
  );
}

export default Events;
