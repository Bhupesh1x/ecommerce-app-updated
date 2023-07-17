import React, { useState } from "react";
import { productData } from "../../../../static/data";
import ProductCard from "../../../../components/product/ProductCard";
import { Link } from "react-router-dom";

const sidebarData = [
  {
    id: 1,
    title: "Shop Products",
  },
  {
    id: 2,
    title: "Running Events",
  },
  {
    id: 3,
    title: "Shop Reviews",
  },
];

function ShopHomeDetails() {
  const [active, setActive] = useState(1);
  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {sidebarData.map(({ id, title }) => (
            <p
              className={`text-base md:text-lg font-semibold cursor-pointer ${
                active === id && "text-red-500"
              }`}
              key={id}
              onClick={() => setActive(id)}
            >
              {title}
            </p>
          ))}
        </div>
        <Link to="/dashboard">
          <button className="bg-black text-white px-6 py-2 rounded-lg hidden md:inline">
            Go Dashboard
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 my-4">
        {productData &&
          productData?.map((value, index) => (
            <ProductCard product={value} key={index} />
          ))}
      </div>
    </div>
  );
}

export default ShopHomeDetails;
