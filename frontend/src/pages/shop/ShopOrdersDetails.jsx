import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import Footer from "../../components/Layout/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { serverUrl } from "../../utils/uploadFile";
import { BsFillBagFill } from "react-icons/bs";

const orderStatus = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
];

function ShopOrdersDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");

  async function getOrderDetails() {
    const url = `${serverUrl}/order/get-order-details/${id}`;
    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      setOrder(result.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (!order) {
    return null;
  }

  return (
    <>
      <DashboardHeader />
      <div className="container px-6 gap-8 py-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
          </div>
          <Link to="/dashboard-orders">
            <div
              className={`px-4 py-2 !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
            >
              Order List
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between w-full my-4">
          <p className="text-gray-600">
            Order ID: <span>#{order?._id?.slice(0, 8)}</span>
          </p>
          <p className="text-gray-600">
            Placed On: <span>{order?.createdAt?.slice(0, 10)}</span>
          </p>
        </div>

        {order?.cart?.map((cartInfo) => (
          <div
            key={cartInfo._id}
            className="flex items-center border-b border-gray-400"
          >
            <img
              src={cartInfo?.images[0]}
              alt=""
              className="w-[80px] h-[80px]"
            />

            <div>
              <p className="text-lg font-semibold">{cartInfo?.name}</p>
              <p className="text-gray-600">
                US${cartInfo?.discountPrice} x {cartInfo?.qty}
              </p>
            </div>
          </div>
        ))}

        <p className="text-right my-4 text-lg">
          Total Price: <strong>${order?.totalPrice}</strong>
        </p>

        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-2">
            <h4 className="pt-3 text-lg font-[600]">Shipping Address:</h4>
            <h4 className="pt-3">
              {order?.shippingAddress?.address1 +
                " " +
                order?.shippingAddress?.address2}
            </h4>
            <h4 className="">{order?.shippingAddress?.city || "-"}</h4>
            <h4 className="">{order?.shippingAddress?.country || "-"}</h4>
            <h4 className="">{order?.user?.phoneNumber || "-"}</h4>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="pt-3 text-lg font-[600]">Payment Info:</h4>
            <h4 className="pt-3">
              Status: <strong>{order?.paymentInfo?.status}</strong>
            </h4>
          </div>
        </div>
        <h4 className="pt-3 text-lg font-[600]">Order Status:</h4>
        {order?.status !== "Processing refund" &&
          order?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-400 rounded-md w-fit px-2 py-2 outline-none focus:border-blue-500 transition-all duration-300"
            >
              {orderStatus
                .slice(orderStatus.indexOf(order?.status))
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}

        <div
          className={`px-4 py-2 !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-lg mt-4 w-fit`}
        >
          Update Status
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShopOrdersDetails;
