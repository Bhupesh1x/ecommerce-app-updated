import React, { useMemo } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

function Cart({ setOpenCart }) {
  const cartData = useSelector((state) => state.cart.value);

  const totalPrice = useMemo(() => {
    const price = cartData.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
    return price;
  }, [cartData]);

  return (
    <div className="fixed top-0 right-0 bg-white w-[70%] md:w-[30%] lg:w-[25%] xl:w-[22%] shadow-md h-screen px-4 py-2 z-20">
      <div className="h-full relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Cart Details</h1>
          <RxCross1
            size={20}
            onClick={() => setOpenCart(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-3 h-full">
          {cartData.length ? (
            cartData.map((cart, i) => <SingleCart key={i} cart={cart} />)
          ) : (
            <p>Cart is empty Add product to cart!</p>
          )}
        </div>

        <Link to="/checkout">
          <button
            disabled={!cartData.length}
            className="absolute bottom-4 w-full bg-black text-white mt-4 px-8 py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Checkout Now (USD${totalPrice})
          </button>
        </Link>
      </div>
    </div>
  );
}

function SingleCart({ cart }) {
  const dispatch = useDispatch();

  function handleRemoveFromCart(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <div className="flex items-center justify-between">
      <img
        src={cart?.images[0]}
        alt=""
        className="h-20 w-20 object-contain rounded-md"
      />

      <div className="flex flex-col gap-1">
        <p className="font-semibold">{`${
          cart.name.length > 25
            ? `${cart?.name.substring(0, 25)}...`
            : cart?.name
        }`}</p>
        <p>
          Qty : {cart?.qty} | Price : {cart?.discountPrice * cart?.qty}$
        </p>
      </div>

      <AiOutlineDelete
        size={25}
        className="cursor-pointer text-red-500"
        title="Remove from cart"
        onClick={() => handleRemoveFromCart(cart?._id)}
      />
    </div>
  );
}

export default Cart;
