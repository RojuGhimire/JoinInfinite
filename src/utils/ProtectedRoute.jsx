import { useNavigate } from "react-router-dom";
import { Auth } from "./auth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = Auth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
  
};

export default ProtectedRoute;
