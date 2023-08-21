import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "./utils/uploadFile.js";
import { getCurrUser } from "./utils/getUser.js";
import AllRoutes from "./AllRoutes.js";
import { useNavigate } from "react-router-dom";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const currUser = getCurrUser();
  const navigate = useNavigate();

  async function logoutHandler(isSeller) {
    const url = isSeller
      ? `${serverUrl}/shop/logout`
      : `${serverUrl}/user/logout-user`;
    try {
      const result = await axios.get(url, {
        withCredentials: true,
      });

      localStorage.clear("ecommerceUser");
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${serverUrl}/payment/stripe-api-key`, {
        withCredentials: true,
      });
      setStripeApiKey(data.striptApiKey);
    } catch (error) {
      if (error?.response?.data === "Please login to continue") {
        const isSeller = currUser?.role === "Seller";
        await logoutHandler(isSeller);
      } else {
        toast.error(error?.response?.data);
      }
    }
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <div className="bg-[#F6F6F5] overflow-hidden">
      <AllRoutes stripeApiKey={stripeApiKey} />
      <Toaster />
    </div>
  );
}

export default App;
