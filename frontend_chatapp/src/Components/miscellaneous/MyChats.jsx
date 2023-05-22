import React, { useEffect, useState } from "react";
import { useChatState } from "../Context/ChatContextProvider";
import axios from "axios";
import {
	Box,
	Button,
	Stack,
	Text,
	useToast,
	Heading,
	Flex,
	Avatar,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Chatloading from "./Chatloading";
import { getPicture, getSender } from "../config/Chatlogic";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
	const { user, selectedChat, setSelectedChat, chat, setChat } = useChatState();
	const [loggedUser, setLoggedUser] = useState();
	const [loading, setLoading] = useState(true);
	const toast = useToast();

	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`http://localhost:4500/api/chat`,
				config,
			);

			setChat(data);
			setLoading(false);
		} catch (error) {
			toast({
				title: "Error Occurred",
				description: "Failed to retrieve data",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-left",
			});
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userDetails")));
		fetchChats();
	}, [fetchAgain]);

	return (
		<Box
			display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
			flexDir="column"
			alignItems="center"
			p={3}
			bg="white"
			w={{ base: "100%", md: "30%" }}
			borderRadius="lg"
			borderWidth="1px"
			boxShadow="md"
		>
			<Flex
				alignItems="center"
				px={4}
				bg="teal"
				w="100%"
				borderRadius="lg"
				borderWidth="1px"
				justifyContent="space-between"
				color="white"
				py={3}
			>
				<Heading as="h2" size={{ base: "sm", md: "xs" }}>
					My Chats
				</Heading>
				<GroupChatModal>
					<Button
						rightIcon={<AddIcon />}
						display="flex"
						size={{ base: "sm", md: "xs" }}
						_hover={{ bg: "teal", color: "white" }}
						bg="transparent"
					>
						New Group
					</Button>
				</GroupChatModal>
			</Flex>

			<Box
				display="flex"
				flexDir="column"
				p={3}
				w="100%"
				borderRadius="lg"
				overflowY="hidden"
			>
				{loading ? (
					<Chatloading number={10} />
				) : chat ? (
					<Stack overflowY="scroll" spacing={3}>
						{chat.map((ele) => {
							const senderName = !ele.isGroupChat
								? getSender(loggedUser, ele?.users)
								: ele?.chatName;

							const picture = !ele.isGroupChat
								? getPicture(loggedUser, ele?.users)
								: ele?.groupAdmin?.pic;

							return (
								<Box
									onClick={() => setSelectedChat(ele)}
									cursor="pointer"
									bg={selectedChat === ele ? "teal" : "white"}
									color={selectedChat === ele ? "white" : "black"}
									key={ele._id}
									boxShadow="lg"
									p={3}
									borderRadius="lg"
									transition="background-color 0.3s"
									_hover={{ bg: "teal", color: "white" }}
								>
									<Flex alignItems="center">
										<Avatar size="sm" src={picture} mr={3} />
										<Text fontWeight="bold" fontSize="md">
											{senderName}
										</Text>
									</Flex>
								</Box>
							);
						})}
					</Stack>
				) : (
					<Chatloading number={10} />
				)}
			</Box>
		</Box>
	);
};

export default MyChats;
