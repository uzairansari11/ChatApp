import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

const AuthenticationTabs = () => {
	return (
		<Tabs variant="soft-rounded" w={"100%"} colorScheme="teal">
			<TabList mb={"1rem"} borderRadius="md" p={2}>
				<Tab
					width={"50%"}
					_selected={{
						color: "white",
						bg: "teal.600",
					}}
				>
					Login
				</Tab>
				<Tab
					width={"50%"}
					_selected={{
						color: "white",
						bg: "teal.600",
					}}
				>
					Sign Up
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<Login />
				</TabPanel>
				<TabPanel>
					<Signup />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default AuthenticationTabs;
