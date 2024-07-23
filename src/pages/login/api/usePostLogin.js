import { usePostLoginApi } from "./usePostLoginApi";
import { useForm } from "react-hook-form";

export const usePostLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { postLoginMutation } = usePostLoginApi();
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
