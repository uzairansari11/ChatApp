import {
	Box,
	Button,
	Tooltip,
	Text,
	Menu,
	MenuButton,
	MenuList,
	Avatar,
	MenuDivider,
	Drawer,
	useDisclosure,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	Input,
	DrawerHeader,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import UserModal from "./UserModel";
import axios from "axios";
import Chatloading from "./Chatloading";
import UserList from "../UserList/UserList";
import { useChatState } from "../Context/ChatContextProvider";
import { useNavigate } from "react-router-dom";
const SideDrawer = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const navigate = useNavigate();

	const { user, setSelectedChat, chat, setChat } = useChatState();

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: "Please Enter Something",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "top-left",
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

	const asscessChat = async (userId) => {
		try {
			setLoading(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(
				`http://localhost:4500/api/chat`,
				{ userId },
				config,
			);
			if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat]);
			setLoading(false);
			setSelectedChat(data);
			onClose();
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
	useEffect(() => { }, [user]);
	const handleLogout = () => {

		toast({
			title: "Logout Initiated",
			status: "warning",
			duration: 1000,
			isClosable: true,
			position: 'top'
		});

		setTimeout(() => {
			localStorage.removeItem("userDetails");
			toast({
				title: "Logout Successful",
				status: "success",
				duration: 2000,
				isClosable: true,
				position: 'top'
			});
			navigate("/", { replace: true });
		}, 2000);
	};
	return (
		<>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
				w={"100%"}
				borderWidth={"5px"}
				background={"white"}
			>
				<Tooltip label="Search User" hasArrow placement="bottom">
					<Button variant={"ghost"} onClick={onOpen}>
						<Search2Icon />
						<Text d={{ base: "none", md: "flex" }} p={4}>
							Search User
						</Text>
					</Button>
				</Tooltip>

				<Text fontSize={"2xl"}>MY CHAT APP</Text>

				<div>
					<Menu>
						<MenuButton p={4}>
							<BellIcon fontSize={"2xl"} color={"red"} />
						</MenuButton>
						{/* <MenuList>

                    </MenuList> */}
					</Menu>

					<Menu p={2}>
						<MenuButton
							as={Button}
							rightIcon={<ChevronDownIcon />}
							colorScheme="transparent"
						>
							<Avatar
								size={"sm"}
								cursor={"pointer"}
								name={user.name}
								src={user.pic}
							/>
						</MenuButton>
						<MenuList p={1} textAlign={"center"} cursor={"pointer"}>
							<UserModal user={user}>
								<MenuList>My Profile</MenuList>
							</UserModal>

							<MenuDivider />
							<MenuList onClick={handleLogout}>Logout</MenuList>
						</MenuList>
					</Menu>
				</div>
			</Box>
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>Search Users</DrawerHeader>
					<DrawerBody>
						<Box
							d="flex"
							p="2"
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Input
								placeholder="Search by name or email.."
								mr={2}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								w={"70%"}
								variant={"flushed"}
								size={"sm"}
							/>
							<Button variant={"ghost"} onClick={handleSearch}>
								Go
							</Button>
						</Box>
						{loading ? (
							<Chatloading number={10} />
						) : (
							searchResult?.map((user) => {
								return (
									<UserList
										key={user._id}
										user={user}
										handleUser={() => asscessChat(user._id)}
									/>
								);
							})
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SideDrawer;
