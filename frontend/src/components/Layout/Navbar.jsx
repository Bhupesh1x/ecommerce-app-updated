import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { categoriesData, navItems } from "../../static/data";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ activeNo, isColumn }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleDropdownClick() {
    setIsDropdownOpen((prev) => !prev);
  }

  const handleSubmit = (title) => {
    navigate(`/products?category=${title}`);
  };

  return (
    <div className={`${!isColumn && "hidden bg-blue-700"} md:block`}>
      <div
        className={`container pt-2 px-6 flex items-center justify-between w-full ${
          isColumn && "flex-col"
        }`}
      >
        {!isColumn && (
          <div
            className="bg-white relative w-fit px-8 py-2 rounded-t-md cursor-pointer"
            onClick={handleDropdownClick}
          >
            All Categories{" "}
            <IoIosArrowDown size={20} className="inline text-gray-500 ml-2" />
            {isDropdownOpen ? (
              <div className="absolute left-0 top-9 bg-slate-50 border border-gray-300 rounded-md shadow-sm-2 z-[9] px-4 py-2">
                {categoriesData?.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center my-2 cursor-pointer select-none"
                    onClick={() => handleSubmit(data.title)}
                  >
                    <img
                      src={`${data?.image_Url}`}
                      alt="icon"
                      className="w-[40px] h-[40px] mr-[10px] object-contain"
                    />
                    <p className="text-sm">{data.title}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

        <div className={`items-center flex gap-4 ${isColumn && "flex-col"}`}>
          {navItems?.map((items, i) => (
            <Link key={i} to={items.url}>
              <p
                className={`${
                  activeNo === i || isColumn ? "text-teal-600" : "text-white"
                }  hover:text-teal-600 transition-all duration-300 ease-in font-semibold ${
                  isColumn && "hover:text-teal-400"
                }`}
              >
                {items.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
