import { LogoutIcon, SearchIcon } from "@heroicons/react/outline";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useLogOut } from "./api/useLogOut";
import { useContext } from "react";
import { UserContext } from "../../../context/Context";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const { onSubmitLogOut } = useLogOut();

  const { userDetail } = useContext(UserContext);

  return (
    <div className=" bg-white flex items-center px-4  lg:px-5 shadow-md">
      {/* Left */}
      <div>
        <Link to={"/"}>
          <img src="/src/assets/logo.png" width={90} height={50} />
        </Link>
      </div>

      {/* Search */}
      {/* <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 md:px-5">
        <SearchIcon className="h-6 text-gray-600" />
        <input
          className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search Events"
        />
      </div> */}

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex md:space-x-2">
          <Link
            to={"/"}
            className="text-header font-semibold pr-3"
          >
            Home
          </Link>
          {/* <Link
            to={"/"}
            className="text-header md:px-4 lg:px-10 font-semibold pr-3"
          >
            Notifications
          </Link> */}
          {/* <Link
            to={"/"}
            className="text-header md:px-4 lg:px-10 font-semibold pr-3"
          >
            Message
          </Link> */}
        </div>
      </div>

      {/* Right */}
      <div className="flex place-items-center sm:space-x-2 justify-end">
        {/* Profile picture */}
        {userDetail && (
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderColor={"none"}
              position={"relative"}
            >
              <Avatar size="md" name="User Name" src={userDetail.photo_url} />

              <Box
                backgroundColor={"white"}
                borderRadius={"50%"}
                position={"absolute"}
                left={"57%"}
                bottom={"8%"}
                padding={"0.1rem"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  padding={"1px"}
                  className="setting-arrow"
                >
                  <IoIosArrowDown />
                </Flex>
              </Box>
            </MenuButton>

            <MenuList>
              <Text px={3} py={1} fontWeight={"bold"}>
                {userDetail.username.toUpperCase()}
              </Text>
              <Text px={3} py={1}>
                {userDetail.email}
              </Text>

              {userDetail.role === "Organizer" && (
                <Link to={"/my-events"}>
                  <MenuItem> My Events</MenuItem>
                </Link>
              )}
              <Link to={"/settings/user-detail"}>
                <MenuItem>
                  <SettingsIcon mr={"1"} /> Settings
                </MenuItem>
              </Link>

              <form onSubmit={() => onSubmitLogOut()}>
                <MenuItem type="submit">
                  {" "}
                  <LogoutIcon width="20" mr={"1"} /> Log Out
                </MenuItem>
              </form>
            </MenuList>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Header;
