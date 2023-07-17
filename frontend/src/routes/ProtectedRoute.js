import { Navigate } from "react-router-dom";
import { getCurrUser } from "../utils/getUser";

const ProtectedRoute = ({ children }) => {
  const currUser = getCurrUser();
  if (!currUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
