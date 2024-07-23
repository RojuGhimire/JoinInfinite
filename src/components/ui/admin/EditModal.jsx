import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useToast
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import { adminauthorizationAxiosInstance } from "../../../axios/Axios";
import { genreOptions } from "../../../utils/Options";
import LabelInput from "../../shared/LabelInput";

const EditModal = ({
  isEditOpen,
  onEditClose,
  selectedUserId,
  setSelectedUserId,
  onSubmitData
}) => {
  
  const queryClient = useQueryClient();
  const toast=useToast();



  //Get Single User Data
  async function getSingleUserData(id) {
    const res = await adminauthorizationAxiosInstance.get(`/users/${id}`);
    return res.data;
  }

  const {
    isLoading: isUserLoading,
    isError: isUserError,
    error,
    data: userData,
  } = useQuery(
    ["getsingleUserData", selectedUserId],
    () => getSingleUserData(selectedUserId),
    {
      enabled: !!selectedUserId,
    }
  );
  



  //display data
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      address: "",
      age: "",
      interested_genre: [],
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("username", userData.username);
      setValue("email", userData.email);
      setValue("address", userData.address);
      setValue("age", userData.age);
      setValue(
        "interested_genre",
        userData.interested_genre.map((elem, index) => ({
          value: elem,
          label: elem,
          key: index,
        }))
      );
    }
  }, [userData]);



  return (
    <>
      {userData && (
        <>
          <Modal
            isOpen={isEditOpen}
            onClose={() => {
              onEditClose();
              setSelectedUserId("");
            }}
          >
            <ModalOverlay />
            <ModalContent
              width="100vw"
              height={{ base: "90vh", md: "80vh" }}
            >
              <ModalHeader> Change User Detail</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  onSubmit={handleSubmit((data) =>
                    onSubmitData(data, selectedUserId)
                  )}
                >
                  <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: "100%", md: "900px" }}
                    maxW="100%"
                    background="transparent"
                    me="auto"
                    mb={{ base: "20px", md: "auto" }}
                  >
                    <Flex gap={2} direction={"column"}>
                      <LabelInput
                        label={"User Name"}
                        type={"text"}
                        register={register}
                        registerName={"username"}
                        errors={errors}
                        placeHolder={"Enter your Full Name"}
                        errorMessage={"Please Enter Your Name"}
                      />

                      {/* <LabelInput
                        label={"Email Address"}
                        type={"email"}
                        register={register}
                        registerName={"email"}
                        errors={errors}
                        placeHolder={"Enter your Email Address"}
                        errorMessage={"Please Enter Your Email"}
                      /> */}
                    </Flex>

                    <Flex gap={2} direction={"column"}>
                      <Box w={"100%"}>
                        <LabelInput
                          label={"Address"}
                          type={"address"}
                          register={register}
                          registerName={"address"}
                          errors={errors}
                          placeHolder={"Enter your Address"}
                          errorMessage={"Please Enter YouAddress"}
                        />
                      </Box>

                      <Box w={"100%"}>
                      <FormControl isInvalid={errors.interested_genre}>
                        <FormLabel
                          mt={"10px"}
                          ms="4px"
                          fontSize="sm"
                          fontWeight="normal"
                        >
                          Interested
                        </FormLabel>
                        <Controller
                          name="interested_genre"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "At Least One Genre is required",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              closeMenuOnSelect={false}
                              isMulti
                              options={genreOptions}
                              placeholder="Select Interested"
                            />
                          )}
                        />
                        <FormErrorMessage>
                          {errors.interested_genre &&
                            errors.interested_genre.message}
                        </FormErrorMessage>
                      </FormControl>
                      </Box>
                    </Flex>

                    <Flex gap={2} direction={"column"}>
                      <Box w={ "100%"}>
                        {userData.role === "User" && (
                          <>
                            <FormControl isInvalid={errors.age}>
                              <FormLabel
                                ms="4px"
                                fontSize="sm"
                                fontWeight="normal"
                              >
                                Age
                              </FormLabel>
                              <Controller
                                name="age"
                                borderRadius={"0.3rem"}
                                control={control}
                                defaultValue={null}
                                rules={{
                                  required:
                                    userData.role === "User"
                                      ? "Age is required"
                                      : false,
                                  min:
                                    userData.role === "User"
                                      ? {
                                          value: 14,
                                          message: "Age must be at least 14",
                                        }
                                      : undefined,
                                  max:
                                    userData.role === "User"
                                      ? {
                                          value: 120,
                                          message: "Age must be at most 120",
                                        }
                                      : undefined,
                                }}
                                render={({ field }) => (
                                  <>
                                    <NumberInput {...field}>
                                      <NumberInputField
                                        mb={"8px"}
                                        fontSize="sm"
                                        placeholder="Enter your Age"
                                      />
                                    </NumberInput>
                                  </>
                                )}
                              />
                              <FormErrorMessage>
                                {errors.age && errors.age.message}
                              </FormErrorMessage>
                            </FormControl>
                          </>
                        )}
                      </Box>
                    </Flex>

                    <LightMode>
                      <Input
                        type="submit"
                        fontSize="14px"
                        colorScheme="blue"
                        fontWeight="bold"
                        cursor={"pointer"}
                        w="100%"
                        h="45"
                        mt={"15px"}
                        mb="8px"
                        value={"Update"}
                        //value={isLoading ? "Loading..." : "Update"}
                        //disabled={isLoading}
                      ></Input>
                    </LightMode>
                  </Flex>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditModal;
