import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { Flex, Box } from "@chakra-ui/react";
import LabelInput from "../../../shared/LabelInput";
import { FormLabel } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "../../../../styles/datepicker.css";
import Select from "react-select";
import { genreOptions } from "../../../../utils/Options";
import { authorizationAxiosInstance } from "../../../../axios/Axios";
import { useQuery } from "react-query";
import { useEditEventApi } from "../../../../pages/event/api/edit/useEditEventApi";
import Map from "../../../shared/Map/Map";

const EditEventModal = ({ isOpen, onClose, eventId }) => {

  const [location, setLocation] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm();


  //Edit Event
  const { editEventMutation } = useEditEventApi();
  const { isLoading, isSuccess } = editEventMutation;
  const onEditEvent = (
    { event_name, description, photo_url, date, genre,location_address },
    id,
    location
  ) => {
    const data = {
      event_name,
      description,
      photo_url,
      date,
      location_address,
      genre: genre.value,
      location_latitude: location.latitude,
      location_longitude: location.longitude,
    };

 
    editEventMutation.mutate({ data, id });
  };


  //Get Single User Data
  async function getSingleEvent(eventId) {
    const res = await authorizationAxiosInstance.get(`/events/${eventId}`);
    return res;
  }
  const data = useQuery(
    ["getsingledata", eventId],
    () => getSingleEvent(eventId),
    {
      enabled: !!isOpen && !!eventId,
    }
  );
  const Data = data?.data?.data;


  //Image Update
  const selectedUserImage = watch("photo_url");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("photo_url", file);
    }
  };


  useEffect(() => {
    if (Data) {
      setValue("event_name", Data.event_name);
      setValue("description", Data.description);
      setValue("location_address", Data.location_address);
      setValue("photo_url", Data.photo_url);
      setValue("date", new Date(Data.date));
      setValue("genre", { label: Data.genre, value: Data.genre });
      setLocation({
        latitude: Data.location_latitude,
        longitude: Data.location_longitude,
      });
    }
  }, [Data]);

  useEffect(()=>{
    if (isSuccess) {
      onClose();
    } 
  },[isSuccess])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setValue("photo_url", null);
          reset();
        }}
      >
        <ModalOverlay />

        <ModalContent maxW="80%">
          <ModalHeader>Edit Events</ModalHeader>
          <ModalCloseButton />

          <form
            onSubmit={handleSubmit((data) =>
              onEditEvent(data, eventId, location)
            )}
          >
            <ModalBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify={{ base: "flex-start", md: "space-between" }}
              >
                <Box
                  w={{ base: "100%", md: "48%" }}
                  mb={{ base: "4", md: "0" }}
                >
                  <LabelInput
                    label={"Event Name"}
                    type={"text"}
                    register={register}
                    registerName={"event_name"}
                    errors={errors}
                    placeHolder={"Enter your Event Name"}
                    errorMessage={"Please Enter Your Event Name"}
                  />
                </Box>

                <Box w={{ base: "100%", md: "48%" }}>
                  <FormLabel ms="4px" mt={2} fontSize="sm" fontWeight="normal">
                    Event Date
                  </FormLabel>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ReactDatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        className="date-picker-container"
                        showTimeSelect
                        dateFormat="Pp"
                      />
                    )}
                  />
                </Box>

              </Flex>

              <Flex
                direction={{ base: "column", md: "row" }}
                justify={{ base: "flex-start", md: "space-between" }}
              >
                <Box
                  w={{ base: "100%", md: "48%" }}
                  mb={{ base: "4", md: "0" }}
                >
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Description
                  </FormLabel>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        fontSize="sm"
                        placeholder="Enter description of Event"
                      />
                    )}
                  />
                </Box>

                <Box w={{ base: "100%", md: "48%" }}>
                  <Box pb={"1rem"} mt={2}>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Select Event Genre
                    </FormLabel>
                    <Controller
                      name="genre"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={genreOptions}
                          placeholder="Select Genre"
                        />
                      )}
                    />
                  </Box>
                </Box>

              </Flex>

              <Flex
                direction={{ base: "column", md: "row" }}
                justify={{ base: "flex-start", md: "space-between" }}
              >
                <Box
                  w={{ base: "100%", md: "48%" }}
                  mb={{ base: "4", md: "0" }}
                >
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Event Image
                  </FormLabel>

                  <Box>
                    <label htmlFor="fileInput">
               
                      <Box
                        ms={{ base: "0px", md: "4px" }}
                        mb={"8px"}
                        size="lg"
                        fontSize="sm"
                        h={"2.5rem"}
                        border={"1px"}
                        borderColor={"gray"}
                        borderRadius={"5px"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{ cursor: "pointer" }}
                        height={"100px"}
                      >
                        {selectedUserImage ? (
                          selectedUserImage instanceof File ? (
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
                            <img
                              src={selectedUserImage}
                              alt="Selected Image"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          )
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
                      onChange={handleImageChange}
                      
                    />
                  </Box>
                </Box>

                <Box
                  w={{ base: "100%", md: "48%" }}
                  mb={{ base: "4", md: "0" }}
                >
                  <LabelInput
                    label={"Enter Event Location"}
                    type={"text"}
                    register={register}
                    registerName={"location_address"}
                    errors={errors}
                    placeHolder={"Enter your Event Location Name"}
                    errorMessage={"Please Enter Your Event Location Name"}
                  />
                </Box>
              </Flex>

              <Box w="100%">
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Select Location
                </FormLabel>
                <Map
                  location={location}
                  setLocation={setLocation}
                  isOpen={isOpen}
                />
              </Box>

            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                {isLoading ? "Loading..." : "Update"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditEventModal;
