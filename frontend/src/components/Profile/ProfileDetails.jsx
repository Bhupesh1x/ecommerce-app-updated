import React, { useState } from "react";
import { getCurrUser } from "../../utils/getUser";
import { DataGrid } from "@material-ui/data-grid";
import { addressTypeData, tableColumns } from "../../static/data";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import uploadFile, { serverUrl } from "../../utils/uploadFile";
import { toast } from "react-hot-toast";
import axios from "axios";
import Modal from "../modal/Modal";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";

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
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 max-h-[70vh] overflow-y-scroll">
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
  const [avatar, setAvatar] = useState(currUser && currUser?.avatar);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);
    const url = await uploadFile(file);
    setAvatar(url);
    setIsUploading(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast("Updating user details...");
    try {
      const data = {
        name,
        email,
        avatar,
      };

      if (isUploading) {
        return toast.error("Please wait for image to upload", {
          id: "Uplaoding",
        });
      }

      const result = await axios.put(
        `${serverUrl}/user/update-user-info`,
        data,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("ecommerceUser", JSON.stringify(result.data));
      toast.success("Updating user Successfull", {
        id: notification,
      });
    } catch (error) {
      toast.error(error?.response?.data, {
        id: notification,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-required={true}>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={avatar}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-blue-500"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label htmlFor="image">
              <AiOutlineCamera className="cursor-pointer" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
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
        <button
          className="bg-black text-white mt-4 px-8  py-3  rounded-lg"
          type="submit"
        >
          Update
        </button>
      </div>
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const currUser = getCurrUser();

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast("Adding new address...");
    try {
      const addresses = [
        {
          country,
          city,
          zipCode,
          address1,
          address2,
          addressType,
        },
      ];

      const result = await axios.put(
        `${serverUrl}/user/update-user-address`,
        addresses,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("ecommerceUser", JSON.stringify(result.data));
      toast.success("Added new address Successfully!", {
        id: notification,
      });
      setIsOpenModal(false);
      setCountry("");
      setCity("");
      setZipCode();
      setAddress1("");
      setAddress2("");
      setAddressType("");
    } catch (error) {
      toast.error(error?.response?.data, {
        id: notification,
      });
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold"> My Addresses</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          type="submit"
          onClick={handleOpenModal}
        >
          Add New
        </button>
      </div>
      {currUser.addresses &&
        currUser.addresses.map((address) => (
          <div
            className="w-full bg-[#f7f7f7] md:h-[70px] rounded-[4px] flex items-center px-3 py-1 shadow justify-between"
            key={address._id}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{address.addressType}</h5>
            </div>
            <div className="pl-4 md:pl-0 flex items-center">
              <h6 className="md:text-base text-xs">{`${address.address1},${address.address2},${address.city},${address.country}`}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer text-red-500"
              />
            </div>
          </div>
        ))}

      {isOpenModal && (
        <Modal>
          <RxCross1
            size={20}
            onClick={() => setIsOpenModal(false)}
            className="cursor-pointer float-right"
          />
          <>
            <h1 className="text-center text-2xl font-semibold my-4">
              Add New Address
            </h1>
            <form onSubmit={handleSubmit}>
              <p className="font-semibold my-1">
                Country <span className="ml-2 text-red-500">*</span>
              </p>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
              >
                <option value="" className="block border pb-2">
                  choose your country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option
                      className="block pb-2"
                      key={item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
              <p className="font-semibold my-1 mt-2">
                City <span className="ml-2 text-red-500">*</span>
              </p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
              >
                <option value="" className="block border pb-2">
                  choose your city
                </option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option
                      className="block pb-2"
                      key={item.isoCode}
                      value={item.isoCode}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
              <p className="font-semibold my-1 mt-2">
                Address 1 <span className="ml-2 text-red-500">*</span>
              </p>
              <input
                type="text"
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Enter Address 1..."
                aria-required
              />
              <p className="font-semibold my-1 mt-2">
                Address 2 <span className="ml-2 text-red-500">*</span>
              </p>
              <input
                type="text"
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Enter your Address 2..."
                aria-required
              />
              <p className="font-semibold my-1 mt-2">
                Zip Code <span className="ml-2 text-red-500">*</span>
              </p>
              <input
                type="number"
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your Zip Code..."
                aria-required
              />
              <p className="font-semibold my-1 mt-2">
                Address Type <span className="ml-2 text-red-500">*</span>
              </p>
              <select
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                required
              >
                <option value="" className="block border pb-2">
                  choose your address type
                </option>
                {addressTypeData.map((item) => (
                  <option
                    className="block pb-2"
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg my-6 w-full"
                type="submit"
              >
                Create
              </button>
            </form>
          </>
        </Modal>
      )}
    </>
  );
}
