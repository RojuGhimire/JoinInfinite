import React from "react";
import UserProfileLeft from "./components/UserProfileLeft";
import PageYouMayLike from "./components/PageYouMayLike";
import LatestTopNews from "./components/LatestTopNews";

const LeftSide = () => {
  return (
    <div className=" w-[0%] lg:w-[18%] h-full  flex justify-start items-center flex-col ml-1 mr-1 bg-gray-100  overflow-y-auto   ">
      <UserProfileLeft />
      <PageYouMayLike />
      {/* <LatestTopNews /> */}
    </div>
  );
};

export default LeftSide;
