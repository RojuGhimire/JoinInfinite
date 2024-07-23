import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useUserLogOutApi = () => {
  const navigate = useNavigate();

  async function userLogOut() {
    const res = await authorizationAxiosInstance.post("/users/logout");
    return res;
  }

  const postLogoutMutation = useMutation({
    mutationFn: async (request) => await userLogOut(request),
    onSuccess: async () => {
      navigate("/login");
    },
  });

  return {
    postLogoutMutation,
  };
};
