import React from "react";
import { useChatState } from "../Context/ChatContextProvider";
import { Box } from "@chakra-ui/react";
import SingleChatComponent from "./SingleChatComponent";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	const { selectedChat } = useChatState();
	return (
		<Box
			display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
			alignItems={"center"}
			flexDir={"column"}
			w={{ base: "100%", md: "67%" }}
			bg={"white"}
			p={4}
			borderRadius={"lg"}
			borderWidth={"2px"}
		>
			<SingleChatComponent
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}
			/>
		</Box>
	);
};

export default ChatBox;
