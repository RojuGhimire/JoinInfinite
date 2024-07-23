import { Grid, Text } from "@chakra-ui/react";
import React from "react";

const Headingtwo = ({ title }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <Text fontSize={"1rem"} fontWeight="bold">
        {title}
      </Text>
    </Grid>
  );
};

export default Headingtwo;
