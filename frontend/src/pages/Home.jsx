import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BestDeals from "../components/BestDeals";
import FeaturedProducts from "../components/FeaturedProducts";
import Events from "../components/Events";
import Sponsored from "../components/Sponsored";
import Footer from "../components/Footer";

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
