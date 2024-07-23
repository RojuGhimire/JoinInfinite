import { useMutation, useQueryClient } from "react-query";
import {
  authorizationAxiosInstance,
  axiosInstance,
} from "../../../../axios/Axios";
import {
  deleteFirebaseImage,
  generateUniqueId,
  handleFireBaseUpload,
} from "../../../../firebase/firebaseHelper";
import { useToast } from "@chakra-ui/react";

export const usePostEventApi = () => {
  async function postEvent(data) {
    const uniqueId = generateUniqueId();
    try {
      
      data.photo_url = await handleFireBaseUpload(data.photourl, uniqueId);

      const res = await authorizationAxiosInstance.post("/events", data);
      return res;
    } catch (error) {
      deleteFirebaseImage(uniqueId);
      throw new Error(error);
    }
  }

  const queryClient = useQueryClient();

  const toast = useToast();

  const postEventMutation = useMutation({
    mutationFn: async (request) => await postEvent(request),
    onSuccess: async () => {
      toast({
        title: "Successful",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
 
      queryClient.invalidateQueries({ queryKey: ["getUserEvent"] });
      queryClient.invalidateQueries({ queryKey: ["organizer-events"] });
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
    postEventMutation,
  };
};
