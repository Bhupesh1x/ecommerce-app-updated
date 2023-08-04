import React, { useEffect, useMemo, useState } from "react";
import { serverUrl } from "../../../utils/uploadFile";
import axios from "axios";
import { getCurrUser } from "../../../utils/getUser";
import { toast } from "react-hot-toast";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

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

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },

      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/order/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
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
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

export default AllShopOrders;
