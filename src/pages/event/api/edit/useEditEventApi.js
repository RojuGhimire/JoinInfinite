import { useMutation, useQueryClient } from "react-query";
import { authorizationAxiosInstance } from "../../../../axios/Axios";
import {
  deleteFirebaseImage,
  generateUniqueId,
  handleFireBaseUpload,
} from "../../../../firebase/firebaseHelper";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useEditEventApi = () => {
  const navigate = useNavigate();

  async function editEvent(request) {
    const { id, data } = request;
    const uniqueId = generateUniqueId();
    try {
     
      const url = data.photo_url;
      if (url instanceof File) {
        data.photo_url = await handleFireBaseUpload(data.photo_url, uniqueId);
      }
      
      const res = await authorizationAxiosInstance.put(`/events/${id}`, data);
      return res;
      
    } catch (error) {
      deleteFirebaseImage(uniqueId);
      throw new Error(error);
    }
  }

  const queryClient = useQueryClient();

  const toast = useToast();

  const editEventMutation = useMutation({
    mutationFn: async (request) => await editEvent(request),
    onSuccess: async (response) => {
      toast({
        title: response.data.message,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/my-events");
      queryClient.invalidateQueries({ queryKey: ["getUserEvent"] });
      queryClient.invalidateQueries({ queryKey: ["organizer-events"] });
    },
    onError: async (error) => {
      console.log(error);
      toast({
        title: "Error updating event",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    editEventMutation,
  };
};
