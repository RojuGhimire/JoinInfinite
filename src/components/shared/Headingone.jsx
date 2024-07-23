import { Heading } from "@chakra-ui/react";
import React from "react";

const Headingone = ({ title, textAlign }) => {
  return (
    <>
      <Heading 
        color={"black"}
        textAlign={textAlign ? textAlign : "center"}
        fontSize="22px"
        mb="2px"
      >
        {title}
      </Heading>
    </>
  );
};

export default Headingone;
