import React, { useContext, useEffect } from "react";
import SettingSidebar from "../../components/ui/setting/SettingSidebar";
import "../../styles/setting.css";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  LightMode,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import LabelInput from "../../components/shared/LabelInput";
import Select from "react-select";
import { genreOptions } from "../../utils/Options";
import { UserContext } from "../../context/Context";
import { usePutUserProfileApi } from "./api/post-user/usePutUserProfileApi";

const ChangeUserDetail = () => {
  const { userDetail } = useContext(UserContext);
  const { putUserProfileMutation, isLoading } = usePutUserProfileApi();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      address: "",
      age: "",
      interested_genre: [],
    },
  });

  const onSubmitSignup = (
    { username, email, age, address, interested_genre },
    id
  ) => {
    const data = {
      username,
      email,
      age,
      address,
      interested_genre: interested_genre.map((elem) => elem.value),
    };

    putUserProfileMutation.mutate({ data, id });
  };

  useEffect(() => {
    if (userDetail) {
      setValue("username", userDetail.username);
      setValue("email", userDetail.email);
      setValue("address", userDetail.address);
      setValue("age", userDetail.age);
      setValue(
        "interested_genre",
        userDetail.interested_genre.map((elem, index) => ({
          value: elem,
          label: elem,
          key: index,
        }))
      );
    }
  }, [userDetail]);

  return (
    <>
      {userDetail && (
        <div className="settingContainer">
          <SettingSidebar />

          <main className="dashboard">
            <Box mb={5}>
              <Heading fontSize={"1.5rem"} pb={5}>
                Change User Detail
              </Heading>
            </Box>

            <form
              onSubmit={handleSubmit((data) =>
                onSubmitSignup(data, userDetail.id)
              )}
            >
              <Flex
                w="100%"
                h="50vh"
                alignItems="center"
                justifyContent="center"
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                flexDirection="column"
              >
                <Flex
                  zIndex="2"
                  direction="column"
                  w={{ base: "100%", md: "900px" }}
                  maxW="100%"
                  background="transparent"
                  me="auto"
                  mb={{ base: "20px", md: "auto" }}
                  p={2}
                >
                  <Flex gap={2} direction={{ base: "column", md: "row" }}>
                    <LabelInput
                      label={"User Name"}
                      type={"text"}
                      register={register}
                      registerName={"username"}
                      errors={errors}
                      placeHolder={"Enter your Full Name"}
                      errorMessage={"Please Enter Your Name"}
                    />

                    <Box w={"100%"}>
                      {userDetail.role === "User" && (
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
                                  userDetail.role === "User"
                                    ? "Age is required"
                                    : false,
                                min:
                                  userDetail.role === "User"
                                    ? {
                                        value: 14,
                                        message: "Age must be at least 14",
                                      }
                                    : undefined,
                                max:
                                  userDetail.role === "User"
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

                  <Flex gap={2} direction={{ base: "column", md: "row" }}>
                    <Box w={{ base: "100%", md: "50%" }}>
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

                    <Box w={{ base: "100%", md: "50%" }}>
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
                  {/* 
                  <Flex gap={2} direction={{ base: "column", md: "row" }}>
              
                  </Flex> */}

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
                      value={isLoading ? "Loading..." : "Update"}
                      disabled={isLoading}
                    ></Input>
                  </LightMode>
                </Flex>
              </Flex>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default ChangeUserDetail;
