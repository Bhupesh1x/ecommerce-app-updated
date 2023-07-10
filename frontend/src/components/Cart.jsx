import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const cartData = [
  {
    name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    description: "Iphone",
    price: 999,
  },
  {
    name: "Iphone 15 pro max 256 gb ssd and 8 gb ram silver colour",
    description: "Iphone 1",
    price: 899,
  },
  {
    name: "Iphone 15 pro max 256 gb ssd and 8 gb ram silver colour",
    description: "Iphone 1",
    price: 899,
  },
  {
    name: "Iphone 15 pro max 256 gb ssd and 8 gb ram silver colour",
    description: "Iphone 1",
    price: 899,
  },
];

function Cart({ setOpenCart }) {
  return (
    <div className="fixed top-0 right-0 bg-white w-[75%] md:w-[30%] shadow-md h-screen px-4 py-2 z-20">
      <div className="h-full relative">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold mb-4">Cart Details</h1>
          <RxCross1
            size={20}
            onClick={() => setOpenCart(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-3 h-full">
          {cartData.map((cart, i) => (
            <SingleCart key={i} data={cart} />
          ))}
        </div>

        <button className="absolute bottom-4 w-full bg-black text-white mt-4 px-8 py-3 rounded-lg">
          Checkout Now
        </button>
      </div>
    </div>
  );
}

function SingleCart({ data }) {
  const [count, setCount] = useState(1);

  function handleDecrementCount() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleIncrementCount() {
    setCount((prev) => prev + 1);
  }

  return (
    <div className="flex justify-between">
      <img
        src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
        alt=""
        className="h-20 w-20 object-cover rounded-md"
      />

      <div className="flex flex-col gap-1">
        <p className="font-semibold">{`${
          data.name.length > 25 ? `${data.name.substring(0, 25)}...` : data.name
        }`}</p>
        <p>Price : {data.price * count}$</p>
      </div>

      <div className="flex items-center">
        <button
          className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-3 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
          onClick={handleDecrementCount}
        >
          -
        </button>
        <p className="bg-gray-300 px-3 py-1">{count}</p>
        <button
          className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-3 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
          onClick={handleIncrementCount}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Cart;
