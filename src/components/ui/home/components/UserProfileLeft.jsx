import React, { useContext } from "react";
import { UserContext } from "../../../../context/Context";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Stack,
  VStack,
} from "@chakra-ui/react";

const UserProfileLeft = () => {
  const { userDetail } = useContext(UserContext);

  return (
    <Card p={2} width={"100%"}>
      <CardBody>
        <VStack spacing="4">
          <Box>
            <div className=" h-20 w-20 border border-red-950 rounded-full object-cover image ">
              {userDetail && (
                <Avatar
                  width={"100%"}
                  height={"100%"}
                  name="User Name"
                  src={userDetail.photo_url}
                ></Avatar>
              )}
            </div>
          </Box>

          <VStack>
            <p className="font-bold text-base mb-2">
              {(userDetail && userDetail.username) || "JoinInfinite"}
            </p>
            <p className="text-center text-sm">
              {(userDetail &&
                `Hello ${userDetail.username.toUpperCase()}.Welcome to the JoinInfine`) ||
                "JoinInfinite"}
            </p>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default UserProfileLeft;
