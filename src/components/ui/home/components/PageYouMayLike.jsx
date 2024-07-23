import React from "react";
import PageNotifiFriendsNews from "./PageNotifiFriendsNews";
import { Card, CardBody, Heading, VStack } from "@chakra-ui/react";

const PageYouMayLike = () => {
  return (
    <Card p={2} width={"100%"}>
      <CardBody>
        <VStack spacing="4">
        <Heading fontSize={"20px"}>Page You May Like</Heading>

          <VStack>
            <PageNotifiFriendsNews />
            <PageNotifiFriendsNews />
            <PageNotifiFriendsNews />
            <PageNotifiFriendsNews />
            <PageNotifiFriendsNews />
            <PageNotifiFriendsNews />
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PageYouMayLike;
