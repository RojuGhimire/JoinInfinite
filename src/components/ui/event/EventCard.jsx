import { CalendarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  HeartIcon,
  LocationMarkerIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { authorizationAxiosInstance } from "../../../axios/Axios";
import { formatDate } from "../../../utils/helpers";
import DeleteEventModal from "./modal/DeleteEventModal";
import EditEventModal from "./modal/EditEventModal";

const EventCard = forwardRef(
  (
    {
      event,
      isMyEvent,
      postLikeEventMutation,
      postInterestedEventMutation,
      refetch,
    },
    ref
  ) => {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
      isOpen: isDeleteModalOpen,
      onOpen: onOpenDeleteModal,
      onClose: onCloseDeleteModal,
    } = useDisclosure();

    const toast = useToast();

    const eventImage = event?.photo_url
      ? event.photo_url
      : "./src/assets/logo.png";

    // Delete User
    const onDeleteHandler = useMutation(
      (id) => {
        const res = authorizationAxiosInstance.delete(`/events/${id}`);
        return res;
      },
      {
        onSuccess: (response) => {
          toast({
            title: response.data.message,
            position: "top-right",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onCloseDeleteModal();
          refetch();
        },
        onError: (error) => {
          toast({
            title: error.response.data.detail,
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );

    const onLikeSubmitHandler = async (id, like) => {
      await postLikeEventMutation.mutateAsync({ id, like });
      refetch?.();
    };
    const onInterestedSubmitHandler = async (id, interested) => {
      await postInterestedEventMutation.mutateAsync({ id, interested });
      refetch?.();
    };

    return (
      <>

        <Card maxW="md" mt="4" 
        ref={ref}
        >
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="Organizer Name" src={event.organizer_photo_url} />

                <Box>
                  <Heading size="sm">
                    {event?.organizer_username || "Organizer"}
                  </Heading>
                </Box>
              </Flex>

              {isMyEvent && (
                <Menu>
                  <MenuButton as={Button}>...</MenuButton>
                  <MenuList>
                    <MenuItem onClick={onOpen}>Edit</MenuItem>
                    <MenuItem onClick={onOpenDeleteModal}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </CardHeader>

          <CardBody>
            <Text fontWeight="700" fontSize="medium">
              {event.event_name || "Title"}
            </Text>
            <Text>{event?.description || "Descriptions here"}</Text>
            <Flex mt="2" fontSize="sm" color="gray.500">
              <LocationMarkerIcon width="20" />{" "}
              {event?.location_address || "Location not available"}
            </Flex>
            <Text mt="2" fontSize="sm" color="gray.500">
              <CalendarIcon /> {formatDate(event?.date) || "Date not available"}
            </Text>
          </CardBody>

          <Image objectFit="cover" src={eventImage} alt="Event image" />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button
              onClick={() => onLikeSubmitHandler(event.event_id, !event.liked)}
              flex="1"
              variant="ghost"
              leftIcon={<></>}
            >
              <ThumbUpIcon width={20} color={event.liked ? "blue" : ""} />
              <Text color={event.liked ? "blue" : ""}>
                {" "}
                {event.liked_user_count} Like
              </Text>
            </Button>
            <Button
              onClick={() =>
                onInterestedSubmitHandler(event.event_id, !event.interested)
              }
              flex="1"
              variant="ghost"
              leftIcon={<></>}
            >
              <HeartIcon width={20} color={event.interested ? "red" : ""} />
              <Text color={event.interested ? "red" : ""}>
                {" "}
                {event.interested_user_count} Interested
              </Text>
            </Button>
          </CardFooter>
        </Card>

        <EditEventModal
          isOpen={isOpen}
          onClose={onClose}
          eventId={event.event_id}
       
        />

        <DeleteEventModal
          isDeleteOpenModal={isDeleteModalOpen}
          onCloseDeleteModal={onCloseDeleteModal}
          onDelete={onDeleteHandler}
          eventId={event.event_id}
        />
      </>
    );
  }
);

EventCard.propTypes = {
  event: PropTypes.shape({
    event_id: PropTypes.number.isRequired,
    event_name: PropTypes.string.isRequired,
    organizer_id: PropTypes.number.isRequired,
    organizer_username: PropTypes.string.isRequired,
    organizer_photo_url: PropTypes.string,
    genre: PropTypes.string.isRequired,
    location_longitude: PropTypes.number,
    location_latitude: PropTypes.number,
    location_address: PropTypes.string.isRequired,
    photo_url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    liked: PropTypes.bool,
    interested: PropTypes.bool,
    interested_user_count: PropTypes.number,
    liked_user_count: PropTypes.number,
    onEdit: PropTypes.func,
  }).isRequired,
  isMyEvent: PropTypes.bool,
  refetch: PropTypes.func,
  postLikeEventMutation: PropTypes.shape({
    mutateAsync: PropTypes.func,
  }),
  postInterestedEventMutation: PropTypes.shape({
    mutateAsync: PropTypes.func,
  }),
};

EventCard.displayName = "EventCard";

export default EventCard;
