import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";

import { useNavigate } from "react-router-dom";
import { authorizationAxiosInstance } from "../../../../axios/Axios";

export const usePostUserPasswordApi = () => {
  const navigate = useNavigate();
  const toast = useToast();

  async function postUserPassword(request) {
    const res = await authorizationAxiosInstance.post(
      `/users/change-password`,
      request
    );
    return res;
  }

  const postUserPasswordMutation = useMutation({
    mutationFn: async (request) => await postUserPassword(request),
    onSuccess: async (response) => {
      toast({
        title: response?.data?.message,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    },
    onError: async (error) => {
      toast({
        title: error?.response?.data?.detail,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const isLoading = postUserPasswordMutation.isLoading;

  return {
    postUserPasswordMutation,
    isLoading
  };
};
