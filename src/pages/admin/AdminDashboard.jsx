import React from "react";
import Chart from "../../components/shared/Chart";
import { Box, Flex, Heading } from "@chakra-ui/react";

const AdminDashboard = () => {
  return (
    <Box w={"100%"} p={"2rem"}> 
        <Flex alignItems={"center"} justifyContent={"center"} p={"1rem"}>
        <Heading>Dashboard</Heading>
        </Flex>
      <Flex gap={"2rem"}>
      <Chart ChartType={"chart1"}  />
      <Chart ChartType={"chart2"} />
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
