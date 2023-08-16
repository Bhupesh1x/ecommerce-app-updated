import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "./utils/uploadFile.js";
import { getCurrUser } from "./utils/getUser.js";
import AllRoutes from "./AllRoutes.js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const currUser = getCurrUser();

  async function getStripeApiKey() {
    const { data } = await axios.get(`${serverUrl}/payment/stript-api-key`);
    setStripeApiKey(data.striptApiKey);
  }

  useEffect(() => {
    if (stripeApiKey === "" && currUser) {
      getStripeApiKey();
    }
  }, [currUser, stripeApiKey]);

  return (
    <div className="bg-[#F6F6F5] overflow-hidden">
      <AllRoutes stripeApiKey={stripeApiKey} />
      <Toaster />
    </div>
  );
}

export default App;
