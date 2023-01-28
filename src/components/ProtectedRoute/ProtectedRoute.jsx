import { AuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to={"/auth"} replace />;
};

export default ProtectedRoute;
