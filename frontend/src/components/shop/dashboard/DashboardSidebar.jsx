import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { Link } from "react-router-dom";
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
    title: "Discount Codes",
    link: "/dashboard-coupons",
    Icon: AiOutlineGift,
  },
  {
    id: 8,
    title: "Refunds",
    link: "/dashboard-refunds",
    Icon: HiOutlineReceiptRefund,
  },
];

function DashboardSidebar({ active }) {
  return (
    <div className="w-[20%] bg-white shadow-md border border-gray-300 rounded-md p-3 min-h-[80vh] max-h-[80vh]">
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
