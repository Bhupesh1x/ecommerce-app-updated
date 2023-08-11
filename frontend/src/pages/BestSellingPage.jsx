import React, { useEffect, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../utils/uploadFile";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllProducts } from "../redux/allProductsSlice";

function BestSellingPage() {
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
      toast.error(error?.response?.statusText);
    }
  }

  useEffect(() => {
    if (!productData.length) {
      getAllProductsData();
    }
  }, [productData.length]);

  useEffect(() => {
    const allProductsData = productData ? [...productData] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [productData]);

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
