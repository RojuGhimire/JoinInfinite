import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { authorizationAxiosInstance } from "../../../../axios/Axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../context/Context";

export const usePutUserProfileApi = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUserDetail } = useContext(UserContext);

  async function putUserProfile(request) {
    const res = await authorizationAxiosInstance.put(
      `/users/${request.id}`,
      request.data
    );
    return res;
  }

  const putUserProfileMutation = useMutation({
    mutationFn: async (request) => await putUserProfile(request),
    onSuccess: async (response) => {
      setUserDetail(response.data);
      navigate("/");
    },
    onError: async (error) => {
      toast({
        title: error?.response?.data?.detail[0]?.msg,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const isLoading = putUserProfileMutation.isLoading;

  return {
    putUserProfileMutation,
    isLoading
  };
};
