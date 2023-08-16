import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { serverUrl } from "../../../utils/uploadFile";
import { getCurrUser } from "../../../utils/getUser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsOfShop } from "../../../redux/shopProductSlice";
import { toast } from "react-hot-toast";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

export const shopOrdersColumns = [
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

function DashboardMain() {
  const user = getCurrUser();
  const dispatch = useDispatch();
  const shopAllProducts = useSelector((state) => state.productShop.value);
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  async function getAllShopProducts() {
    const url = `${serverUrl}/product/get-products-by-shop-id/${user._id}`;

    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      dispatch(getAllProductsOfShop(result.data));
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getAllShopProducts();
  }, []);

  async function getAllShopOrders() {
    const url = `${serverUrl}/order/get-all-seller-orders/${user._id}`;

    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      const orderData =
        result.data &&
        result.data.filter((item) => item.status === "Delivered");
      setOrders(result.data);
      setDeliveredOrders(orderData);
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
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  const availableBalance = useMemo(() => {
    const totalEarningWithoutTax = deliveredOrders
      ? deliveredOrders.reduce((acc, item) => acc + item.totalPrice, 0)
      : 0;

    const serviceCharge = totalEarningWithoutTax
      ? totalEarningWithoutTax * 0.1
      : 0;
    return (totalEarningWithoutTax - serviceCharge).toFixed(2) || 0;
  }, [deliveredOrders]);

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4 mx-auto">
      <h1 className="text-xl font-semibold mb-4">Overview</h1>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2">
        <div className="bg-white border border-gray-400 hover:border-gray-500 shadow-lg rounded-md min-h-[25vh] w-full lg:w-[32%] px-3 py-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3 className={`text-lg leading-5 font-[400] text-[#00000085]`}>
              Account Balance
              <span className="text-base">(with 10% service charge)</span>
            </h3>
          </div>
          <p className="text-2xl font-semibold my-4 ml-2">
            ${availableBalance ?? 0}
          </p>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="bg-white border border-gray-400 hover:border-gray-500 shadow-lg rounded-md min-h-[25vh] w-full lg:w-[32%] px-3 py-4">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3 className={`text-lg leading-5 font-[400] text-[#00000085]`}>
              All Orders
            </h3>
          </div>
          <p className="text-2xl font-semibold my-4 ml-2">
            {orders && orders.length}
          </p>
          <Link to="/dashboard-orders">
            <h5 className="pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="bg-white border border-gray-400 hover:border-gray-500 shadow-lg rounded-md min-h-[25vh] w-full lg:w-[32%] px-3 py-4">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3 className={`text-lg leading-5 font-[400] text-[#00000085]`}>
              All Products
            </h3>
          </div>
          <p className="text-2xl font-semibold my-4 ml-2">
            {shopAllProducts && shopAllProducts.length}
          </p>
          <Link to="/dashboard-products">
            <h5 className="pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>

      <h1 className="text-xl font-semibold my-4">Latest Orders</h1>

      <div className="bg-white border border-gray-400 hover:border-gray-500 shadow-lg rounded-md min-h-[40vh] w-full px-3 py-4 mb-4">
        <DataGrid
          rows={row}
          columns={shopOrdersColumns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
}

export default DashboardMain;
