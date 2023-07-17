import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productData } from "../../static/data";

function RelatedProduct({ productDetails }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = productData.filter(
      (product) => product.category === productDetails.category
    );
    setData(data);
  }, [productData]);

  return (
    <div className="my-12 container px-6">
      {data && (
        <>
          <h1 className="text-xl font-semibold pb-4">Related Product</h1>

          <div className=" grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9">
            {data?.map((value, index) => (
              <ProductCard product={value} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RelatedProduct;
