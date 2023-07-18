import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    Icon: RxDashboard,
  },
  {
    id: 2,
    title: "All Orders",
    link: "/dashboard-orders",
    Icon: FiShoppingBag,
  },
  {
    id: 3,
    title: "All Products",
    link: "/dashboard-products",
    Icon: FiPackage,
  },
  {
    id: 4,
    title: "Create Product",
    link: "/dashboard-create-product",
    Icon: AiOutlineFolderAdd,
  },
  {
    id: 5,
    title: "All Events",
    link: "/dashboard-events",
    Icon: MdOutlineLocalOffer,
  },
  {
    id: 6,
    title: "Create Event",
    link: "/dashboard-create-event",
    Icon: VscNewFile,
  },
  {
    id: 7,
    title: "Withdraw Money",
    link: "/dashboard-withdraw-money",
    Icon: CiMoneyBill,
  },
  {
    id: 8,
    title: "Shop Inbox",
    link: "/dashboard-messages",
    Icon: BiMessageSquareDetail,
  },
  {
    id: 9,
    title: "Discount Codes",
    link: "/dashboard-coupouns",
    Icon: AiOutlineGift,
  },
  {
    id: 10,
    title: "Refunds",
    link: "/dashboard-refunds",
    Icon: HiOutlineReceiptRefund,
  },
  {
    id: 11,
    title: "Settings",
    link: "/dashboard-settings",
    Icon: CiSettings,
  },
];

function DashboardSidebar({ active, setActive }) {
  return (
    <div className="w-[20%] bg-white shadow-md border border-gray-300 rounded-md p-3">
      {sidebarData.map((sidebar, index) => (
        <Link
          to={sidebar.link}
          key={index}
          className="flex items-center justify-center md:justify-start cursor-pointer w-full mb-[1.6rem]"
        >
          <sidebar.Icon
            size={25}
            color={`${active === sidebar.id ? "crimson" : "#555"}`}
          />
          <span
            className={`pl-3 ${
              active === sidebar.id ? "text-[red]" : ""
            } hidden md:block md:text-sm lg:text-base`}
          >
            {sidebar.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default DashboardSidebar;
