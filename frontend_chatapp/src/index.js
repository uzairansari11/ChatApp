import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ChatContextProvider } from "./Components/Context/ChatContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ChatContextProvider>
		<ChakraProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</ChatContextProvider>,
);