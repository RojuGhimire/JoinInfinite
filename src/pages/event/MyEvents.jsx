import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EventCard from "../../components/ui/event/EventCard";
import ModalBox from "../../components/ui/event/modal/AddEventModal";
import { UserContext } from "../../context/Context";
import { useGetUserEventApi } from "./api/get/useGetUserEventApi";
import { usePostEvent } from "./api/post/usePostEvent";
import { FaCameraRetro } from "react-icons/fa";
import { usePostUserImage } from "../setting/api/post-user/usePostUserImage";
import { usePostLikeEvent } from "../home/api/usePostLikeEvent";
import { usePostInterestedEvent } from "../home/api/usePostInterestedEvent";
import HasNoMoreData from "../home/HasNoMoreData";


const MyEvents = () => {
  const [currentLatitudeData, setCurrentLatitudeData] = useState(null);
  const [currentLongitudeData, setCurrentLongitudeData] = useState(null);
  const [location, setLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userDetail } = useContext(UserContext);
  const observer = useRef();
  const {
    isOpen: editUserDetailisOpen,
    onOpen: editUserDetailonOpen,
    onClose: editUserDetailionClose,
  } = useDisclosure();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading: isGetEventLoading,
    isSuccess,
    refetch,
  } = useGetUserEventApi();

  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setValue,
    isLoading: isPostLoading,
    createevent,
    reset,
    isSuccess: isPostSuccess,
  } = usePostEvent();

  const {
    handleSubmit: userdetailhandlesubmit,
    postUserDetail,
    setValue: userDetailSetValue,
    watch: userDetailWatch,
  } = usePostUserImage();

  const { postLikeEventMutation } = usePostLikeEvent();
  const { postInterestedEventMutation } = usePostInterestedEvent();

  //Upload User Image
  const selectedUserImage = userDetailWatch("photo_url");
  const handleUserImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      userDetailSetValue("photo_url", file);
    }
  };

  //Location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLatitudeData(position.coords.latitude);
        setCurrentLongitudeData(position.coords.longitude);
      });
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (currentLatitudeData || currentLongitudeData) {
      setLocation({
        latitude: currentLatitudeData,
        longitude: currentLongitudeData,
      });
    }
  }, [currentLatitudeData, currentLongitudeData]);

  //Get Event Data
  const flattenedData = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.items) : []),
    [data]
  );

  const lastElementRef = useCallback(
    (node) => {
      if (isPostLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            if (data && data.pages.flatMap((item) => item.items).length > 1) {
              fetchNextPage();
            }
          }
        },
        { threshold: 0.5 } // Adjust the threshold as needed
      );
      if (node) observer.current.observe(node);
    },
    [isGetEventLoading, hasNextPage, isFetching, fetchNextPage, data]
  );

  if (isGetEventLoading) return <h1>Loading Data</h1>;

  if (error) return <h1>Couldnt fetch data</h1>;

  const EventData = isSuccess && (
    <div>
      <div>
        {flattenedData.map((item, i) => (
          
            <EventCard key={i}
              ref={flattenedData.length === i + 1 ? lastElementRef : null}
              event={item}
              isMyEvent={true}
              postLikeEventMutation={postLikeEventMutation}
              postInterestedEventMutation={postInterestedEventMutation}
              refetch={refetch}
            />
          
        ))}
      </div>
      {!hasNextPage && <HasNoMoreData/>}
      {isFetching && <div>Fetching more data</div>}
    </div>
  );

  return (
    <>
      <div
        className=" h-screen "
        style={{
          position: "relative",
        }}
      >
        {userDetail && (
          <div
            className="flex gap-5  lg:px-32 pt-12 "
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #251d7b, #5f519d, #9388be, #c8c2df, #ffffff)",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                width: "168px",
                height: "168px",
                position: "relative",
                border: "2px solid rgb(51, 51, 51)",
              }}
            >
              <img
                src={
                  userDetail.photo_url ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-amazing-flat-260nw-2013390644.jpg"
                }
                alt="pp"
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "2px solid rgb(51, 51, 51)",
                }}
              />

              <div className="image_upload">
                <FaCameraRetro onClick={editUserDetailonOpen} />

                {/* //Upload User Image  */}
                <Modal
                  isOpen={editUserDetailisOpen}
                  onClose={() => {
                    editUserDetailionClose();
                    userDetailSetValue("photo_url", null);
                  }}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Upload Image</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <form onSubmit={userdetailhandlesubmit(postUserDetail)}>
                        <label htmlFor="fileInput">
                          <Box
                            ms={{ base: "0px", md: "4px" }}
                            mb={"8px"}
                            size="lg"
                            fontSize="sm"
                            h={"15rem"}
                            border={"1px"}
                            borderColor={"gray"}
                            borderRadius={"5px"}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            style={{ cursor: "pointer" }}
                          >
                            {selectedUserImage ? (
                              <img
                                src={URL.createObjectURL(selectedUserImage)}
                                alt="Selected Image"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              "Click to select an image"
                            )}
                          </Box>
                        </label>

                        <Input
                          id="fileInput"
                          type="file"
                          hidden
                          fontSize="sm"
                          ms={{ base: "0px", md: "4px" }}
                          placeholder="Enter your event image"
                          mb={"8px"}
                          size="lg"
                          onChange={handleUserImageChange}
                        />

                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              editUserDetailionClose();
                            }}
                            type="submit"
                          >
                            Save
                          </Button>
                        </ModalFooter>
                      </form>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </div>
            </div>

            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading textColor={"white"}>
                {userDetail.username || "UserName"}
              </Heading>
              <Text textColor={"white"}>{userDetail.email || "Not Found"}</Text>
            </Flex>
          </div>
        )}

        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          m={5}
        >

          {/* Add Event  */}
          <Text
            w={{ base: "full", md: "25rem", lg: "30rem" }}
            border={"2px"}
            textColor={"gray"}
            borderColor={"gray"}
            px={4}
            py={3}
            borderRadius={"20px"}
            cursor={"pointer"}
            onClick={onOpen}
          >
            Create My Event
          </Text>

          {/* Show User Event  */}
          <section className=" text-gray-600 body-font">
            <div className="  container px-2 py-4 ">
              <div className="flex  justify-center  w-[90vw] "></div>
              <div className="h-[600px] flex  justify-center   ">
                {EventData}
              </div>
            </div>
          </section>

        </Flex>
      </div>

      {/* Add event modal  */}
      <ModalBox
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isOpen={isOpen}
        onClose={onClose}
        control={control}
        watch={watch}
        createevent={createevent}
        setValue={setValue}
        location={location}
        setLocation={setLocation}
        reset={reset}
        isPostLoading={isPostLoading}
        isPostSuccess={isPostSuccess}
      />


    </>
  );
};

export default MyEvents;
