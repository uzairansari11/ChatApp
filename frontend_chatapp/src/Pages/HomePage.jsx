import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import AuthenticationTabs from "../Components/Authentication/AuthenticationTabs";

export const HomePage = () => {
	return (
		<Container maxW={"xl"} centerContent>
			<Box
				display={"flex"}
				width={"100%"}
				justifyContent={"center"}
				mt={2}
				borderTopRadius={4}
				boxShadow={"xl"}
				bgGradient="linear(to-r, teal.400, teal.600)"
				color="white"
				opacity={0.9}
			>
				<Text fontSize={"3xl"} >
					My Chat App
				</Text>
			</Box>

			<Box
				display={"flex"}
				justifyContent={"center"}
				width={"100%"}
				p={4}
				mt={4}
				borderBottomRadius={4}
				boxShadow={"lg"}
				bg="white"
				opacity={0.9}
			>
				<AuthenticationTabs />
			</Box>
		</Container>
	);
};
