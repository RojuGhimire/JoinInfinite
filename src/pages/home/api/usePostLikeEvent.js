import { useMutation, useQueryClient } from "react-query";
import { authorizationAxiosInstance } from "../../../axios/Axios";

export const usePostLikeEvent = () => {
  async function postLikeEvent(request) {
    const res = await authorizationAxiosInstance.post(
      `/events/like/${request.id}`,
      {
        liked: request.like,
      }
    );
    return res;
  }

  // const postLikeEventMutation = useMutation(postLikeEvent)

  const queryClient = useQueryClient();

  const postLikeEventMutation = useMutation({
    mutationFn: async (request) => await postLikeEvent(request),
    onSuccess: async () => {
      queryClient.invalidateQueries("getUserAllEvent");
    },
    onError: async () => {},
  });

  return {
    postLikeEventMutation,
  };
};
