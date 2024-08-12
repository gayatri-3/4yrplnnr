import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./themes";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);
