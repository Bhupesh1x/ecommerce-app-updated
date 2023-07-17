import React from "react";

function EventCard() {
  return (
    <div className="px-6 bg-white py-6 shadow-md rounded-md lg:flex lg:items-center">
      <img
        src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
        alt=""
        className="w-full lg:w-[50%]"
      />

      <div>
        <h1 className="text-xl font-semibold">Iphone 14 pro max 8/256gb</h1>
        <p className="my-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          ducimus eum similique corporis dolor molestias labore accusantium sed
          accusamus illo voluptate aut reprehenderit sit reiciendis blanditiis
          doloribus quos cupiditate corrupti. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Velit, ducimus eum similique corporis
          dolor molestias labore accusantium sed accusamus illo voluptate aut
          reprehenderit sit reiciendis blanditiis doloribus quos cupiditate
          corrupti.
        </p>
        <div className="flex items-center justify-between my-3">
          <p className="font-semibold  text-xl">Price : 999$</p>
          <p className="text-[#68d284]">120 sold</p>
        </div>

        <p className="text-blue-500 text-2xl">2 days left</p>

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
