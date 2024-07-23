import { useLocation} from "react-router-dom";

const NoNavbar = ({ children }) => {
  const location = useLocation();
  const activationCode = location.pathname.split("/").pop();

  const pathsWithoutNavbar = [
    "/login",
    "/register",
    "/admin",
    "/admin/",
    "/admin/users",
    "/admin/users/",
    "/admin/login",
    "/admin/login/",
    "/admin/posts",
    "/admin/posts/",
    "/forgot-password",
    "/admin/dashboard",
    `/user/activate/${activationCode}`,
    `/user/reset_password/${activationCode}`
  ];

  const showNavbar = !pathsWithoutNavbar.includes(location.pathname) ;

  return <div>{showNavbar && children}</div>;
};

export default NoNavbar;
