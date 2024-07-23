import { useNavigate } from "react-router-dom";
import { Auth } from "./auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/Context";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // const {userDetail} = useContext(UserContext)
  const { isAuthenticated } = Auth();
  const role = localStorage.getItem("role");


  useEffect(() => {
    if (!isAuthenticated() || role !== "Admin") {
      navigate("/admin/login");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AdminProtectedRoute;
