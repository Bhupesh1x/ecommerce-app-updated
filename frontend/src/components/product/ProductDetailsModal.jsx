import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

function ProductDetailsModal({ setOpen, product }) {
  const [count, setCount] = useState(1);

  function handleDecrementCount() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleIncrementCount() {
    setCount((prev) => prev + 1);
  }

  return (
    <div className="fixed h-screen w-full top-0 left-0 flex items-center justify-center z-50">
      <div className="bg-[#fdfdfc] h-[90vh] w-[90vw] md:h-[75vh] md:w-[70vw] rounded-md shadow-lg py-3 px-6 relative border border-gray-200 hover:border-gray-300 overflow-y-scroll cursor-default">
        <RxCross1
          size={20}
          onClick={() => setOpen(false)}
          className="absolute top-2 right-4 cursor-pointer"
        />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[50%]">
            <img
              src={product.image_Url[0]?.url}
              alt=""
              className="h-[60%] w-[60%] mx-auto"
            />
            <div className="flex items-center gap-3">
              <img
                src={product.shop.shop_avatar.url}
                alt=""
                className="h-[40px] w-[40px] rounded-full"
              />
              <div>
                <p className="text-blue-400 font-semibold">
                  {product.shop.name}
                </p>
                <p className="text-base text-gray-500">
                  ({product.shop.ratings}) Ratings
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-black rounded-lg text-white my-6">
              Send Message
            </button>

            <p className="text-red-600">({product.total_sell}) Sold out</p>
          </div>

          <div className="w-full md:w-[50%]">
            <h1 className="text-xl font-semibold my-3">{product.name}</h1>
            <p className="text-base text-gray-500">{product.description}</p>

            <p className="my-3 font-semibold text-xl">
              Price : $ {product.discount_price}
            </p>
            <div className="flex items-center">
              <button
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={handleDecrementCount}
              >
                -
              </button>
              <p className="bg-gray-300 px-4 py-2">{count}</p>
              <button
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={handleIncrementCount}
              >
                +
              </button>
            </div>
            <button className="px-6 py-2 bg-black rounded-lg text-white my-6 w-fit">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
