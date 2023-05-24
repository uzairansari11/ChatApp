import React, { useEffect, useState } from "react";
import { useChatState } from "../Context/ChatContextProvider";
import {
    Box,
    FormControl,
    IconButton,
    Input,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getDetails, getSender } from "../config/Chatlogic";
import UserModal from "./UserModel";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client"
const ENDPOINT = "http://localhost:4500"
var socket, selectedChatCompare
const SingleChatComponent = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = useChatState();
    const [messages, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)
    const toast = useToast();
    const fetchMessage = async () => {
        if (!selectedChat) return
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`http://localhost:4500/api/messages/${selectedChat._id}`, config)
            setMessage(data)
            setLoading(false)
            socket.emit("join chat", selectedChat._id)
        } catch (error) {
            toast({
                title: "Error Occured",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    }

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "http://localhost:4500/api/messages",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config,
                );
                socket.emit('new messagae', data);
                setMessage([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

    useEffect(() => {
        fetchMessage()
        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connection", () => setSocketConnected(true))
    }, [])

    useEffect(() => {
        socket.on('message recived', (newMessageRecived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecived.chat._id) {
                // give notification


            } else {
                setMessage([...messages, newMessageRecived])
            }
        })
    })
    console.log("message", messages)
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
                        bg={"#E0E0E0"}
                        w={"100%"}
                        h="100%"
                        borderRadius={"lg"}
                        overflowY={"hidden"}
                    >
                        {loading ? (
                            <Spinner
                                size={"lg"}
                                w={20}
                                h={20}
                                m={"auto"}
                                alignSelf={"center"}
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                    </Box>
                    <FormControl onKeyDown={sendMessage} isRequired mt={2}>
                        <Input
                            placeholder="ENTER MESSAGE .."
                            variant={"filled"}
                            bg={"#E0E0E0"}
                            onChange={typingHandler}
                            value={newMessage}
                        />
                    </FormControl>
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
