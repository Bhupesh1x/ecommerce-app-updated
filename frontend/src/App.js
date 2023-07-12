import { Route, Routes } from "react-router-dom";
import {
  Login,
  SignUp,
  Home,
  ProductsPage,
  ProductDetailPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  ProfilePage,
} from "./Routes.js";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "./utils/uploadFile.js";

function App() {
  async function getUser() {
    try {
      const result = await axios.get(`${serverUrl}/user/get-user`, {
        withCredentials: true,
      });

      localStorage.setItem("ecommerceUser", JSON.stringify(result.data));
    } catch (error) {
      toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-[#F6F6F5]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route exact path="/product/:id" element={<ProductDetailPage />} />
        <Route exact path="/best-selling" element={<BestSellingPage />} />
        <Route exact path="/events" element={<EventsPage />} />
        <Route exact path="/faq" element={<FaqPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
