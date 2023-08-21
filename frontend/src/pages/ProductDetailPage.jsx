import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import Header from "../components/Layout/Header";
import RelatedProduct from "../components/product/RelatedProduct";
import { serverUrl } from "../utils/uploadFile";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Layout/Loader";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import Ratings from "../components/ratings/Ratings";

const tabsInfo = [
  {
    id: 1,
    name: "Product Details",
  },
  {
    id: 2,
    name: "Product Reviews",
  },
  {
    id: 3,
    name: "Seller Information",
  },
];

function ProductDetailPage() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  function handleDecrementCount() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleIncrementCount() {
    setCount((prev) => prev + 1);
  }

  function handleAddToCart(product) {
    if (product.stock < count) {
      return toast.error("Product Stock Limited!");
    }
    dispatch(addToCart({ ...product, qty: count }));
  }

  async function getAllShopProductsOrEvents() {
    setIsLoading(true);
    const url = isEvent
      ? `${serverUrl}/event/get-event-by-id/${id}`
      : `${serverUrl}/product/get-product-by-id/${id}`;
    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      setProductDetails(result.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllShopProductsOrEvents();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetails) {
    return null;
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="container px-6 py-2">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Images Container */}
          <div className="w-full md:w-[50%]">
            <img
              src={productDetails?.images[selectedImage]}
              alt=""
              className="object-contain w-full max-w-[20rem]"
            />

            <div className="flex items-center gap-4 my-4 w-full">
              <div
                className={`${
                  selectedImage === 0 && "border border-gray-400"
                } cursor-pointer flex-1`}
              >
                <img
                  src={productDetails?.images[0]}
                  alt=""
                  onClick={() => setSelectedImage(0)}
                />
              </div>
              <div
                className={`${
                  selectedImage === 1 && "border border-gray-400"
                } cursor-pointer flex-1`}
              >
                <img
                  src={productDetails?.images[1]}
                  alt=""
                  onClick={() => setSelectedImage(1)}
                />
              </div>
            </div>
          </div>
          {/* More Info */}
          <div className="w-full md:w-[50%]">
            <p className="text-2xl font-semibold py-1">
              {productDetails?.name}
            </p>
            <p className="text-gray-500">{productDetails?.description}</p>
            <p className="my-2 font-semibold text-xl">
              Price :{" "}
              <span className="text-red-500 line-through">
                {productDetails?.originalPrice}$
              </span>{" "}
              {productDetails.discountPrice}$
            </p>
            <p className="text-red-600 my-2">
              Currently In Stock : {productDetails.stock}
            </p>
            <div className="flex items-center">
              <button
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={handleDecrementCount}
              >
                -
              </button>
              <p className="bg-gray-300 px-4 py-2">{count}</p>
              <button
                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={handleIncrementCount}
              >
                +
              </button>
            </div>
            <button
              className="px-6 py-2 bg-black rounded-lg text-white my-6 w-fit"
              onClick={() => handleAddToCart(productDetails)}
            >
              Add To Cart
            </button>

            <div className="flex items-center gap-3">
              <img
                src={productDetails?.shop?.avatar}
                alt=""
                className="h-[40px] w-[40px] rounded-full"
              />
              <div>
                <Link to={`/shop/${productDetails.shop._id}`}>
                  <p className="text-blue-400 font-semibold">
                    {productDetails.shop.name}
                  </p>
                </Link>
                <p className="text-base text-gray-500">(4 / 5) Ratings</p>
              </div>
            </div>
          </div>
        </div>

        <ProductDeailsInfo productDetails={productDetails} />
        {!isEvent && <RelatedProduct productDetails={productDetails} />}
      </div>
      <Footer />
    </>
  );
}

function ProductDeailsInfo({ productDetails }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full h-full bg-[#edeff8] px-6 py-3 min-h-[8rem] rounded-md shadow-md">
      <div className="flex items-center justify-between border-b border-gray-300">
        {tabsInfo.map((tab) => (
          <p
            key={tab?.id}
            className={`font-semibold text-base md:text-xl relative cursor-pointer  ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-400"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </p>
        ))}
      </div>

      <div>
        {activeTab === 1 ? (
          <>
            <p className="py-2 text-gray-500 whitespace-pre-line">
              {productDetails.description}
            </p>
          </>
        ) : null}
        {activeTab === 2 ? (
          <div className="hideScroll max-h-[50vh] overflow-y-scroll">
            {!productDetails?.reviews?.length ? (
              <p className="text-center mt-3">No Reviews Yet</p>
            ) : (
              productDetails?.reviews?.map((reviews, index) => (
                <div
                  key={index}
                  className="border border-gray-300 py-1 px-2 rounded-md my-2 hover:border-gray-400 cursor-pointer"
                >
                  <div className="flex items-center gap-3 my-2">
                    <img
                      src={reviews?.user?.avatar}
                      className="h-[40px] w-[40px] rounded-full"
                      alt=""
                    />
                    <p className="font-semibold">{reviews?.user?.name}</p>
                  </div>

                  <Ratings ratings={reviews?.rating} />
                  <p className="font-semibold my-2">{reviews.message}</p>
                </div>
              ))
            )}
          </div>
        ) : null}
        {activeTab === 3 ? (
          <div className="flex flex-col md:flex-row gap-4 py-4">
            <div className="w-[50%]">
              <div className="flex items-center gap-3">
                <img
                  src={productDetails?.shop?.avatar}
                  alt=""
                  className="h-[40px] w-[40px] rounded-full"
                />
                <div>
                  <Link to={`/shop/${productDetails.shop?._id}`}>
                    <p className="text-blue-400 font-semibold">
                      {productDetails.shop.name}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[50%] text-right font-bold">
              <p>Joined on: {productDetails.shop.createdAt.slice(0, 10)}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetailPage;
