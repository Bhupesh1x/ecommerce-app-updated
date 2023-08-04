import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import AllShopOrders from "../../components/shop/dashboard/AllShopOrders.jsx";

function ShopAllOrders() {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={2} />
        <AllShopOrders />
      </div>
    </div>
  );
}

export default ShopAllOrders;
