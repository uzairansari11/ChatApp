import {
	Box,
	Button,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useChatState } from "../Context/ChatContextProvider";
import UserList from "../UserList/UserList";
import Chatloading from "./Chatloading";
import UserBadgeItem from "../UserList/UserBadgeItem";

const GroupChatModal = ({ children }) => {
	const { user, setUser, selectedChat, setSelectedChat, chat, setChat } = useChatState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUser, setSelectedUser] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleSearch = async (search) => {
		setSearch(search);
		if (!search) {
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`http://localhost:4500/user?search=${search}`,
				config,
			);
			setLoading(false);
			console.log(data);
			setSearchResult(data);
		} catch (error) {
			toast({
				title: "Error Occured",
				description: "Failed to retrieve data",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top-left",
			});
		}
	};
	const handleGroupUser = (userData) => {
		if (selectedUser.includes(userData)) {
			toast({
				title: "User Already Added",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
			return;
		}
		setSelectedUser([...selectedUser, userData]);
	};

	const handleDelete = (userData) => {
		setSelectedUser(selectedUser.filter((user) => user._id !== userData._id));
	};
	const handleSubmit = async () => {
		if (!groupChatName || selectedUser.length === 0) {
			toast({
				title: "Please Fill All Fields",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
			return;
		}
		try {
			setLoading(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(
				`http://localhost:4500/api/chat/group`,
				{
					name: groupChatName,
					users: JSON.stringify(selectedUser.map((u) => u._id))
				},
				config,
			);
			setLoading(false);
			console.log(data);
			setChat([data, ...chat]);
			onClose()
			toast({
				title: "New Group Created",
				status: "success",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		} catch (error) {
			toast({
				title: "Failed to Create Group",
				status: "error",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		}
	};

	return (
		<>
			<span onClick={onOpen}>{children}</span>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						display={"flex"}
						justifyContent={"center"}
						fontSize={"20px"}
					>
						Create Group 
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display={"flex"}
						flexDirection={"column"}
						alignItems={"center"}
					>
						<FormControl>
							<Input
								placeholder="Chat Name"
								mb={2}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
						</FormControl>

						<FormControl>
							<Input
								placeholder="Add Users"
								mb={2}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>
					</ModalBody>
					<Box display={"flex"} m={"auto"}>
						{selectedUser.map((user) => {
							return (
								<UserBadgeItem
									key={user._id}
									user={user}
									handleFunction={() => handleDelete(user)}
								/>
							);
						})}
					</Box>
					<Box px={4}>
						{loading ? (
							<Chatloading number={3} />
						) : (
							searchResult
								?.map((user) => {
									return (
										<UserList
											key={user._id}
											user={user}
											handleUser={() => handleGroupUser(user)}
										/>
									);
								})
								.splice(0, 3)
						)}
					</Box>
					<ModalFooter>
						<Button colorScheme="teal" onClick={handleSubmit}>
							Create Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GroupChatModal;
