/* -------------Importing Part------------------ */
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import ChatBox from "../Components/miscellaneous/ChatBox";
import MyChats from "../Components/miscellaneous/MyChats";

/* -------------------------------------------- */
export const ChatPage = () => {
	const user = "true";
	return (
		<Box w={"100%"}>
			{user && <SideDrawer />}

			<Box
				display={"flex"}
				justifyContent={"space-between"}
				w={"100%"}
				h={"90vh"}
				p={4}
			>
				{user && <MyChats />}
				{user && <ChatBox />}
			</Box>
		</Box>
	);
};
