import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Chart = ({ ChartType }) => {
  const data = [
    {
      name: "Nov 1",
      LastYear: 500,
      ThisYear: 600,
    },
    {
      name: "Nov 2",
      LastYear: 1000,
      ThisYear: 1398,
    },
    {
      name: "Nov 3",
      LastYear: 2000,
      ThisYear: 2800,
    },
    {
      name: "Nov 4",
      LastYear: 3780,
      ThisYear: 3908,
    },
    {
      name: "Nov 5",
      LastYear: 4890,
      ThisYear: 4800,
    },
    {
      name: "Nov 6",
      LastYear: 3390,
      ThisYear: 3800,
    },
    {
      name: "Nov 7",
      LastYear: 4490,
      ThisYear: 4300,
    },
    {
      name: "Nov 8",
      LastYear: 5490,
      ThisYear: 5300,
    },
    {
      name: "Nov 9",
      LastYear: 6490,
      ThisYear: 6300,
    },
    {
      name: "Nov 10",
      LastYear: 5490,
      ThisYear: 5300,
    },
  ];

  const data1 = [
    {
      name: "Nov 1",
      height: 4000,
    },
    {
      name: "Nov 2",
      height: 3000,
    },
    {
      name: "Nov 3",
      height: 2000,
    },
    {
      name: "Nov 4",
      height: 2780,
    },
    {
      name: "Nov 5",
      height: 4000,
    },
    {
      name: "Nov 6",
      height: 2390,
    },
    {
      name: "Nov 7",
      height: 3490,
    },
  ];
  const data3 = [
    { name: "Group A", value: 10 },
    // { name: "Group B", value: 20 },
    // { name: "Group C", value: 30 },
    // { name: "Group D", value: 40 },
  ];


  return (
    <>
      <Box
        height={"400px"}
        borderRadius={"16px"}
        backgroundColor={
          ChartType === "chart1"
            ? "#efefef"
            : ChartType === "chart2"
            ? "#292929"
            : "#141212"
        }
        border={"2px solid black"}
        w={"40%"}
      >
        {ChartType === "chart3" ? null : (
          <>
            <Text
              pt={2}
              pl={4}
              fontFamily={"SF Pro"}
              fontWeight={"500"}
              color="#949494"
              fontSize="20px"
            >
              K2 EXPEDITION 2023
            </Text>
          </>
        )}

        {ChartType === "chart1" ? (
          <>
            <ResponsiveContainer height="90%">
              <LineChart
                data={data}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip contentStyle={{ fontSize: "12px" }} />
                <Legend />
                <Line
                  type="linear"
                  dataKey="ThisYear"
                  stroke="#cda342"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="linear"
                  dataKey="LastYear"
                  stroke="#8d8a8a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : ChartType === "chart2" ? (
          <>
            <ResponsiveContainer height="90%" width="100%">
              <AreaChart
                data={data1}
                margin={{
                  top: 30,
                  right: 0,
                  left: 16,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" fontSize={12} />

                <Tooltip contentStyle={{ fontSize: "12px" }} />
                <Area
                  type="monotone"
                  dataKey="height"
                  stroke="#707070"
                  strokeWidth={3}
                  fill="#212121"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : ChartType === "chart3" ? (
          <>
            <PieChart
              width={90}
              height={250}
              style={{ width: "100%", height: "100%" }}
            >
              <Pie
                data={data3}
                cx={"47%"}
                cy={"50%"}
                innerRadius={60}
                outerRadius={80}
                fill="#323233"
                dataKey="value"
              >
                {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
              </Pie>
            </PieChart>

            <Flex
              direction="column"
              align={"center"}
              justify={"center"}
              style={{
                position: "absolute",
                color: "white",
                top: "40%",
              }}
              left={{ base: "38%", md: "45%", lg: "30%", xl: "35%" }}
            >
              <Text color="#FFFFFF" fontSize="17px">
                Temperature
              </Text>
              <Text color="#FFFFFF" fontSize="50px" fontWeight={800}>
                60<sup>o</sup>
              </Text>
            </Flex>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Chart;
