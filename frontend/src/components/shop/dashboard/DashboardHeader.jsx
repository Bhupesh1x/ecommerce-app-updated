import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { getCurrUser } from "../../../utils/getUser";

function DashboardHeader() {
  const currUser = getCurrUser();
  return (
    <nav className="sticky top-0 z-50 bg-slate-50 shadow-sm">
      <div className="container flex items-center justify-between py-4 px-6">
        <Link to="/" className="">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/dashboard-cupouns" className="md:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="md:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="md:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="md:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="md:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${currUser._id}`}>
            <img
              src={currUser?.avatar}
              alt=""
              className="h-[50px] w-[50px] object-cover rounded-full cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;
