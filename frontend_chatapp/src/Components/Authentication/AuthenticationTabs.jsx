import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, SlideFade } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

const AuthenticationTabs = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabChange = (index) => {
		setTabIndex(index);
	};

	const handleRegistrationComplete = () => {
		setTabIndex(0); // Switch to login tab after successful registration
	};
	useEffect(() => {

	}, [tabIndex])
	return (
		<Tabs
			variant="soft-rounded"
			w={"100%"}
			colorScheme="teal"
			index={tabIndex}
			onChange={handleTabChange}
			isLazy
		>
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
					<SlideFade in={tabIndex === 0}>
						<Login />
					</SlideFade>
				</TabPanel>
				<TabPanel>
					<SlideFade in={tabIndex === 1}>
						<Signup onRegistrationComplete={handleRegistrationComplete} />
					</SlideFade>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default AuthenticationTabs;
