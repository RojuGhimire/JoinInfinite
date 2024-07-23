import { useAdminLogoutApi } from "./useAdminLogoutapi";


export const useAdminLogOut = () => {
  const { postLogoutMutation } = useAdminLogoutApi();

  const onSubmitLogOut = () => {
    postLogoutMutation.mutate();
    localStorage.clear();
  };

  return {
    onSubmitLogOut
  };
};
