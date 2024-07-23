import { Box, Flex, Input } from "@chakra-ui/react";
import React from "react";
import SettingSidebar from "../../components/ui/setting/SettingSidebar";
import { usePostUserImage } from "./api/post-user/usePostUserImage";

const UploadProfile = () => {
  const {
    handleSubmit: userdetailhandlesubmit,
    postUserDetail,
    setValue: userDetailSetValue,
    watch: userDetailWatch,
    isLoading,
  } = usePostUserImage();

  //Upload User Image
  const selectedUserImage = userDetailWatch("photo_url");

  const handleUserImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      userDetailSetValue("photo_url", file);
    }
  };

  return (
    <>
      <div className="settingContainer">
        <SettingSidebar />

        <main className="dashboard">
          <form onSubmit={userdetailhandlesubmit(postUserDetail)}>
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
              <label htmlFor="fileInput">
                <Box
                  ms={{ base: "0px", md: "4px" }}
                  mb={"8px"}
                  size="lg"
                  fontSize="sm"
                  h={"15rem"}
                  border={"1px"}
                  borderColor={"gray"}
                  borderRadius={"5px"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ cursor: "pointer" }}
                >
                  {selectedUserImage ? (
                    <img
                      src={URL.createObjectURL(selectedUserImage)}
                      alt="Selected Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "Click to select an image"
                  )}
                </Box>
              </label>
              <Input
                id="fileInput"
                type="file"
                hidden
                fontSize="sm"
                ms={{ base: "0px", md: "4px" }}
                placeholder="Enter your event image"
                mb={"8px"}
                size="lg"
                onChange={handleUserImageChange}
              />

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
            </Flex>
          </form>
        </main>
      </div>
    </>
  );
};

export default UploadProfile;
