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
  ShopCreatePage,
} from "./Routes.js";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute.js";
import ShopProtectedRoute from "./ShopProtectedRoute.js";
import { ShopHomePage } from "./ShopRoutes.js";

function App() {
  return (
    <div className="bg-[#F6F6F5]">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<Login isShop={true} />} />
        <Route
          path="/shop"
          element={
            <ShopProtectedRoute>
              <ShopHomePage />
            </ShopProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
