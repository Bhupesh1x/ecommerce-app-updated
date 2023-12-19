import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsModal from "./ProductDetailsModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Ratings from "../ratings/Ratings";

function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div
      className="w-full  bg-white rounded-lg shadow-lg p-3 relative cursor-pointer border border-gray-300 hover:border-gray-400"
      data-cy="product-card"
    >
      <Link to={`/product/${product._id}`}>
        <img
          src={`${product.images && product?.images[0]}`}
          alt=""
          className="w-full h-[150px] object-contain cursor-pointer"
          data-cy="product-card-image"
        />
      </Link>
      <Link to={`/shop/${product.shop._id}`}>
        <h5
          className="text-blue-400 font-semibold"
          data-cy="product-card-shop-name"
        >
          {product.shop.name}
        </h5>
      </Link>

      <Link to={`/product/${product._id}`}>
        <h4
          className="py-3 font-[500] cursor-pointer"
          data-cy="product-card-name"
        >
          {product.name.length > 40
            ? product.name.slice(0, 40) + "..."
            : product.name}
        </h4>
      </Link>

      <Ratings ratings={product?.ratings} />

      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2 items-center">
          <h5 className="font-semibold" data-cy="product-card-price">
            {product.originalPrice === 0
              ? product.originalPrice
              : product.discountPrice}
            $
          </h5>
          <h4 className="-mt-3 text-red-400 line-through">
            {product.originalPrice ? product.originalPrice + " $" : null}
          </h4>
        </div>
        <span className="text-[#68d284]">{product.sold_out} sold</span>
      </div>

      {/* Side Options */}
      <AiOutlineEye
        className="absolute top-4 right-2 cursor-pointer"
        size={22}
        onClick={() => setOpen((prev) => !prev)}
        title="Quick View"
        color="#333"
        data-cy="product-card-quick-view"
      />
      <AiOutlineShoppingCart
        className="absolute top-14 right-2 cursor-pointer"
        size={25}
        onClick={() => handleAddToCart(product)}
        title="Add To Cart"
        color="#444"
        data-cy="product-card-addto-cart"
      />
      {open ? (
        <ProductDetailsModal setOpen={setOpen} product={product} />
      ) : null}
    </div>
  );
}

export default ProductCard;
