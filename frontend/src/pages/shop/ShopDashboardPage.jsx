import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar.jsx";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6 lg:py-10">
        <DashboardSidebar active={1} />
      </div>
    </div>
  );
}

export default ShopDashboardPage;
