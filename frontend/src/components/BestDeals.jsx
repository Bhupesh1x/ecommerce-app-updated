import React, { useEffect, useState } from "react";
import { productData } from "../static/data";
import ProductCard from "./ProductCard.jsx";

function BestDeals() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const allProductsData = productData ? [...productData] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [productData]);

  return (
    <div className="my-12 container px-6">
      <h1 className="text-xl font-semibold pb-4">Best Deals</h1>

      <div className=" grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9">
        {data &&
          data?.map((value, index) => (
            <ProductCard product={value} key={index} />
          ))}
      </div>
    </div>
  );
}

export default BestDeals;
