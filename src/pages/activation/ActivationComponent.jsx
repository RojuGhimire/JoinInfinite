import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/Axios";
import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const ActivationComponent = () => {
  const { activationCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const toast = useToast();

  async function getActivation(activation_token) {
    try {
      const res = await axiosInstance.get(
        `/users/activate/${activation_token}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  const { data, isLoading, isError, error } = useQuery("getalluserdata", () =>
    getActivation(activationCode)
  );

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate("/login");
        W;
      }, 3000);
    }

    if (isError) {
      toast({
        title: error.response.data.detail,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [data, isError, toast]);

  return (
    <Flex
      w={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      pt={"10%"}
      direction={"column"}
    >
      <Heading fontSize={"1.8rem"} fontWeight={"600"}>
        Activating Registration for {email}
      </Heading>
      {isLoading ? (
        <p>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </p>
      ) : data ? (
        <Flex w={"90vw"} height={"50vh"} justifyContent={"center"} mt={"10%"}>
          <Text
            mt={"5%"}
            fontSize={"1.4rem"}
            color={"green"}
            fontWeight={"600"}
          >
            Activation Successful.
          </Text>
        </Flex>
      ) : error ? (
        <Text mt={"5%"} fontSize={"1.4rem"} color={"red"} fontWeight={"600"}>
          Email Activation Error!!!
        </Text>
      ) : null}
    </Flex>
  );
};

export default ActivationComponent;
