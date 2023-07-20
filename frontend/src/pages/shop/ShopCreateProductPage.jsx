import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import CreateProductOrEvent from "../../components/product/CreateProductOrEvent";

function ShopCreateProductPage({ isEvent }) {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={isEvent ? 6 : 4} />
        <CreateProductOrEvent isEvent={isEvent} />
      </div>
    </div>
  );
}

export default ShopCreateProductPage;
