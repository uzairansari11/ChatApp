import { ViewIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	Input,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useChatState } from "../Context/ChatContextProvider";
import UserBadgeItem from "../UserList/UserBadgeItem";
import axios from "axios";
import Chatloading from "./Chatloading";
import UserList from "../UserList/UserList";
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, selectedChat, setSelectedChat } = useChatState();
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameloading, setRenameLoading] = useState(false);
	const toast = useToast();
	const handleRemove = async (userData) => {
		if (selectedChat.groupAdmin._id !== user._id && userData._id !== user._id) {
			toast({
				title: "Only admin can remove ",
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
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.put(
				"http://localhost:4500/api/chat/group/remove",
				{
					chatId: selectedChat._id,
					userId: userData._id,
				},
				config,
			);

			userData._id === user._id ? setSelectedChat() : setSelectedChat(data);

			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (error) {
			toast({
				title: "Error Occured",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
		}
		setLoading(false);
	};
	const handleGroupUser = async (userData) => {
		if (selectedChat.users.find((u) => u._id === userData._id)) {
			toast({
				title: "User Already Added",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		if (selectedChat.groupAdmin._id !== user._id) {
			toast({
				title: "Only Admin Can Add Someone",
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
			const { data } = await axios.put(
				`http://localhost:4500/api/chat/group/add`,
				{
					chatId: selectedChat._id,
					userId: userData._id,
				},
				config,
			);
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (error) {
			toast({
				title: "Error Occured!",
				status: "warning",
				duration: 1000,
				isClosable: true,
				position: "top",
			});
			console.log(error);
		}

		setRenameLoading(false);
	};
	const handleRename = async () => {
		if (!groupChatName) return;

		try {
			setRenameLoading(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				"http://localhost:4500/api/chat/group/rename",
				{
					chatId: selectedChat._id,
					chatName: groupChatName,
				},
				config,
			);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (error) {
			toast({
				title: "Error Occured!",
				status: "warning",
				duration: 1000,
				isClosable: true,
				position: "top",
			});
			setRenameLoading(false);
		}
		setGroupChatName("");
	};
	const handleSearch = async (query) => {
		setSearch(query);
		if (!query) {
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

	return (
		<>
			<IconButton
				onClick={onOpen}
				icon={<ViewIcon />}
				display={{ base: "flex" }}
			/>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{selectedChat.chatName}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box w="initial" display={"flex"} flexWrap={"wrap"} pb={3}>
							{selectedChat.users.map((user) => {
								return (
									<UserBadgeItem
										key={user._id}
										user={user}
										handleFunction={() => handleRemove(user)}
									/>
								);
							})}
						</Box>

						<FormControl display={"flex"} gap={2}>
							<Input
								placeholder="Chat Name"
								mb={3}
								value={groupChatName}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
							<Button
								variant={"solid"}
								colorScheme="teal"
								isLoading={renameloading}
								onClick={handleRename}
							>
								Update
							</Button>
						</FormControl>

						<FormControl display={"flex"}>
							<Input
								placeholder="Add User "
								mb={1}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</FormControl>

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
					</ModalBody>

					<ModalFooter>
						<Button onClick={() => handleRemove(user)} colorScheme="red">
							Leave Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UpdateGroupChatModal;
