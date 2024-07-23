import { useForm } from "react-hook-form";
import { usePostEventApi } from "./usePostEventApi";

export const usePostEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
  } = useForm();

  const { postEventMutation } = usePostEventApi();

  const {isLoading,isSuccess } = postEventMutation;

  const createevent = async(
    { event_name, photourl,description, date, location_address, genre, },
    location
  ) => {
  
    const alldata = {
      event_name,
      description,
      date,
      location_address,
      genre: genre.value,
      location_latitude: location.latitude,
      location_longitude: location.longitude,
      photourl,
    };


    await postEventMutation.mutateAsync(alldata);
  };



  return {
    register,
    handleSubmit,
    errors,
    control,
    isLoading,
    createevent,
    watch,
    setValue,
    reset,
    isSuccess
  };
};
