import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../../utils/uploadFile";
import { getCurrUser } from "../../../utils/getUser";

function DashboardSidebar({ active, setActive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shopInfo, setShopInfo] = useState(null);
  const currUser = getCurrUser();

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

  return (
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
          <p className="font-semibold text-sm md:text-base">Total Products :</p>
          <p className="text-gray-600">15</p>
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
          <button className="bg-black text-white mt-8 px-4 py-2 rounded-lg block w-full">
            Edit Shop
          </button>
          <button
            onClick={logoutHandler}
            className="bg-black text-white mt-4 px-4 py-2 rounded-lg block w-full"
          >
            Log Out
          </button>
        </>
      )}
    </div>
  );
}

export default DashboardSidebar;
