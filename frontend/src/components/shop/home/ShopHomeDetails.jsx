import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ProductCard from "../../product/ProductCard";
import { serverUrl } from "../../../utils/uploadFile";
import { getAllProductsOfShop } from "../../../redux/shopProductSlice";
import Ratings from "../../ratings/Ratings";

const sidebarData = [
  {
    id: 1,
    title: "Shop Products",
  },
  {
    id: 2,
    title: "Shop Reviews",
  },
];

function ShopHomeDetails() {
  const [active, setActive] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const shopAllProducts = useSelector((state) => state.productShop.value);

  async function getAllShopProducts() {
    const url = `${serverUrl}/product/get-products-by-shop-id/${id}`;

    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });
      dispatch(getAllProductsOfShop(result.data));
    } catch (error) {
      toast.error(error?.response?.statusText);
    }
  }

  useEffect(() => {
    getAllShopProducts();
  }, []);

  const allReviews = useMemo(() => {
    return shopAllProducts?.map((products) => products?.reviews).flat();
  }, [shopAllProducts]);

  return (
    <div className="w-[80%] bg-white shadow-md border border-gray-300 rounded-md p-4">
      <div className="flex items-center gap-4">
        {sidebarData.map(({ id, title }) => (
          <p
            className={`text-base md:text-lg font-semibold cursor-pointer ${
              active === id && "text-red-500"
            }`}
            key={id}
            onClick={() => setActive(id)}
          >
            {title}
          </p>
        ))}
      </div>
      {active === 1 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9 my-4">
          {shopAllProducts &&
            shopAllProducts?.map((value, index) => (
              <ProductCard product={value} key={index} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="hideScroll max-h-[80vh] overflow-y-scroll">
          {allReviews?.length === 0 ? (
            <p className="text-center mt-3">No Reviews Yet</p>
          ) : (
            allReviews?.map((reviews, index) => (
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
      )}
    </div>
  );
}

export default ShopHomeDetails;
