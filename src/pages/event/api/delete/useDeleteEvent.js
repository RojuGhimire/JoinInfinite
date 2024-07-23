import { useForm } from "react-hook-form";
import { useDeleteEventApi } from "./useDeleteEventApi";
import { useToast } from "@chakra-ui/react";

export const useDeleteEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm();

  const { deleteEventMutation } = useDeleteEventApi();
  const { isSuccess, isError, data, error, isLoading } = deleteEventMutation;

  const onSubmit = async (alldata) => {
    try {
      // Perform any pre-submission logic here if needed
      await deleteEventMutation.mutate(alldata);
      // Perform any post-submission logic here if needed
    } catch (error) {
      // Handle errors if necessary
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    isLoading,
    isSuccess,
    watch,
    setValue,
    reset,
  };
};
