import React, { useState } from "react";
import { getCurrUser } from "../../utils/getUser";
import { DataGrid } from "@material-ui/data-grid";
import { tableColumns } from "../../static/data";
import { AiOutlineDelete } from "react-icons/ai";

const orders = [
  {
    _id: "7463hvbfbhfbrtr28820221",
    orderItems: [
      {
        name: "Iphone 14 pro max",
      },
    ],
    totalPrice: 120,
    orderStatus: "Processing",
  },
];

function ProfileDetails({ active }) {
  const currUser = getCurrUser();

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4">
      {/* Profile Section */}
      {active === 1 && <ProfileForm currUser={currUser} />}

      {/* All Orders Section */}
      {active === 2 && <AllOrders row={row} columns={tableColumns} />}

      {/* Refund Orders Section */}
      {active === 3 && <AllRefundOrders row={row} columns={tableColumns} />}

      {/* Track Orders Section */}
      {active === 5 && <Trackorders row={row} columns={tableColumns} />}

      {/* Payment Section */}
      {active === 6 && <PaymentMethod />}

      {/* Address Section */}
      {active === 7 && <Address />}
    </div>
  );
}

export default ProfileDetails;

function ProfileForm({ currUser }) {
  const [name, setName] = useState(currUser && currUser?.name);
  const [email, setEmail] = useState(currUser && currUser?.email);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} aria-required={true}>
      <div className="flex items-center justify-center relative w-full mb-5">
        <img
          src={currUser?.avatar}
          alt=""
          className="h-[150px] w-[150px] object-contain rounded-full cursor-pointer border-[3px] border-blue-600 hover:border-blue-400"
        />
      </div>
      <div className="flex flex-col items-center lg:flex-row gap-4">
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">Full Name</p>
          <input
            type="text"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">Email</p>
          <input
            type="email"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center lg:flex-row gap-4 mt-4">
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">Address 1</p>
          <input
            type="text"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">Address 2</p>
          <input
            type="text"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center lg:flex-row gap-4 mt-4">
        <div className="lg:w-[49%] w-full">
          <p className="font-semibold">Zip Code</p>
          <input
            type="number"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-black text-white mt-4 px-8  py-3  rounded-lg"
        type="submit"
      >
        Update
      </button>
    </form>
  );
}

function AllOrders({ row, columns }) {
  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
    />
  );
}

function AllRefundOrders({ row, columns }) {
  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
    />
  );
}

function Trackorders({ row, columns }) {
  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
    />
  );
}

function PaymentMethod() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Payment Methods</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          type="submit"
        >
          Add New
        </button>
      </div>
      <div className="w-full bg-[#f7f7f7] h-min md:h-[70px] rounded-[4px] flex items-center px-3 py-1 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600] md:text-[unset] hidden md:inline-flex">
            Bhupesh Vyas
          </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className=" md:text-[unset]">1234 **** *** ****</h6>
          <h5 className="pl-6 md:text-[unset] hidden md:inline-flex">
            08/2022
          </h5>
        </div>
        <div className="min-w-[10%]">
          <AiOutlineDelete size={25} className="cursor-pointer text-red-500" />
        </div>
      </div>
    </>
  );
}

function Address() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold"> My Addresses</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          type="submit"
        >
          Add New
        </button>
      </div>
      <div className="w-full bg-[#f7f7f7] md:h-[70px] rounded-[4px] flex items-center px-3 py-1 shadow justify-between">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default</h5>
        </div>
        <div className="pl-4 md:pl-0 flex items-center">
          <h6 className="md:text-base text-xs">
            494 Erdman Pasaage, New Zoietown, Paraguay
          </h6>
        </div>
        <div className="pl-8 items-center hidden md:flex">
          <h6 className="md:text-[unset]">(213) 840-9416</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between">
          <AiOutlineDelete size={25} className="cursor-pointer text-red-500" />
        </div>
      </div>
    </>
  );
}
