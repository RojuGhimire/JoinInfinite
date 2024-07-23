import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import LabelInput from "../../../shared/LabelInput";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "../../../../styles/datepicker.css";
import Map from "../../../shared/Map/Map";
import Select from "react-select";
import PropTypes from "prop-types";
import { genreOptions } from "../../../../utils/Options";

const ModalBox = ({
  isOpen,
  onClose,
  register,
  handleSubmit,
  errors,
  watch,
  control,
  isPostLoading,
  setValue,
  createevent,
  location,
  setLocation,
  reset,
  isPostSuccess,
}) => {
  //Image Select
  const selectedImage = watch("photourl");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setValue("photourl", file);
    }
  };



  //onSubmit event
  const onSubmit = async (data) => {
    await createevent(data, location);
    reset();
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setValue("photourl", null);
          reset();
        }}
        size="xl" /* Adjust the size as needed */
      >
        <ModalOverlay />
        <ModalContent maxW="80%" /* Adjust the max-width as needed */>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify={{ base: "flex-start", md: "space-between" }}
              >
                {/* First Column */}
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

                {/* Second Column */}
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
                {/* First Column */}
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

                {/* Second Column */}
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
                      >
                        {selectedImage
                          ? "Image Selected"
                          : "Click to select an image"}
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

              {/* Map Location Box */}
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
                {isPostLoading ? "Loading.." : "Submit"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

ModalBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  isPostLoading: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  createevent: PropTypes.func.isRequired,
  location: PropTypes.object,
  setLocation: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default ModalBox;
