import { useMutation, useQueryClient } from "react-query";
import { authorizationAxiosInstance } from "../../../axios/Axios";


export const usePostInterestedEvent = () => {
  async function postInterestedEvent(request) {
 
    const res = await authorizationAxiosInstance.post(
      `/events/interested/${request.id}`,{
        interested:request.interested
      }
    );
    return res;
  }

  const queryClient = useQueryClient();

  const postInterestedEventMutation = useMutation({
    mutationFn: async (request) => await postInterestedEvent(request),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getUserAllEvent"] });
    },
  });

  return {
    postInterestedEventMutation,
  };
};
