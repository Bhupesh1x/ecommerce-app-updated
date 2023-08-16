import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

function Ratings({ ratings }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((rating) => (
        <div key={rating}>
          {rating <= ratings ? (
            <AiFillStar
              key={rating}
              size={20}
              color="#f6b100"
              className="mr-2 cursor-pointer"
            />
          ) : rating === Math.ceil(ratings) && !Number.isInteger(ratings) ? (
            <BsStarHalf
              key={rating}
              size={17}
              color="#f6ba00"
              className="mr-2 cursor-pointer"
            />
          ) : (
            <AiOutlineStar
              key={rating}
              size={20}
              color="#f6ba00"
              className="mr-2 cursor-pointer"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Ratings;
