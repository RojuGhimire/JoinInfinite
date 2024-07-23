import { useToast } from "@chakra-ui/react";
import { axiosInstance } from "../../../axios/Axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const usePostRegisterApi = () => {
  const toast = useToast();
  const navigate = useNavigate();

  async function postRegister(data) {
    if(!data.age) 
    {
      data.age = '18'
    }
    const res = await axiosInstance.post("/users/register", data);
    return res;
  }

  const postRegisterMutation = useMutation({
    mutationFn: async (request) => await postRegister(request),
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
        title: error?.response?.data?.detail,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    postRegisterMutation,
  };
};
