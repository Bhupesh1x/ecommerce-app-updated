import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import Modal from "../modal/Modal";
import { toast } from "react-hot-toast";

function ProductDetailsModal({ setOpen, product }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  function handleDecrementCount() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleIncrementCount() {
    setCount((prev) => prev + 1);
  }

  function handleAddToCart(product) {
    if (product.stock < count) {
      return toast.error("Product Stock Limited!");
    }
    dispatch(addToCart({ ...product, qty: count }));
  }

  return (
    <Modal isLarge>
      <RxCross1
        size={20}
        onClick={() => setOpen(false)}
        className="absolute top-2 right-4 cursor-pointer"
      />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[50%]">
          <img
            src={product.images[0]}
            alt=""
            className="h-[60%] w-[60%] mx-auto"
          />
          <div className="flex items-center gap-3">
            <img
              src={product?.shop?.avatar}
              alt=""
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <Link to={`/shop/${product.shop._id}`}>
                <p className="text-blue-400 font-semibold">
                  {product.shop.name}
                </p>
              </Link>
              <p className="text-base text-gray-500">
                ({product.shop.ratings}) Ratings
              </p>
            </div>
          </div>

          <p className="text-red-600">({product.sold_out}) Sold out</p>
        </div>

        <div className="w-full md:w-[50%]">
          <h1 className="text-xl font-semibold my-3">{product.name}</h1>
          <p className="text-base text-gray-500">{product.description}</p>

          <p className="my-2 font-semibold text-xl">
            Price :{" "}
            <span className="text-red-500 line-through">
              {product?.originalPrice}$
            </span>{" "}
            {product.discountPrice}$
          </p>
          <p className="text-red-600 my-2">
            Currently In Stock : {product.stock}
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
          <button
            onClick={() => handleAddToCart(product)}
            className="px-6 py-2 bg-black rounded-lg text-white my-6 w-fit"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailsModal;
