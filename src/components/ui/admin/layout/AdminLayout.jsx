import { BsPostcardFill } from "react-icons/bs";
import { FaDashcube, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAdminLogOut } from "./useAdminLogout";


const AdminLayout = () => {

  const { onSubmitLogOut } = useAdminLogOut();

  return (
    <>
      <div className="flex gap-2 ">
        <header className="w-1/3 sm:w-2/5 lg:w-1/5 text-gray-600 body-font">
          <div className=" flex flex-col  p-5 pt-20 items-center shadow-xl h-[100vh]   gap-10">
            <Link
              to={"/admin"}
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="ml-3 text-xl">ADMIN PANEL</span>
            </Link>

            <form onSubmit={() => onSubmitLogOut()}>
              <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base 0">
                Logout
              </button>
            </form>

            <nav className="flex flex-col  items-start text-base gap-5 justify-center">
            {/* <NavLink
                to={"/admin/dashboard"}
                className=" flex  items-center gap-2 mr-5 hover:text-gray-900"
              >
                {" "}
                <FaDashcube />
                Dashboard
              </NavLink> */}

              
              <NavLink
                to={"/admin/users"}
                className=" flex  items-center gap-2 mr-5 hover:text-gray-900"
              >
                {" "}
                <FaUsers />
                Users
              </NavLink>

              <NavLink
                to={"/admin/posts"}
                className=" flex  items-center gap-2 mr-5 hover:text-gray-900"
              >
                {" "}
                <BsPostcardFill />
                Posts
              </NavLink>
            </nav>
          </div>
        </header>

        {/* <Box display={"flex"} flexDirection={"column"} gap={"5rem"} w={"100%"}>
          <Heading p={"10"}>Admin Dashboard</Heading>
          <HStack justifyContent={"center"} w={"100%"} gap={"5rem"}>
            <Card>
              <CardBody
                display="flex"
                flexDirection="column"
                p="12"
                gap={"2rem"}
              >
                <Heading size={"lg"}>Total Users</Heading>
                <Text fontSize={"xl"} fontWeight={"700"}>
                  {filteredUsers.length}
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody
                display="flex"
                flexDirection="column"
                p="12"
                gap={"2rem"}
              >
                <Heading size={"lg"} fontWeight={"700"}>
                  Total Organizer
                </Heading>
                <Text fontSize={"xl"} fontWeight={"700"}>
                  {filteredOrganizer.length}
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardBody
                display="flex"
                flexDirection="column"
                p="12"
                gap={"2rem"}
              >
                <Heading size={"lg"} fontWeight={"700"}>
                  Total Events
                </Heading>
                <Text fontSize={"xl"} fontWeight={"700"}>
                  {posts.total_events}
                </Text>
              </CardBody>
            </Card>
          </HStack>
        </Box> */}

        <Outlet />
      </div>


    </>
  );
};

export default AdminLayout;
