import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserList = ({ user, handleUser }) => {
	return (
		<Box
			onClick={handleUser}
			cursor="pointer"
			w="100%"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			color="black"
			p={3}
			mb={2}
			borderRadius="lg"
			boxShadow="md"
			_hover={{
				bg: "teal",
				color: "white",
			}}
		>
			<Box display="flex" alignItems="center">
				<Avatar size="sm" mr={2} cursor="pointer" src={user.pic} />
				<Box>
					<Text fontSize="md" fontWeight="bold">
						{user.name}
					</Text>
					<Text fontSize="sm">{user.email}</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default UserList;
