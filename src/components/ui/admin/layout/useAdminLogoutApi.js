import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { adminauthorizationAxiosInstance } from "../../../../axios/Axios";

export const useAdminLogoutApi = () => {
  const navigate = useNavigate();

  async function userLogOut() {
    const res = await adminauthorizationAxiosInstance.post("/users/logout");
    return res;
  }

  const postLogoutMutation = useMutation({
    mutationFn: async (request) => await userLogOut(request),
    onSuccess: async () => {
      navigate("/admin/login");
    },
  });

  return {
    postLogoutMutation,
  };
};
