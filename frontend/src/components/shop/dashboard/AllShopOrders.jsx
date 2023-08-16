import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../utils/uploadFile";
import axios from "axios";
import { getCurrUser } from "../../../utils/getUser";
import { toast } from "react-hot-toast";
import { DataGrid } from "@material-ui/data-grid";
import { shopOrdersColumns } from "./DashboardMain";

function AllShopOrders({ isEvent }) {
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

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 mx-auto">
      <DataGrid
        rows={row}
        columns={shopOrdersColumns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

export default AllShopOrders;
