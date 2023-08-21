import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { getCurrUser } from "../utils/getUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const currUser = getCurrUser();
  const navigate = useNavigate();

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
    getAllProductsData();
  }, []);

  async function logoutHandler(isSeller) {
    const url = isSeller
      ? `${serverUrl}/shop/logout`
      : `${serverUrl}/user/logout-user`;
    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });

      localStorage.clear("ecommerceUser");
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${serverUrl}/payment/stripe-api-key`, {
        withCredentials: true,
      });
      setStripeApiKey(data.striptApiKey);
    } catch (error) {
      if (error?.response?.data === "Please login to continue") {
        const isSeller = currUser?.role === "Seller";
        await logoutHandler(isSeller);
      } else {
        toast.error(error?.response?.data);
      }
    }
  }

  useEffect(() => {
    if (stripeApiKey === "" && currUser) {
      getStripeApiKey();
    }
  }, [currUser, stripeApiKey]);

  return (
    <>
      <Header />
      <Navbar activeNo={0} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </>
  );
}

export default Home;
