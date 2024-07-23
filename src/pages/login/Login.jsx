import React, { useState } from "react";

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
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Logo from "../../assets/logo.png";

import Headingone from "../../components/shared/Headingone";
import LabelInput from "../../components/shared/LabelInput";
import TextOne from "../../components/shared/TextOne";
import { usePostLogin } from "./api/usePostLogin";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    handleSubmit,
    register,
    errors,
    onSubmitLogIn,
    isLoading,
  } = usePostLogin();

  return (
    <>
      <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >
          <img
            className=" mb-20 "
            src={Logo}
            alt="logo"
            style={{
              width: "15rem",
            }}
          />

          <form onSubmit={handleSubmit(onSubmitLogIn)}>
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
              <Box me="auto" width={"100%"}>
                <Headingone title={"Log In"} textAlign={"center"} />

                <TextOne
                  weight={"semibold"}
                  description={" Enter your email and password to login"}
                />
              </Box>

              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "350px" }}
                maxW="100%"
                background="transparent"
               
                me="auto"
                mb={{ base: "20px", md: "auto" }}
                
                p={2}
              >
                <LabelInput
                  label={"Email Address"}
                  type={"email"}
                  register={register}
                  registerName={"email"}
                  errors={errors}
                  placeHolder={"Enter your Email Address"}
                  errorMessage={"Please Enter Your Email"}
                />

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
                      {...register("password", { required: true })}
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
                      <p>Enter Your Password</p>
                    </FormErrorMessage>
                  )}
                </FormControl>

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
                    value={isLoading ? "Loading.." : "Log In"}
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
                    Dont have an account?
                    <Link></Link>
                    <Link
                      color={"black"}
                      ms="12px"
                      to="/register"
                      fontWeight="bold"
                      style={{ textDecoration: "underline" }}
                    >
                      Sign up
                    </Link>
                  </Text>
                  <Text color={"black"} fontWeight="medium" mt={"2"}>
                    <Link
                      color={"black"}
                      ms="12px"
                      to="/forgot-password"
                      fontWeight="bold"
                      style={{ textDecoration: "underline" }}
                    >
                        Forgot Password?
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

export default Login;
