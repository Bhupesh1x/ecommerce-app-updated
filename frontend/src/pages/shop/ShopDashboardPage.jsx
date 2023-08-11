import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import DashboardMain from "../../components/shop/dashboard/DashboardMain";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={1} />
        <DashboardMain />
      </div>
    </div>
  );
}

export default ShopDashboardPage;
