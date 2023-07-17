import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { productData } from "../static/data";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { getCurrUser } from "../utils/getUser";
import Cart from "./Cart.jsx";
import { RxCross1 } from "react-icons/rx";
import Navbar from "./Navbar";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const currUser = getCurrUser();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSearchData(null);
    } else {
      const filteredProducts =
        productData &&
        productData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setSearchData(filteredProducts);
    }
  }, [searchTerm]);

  function handleOpenCart() {
    setOpenCart(true);
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 shadow-sm">
      <div className="container flex items-center justify-between py-4 px-6">
        <Link to="/" className="hidden md:inline">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
        <img
          src="https://img.icons8.com/material-rounded/24/menu--v1.png"
          alt=""
          className="cursor-pointer inline md:hidden"
          onClick={() => setOpenMobileMenu(true)}
        />

        <div className="relative bg-gray-100 flex items-center border border-gray-400 rounded-md px-2 md:px-4 py-1 ">
          <input
            type="text"
            className="bg-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Product..."
          />
          <AiOutlineSearch size={25} className="cursor-pointer text-gray-500" />

          {searchData?.length
            ? searchData?.map((data, index) => (
                <div
                  key={index}
                  className="absolute left-0 top-9 bg-slate-50 border border-gray-300 rounded-md shadow-sm-2 z-[9] p-4"
                >
                  <Link to={`/product/${data.name}`}>
                    <div className="flex items-start my-2 cursor-pointer">
                      <img
                        src={`${data?.image_Url[0]?.url}`}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <p>{`${data.name.substring(0, 30)}...`}</p>
                    </div>
                  </Link>
                </div>
              ))
            : null}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/shop-create">
            <button className="bg-black text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hidden md:inline">
              <span className="inline">Become seller</span>{" "}
              <IoIosArrowForward className=" inline" />
            </button>
          </Link>
          <AiOutlineShoppingCart
            className="text-gray-500 cursor-pointer h-[25px] w-[25px] md:h-[30px] md:w-[30px]"
            onClick={handleOpenCart}
          />
          {currUser ? (
            <Link to="/profile">
              <img
                src={currUser?.avatar}
                alt=""
                className="h-[25px] w-[25px] md:h-[30px] md:w-[30px] object-contain rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile className="text-gray-500 cursor-pointer h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
            </Link>
          )}
        </div>

        {/* Cart Model */}
        {openCart ? <Cart setOpenCart={setOpenCart} open={openCart} /> : null}
        {openMobileMenu ? (
          <div className="fixed top-0 left-0 bg-white w-[45%] md:w-[30%] shadow-md h-screen px-4 py-2 z-20">
            <div className="flex items-center justify-between my-2">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="w-[50%] object-contain"
              />
              <RxCross1
                size={20}
                onClick={() => setOpenMobileMenu(false)}
                className="cursor-pointer"
              />
            </div>
            <Navbar isColumn={true} />
            <Link
              to={`${
                currUser?.role === "Seller" ? "/dashboard" : "/shop-create"
              }`}
            >
              <button className="bg-black text-white px-4 py-2 rounded-lg w-full my-6">
                <span className="inline">Become seller</span>{" "}
                <IoIosArrowForward className=" inline" />
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Header;
