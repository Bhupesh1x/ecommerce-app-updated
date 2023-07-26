import React, { useEffect } from "react";
import Events from "../components/HomePage/Events";
import FeaturedProducts from "../components/product/FeaturedProducts";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Hero from "../components/HomePage/Hero";
import Categories from "../components/HomePage/Categories";
import BestDeals from "../components/HomePage/BestDeals";
import Sponsored from "../components/HomePage/Sponsored";
import axios from "axios";
import { serverUrl } from "../utils/uploadFile";
import { toast } from "react-hot-toast";
import { getAllProducts } from "../redux/allProductsSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.allProducts.value);

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

  return (
    <div>
      <Header />
      <Navbar activeNo={0} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default Home;
