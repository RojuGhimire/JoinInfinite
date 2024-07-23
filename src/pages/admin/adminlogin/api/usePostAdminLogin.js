import { usePostLoginAdminApi } from "./usePostLoginAdminApi";
import { useForm } from "react-hook-form";

export const usePostAdminLogin= () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { postLoginMutation } = usePostLoginAdminApi();
  const { isLoading, isSuccess } = postLoginMutation;

  const onSubmitLogIn = (data) => {
    postLoginMutation.mutate(data);
  
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmitLogIn,
    isLoading,
    isSuccess,
  };
};
