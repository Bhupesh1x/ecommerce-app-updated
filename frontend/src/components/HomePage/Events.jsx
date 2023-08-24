import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../utils/uploadFile";
import { getAllEvents } from "../../redux/allEventsSlice";
import { toast } from "react-hot-toast";

function Events() {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.allEvents.value);

  async function getAllEventsData() {
    try {
      const result = await axios.get(`${serverUrl}/event/get-all-events`, {
        withCredentials: true,
      });
      dispatch(getAllEvents(result.data));
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getAllEventsData();
  }, []);

  if (!eventData.length) {
    return null;
  }

  return (
    <div className="my-12 container px-6">
      <h1 className="text-xl font-semibold pb-4">Popular Events</h1>

      <div className="w-full">
        <EventCard event={eventData[0]} />
      </div>
    </div>
  );
}

export default Events;
