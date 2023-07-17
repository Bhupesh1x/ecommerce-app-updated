import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import Footer from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import Header from "../components/Layout/Header";
import RelatedProduct from "../components/product/RelatedProduct";

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

  function handleDecrementCount() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleIncrementCount() {
    setCount((prev) => prev + 1);
  }

  useEffect(() => {
    const data = productData.filter((data) => data.id === parseInt(id));
    setProductDetails(data[0]);
  }, [id]);

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
            <img src={productDetails?.image_Url[selectedImage].url} alt="" />

            <div className="flex items-center gap-4 my-4 w-full">
              <div
                className={`${
                  selectedImage === 0 && "border border-gray-400"
                } cursor-pointer flex-1`}
              >
                <img
                  src={productDetails?.image_Url[0].url}
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
                  src={productDetails?.image_Url[1].url}
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
            <p className="my-3 font-semibold text-xl">
              Price : $ {productDetails.discount_price}
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
            <button className="px-6 py-2 bg-black rounded-lg text-white my-6 w-fit">
              Add To Cart
            </button>

            <div className="flex items-center gap-3">
              <img
                src={productDetails.shop.shop_avatar.url}
                alt=""
                className="h-[40px] w-[40px] rounded-full"
              />
              <div>
                <p className="text-blue-400 font-semibold">
                  {productDetails.shop.name}
                </p>
                <p className="text-base text-gray-500">
                  ({productDetails.shop.ratings}) Ratings
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-black rounded-lg text-white my-6">
              Send Message
            </button>
          </div>
        </div>

        <ProductDeailsInfo productDetails={productDetails} />
        <RelatedProduct productDetails={productDetails} />
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
            key={tab.id}
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
            <p className="py-2 text-gray-500">
              Product details are a crucial part of any eCommerce website or
              online marketplace. These details help the potential customers to
              make an informed decision about the product they are interested in
              buying. A well-written product description can also be a powerful
              marketing tool that can help to increase sales. Product details
              typically include information about the product's features,
              specifications, dimensions, weight, materials, and other relevant
              information that can help language, and be honest and transparent
              about the product's features and limitations.
            </p>
            <p className="py-2 text-gray-500">
              customers to understand the product better. The product details
              section should also include high-quality images and videos of the
              product, as well as customer reviews and ratings. When writing
              product details, it is essential to keep the target audience in
              mind. The language used should be clear and easy to understand,
              and technical terms should be explained in simple language. The
              tone of the product details should be persuasive, highlighting the
              unique features of the
            </p>
            <p className="py-2 text-gray-500">
              customers to understand the product better. The product details
              section should also include high-quality images and videos of the
              product, as well as customer reviews and ratings. When writing
              product details, it is essential to keep the target audience in
              mind. The language used should be clear and easy to understand,
              and technical terms should be explained in simple language. The
              tone of the product details should be persuasive, highlighting the
              unique features of the
            </p>
          </>
        ) : null}
        {activeTab === 2 ? (
          <>
            <p className="text-center py-2">No Reviews yet!</p>
          </>
        ) : null}
        {activeTab === 3 ? (
          <div className="flex flex-col md:flex-row gap-4 py-4">
            <div className="w-[50%]">
              <div className="flex items-center gap-3">
                <img
                  src={productDetails.shop.shop_avatar.url}
                  alt=""
                  className="h-[40px] w-[40px] rounded-full"
                />
                <div>
                  <p className="text-blue-400 font-semibold">
                    {productDetails.shop.name}
                  </p>
                  <p className="text-base text-gray-500">
                    ({productDetails.shop.ratings}) Ratings
                  </p>
                </div>
              </div>
              <p className="py-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
                possimus quae sit illo quia, aspernatur inventore nulla nobis
                recusandae deserunt obcaecati libero odio aliquam?
              </p>
            </div>
            <div className="space-y-3 w-[50%] text-right font-bold">
              <p>Joined on: 29,Jully,2022</p>
              <p>Totan Products: 1221</p>
              <p>Total Reviews: 29</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetailPage;
