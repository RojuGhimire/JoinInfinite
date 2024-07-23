import React, { useEffect } from "react";
import LeftSide from "../../components/ui/home/LeftSide";
import RightSide from "../../components/ui/home/RightSide";

import HomeV2 from "./HomeV2";
import { usePostUserLocation } from "./api/usePostUserLocation";

const Home = () => {
  const { postUserLocationMutation } = usePostUserLocation();
  const { status } = postUserLocationMutation;



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          postUserLocationMutation.mutate(data);
        },
        (error) => {
          console.error("Error getting location:", error.message);

          // Handle potential errors:
          if (error.code === error.PERMISSION_DENIED) {
            // User denied permission, prompt for permission again
            // or provide a clear explanation for why location is needed.
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            // Location information is unavailable, handle accordingly.
          } else if (error.code === error.TIMEOUT) {
            // Request timed out, consider retrying with a longer timeout.
          } else {
            // Other errors, handle appropriately.
          }
        },
        {
          // Optional settings for more control:
          enableHighAccuracy: true, // Try to get the most accurate position
          timeout: 5000, // Timeout after 5 seconds
          maximumAge: 0, // Don't accept cached positions
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <>
      <div className="w-full flex h-[90vh] justify-center items-center bg-gray-100  ">

        <LeftSide />

        {status === "success" && <HomeV2 />}
        {status === "loading" && (
          <div className=" min-w-[64%] h-full  bg-gray-100  overflow-y-auto  flex items-center justify-between  ">
            <h1>Loading Data</h1>;
          </div>
        )}
        {status === "idle" && <HomeV2 />}
        {status === "error" && <HomeV2 />}

        <RightSide />
      </div>
    </>
  );
};

export default Home;
