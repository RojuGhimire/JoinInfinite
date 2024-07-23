import React from "react";
import Notifications from "./components/Notifications";
import FriendsZone from "./components/FriendsZone";
import Advertisement from "./components/Advertisement";

const RightSide = () => {
  return (
    <div className="w-[0%] lg:w-[18%]  flex  justify-start h-full  bg-gray-100  overflow-y-auto   ml-1 mr-1 items-center flex-col ">
      <Notifications />
      <Advertisement />
      <FriendsZone />
    </div>
  );
};

export default RightSide;
