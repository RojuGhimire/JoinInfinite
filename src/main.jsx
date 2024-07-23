import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import Routing from "./Routing";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import "react-datepicker/dist/react-datepicker.css";
import { UserProvider } from "./context/Context";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Routing />
          
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
