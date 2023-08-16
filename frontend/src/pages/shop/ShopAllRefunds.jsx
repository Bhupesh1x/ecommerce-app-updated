import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { getCurrUser } from "../../utils/getUser";
import { serverUrl } from "../../utils/uploadFile";
import axios from "axios";
import { toast } from "react-hot-toast";
import DashboardSidebar from "../../components/shop/dashboard/DashboardSidebar";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import { shopOrdersColumns } from "../../components/shop/dashboard/DashboardMain";

const ShopAllRefunds = () => {
  const user = getCurrUser();
  const [orders, setOrders] = useState([]);

  async function getAllShopOrders() {
    const url = `${serverUrl}/order/get-all-seller-orders/${user._id}`;

    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      setOrders(result.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getAllShopOrders();
  }, []);

  const refundOrders = useMemo(() => {
    const data =
      orders &&
      orders.filter(
        (item) =>
          item.status === "Processing return" ||
          item.status === "Refund Success"
      );
    return data;
  }, [orders]);

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      <div>
        <DashboardHeader />
        <div className="container px-6 flex gap-8 py-6">
          <DashboardSidebar active={8} />
          <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 mx-auto">
            <DataGrid
              rows={row}
              columns={shopOrdersColumns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAllRefunds;
