import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SlideFade,
} from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthenticationTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabNames = ["Login", "Sign Up"];
  const handleRegistrationComplete = () => {
    setTabIndex(0);
  };
  const tabComponents = [
    <Login />,
    <SignUp onRegistrationComplete={handleRegistrationComplete} />,
  ];

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

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
        {tabNames.map((name, index) => (
          <Tab
            key={index}
            width={"50%"}
            _selected={{
              color: "white",
              bg: "teal.600",
            }}
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabComponents.map((component, index) => (
          <TabPanel key={index}>
            <SlideFade in={tabIndex === index}>{component}</SlideFade>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default AuthenticationTabs;
