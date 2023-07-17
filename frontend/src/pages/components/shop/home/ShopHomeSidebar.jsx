import React from "react";
import { getCurrUser } from "../../../../utils/getUser";

function DashboardSidebar({ active, setActive }) {
  const currUser = getCurrUser();
  console.log(currUser);
  return (
    <div className="w-[25%] h-[90vh] bg-white shadow-md border border-gray-300 rounded-md p-3 sticky left-0 top-[1.6rem] md:top-10">
      <div className="w-full flex items-center justify-center">
        <img
          src={currUser?.avatar}
          alt=""
          className="h-[80px] w-[80px] md:h-[150px] md:w-[150px] object-contain rounded-full cursor-pointer border border-gray-400 p-1"
        />
      </div>
      <p className="text-center font-semibold text-xl">{currUser?.name}</p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="font-semibold text-sm md:text-base">Address :</p>
          <p className="text-gray-600">{currUser?.address}</p>
        </div>
        <div>
          <p className="font-semibold text-sm md:text-base">Total Products :</p>
          <p className="text-gray-600">15</p>
        </div>
        <div>
          <p className="font-semibold text-sm md:text-base">Shop Rating :</p>
          <p className="text-gray-600">4/5</p>
        </div>
        <div>
          <p className="font-semibold text-sm md:text-base">Joined On :</p>
          <p className="text-gray-600">{currUser?.createdAt?.slice(0, 10)}</p>
        </div>
      </div>
      <button className="bg-black text-white mt-12 px-4 py-2 rounded-lg block w-full">
        Edit Shop
      </button>
      <button className="bg-black text-white mt-4 px-4 py-2 rounded-lg block w-full">
        Log Out
      </button>
    </div>
  );
}

export default DashboardSidebar;
