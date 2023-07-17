import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footerProductLinks,
  footerSupportLinks,
  navItems,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="bg-[#342AC8] w-full">
        <div className="container px-6 py-4 lg:py-12 flex items-center flex-col lg:flex-row">
          <h1 className="text-4xl lg:text-5xl w-full lg:w-[50%]">
            <span className="text-[#56D879]">Subscribe</span> us for get news
            events and offers!
          </h1>
          <div className="flex flex-col lg:flex-row w-full lg:w-[50%] gap-4 mt-8 lg:mt-0 lg:justify-end">
            <input
              type="text"
              placeholder="Enter your email..."
              className="border-0 bg-[white] px-4 py-2 lg:py-1 rounded-md"
            />
            <button className="bg-[#56D879] text-white px-4 py-2 hover:bg-teal-400 transition-all duration-150 ease-in rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="container px-6 py-8  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-20 text-center md:text-start mx-auto">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <br />
          <p>The home and elements needeed to create beatiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center md:text-start">
          <h1 className="mb-1 font-semibold text-lg">Shop</h1>
          {navItems.map((link, index) => (
            <li
              key={index}
              className="text-white hover:text-teal-600 transition-all duration-300 ease-in"
            >
              <Link to={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <ul className="text-center md:text-start">
          <h1 className="mb-1 font-semibold text-lg">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li
              key={index}
              className="text-white hover:text-teal-600 transition-all duration-300 ease-in"
            >
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="text-center md:text-start">
          <h1 className="mb-1 font-semibold text-lg">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li
              key={index}
              className="text-white hover:text-teal-600 transition-all duration-300 ease-in"
            >
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 ShopO. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
