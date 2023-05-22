import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
	console.log("user from badge", user);
	return (
		<Box
			px={2}
			py={1}
			borderRadius={"lg"}
			m={1}
			mt={2}
			variant={"ghost"}
			cursor={"pointer"}
			onClick={handleFunction}
			display={"flex"}
			color={"black"}
			background={"teal"}
			alignItems={"center"}
			fontSize={"12px"}
			width={"inherit"}
			gap={"2"}
		>
			{user.name}
			<CloseIcon onClick={handleFunction} size="xs" />
		</Box>
	);
};

export default UserBadgeItem;
