import React from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import CreateProduct from "../../components/product/CreateProduct";

function ShopCreateProductPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="container px-6 flex gap-8 py-6">
        <DashboardSidebar active={4} />
        <CreateProduct />
      </div>
    </div>
  );
}

export default ShopCreateProductPage;
