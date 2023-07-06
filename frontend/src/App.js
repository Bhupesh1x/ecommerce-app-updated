import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Login,
  SignUp,
  Home,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
} from "./Routes.js";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const currUser = JSON.parse(localStorage.getItem("ecommerceUser"));

  useEffect(() => {
    if (!currUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-[#F6F6F5]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route exact path="/best-selling" element={<BestSellingPage />} />
        <Route exact path="/events" element={<EventsPage />} />
        <Route exact path="/faq" element={<FaqPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
