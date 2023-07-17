import { Navigate } from "react-router-dom";
import { getCurrUser } from "../utils/getUser";

const ShopProtectedRoute = ({ children }) => {
  const currUser = getCurrUser();
  if (!currUser) {
    return <Navigate to="/login" replace />;
  }
  if (currUser.role !== "Seller") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ShopProtectedRoute;
