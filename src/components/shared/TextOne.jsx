import { Text } from "@chakra-ui/react";
import React from "react";

const TextOne = ({ color, weight, textAlign, description }) => {
  return (
    <>
      <Text
        mb="36px"
        ms="4px"
        color={color ? color : "black"}
        fontWeight={weight ? weight : "bold"}
        fontSize={"15px"}
        textAlign={textAlign ? textAlign : "center"}
      >
        {description}
      </Text>
    </>
  );
};

export default TextOne;
