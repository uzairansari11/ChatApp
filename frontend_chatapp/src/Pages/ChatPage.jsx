/* -------------Importing Part------------------ */
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import ChatBox from "../Components/miscellaneous/ChatBox";
import MyChats from "../Components/miscellaneous/MyChats";
import { useEffect, useState } from "react";
import { useChatState } from "../Components/Context/ChatContextProvider";

/* -------------------------------------------- */
export const ChatPage = () => {
	const { user, setUser } = useChatState();
	const [fetchAgain, setFetchAgain] = useState(false);

	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		setUser(userDetails);
	}, [setUser]);
	return (
		<Box w={"100%"}>
			{user && <SideDrawer />}

			<Box
				display={"flex"}
				justifyContent={"space-between"}
				w={"100%"}
				h={"85vh"}
				p={4}
			>
				{user && <MyChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				)}
			</Box>
		</Box>
	);
};
