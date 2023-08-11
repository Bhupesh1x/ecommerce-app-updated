import React, { useEffect, useMemo, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/userOrdersSlice";

function ProfileDetails({ active }) {
  const currUser = getCurrUser();

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.userOrders);

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 max-h-[70vh] overflow-y-scroll">
      {/* Profile Section */}
      {active === 1 && <ProfileForm currUser={currUser} />}

      {/* All Orders Section */}
      {active === 2 && (
        <AllOrders
          columns={tableColumns}
          currUser={currUser}
          dispatch={dispatch}
          orders={orders}
        />
      )}

      {/* Refund Orders Section */}
      {active === 3 && (
        <AllRefundOrders
          columns={tableColumns}
          dispatch={dispatch}
          orders={orders}
        />
      )}

      {/* Payment Section */}
      {active === 4 && <ChangePassword />}

      {/* Address Section */}
      {active === 5 && <Address />}
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
          id: "Uploading",
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
      toast.error(error?.response?.statusText);
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

function AllOrders({ columns, currUser, dispatch, orders }) {
  async function getAllOrderOfUser() {
    try {
      const result = await axios.get(
        `${serverUrl}/order/get-all-orders/${currUser?._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllOrdersOfUser(result.data));
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  useEffect(() => {
    if (!orders?.length) {
      getAllOrderOfUser();
    }
  }, [orders?.length]);

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
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

function AllRefundOrders({ columns, currUser, dispatch, orders }) {
  async function getAllOrderOfUser() {
    try {
      const result = await axios.get(
        `${serverUrl}/order/get-all-orders/${currUser?._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllOrdersOfUser(result.data));
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  useEffect(() => {
    if (!orders?.length) {
      getAllOrderOfUser();
    }
  }, [orders?.length]);

  const refundOrders = useMemo(() => {
    const data = orders.filter(
      (order) => order?.status === "Processing return"
    );
    return data;
  }, [orders]);

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
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

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("New password doesn't match with confirm password!");
    }
    const notification = () => toast("Updating your password...");
    try {
      const payload = {
        oldPassword,
        newPassword,
      };

      const result = await axios.put(
        `${serverUrl}/user/update-user-password`,
        payload,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data, {
        id: notification,
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-xl font-semibold">Change Password</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 mt-6"
      >
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">Old Password</p>
          <input
            type="password"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">New Password</p>
          <input
            type="password"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="lg:w-[50%] w-full">
          <p className="font-semibold">Confirm Password</p>
          <input
            type="password"
            className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-black text-white mt-4 px-8  py-3  rounded-lg"
          type="submit"
        >
          Update
        </button>
      </form>
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
      toast.error(error?.response?.statusText);
    }
  }

  async function handleDelete(id) {
    const notification = () => toast("Deleting your address...");
    try {
      const result = await axios.delete(
        `${serverUrl}/user/delete-user-address/${id}`,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("ecommerceUser", JSON.stringify(result.data));
      toast.success("Deleted address Successfully!", {
        id: notification,
      });
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isOpenModal ? "hidden" : "auto";
  }, [isOpenModal]);

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
      {currUser.addresses.length ? (
        currUser.addresses.map((address) => (
          <div
            className="w-full bg-[#f7f7f7] md:h-[70px] rounded-[4px] my-3 flex items-center px-3 py-1 shadow justify-between"
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
                onClick={() => handleDelete(address._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-2xl font-semibold text-center mt-4">
          You don't have any saved address!
        </p>
      )}

      {isOpenModal && (
        <Modal isOpen={isOpenModal}>
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
                State <span className="ml-2 text-red-500">*</span>
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
