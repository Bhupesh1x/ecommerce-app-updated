import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { getCurrUser } from "../../utils/getUser";
import Cart from "../HomePage/Cart.jsx";
import { RxCross1 } from "react-icons/rx";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const currUser = getCurrUser();
  const productData = useSelector((state) => state.allProducts.value);
  const cart = useSelector((state) => state.cart.value);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  useEffect(() => {
    const getSearchData = setTimeout(() => {
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
    }, 500);

    return () => clearTimeout(getSearchData);
  }, [productData, searchTerm]);

  function handleOpenCart() {
    setOpenCart(true);
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 shadow-sm w-full">
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
          {searchData?.length ? (
            <div className="absolute left-0 top-9 bg-slate-50 border border-gray-300 rounded-md shadow-sm-2 z-[9] p-4 w-full">
              {searchData?.map((data, index) => (
                <Link to={`/product/${data._id}`} key={index}>
                  <div className="flex items-center my-2 cursor-pointer">
                    <img
                      src={`${data?.images[0]}`}
                      alt=""
                      className="w-[40px] h-[40px] mr-[10px]"
                    />
                    <p>
                      {data.name > 25
                        ? `${data.name.substring(0, 25)}...`
                        : data.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {currUser?.role !== "Seller" && (
            <Link to="/shop-create">
              <button className="bg-black text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hidden md:inline">
                <span className="inline">Become seller</span>{" "}
                <IoIosArrowForward className=" inline" />
              </button>
            </Link>
          )}
          <div className="relative">
            <AiOutlineShoppingCart
              className="text-gray-500 cursor-pointer h-[25px] w-[25px] md:h-[30px] md:w-[30px]"
              onClick={handleOpenCart}
            />
            <span className="absolute -top-2 -right-2 bg-blue-500 h-5 w-5 rounded-full flex items-center justify-center text-sm text-white font-semibold">
              {cart.length}
            </span>
          </div>

          {currUser ? (
            <Link
              to={
                currUser?.role !== "Seller"
                  ? "/profile"
                  : `/shop/${currUser._id}`
              }
            >
              <img
                src={currUser?.avatar}
                alt=""
                className="h-[50px] w-[50px] object-cover rounded-full cursor-pointer"
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
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt=""
                  className="w-[50%] object-contain"
                />
              </Link>
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
