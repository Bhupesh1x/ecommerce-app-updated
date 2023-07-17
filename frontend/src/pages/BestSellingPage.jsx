import React, { useEffect, useState } from "react";
import { productData } from "../static/data";
import ProductCard from "../components/product/ProductCard";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";

function BestSellingPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(data);
  }, []);

  return (
    <div>
      <Header />
      <Navbar activeNo={1} />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9  container px-6 my-4">
        {data &&
          data?.map((value, index) => (
            <ProductCard product={value} key={index} />
          ))}
      </div>
    </div>
  );
}

export default BestSellingPage;
