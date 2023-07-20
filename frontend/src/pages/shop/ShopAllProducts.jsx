import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import AllShopProducts from "../../components/shop/dashboard/AllShopProducts";

function ShopAllProducts() {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={3} />
        <AllShopProducts />
      </div>
    </div>
  );
}

export default ShopAllProducts;
