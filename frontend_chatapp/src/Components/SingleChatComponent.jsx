import React from "react";
import { useChatState } from "./Context/ChatContextProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getDetails, getSender } from "./config/Chatlogic";
import UserModal from "./miscellaneous/UserModel";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChatComponent = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = useChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "20px", md: "25px" }}
                        pb={3}
                        px={2}
                        w={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}

                                <UserModal user={getDetails(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}

                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        )}
                    </Text>

                    <Box
                        display={"flex"}
                        flexDir={"columns"}
                        justifyContent={"flex-end"}
                        p="3"
                        bg={"teal"}
                        w={"100%"}
                        h="100%"
                        borderRadius={"lg"}
                        overflowY={"hidden"}
                    >
                        Chatting ... messaging ...
                    </Box>
                </>
            ) : (
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h="100%"
                >
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Select User For Chatting
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChatComponent;
