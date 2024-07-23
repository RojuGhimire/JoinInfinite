import { useMutation, useQueryClient } from "react-query";
import {
  deleteFirebaseImage,
  generateUniqueId,
  handleFireBaseUpload,
} from "../../../../firebase/firebaseHelper";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../../../context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authorizationAxiosInstance } from "../../../../axios/Axios";

export const usePostUserImageApi= () => {
  const navigate=useNavigate()
  const { setUserDetail } = useContext(UserContext);

  
  async function postUserImage(data) {
    const uniqueId = generateUniqueId();

    try {
      
      data.photo_url = await handleFireBaseUpload(data.photo_url, uniqueId);
      const res = await authorizationAxiosInstance.post(
        "/users/upload-profile",
        data
      );
      return res;
    } catch (error) {
      deleteFirebaseImage(uniqueId);
      throw new Error(error);
    }
  }

  const toast = useToast();
  const queryClient = useQueryClient();

  const postUserImageMutation = useMutation({
    mutationFn: async (request) => await postUserImage(request),
    onSuccess: async (response) => {
      setUserDetail(response.data);
      queryClient.invalidateQueries("organizer-events");
      navigate("/")
    },
    onError: async (error) => {
      toast({
        title: "Error",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const isLoading = postUserImageMutation.isLoading;

  return {
    postUserImageMutation,
    isLoading
  };
};
