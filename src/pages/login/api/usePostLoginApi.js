import { axiosInstance } from "../../../axios/Axios";
import { useMutation } from "react-query";
import { UserContext } from "../../../context/Context";
import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const usePostLoginApi = () => {
  const toast = useToast();
  const navigate=useNavigate();
  const { setUserDetail } = useContext(UserContext);

  async function postLogin(data) {
    const res = await axiosInstance.post("/users/login?type=", data);
    return res;
  }

  const postLoginMutation = useMutation({
    mutationFn: async (request) => await postLogin(request),
    onSuccess: async (response) => {
      setUserDetail(response?.data?.user_details)
      localStorage.setItem("access_token", response?.data?.access_token);
      localStorage.setItem("refresh_token", response?.data?.refresh_token);
      localStorage.setItem("role", response?.data?.user_details?.role);
      localStorage.setItem("user_id", response?.data?.user_details?.id);
      navigate("/")
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

  return {
    postLoginMutation,
  };
};
