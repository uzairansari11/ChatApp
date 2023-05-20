import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import AuthenticationTabs from "../Components/Authentication/AuthenticationTabs";

export const HomePage = () => {
	return (
		<Container maxW={"xl"} centerContent>
			<Box
				display={"flex"}
				p={"2"}
				width={"100%"}
				justifyContent={"center"}
				mt={4}
				borderTopRadius={4}
				boxShadow={"xl"}
			>
				<Text fontSize={"2xl"}>My Chat App</Text>
			</Box>

			<Box
				display={"flex"}
				justifyContent={"center"}
				width={"100%"}
				p={4}
				mt={4}
				borderBottomRadius={4}
				boxShadow={"lg"}
			>
				<AuthenticationTabs />
			</Box>
		</Container>
	);
};
