import React, { useContext, useState } from "react";
import SettingSidebar from "../../components/ui/setting/SettingSidebar";
import "../../styles/setting.css";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/Context";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {usePostUserPasswordApi} from "../setting/api/post-user/usePostUserPasswordApi"

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [showoldPassword, setShowoldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userDetail } = useContext(UserContext);

  const { postUserPasswordMutation, isLoading } = usePostUserPasswordApi();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmitChangePassword = async ({ old_password, new_password }) => {
    const data = {
      old_password,
      new_password,
    };
    await postUserPasswordMutation.mutate(data);
  };

  const password = watch("new_password", "");

  
  const handleClickOldPassword = () => setShowoldPassword(!showoldPassword);
  const handleClickNewPassword = () => setShow(!show);
  const handleClickConfirmPassword = () =>setShowConfirmPassword(!showConfirmPassword);
  return (
    <>
      {userDetail && (
        <div className="settingContainer">
          <SettingSidebar />

          <main className="dashboard">
            <Box mb={5}>
              <Heading fontSize={"1.5rem"} pb={5}>
                Change User Password
              </Heading>
            </Box>
            <form
              onSubmit={handleSubmit((data) => onSubmitChangePassword(data))}
            >
              <Flex
                w="100%"
                h="50vh"
                alignItems="center"
                justifyContent="center"
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                flexDirection="column"
              >
                <Flex
                  zIndex="2"
                  direction="column"
                  w={{ base: "100%", md: "900px" }}
                  maxW="100%"
                  background="transparent"
                  me="auto"
                  mb={{ base: "20px", md: "auto" }}
                  p={2}
                >
                  <Flex gap={2} direction={{ base: "column", md: "row" }}>
                    <FormControl isInvalid={errors.old_password} mt={4}>
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Old Password
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          fontSize="sm"
                          ms={{ base: "0px", md: "4px" }}
                          type={showoldPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          mb="8px"
                          size="lg"
                          {...register("old_password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message:
                                "Password must have at least 8 characters",
                            },
                          })}
                        />

                        <InputRightElement width="4.5rem" mt={1}>
                          <Button
                            backgroundColor={"transparent"}
                            border={"none"}
                            h="1.75rem"
                            size="sm"
                            onClick={handleClickOldPassword}
                          >
                            {showoldPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {errors.old_password && (
                        <FormErrorMessage>
                          <p>
                            {errors.old_password && errors.old_password.message}
                          </p>
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>

                  <Flex gap={2} direction={{ base: "column", md: "row" }}>
                    <FormControl isInvalid={errors.new_password} mt={4}>
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        New Password
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          fontSize="sm"
                          ms={{ base: "0px", md: "4px" }}
                          type={show ? "text" : "password"}
                          placeholder="Enter your password"
                          mb="8px"
                          size="lg"
                          {...register("new_password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message:
                                "Password must have at least 8 characters",
                            },
                          })}
                        />

                        <InputRightElement width="4.5rem" mt={1}>
                          <Button
                            backgroundColor={"transparent"}
                            border={"none"}
                            h="1.75rem"
                            size="sm"
                            onClick={handleClickNewPassword}
                          >
                            {show ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {errors.new_password && (
                        <FormErrorMessage>
                          <p>
                            {errors.new_password && errors.new_password.message}
                          </p>
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>

                  <Flex gap={2} direction={{ base: "column", md: "row" }}>
                    <FormControl isInvalid={errors.confirmPassword} mt={4}>
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Confirm Password
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          fontSize="sm"
                          ms={{ base: "0px", md: "4px" }}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          mb="8px"
                          size="lg"
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                        />

                        <InputRightElement width="4.5rem" mt={1}>
                          <Button
                            backgroundColor={"transparent"}
                            border={"none"}
                            h="1.75rem"
                            size="sm"
                            onClick={handleClickConfirmPassword}
                          >
                            {showConfirmPassword ? (
                              <ViewIcon />
                            ) : (
                              <ViewOffIcon />
                            )}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {errors.confirmPassword && (
                        <FormErrorMessage>
                          <p>{errors.confirmPassword.message}</p>
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>

                  <LightMode>
                    <Input
                      type="submit"
                      fontSize="14px"
                      colorScheme="blue"
                      fontWeight="bold"
                      cursor={"pointer"}
                      w="100%"
                      h="45"
                      mt={"15px"}
                      mb="8px"
                      value={isLoading ? "Loading..." : "Update"}
                      disabled={isLoading}
                    ></Input>
                  </LightMode>
                </Flex>
              </Flex>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
