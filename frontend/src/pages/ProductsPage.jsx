import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import ProductCard from "../components/product/ProductCard";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const data =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(data);
    } else {
      const data =
        productData &&
        productData.filter((data) => data.category === categoryData);
      setData(data);
    }
  }, [categoryData]);

  return (
    <div>
      <Header />
      <Navbar activeNo={2} />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9  container px-6 my-4">
        {data &&
          data?.map((value, index) => (
            <ProductCard product={value} key={index} />
          ))}
      </div>
      {data && data.length === 0 ? (
        <h1 className="text-center w-full pb-[100px] text-[20px]">
          No products Found!
        </h1>
      ) : null}
    </div>
  );
}

export default ProductsPage;
