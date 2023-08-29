import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "./utils/uploadFile.js";
import AllRoutes from "./AllRoutes.js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${serverUrl}/payment/stripe-api-key`, {
        withCredentials: true,
      });
      setStripeApiKey(data.striptApiKey);
    } catch (error) {
      toast.error(error?.response?.data);
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
