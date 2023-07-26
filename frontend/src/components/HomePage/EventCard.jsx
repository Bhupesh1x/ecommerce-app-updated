import React from "react";

function EventCard({ event }) {
  return (
    <div className="px-6 bg-white py-6 shadow-md rounded-md lg:flex lg:items-center">
      <img
        src={event?.images[0]}
        alt=""
        className="w-full lg:w-[50%] max-h-[30rem] object-contain"
      />

      <div>
        <h1 className="text-xl font-semibold">{event?.name}</h1>
        <p className="my-2 text-gray-600">{event?.description}</p>
        <div className="flex items-center justify-between my-3">
          <p className="font-semibold text-xl">
            Price :{" "}
            <span className="text-red-500 line-through">
              {event?.originalPrice}$
            </span>{" "}
            {event?.discountPrice}$
          </p>
          <p className="text-[#68d284]">{event?.sold_out} sold</p>
        </div>

        <p className="text-blue-500 text-xl md:text-2xl">
          Event From{" "}
          <span className=" text-orange-500">
            {event?.start_date.slice(0, 10)}
          </span>{" "}
          To{" "}
          <span className=" text-orange-500">
            {event?.end_date.slice(0, 10)}
          </span>
        </p>

        <div className="flex items-center gap-6">
          <button className="bg-black text-white mt-4 px-8  py-3  rounded-lg">
            See Details
          </button>
          <button className="bg-black text-white mt-4 px-8  py-3  rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
