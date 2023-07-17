import React from "react";
import Events from "../components/HomePage/Events";
import FeaturedProducts from "../components/product/FeaturedProducts";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Hero from "../components/HomePage/Hero";
import Categories from "../components/HomePage/Categories";
import BestDeals from "../components/HomePage/BestDeals";
import Sponsored from "../components/HomePage/Sponsored";

function Home() {
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
