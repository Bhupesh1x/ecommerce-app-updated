import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import ProductCard from "../components/product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../utils/uploadFile";
import { getAllProducts } from "../redux/allProductsSlice";
import { toast } from "react-hot-toast";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const productData = useSelector((state) => state.allProducts.value);
  const dispatch = useDispatch();

  async function getAllProductsData() {
    try {
      const result = await axios.get(`${serverUrl}/product/all-products`, {
        withCredentials: true,
      });
      dispatch(getAllProducts(result.data));
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    if (!productData.length) {
      getAllProductsData();
    }
  }, [productData.length]);

  useEffect(() => {
    const allProductsData = productData ? [...productData] : [];
    if (categoryData === null) {
      const data =
        allProductsData &&
        allProductsData.sort((a, b) => a.sold_out - b.sold_out);
      setData(data);
    } else {
      const data =
        allProductsData &&
        allProductsData.filter((data) => data.category === categoryData);
      setData(data);
    }
  }, [categoryData, productData]);

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
