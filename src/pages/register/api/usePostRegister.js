import { useForm } from "react-hook-form";
import { usePostRegisterApi } from "./usePostRegisterApi";

export const usePostRegister = () => {
  const { postRegisterMutation } = usePostRegisterApi();
  const { isLoading } = postRegisterMutation;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
    getValues,
  } = useForm();

  const onSubmitSignup = ({
    username,
    email,
    age,
    address,
    role,
    password,
    interested_genre,
  }) => {
    const data = {
      username,
      email,
      password,
      role,
      age,
      address,
      interested_genre: interested_genre.map((elem) => elem.value),
    };

    postRegisterMutation.mutate(data);
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    reset,
    onSubmitSignup,
    isLoading,
    watch,
    setValue,
    getValues,
  };
};
