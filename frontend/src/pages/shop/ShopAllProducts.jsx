import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import AllShopProductsOrEvents from "../../components/shop/dashboard/AllShopProductsOrEvents";

function ShopAllProducts({ isEvent }) {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={isEvent ? 5 : 3} />
        <AllShopProductsOrEvents isEvent={isEvent} />
      </div>
    </div>
  );
}

export default ShopAllProducts;
