import { useMutation, useQueryClient } from "react-query";
import { authorizationAxiosInstance,} from "../../../../axios/Axios";
import {deleteFirebaseImage,generateUniqueId, handleFireBaseUpload,} from "../../../../firebase/firebaseHelper";
import { useToast } from "@chakra-ui/react";

export const useDeleteEventApi = () => {

  async function deleteEvent(data) {
  
  
    const uniqueId = generateUniqueId();
    try {
      data.photo_url = await handleFireBaseUpload(data.photourl, uniqueId);
      const res = await authorizationAxiosInstance.delete("/events", data);
      return res;
    } catch (error) {
      deleteFirebaseImage(uniqueId);
      throw new Error(error);
    }
  }

  const queryClient = useQueryClient();

  const toast = useToast();

  const deleteEventMutation = useMutation({
    mutationFn:async (request) => await deleteEvent(request),
    onSuccess: async () => {
      toast({
        title: "Successful",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["getUserEvent"] });
    },
    onError: async () => {
      toast({
              title: "Error",
              position: "top-right",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
    },
  });

  return {
    deleteEventMutation,
  };
};
