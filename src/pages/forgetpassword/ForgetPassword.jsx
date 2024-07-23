import React from "react";
import LabelInput from "../../components/shared/LabelInput";
import Headingtwo from "../../components/shared/Headingtwo";
import Headingone from "../../components/shared/Headingone";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import { useMutation } from "react-query";
import { axiosInstance } from "../../axios/Axios";

const ForgetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function ForgetPassword(request) {
    const res = await axiosInstance.post("/users/forget-password", request);
    return res;
  }

  const postForgetPassword = useMutation({
    mutationFn: async (request) => await ForgetPassword(request),
    onSuccess: async (response) => {
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
      console.log(error);
      toast({
        title: error?.response?.data?.detail,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    postForgetPassword.mutate(data);
  };

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={"5%"}
        flexDirection="column"
      >
        <Flex
          w="50%"
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            className=" mb-5 "
            src={Logo}
            alt="logo"
            style={{
              width: "10rem",
            }}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box padding={"1rem"} borderBottom="1px solid #EAEAEA">
              <Headingone title="Find Your Account" />
            </Box>
            <Box padding={"1rem"} borderBottom="1px solid #EAEAEA">
              <Heading mb={"15px"} fontSize={"17px"} fontWeight={"500"}>
                Please enter your email to change password for your account.
              </Heading>
              <LabelInput
                label={"Email Address"}
                type={"email"}
                register={register}
                registerName={"email"}
                errors={errors}
                placeHolder={"abc@xyz.com"}
                errorMessage={"Please Enter YouAddress"}
              />
            </Box>
            <Box m={"1rem"} float="right">
              <Button color="white" bg={"#0e09ac"} type="submit">
                Reset Password
              </Button>
            </Box>
            <Text color={"black"} fontWeight="medium" mt="20px">
              <Link
                color={"black"}
                ms="12px"
                to={"/login"}
                fontWeight="bold"
                style={{ textDecoration: "underline" }}
              >
                Back to Login
              </Link>
            </Text>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default ForgetPassword;
