import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function FeaturedProducts() {
  const productData = useSelector((state) => state.allProducts.value);
  return (
    <div className="my-12 container px-6">
      <h1 className="text-xl font-semibold pb-4">Featured Products</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9">
        {productData &&
          productData?.map((value, index) => (
            <ProductCard product={value} key={index} />
          ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
