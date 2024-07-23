import React, { useState } from "react";
import Logo from "../../assets/logo.png";
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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Headingone from "../../components/shared/Headingone";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { axiosInstance } from "../../axios/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const { activationCode } = useParams();
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();
  const password = watch("new_password", "");

  const onSubmit = (data) => {
    postResetPasswordMutation.mutate({ data });
  };

  async function putUserProfile(request) {
    const res = await axiosInstance.post(
      `/users/reset-password/${activationCode}`,
      request.data
    );
    return res;
  }

  const postResetPasswordMutation = useMutation({
    mutationFn: async (request) => await putUserProfile(request),
    onSuccess: async (response) => {
      console.log(response);
      toast({
        title: response.data.message,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    },
    onError: async (error) => {
      toast({
        title: error.response.data.detail,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

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

          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                <Box me="auto" width={"100%"}>
                  <Headingone
                    title={`Reset Password for ${email}`}
                    textAlign={"center"}
                  />
                </Box>
              </Flex>

              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "40vw" }}
                maxW="100%"
                background="transparent"
                me="auto"
                mb={{ base: "20px", md: "auto" }}
                p={2}
              >
                <Flex gap={2} direction={"column"}>
                  <FormControl isInvalid={errors.new_password} mt={4}>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      New Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        fontSize="sm"
                        ms={{ base: "0px", md: "4px" }}
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        mb="8px"
                        size="lg"
                        {...register("new_password", {
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
                    {errors.new_password && (
                      <FormErrorMessage>
                        <p>
                          {errors.new_password && errors.new_password.message}
                        </p>
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.confirm_password} mt={4}>
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
                        {...register("confirm_password", {
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
                    {errors.confirm_password && (
                      <FormErrorMessage>
                        <p>{errors.confirm_password.message}</p>
                      </FormErrorMessage>
                    )}
                  </FormControl>
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
                    value={"Reset"}
                  ></Input>
                </LightMode>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default ResetPassword;
