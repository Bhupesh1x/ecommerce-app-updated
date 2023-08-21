import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/uploadFile";
import Modal from "../modal/Modal";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { getCurrUser } from "../../utils/getUser";

const orderStatus = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
];

function OrderDetails({ order, isUser, id }) {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReviewed, setIsReviewed] = useState(false);
  const navigate = useNavigate();
  const currUser = getCurrUser();

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = openModal ? "hidden" : "auto";
  }, [openModal]);

  const data = {
    status: status ? status : order.status,
  };

  async function handleSubmitStatus() {
    const notification = () => toast("Updating order status...");
    try {
      await axios.put(`${serverUrl}/order/update-order-status/${id}`, data, {
        withCredentials: true,
      });
      toast.success("Updated order status Successfully", {
        id: notification,
      });
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  function handleOpenReviewModel(order) {
    setOpenModal(true);
    setSelectedOrder(order);
  }

  async function handleSubmitReview() {
    const notification = () => toast("Adding you review...");
    try {
      const data = {
        user: currUser,
        rating,
        message: comment,
        productId: selectedOrder._id,
        orderId: id,
      };

      const result = await axios.put(
        `${serverUrl}/product/create-product-review`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data, {
        id: notification,
      });
      setIsReviewed(true);
      setOpenModal(false);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  async function handleOrderReturn() {
    const notification = () => toast("Updating request for return order...");
    try {
      const data = {
        status: "Processing return",
      };

      const result = await axios.put(
        `${serverUrl}/order/return-order/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data, {
        id: notification,
      });
      setIsReviewed(true);
      setOpenModal(false);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  return (
    <>
      <div className="container px-6 gap-8 py-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
          </div>
          {!isUser ? (
            <Link to="/dashboard-orders">
              <div
                className={`px-4 py-2 !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
              >
                Order List
              </div>
            </Link>
          ) : null}
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
            className="flex items-center w-full justify-between border-b border-gray-400 pb-2"
          >
            <div className="flex items-center">
              <img
                src={cartInfo?.images[0]}
                alt=""
                className="w-[80px] h-[80px]"
              />

              <div className="ml-3">
                <p className="text-lg font-semibold">{cartInfo?.name}</p>
                <p className="text-gray-600">
                  US${cartInfo?.discountPrice} x {cartInfo?.qty}
                </p>
              </div>
            </div>
            {order.status === "Delivered" && !cartInfo?.isReviewed && (
              <button
                disabled={isReviewed}
                className="w-fit bg-black text-white mt-4 px-8 py-3 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => handleOpenReviewModel(cartInfo)}
              >
                Write a review
              </button>
            )}
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
            <h4 className="pt-3 text-lg font-[600]">Order Info:</h4>
            <h4 className="pt-3">
              Order Status: <strong>{order?.status}</strong>
            </h4>
          </div>
        </div>
        {isUser && order.status === "Delivered" && (
          <button
            className="bg-black text-white my-4 px-8 py-3 rounded-lg w-fit text-center"
            onClick={handleOrderReturn}
          >
            Return Order
          </button>
        )}

        {!isUser ? (
          <>
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
              className={`px-4 py-2 !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-lg mt-4 cursor-pointer w-fit`}
              onClick={handleSubmitStatus}
            >
              Update Status
            </div>
          </>
        ) : null}
      </div>
      {openModal && (
        <Modal>
          <RxCross1
            size={20}
            onClick={() => setOpenModal(false)}
            className="cursor-pointer float-right"
          />
          <>
            <h1 className="text-center text-2xl font-semibold my-4">
              Write a review
            </h1>

            <div className="flex items-center">
              <img
                src={selectedOrder?.images?.[0]}
                alt=""
                className="w-[86px] h-[86px]"
              />
              <p>{selectedOrder?.name}</p>
            </div>

            <p className="mt-4 mb-2 text-xl font-semibold">
              Give a rating <span className="ml-2 text-red-500">*</span>
            </p>

            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((value) =>
                rating >= value ? (
                  <AiFillStar
                    key={value}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(value)}
                  />
                ) : (
                  <AiOutlineStar
                    key={value}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(value)}
                  />
                )
              )}
            </div>

            <p className="mt-4 mb-2 text-xl font-semibold">
              Write a comment (optional)
            </p>

            <textarea
              name="comment"
              id=""
              cols="20"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your product? write your expresion about it!"
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
            ></textarea>

            <button
              className="bg-black text-white my-4 px-8 py-3 rounded-lg w-full"
              onClick={handleSubmitReview}
            >
              Submit
            </button>
          </>
        </Modal>
      )}
    </>
  );
}

export default OrderDetails;
