import { useEffect, useState } from "react";
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
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
} from "./routes/Routes.js";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import ShopProtectedRoute from "./routes/ShopProtectedRoute.js";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProducts,
  ShopAllCoupons,
  ShopAllOrders,
  ShopOrdersDetails,
} from "./ShopRoutes.js";
import axios from "axios";
import { serverUrl } from "./utils/uploadFile.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${serverUrl}/payment/stript-api-key`);
    setStripeApiKey(data.striptApiKey);
  }

  useEffect(() => {
    if (stripeApiKey === "") {
      getStripeApiKey();
    }
  }, [stripeApiKey]);

  return (
    <div className="bg-[#F6F6F5] overflow-hidden">
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
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
          path="/shop/:id"
          element={
            <ShopProtectedRoute>
              <ShopHomePage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ShopProtectedRoute>
              <ShopDashboardPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProductPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <ShopProtectedRoute>
              <ShopCreateProductPage isEvent={true} />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts isEvent={true} />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <ShopProtectedRoute>
              <ShopAllCoupons />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/success"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <ShopProtectedRoute>
              <ShopAllOrders />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ShopProtectedRoute>
              <ShopOrdersDetails />
            </ShopProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
