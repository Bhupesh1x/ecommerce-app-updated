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
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute.js";

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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
