import { useMutation, useQueryClient } from "react-query";
import { authorizationAxiosInstance } from "../../../axios/Axios";

export const usePostUserLocation = () => {
  async function postUserLocation(request) {
    const res = await authorizationAxiosInstance.post("/users/login-location", {
      longitude: request.longitude,
      latitude: request.latitude,
    });
    return res;
  }

  const queryClient = useQueryClient();

  const postUserLocationMutation = useMutation({
    mutationFn: async (request) => await postUserLocation(request),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["all-events"] });
    },
  });

  return {
    postUserLocationMutation,
  };
};
