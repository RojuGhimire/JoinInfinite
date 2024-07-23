import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "react-select";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Logo from "../../assets/logo.png";

import Headingone from "../../components/shared/Headingone";
import LabelInput from "../../components/shared/LabelInput";
import TextOne from "../../components/shared/TextOne";
import { genreOptions } from "../../utils/Options";
import { usePostRegister } from "./api/usePostRegister";

const Register = () => {
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enableAge, setEnableAge] = useState(true);

  const {
    handleSubmit,
    control,
    register,
    errors,
    watch,
    onSubmitSignup,
    isLoading,
    setValue,
    getValues,
  } = usePostRegister();

  useEffect(() => {
    // Set the initial value for "role" to "User" when the component mounts
    setValue("role", "User");
  }, [setValue]);

  const handleSwitchChange = () => {
    setEnableAge(!enableAge);
    if (enableAge) {
      setValue("role", "Organizer");
    } else {
      setValue("role", "User");
    }
  };

  const handleClick = () => setShow(!show);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const password = watch("password", "");

  return (
    <>
      <Flex p={2} alignItems={"center"} justifyContent={"center"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >
          <img
            className=" mb-15 "
            src={Logo}
            alt="logo"
            style={{
              width: "15rem",
            }}
          />

          <form onSubmit={handleSubmit(onSubmitSignup)}>
            <Flex
              w="100%"
              h="100%"
              alignItems="center"
              justifyContent="center"
              mb={{ base: "30px", md: "60px" }}
              px={{ base: "25px", md: "0px" }}
              flexDirection="column"
              borderRadius="15px"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
              <Flex
                gap={2}
                direction={{ base: "column", md: "row" }}
                justifyContent={"space-around"}
                px={3}
                width={"100%"}
              >
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="select-role" mb="0">
                    Work As
                  </FormLabel>
                  <Switch
                    id="select-role"
                    onChange={handleSwitchChange}
                    isChecked={enableAge}
                    size="lg"
                  />
                  <span style={{ marginLeft: "8px" }}>
                    {enableAge ? "User" : "Organizer"}
                  </span>
                </FormControl>

                <Box me="auto" width={"100%"}>
                  <Headingone title={"Sign Up"} textAlign={"center"} />

                  <TextOne
                    weight={"semibold"}
                    description={
                      " Enter your name,email and password to sign up"
                    }
                  />
                </Box>
              </Flex>

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

                  <LabelInput
                    label={"Email Address"}
                    type={"email"}
                    register={register}
                    registerName={"email"}
                    errors={errors}
                    placeHolder={"Enter your Email Address"}
                    errorMessage={"Please Enter Your Email"}
                  />
                </Flex>

                <Flex gap={2} direction={{ base: "column", md: "row" }}>
                  <FormControl isInvalid={errors.password} mt={4}>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        fontSize="sm"
                        ms={{ base: "0px", md: "4px" }}
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        mb="8px"
                        size="lg"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters",
                          },
                        })}
                      />

                      <InputRightElement width="4.5rem" mt={1}>
                        <Button
                          backgroundColor={"transparent"}
                          border={"none"}
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                        >
                          {show ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <FormErrorMessage>
                        <p>{errors.password && errors.password.message}</p>
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.confirmPassword} mt={4}>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Confirm Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        fontSize="sm"
                        ms={{ base: "0px", md: "4px" }}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        mb="8px"
                        size="lg"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />

                      <InputRightElement width="4.5rem" mt={1}>
                        <Button
                          backgroundColor={"transparent"}
                          border={"none"}
                          h="1.75rem"
                          size="sm"
                          onClick={handleClickConfirmPassword}
                        >
                          {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <FormErrorMessage>
                        <p>{errors.confirmPassword.message}</p>
                      </FormErrorMessage>
                    )}
                  </FormControl>
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

                <Flex gap={2} direction={{ base: "column", md: "row" }}>
                  <Box w={{ base: "100%", md: "50%" }}>
                    {enableAge && (
                      <>
                        <FormControl isInvalid={errors.age}>
                          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            Age
                          </FormLabel>
                          <Controller
                            name={"age"}
                            borderRadius={"0.3rem"}
                            control={control}
                            defaultValue={null}
                            rules={{
                              required: enableAge ? "Age is required" : false,
                              min: enableAge
                                ? {
                                    value: 14,
                                    message: "Age must be at least 14",
                                  }
                                : undefined,
                              max: enableAge
                                ? {
                                    value: 120,
                                    message: "Age must be at most 120",
                                  }
                                : undefined,
                            }}
                            render={({ field }) => (
                              <>
                                <NumberInput mb={"8px"}>
                                  <NumberInputField
                                    {...field}
                                    fontSize="sm"
                                    placeholder="Enter your Age"
                                  />
                                  <NumberInputStepper></NumberInputStepper>
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
                    value={isLoading ? "Loading..." : "Sign Up"}
                    disabled={isLoading}
                  ></Input>
                </LightMode>

                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  maxW="100%"
                  mt="0px"
                >
                  <Text color={"black"} fontWeight="medium">
                    Already have an account?
                    <Link></Link>
                    <Link
                      color={"black"}
                      ms="12px"
                      to="/login"
                      fontWeight="bold"
                      style={{ textDecoration: "underline" }}
                    >
                      Log In
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Register;
