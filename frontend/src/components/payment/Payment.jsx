import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getCurrUser } from "../../utils/getUser";
import { toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../utils/uploadFile";
import { useSelector } from "react-redux";

const striptInputStyles = {
  style: {
    base: {
      fontSize: "19px",
      lineHeight: 1.5,
      color: "#444",
    },
    empty: {
      color: "#3a120a",
      backgroundColor: "transparent",
      "::placeholder": {
        color: "#444",
      },
    },
  },
};

const Payment = () => {
  const [orderData, setOrderData] = useState({});
  const currUser = getCurrUser();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cartData = useSelector((state) => state.cart.value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cartData?.length) {
      navigate("/");
    }
  }, [navigate, cartData?.length]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("eshopLatestOrder"));
    setOrderData(data);
  }, []);

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: cartData,
    shippingAddress: orderData?.shippingAddress,
    user: currUser && currUser,
    totalPrice: orderData?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${serverUrl}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setIsLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(
              `${serverUrl}/order/create-order`,
              { ...order, paymentInfo },
              config
            )
            .then((res) => {
              toast.success("Order successful!");
              navigate("/order/success");
              setIsLoading(false);
            });
        }
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  async function cashOnDeliveryHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(
        `${serverUrl}/order/create-order`,
        { ...order, paymentInfo },
        config
      )
      .then((res) => {
        toast.success("Order Placed successful!");
        navigate("/order/success");
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <PaymentInfo
            currUser={currUser}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  currUser,
  paymentHandler,
  cashOnDeliveryHandler,
  isLoading,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3 gap-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name on card</label>
                  <input
                    required
                    placeholder={currUser && currUser?.name}
                    className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300 placeholder:text-[#444] text-[#444]"
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
                    options={striptInputStyles}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3 gap-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300 h-[35px]"
                    options={striptInputStyles}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300 h-[35px]"
                    options={striptInputStyles}
                  />
                </div>
              </div>
              <button
                disabled={isLoading}
                className="bg-black text-white my-4 px-8  py-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isLoading ? "Processing" : "Submit"}
              </button>
            </form>
          </div>
        ) : null}
      </div>

      <br />

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* pay with card */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <button
                disabled={isLoading}
                className="bg-black text-white mt-4 px-8  py-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isLoading ? "Processing" : "Submit"}
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shippingData = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shippingData}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? `$ ${orderData?.discountPrice}` : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
