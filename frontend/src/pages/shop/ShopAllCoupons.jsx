import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import AllCoupons from "../../components/shop/coupons/AllCoupons.jsx";

function ShopAllCoupons() {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={7} />
        <AllCoupons />
      </div>
    </div>
  );
}

export default ShopAllCoupons;
