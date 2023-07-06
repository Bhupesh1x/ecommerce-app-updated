import React from "react";
import { brandingData, categoriesData } from "../static/data";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const handleSubmit = (title) => {
    navigate(`/products?category=${title}`);
  };

  return (
    <>
      <div className="hidden container px-6 bg-white py-6 shadow-md lg:flex items-center justify-between rounded-md mt-10">
        {brandingData &&
          brandingData?.map((branding, index) => (
            <div key={index} className="flex items-center gap-3">
              {branding.icon}
              <div>
                <h4 className="font-semibold">{branding.title}</h4>
                <p>{branding.Description}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="bg-white p-6 container mt-12 rounded-md">
        <p className="text-xl font-semibold">Categories</p>
        <div className=" grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 xl:gap-9">
          {categoriesData &&
            categoriesData?.map((category) => (
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleSubmit(category.title)}
                key={category.id}
              >
                <p>{category.title}</p>
                <img
                  src={category.image_Url}
                  alt=""
                  className="w-24 object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
