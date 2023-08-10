import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../utils/uploadFile";
import { toast } from "react-hot-toast";
import { RiLockPasswordLine } from "react-icons/ri";

function ProfileSidebar({ active, setActive }) {
  const navigate = useNavigate();

  async function logoutHandler() {
    try {
      const result = await axios.get(`${serverUrl}/user/logout-user`, {
        withCredentials: true,
      });

      localStorage.clear("ecommerceUser");
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  return (
    <div className="w-[20%] bg-white shadow-md border border-gray-300 rounded-md p-4">
      <div
        className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[3.5rem]"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } hidden md:block `}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[3.5rem]"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 2 ? "text-[red]" : ""} md:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[3.5rem]"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 3 ? "text-[red]" : ""} md:block hidden`}
        >
          Returned Orders
        </span>
      </div>

      <div
        className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[3.5rem]"
        onClick={() => setActive(4)}
      >
        <RiLockPasswordLine size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 4 ? "text-[red]" : ""} md:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[3.5rem]"
        onClick={() => setActive(5)}
      >
        <TbAddressBook size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 5 ? "text-[red]" : ""} md:block hidden`}
        >
          Address
        </span>
      </div>

      <div
        className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[3.5rem]"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 6 ? "text-[red]" : ""} md:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
}

export default ProfileSidebar;
