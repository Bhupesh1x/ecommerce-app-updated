import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import uploadFile, { serverUrl } from "../../../utils/uploadFile";
import { getCurrUser } from "../../../utils/getUser";
import Modal from "../../modal/Modal";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";

function DashboardSidebar({ active, setActive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shopInfo, setShopInfo] = useState(null);
  const currUser = getCurrUser();
  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState(currUser && currUser?.avatar);
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState(currUser && currUser?.name);
  const [email, setEmail] = useState(currUser && currUser?.email);
  const [desc, setDesc] = useState(currUser && currUser?.desc);
  const [address, setAddress] = useState(currUser && currUser?.address);
  const [zipCode, setZipCode] = useState(currUser && currUser?.zipCode);
  const shopAllProducts = useSelector((state) => state.productShop.value);

  async function getShopInfo() {
    const url = `${serverUrl}/shop/get-shop-info/${id}`;

    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      setShopInfo(result.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getShopInfo();
  }, []);

  async function logoutHandler() {
    try {
      const result = await axios.get(`${serverUrl}/shop/logout`, {
        withCredentials: true,
      });

      localStorage.clear("ecommerceUser");
      toast.success(result.data.message);
      navigate("/shop-login");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);
    const url = await uploadFile(file);
    setAvatar(url);
    setIsUploading(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const notification = () => toast("Updating shop details...");
    try {
      const data = {
        name,
        email,
        avatar,
        desc,
        address,
        zipCode,
      };

      if (isUploading) {
        return toast.error("Please wait for image to upload", {
          id: "Uploading",
        });
      }

      const result = await axios.put(
        `${serverUrl}/shop/update-shop-info`,
        data,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("ecommerceUser", JSON.stringify(result.data));
      toast.success("Updated shop Successfull", {
        id: notification,
      });
      window.location.reload();
      setOpenModal(false);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  return (
    <>
      <div className="w-[25%] h-[89vh] bg-white shadow-md border border-gray-300 rounded-md p-3 sticky left-0 top-[1.6rem] md:top-10">
        <div className="w-full flex items-center justify-center">
          <img
            src={shopInfo?.avatar}
            alt=""
            className="h-[80px] w-[80px] md:h-[150px] md:w-[150px] object-cover rounded-full cursor-pointer border border-gray-400 p-1"
          />
        </div>
        <p className="text-center font-semibold text-xl">{shopInfo?.name}</p>

        <div className="mt-4 space-y-4">
          <div>
            <p className="font-semibold text-sm md:text-base">Address :</p>
            <p className="text-gray-600">{shopInfo?.address}</p>
          </div>
          <div>
            <p className="font-semibold text-sm md:text-base">
              Total Products :
            </p>
            <p className="text-gray-600">{shopAllProducts?.length}</p>
          </div>
          <div>
            <p className="font-semibold text-sm md:text-base">Shop Rating :</p>
            <p className="text-gray-600">4/5</p>
          </div>
          <div>
            <p className="font-semibold text-sm md:text-base">Joined On :</p>
            <p className="text-gray-600">{shopInfo?.createdAt?.slice(0, 10)}</p>
          </div>
        </div>
        {currUser?._id === id && (
          <>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-black text-white mt-8 px-4 py-2 rounded-lg block w-full text-sm lg:text-base"
            >
              Edit Shop
            </button>
            <Link to="/dashboard">
              <button className="bg-black text-white mt-4 px-4 py-2 rounded-lg block w-full text-xs lg:text-base">
                Go To Dashboard
              </button>
            </Link>
            <button
              onClick={logoutHandler}
              className="bg-black text-white mt-4 px-4 py-2 rounded-lg block w-full text-sm lg:text-base"
            >
              Log Out
            </button>
          </>
        )}
      </div>

      {openModal && (
        <Modal>
          <RxCross1
            size={20}
            onClick={() => setOpenModal(false)}
            className="cursor-pointer float-right"
          />
          <>
            <h1 className="text-center text-2xl font-semibold my-4">
              Edit Shop Info
            </h1>

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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 mt-6"
            >
              <div className="lg:w-[50%] w-full">
                <p className="font-semibold">Shop Name</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="lg:w-[50%] w-full">
                <p className="font-semibold">Shop Email</p>
                <input
                  type="email"
                  className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="lg:w-[50%] w-full">
                <p className="font-semibold">Shop Description</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter your shop description"
                />
              </div>
              <div className="lg:w-[50%] w-full">
                <p className="font-semibold">Shop Address</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="lg:w-[50%] w-full">
                <p className="font-semibold">Shop Zip Code</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white mt-4 px-8 py-3 rounded-lg"
              >
                Update
              </button>
            </form>
          </>
        </Modal>
      )}
    </>
  );
}

export default DashboardSidebar;
