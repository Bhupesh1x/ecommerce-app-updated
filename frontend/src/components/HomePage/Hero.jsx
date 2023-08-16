import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
      className="min-h-[90vh] md:min-h-[83vh] bg-no-repeat w-full relative bg-cover"
    >
      <div className="container px-6">
        <div className="absolute top-[20%] md:top-[25%]">
          <h1 className="text-5xl">
            Best Collection For
            <br />
            Home Decoration
          </h1>
          <p className="pt-5 text-[16px]  font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
            quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
            <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
          </p>

          <Link to="/products">
            <button className="bg-black text-white mt-4 px-8  py-3  rounded-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
