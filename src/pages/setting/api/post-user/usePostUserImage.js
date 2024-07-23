import { useForm } from "react-hook-form";
import { usePostUserImageApi } from "./usePostUserImageApi";

export const usePostUserImage = () => {
  const { handleSubmit, reset, setValue, watch } = useForm();

  const { postUserImageMutation,isLoading } = usePostUserImageApi();

  const postUserDetail = async (data) => {
    await postUserImageMutation.mutate(data);
  };

  return {
    handleSubmit,
    postUserDetail,
    reset,
    setValue,
    watch,
    isLoading
  };
};
