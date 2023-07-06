import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsModal from "./product/ProductDetailsModal";

function ProductCard({ product }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full  bg-white rounded-lg shadow-lg p-3 relative cursor-pointer">
      <img
        src={`${product.image_Url && product?.image_Url[0]?.url}`}
        alt=""
        className="w-full h-[150px] object-contain"
      />
      <h5 className="text-blue-400 font-semibold">{product.shop.name}</h5>

      <h4 className="py-3 font-[500]">
        {product.name.length > 40
          ? product.name.slice(0, 40) + "..."
          : product.name}
      </h4>

      <div className="flex">
        <AiFillStar className="mr-2 cursor-pointer" size={20} color="#F6BA00" />
        <AiFillStar className="mr-2 cursor-pointer" size={20} color="#F6BA00" />
        <AiFillStar className="mr-2 cursor-pointer" size={20} color="#F6BA00" />
        <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
        <AiOutlineStar
          size={20}
          className="mr-2 cursor-pointer"
          color="#F6BA00"
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2 items-center">
          <h5 className="font-semibold">
            {product.price === 0 ? product.price : product.discount_price}$
          </h5>
          <h4 className="-mt-3 text-red-400 line-through">
            {product.price ? product.price + " $" : null}
          </h4>
        </div>
        <span className="text-[#68d284]">{product.total_sell} sold</span>
      </div>

      {/* Side Options */}
      {click ? (
        <AiFillHeart
          className="absolute top-5 right-2 cursor-pointer"
          size={22}
          onClick={() => setClick((prev) => !prev)}
          title="Remove From Wishlist"
          color="red"
        />
      ) : (
        <AiOutlineHeart
          className="absolute top-5 right-2 cursor-pointer"
          size={22}
          onClick={() => setClick((prev) => !prev)}
          title="Add To Wishlist"
          color="#333"
        />
      )}
      <AiOutlineEye
        className="absolute top-14 right-2 cursor-pointer"
        size={22}
        onClick={() => setOpen((prev) => !prev)}
        title="Quick View"
        color="#333"
      />
      <AiOutlineHeart
        className="absolute top-24 right-2 cursor-pointer"
        size={25}
        // onClick={() => setClick((prev) => !prev)}
        title="Add To Cart"
        color="#444"
      />
      {open ? (
        <ProductDetailsModal setOpen={setOpen} product={product} />
      ) : null}
    </div>
  );
}

export default ProductCard;
