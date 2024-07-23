import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

const LabelInput = ({
  label,
  type,
  register,
  registerName,
  errors,
  placeHolder,
  errorMessage,
}) => {
  return (
    <>
      <FormControl isInvalid={!!errors[registerName]}>
        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
          {label}
        </FormLabel>
        <Input
          fontSize="sm"
          ms={{ base: "0px", md: "4px" }}
          type={type}
          placeholder={placeHolder}
          mb={"8px"}
          size="lg"
          {...register(registerName, { required: true })}
        />
        {!!errors[registerName] && (
          <FormErrorMessage>
            <p>{errorMessage}</p>
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default LabelInput;
