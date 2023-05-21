import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	IconButton,
	Button,
	Image,
	Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
const UserModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton d={"flex"} icon={<ViewIcon />} onClick={onOpen} />
			)}

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent height={"300px"} background={"whiteAlpha.500"}>
					<ModalHeader
						fontSize={32}
						d="flex"
						justifyContent={"center"}
						m={"auto"}
					>
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						d="flex"
						flexDir={"column"}
						justifyContent={"space-around"}
						alignItems={"center"}
						m={"auto"}
					>
						<Image
							src={user.pic}
							alt={user.name}
							boxSize={"100px"}
							borderRadius={"full"}
							m={"auto"}
						/>
						<Text>{user.email}</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UserModal;
