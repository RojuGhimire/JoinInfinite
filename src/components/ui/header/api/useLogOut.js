import { useUserLogOutApi } from "./useUserLogOutApi";

export const useLogOut = () => {
  const { postLogoutMutation } = useUserLogOutApi();

  const onSubmitLogOut = () => {
    postLogoutMutation.mutate();
    localStorage.clear();
  };

  return {
    onSubmitLogOut
  };
};
