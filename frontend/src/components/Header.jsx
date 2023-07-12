import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { productData } from "../static/data";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { getCurrUser } from "../utils/getUser";
import Cart from "./Cart.jsx";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openCart, setOpenCart] = useState(false);
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
      <div className="container flex items-center justify-between py-4 px-6  ">
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt=""
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
          <button className="bg-black text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hidden md:inline">
            <span className="inline">Become seller</span>{" "}
            <IoIosArrowForward className=" inline" />
          </button>
          <AiOutlineShoppingCart
            size={25}
            className="text-gray-500 cursor-pointer"
            onClick={handleOpenCart}
          />
          {currUser ? (
            <Link to="/profile">
              <img
                src={currUser.avatar}
                alt=""
                className="h-[25px] w-[25px] object-cover rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <CgProfile size={25} className="text-gray-500 cursor-pointer" />
          )}
        </div>

        {/* Cart Model */}
        {openCart ? <Cart setOpenCart={setOpenCart} open={openCart} /> : null}
      </div>
    </nav>
  );
}

export default Header;
