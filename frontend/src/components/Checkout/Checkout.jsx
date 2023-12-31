import { useEffect, useMemo, useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { getCurrUser } from "../../utils/getUser";
import { useSelector } from "react-redux";
import { serverUrl } from "../../utils/uploadFile";
import axios from "axios";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const currUser = getCurrUser();
  const cartData = useSelector((state) => state.cart.value);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [showSavedAddress, setShowSavedAddress] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  useEffect(() => {
    if (!cartData?.length) {
      navigate("/");
    }
  }, [navigate, cartData?.length]);

  const subTotalPrice = useMemo(() => {
    const price = cartData.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
    return price;
  }, [cartData]);

  const shipping = useMemo(() => {
    return subTotalPrice * 0.1;
  }, [subTotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios
      .get(`${serverUrl}/couponCode/get-coupon-value/${name}`)
      .then((res) => {
        if (res.data === null) {
          toast.error("Coupon code doesn't exists!");
          setCouponCode("");
          return;
        }
        const shopId = res.data?.shopId;
        const couponCodeValue = res.data?.value;
        if (res.data !== null) {
          const isCouponValid =
            cartData && cartData.filter((item) => item.shopId === shopId);

          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this product!");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0
            );
            const discountPrice = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data);
            setCouponCode("");
            toast.success("Coupon code applied successfully!");
          }
        }
      });
  };

  const discountPercentage = useMemo(() => {
    return couponCodeData ? discountPrice : "";
  }, [couponCodeData, discountPrice]);

  const totalPrice = useMemo(() => {
    return couponCodeData
      ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
      : (subTotalPrice + shipping).toFixed(2);
  }, [couponCodeData, discountPercentage, shipping, subTotalPrice]);

  const checkoutSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cartData,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        currUser,
      };

      // update local storage with the updated orders array
      localStorage.setItem("eshopLatestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <ShippingInfo
            currUser={currUser}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            showSavedAddress={showSavedAddress}
            setShowSavedAddress={setShowSavedAddress}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <button
        onClick={checkoutSubmit}
        className="bg-black text-white mt-4 px-8  py-3  rounded-lg"
      >
        Go to Payment
      </button>
    </div>
  );
};

const ShippingInfo = ({
  currUser,
  country,
  setCountry,
  city,
  setCity,
  showSavedAddress,
  setShowSavedAddress,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
  phoneNumber,
  setPhoneNumber,
}) => {
  function handleUpdateSavedAddress(address) {
    setAddress1(address.address1);
    setAddress2(address.address2);
    setZipCode(address.zipCode);
    setCountry(address.country);
    setCity(address.city);
  }

  return (
    <div className="w-full md:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              required
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              value={currUser?.name}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              required
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              value={currUser?.email}
            />
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              required
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">State</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3 gap-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              required
              className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="cursor-pointer font-semibold"
        onClick={() => setShowSavedAddress((prev) => !prev)}
      >
        Choose from saved address
      </h5>
      {showSavedAddress && (
        <>
          {currUser?.addresses?.map((address, index) => (
            <div className="w-full flex mt-1" key={index}>
              <input
                type="checkbox"
                className="mr-3"
                value={address.addressType}
                onClick={() => handleUpdateSavedAddress(address)}
              />
              <h2>{address.addressType}</h2>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  const shippingData = shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shippingData}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {discountPercentage ? `$ ${discountPercentage}` : "-"}
        </h5>
      </div>
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
        <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1 outline-none focus:border-blue-500 transition-all duration-300"
          placeholder="Coupoun code"
          required
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white mt-4 px-8 py-3 rounded-lg w-full"
        >
          Apply code
        </button>
      </form>
    </div>
  );
};

export default Checkout;
