import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import EventCard from "../components/HomePage/EventCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../utils/uploadFile";
import { getAllEvents } from "../redux/allEventsSlice";
import { toast } from "react-hot-toast";

function EventsPage() {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.allEvents.value);

  async function getAllEventsData() {
    try {
      const result = await axios.get(`${serverUrl}/event/get-all-events`, {
        withCredentials: true,
      });
      dispatch(getAllEvents(result.data));
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  useEffect(() => {
    if (!eventData.length) {
      getAllEventsData();
    }
  }, [eventData.length]);

  return (
    <div>
      <Header />
      <Navbar activeNo={3} />

      {eventData.map((event) => (
        <EventCard key={event?._id} event={event} />
      ))}
    </div>
  );
}

export default EventsPage;
