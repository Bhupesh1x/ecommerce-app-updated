import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/shop/dashboard/DashboardHeader";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { serverUrl } from "../../utils/uploadFile";
import OrderDetails from "../../components/order/OrderDetails.jsx";

function OrdersDetailsPage({ isUser }) {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

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
      {isUser ? <Header /> : <DashboardHeader />}
      <OrderDetails order={order} isUser={isUser} id={id} />
      <Footer />
    </>
  );
}

export default OrdersDetailsPage;
