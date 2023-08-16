import { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import ShopProtectedRoute from "./routes/ShopProtectedRoute.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Layout/Loader.jsx";

// Components Imports
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.jsx"));
const BestSellingPage = lazy(() => import("./pages/BestSellingPage.jsx"));
const EventsPage = lazy(() => import("./pages/EventsPage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const ShopCreatePage = lazy(() => import("./pages/ShopCreatePage.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.jsx"));
const PaymentPage = lazy(() => import("./pages/PaymentPage.jsx"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage.jsx"));
const ShopHomePage = lazy(() => import("./pages/shop/ShopHomePage.jsx"));
const ShopDashboardPage = lazy(() =>
  import("./pages/shop/ShopDashboardPage.jsx")
);
const ShopCreateProductPage = lazy(() =>
  import("./pages/shop/ShopCreateProductPage.jsx")
);
const ShopAllProducts = lazy(() => import("./pages/shop/ShopAllProducts.jsx"));
const ShopAllCoupons = lazy(() => import("./pages/shop/ShopAllCoupons.jsx"));
const ShopAllOrders = lazy(() => import("./pages/shop/ShopAllOrders.jsx"));
const OrdersDetailsPage = lazy(() =>
  import("./pages/shop/OrdersDetailsPage.jsx")
);
const ShopAllRefunds = lazy(() => import("./pages/shop/ShopAllRefunds.jsx"));

function AllRoutes({ stripeApiKey }) {
  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <Suspense fallback={<Loader />}>
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Loader />}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/best-selling"
          element={
            <Suspense fallback={<Loader />}>
              <BestSellingPage />
            </Suspense>
          }
        />
        <Route
          path="/events"
          element={
            <Suspense fallback={<Loader />}>
              <EventsPage />
            </Suspense>
          }
        />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<Loader />}>
              <FaqPage />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrdersDetailsPage isUser={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-create"
          element={
            <Suspense fallback={<Loader />}>
              <ShopCreatePage />
            </Suspense>
          }
        />
        <Route
          path="/shop-login"
          element={
            <Suspense fallback={<Loader />}>
              <Login isShop={true} />
            </Suspense>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopHomePage />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopDashboardPage />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopCreateProductPage />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopAllProducts />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopCreateProductPage isEvent={true} />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopAllProducts isEvent={true} />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopAllCoupons />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopAllRefunds />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/order/success"
          element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <ShopAllOrders />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ShopProtectedRoute>
                <OrdersDetailsPage />
              </ShopProtectedRoute>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default AllRoutes;
