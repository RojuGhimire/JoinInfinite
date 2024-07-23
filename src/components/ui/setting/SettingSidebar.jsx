import { Link, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { Heading } from "@chakra-ui/react";

const SettingSidebar = () => {
  const location = useLocation();

  return (
    <aside>
      <Heading fontSize={"1.5rem"}>Setting & Privacy</Heading>
      <div>
        <ul>
          <MenuList
            url="/settings/user-detail"
            text="Change User Details"
            Icon={RiDashboardFill}
            location={location}
          />

          <MenuList
            url="/settings/change-password"
            text="Change Password"
            Icon={IoIosPeople}
            location={location}
          />

          <MenuList
            url="/settings/upload-image"
            text="Upload Profile"
            Icon={AiFillFileText}
            location={location}
          />
        </ul>
      </div>
    </aside>
  );
};

const MenuList = ({ url, text, location, Icon }) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
  >
    <Link to={url}>
      <Icon /> {text}
    </Link>
  </li>
);

export default SettingSidebar;
