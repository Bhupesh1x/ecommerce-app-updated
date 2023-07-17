import React from "react";
import ShopHomeSidebar from "../components/shop/home/ShopHomeSidebar";
import ShopHomeDetails from "../components/shop/home/ShopHomeDetails.jsx";

function ShopHomePage() {
  return (
    <>
      <div className="container px-6 flex gap-8 py-6 lg:py-10">
        <ShopHomeSidebar />
        <ShopHomeDetails />
      </div>
    </>
  );
}

export default ShopHomePage;
