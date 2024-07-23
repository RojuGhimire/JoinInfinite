import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { adminauthorizationAxiosInstance } from "../../../axios/Axios";

const ViewEventModal = ({
  isViewOpen,
  onViewClose,
  selectedUserId,
  setSelectedUserId,
}) => {

  //View Use By Id
  async function getSingleUserData(event_id) {
    const res = await adminauthorizationAxiosInstance.get(
      `/events/${event_id}`
    );
    return res.data;
  }
  const { data: userData } = useQuery(
    ["getallpostdata", selectedUserId],
    () => getSingleUserData(selectedUserId),
    {
      enabled: !!selectedUserId,
    }
  );


  return (
    <>
      <Modal
        isOpen={isViewOpen}
        onClose={() => {
          onViewClose();
          setSelectedUserId("");
        }}
      >
        <ModalOverlay />
        <ModalContent width="100vw" height={{ base: "90vh", md: "80vh" }}>
          <ModalHeader> Event Detail</ModalHeader>
          <ModalCloseButton />
          {userData && (
            <>
              <ModalBody overflow={"scroll"}>
                <Card maxW="md">
                  <CardHeader>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Flex direction={"column"} gap={"5px"}>
                          <Heading size="md">{userData.event_name}</Heading>
                          <Text>Genre:{userData.genre}</Text>
                          <Text>
                            Date:{new Date(userData.date).toDateString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>{userData.description || "N/A"}</Text>
                  </CardBody>
                  <Image
                    objectFit="cover"
                    src={userData.photo_url || "NO PHOTO"}
                    alt="Chakra UI"
                  />
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewEventModal;
