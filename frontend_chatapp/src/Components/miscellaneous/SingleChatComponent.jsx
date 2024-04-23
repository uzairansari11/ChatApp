import React, { useEffect, useRef, useState } from "react";
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
import "./style.css";

import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animation/typing.json";

var socket, selectedChatCompare;

const SingleChatComponent = ({ fetchAgain, setFetchAgain }) => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
  } = useChatState();
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const toast = useToast();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/messages/${selectedChat._id}`,
        config
      );
      setMessage(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/messages`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessage([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_BASE_URL}`);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notifications.includes(newMessageReceived)) {
          setNotifications([newMessageReceived, ...notifications]);
          // setFetchAgain(!fetchAgain)
        }
      } else {
        setMessage([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandlerIndicator = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) {
      return;
    }

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDifference = timeNow - lastTypingTime;
      if (timeDifference >= timerLength && isTyping) {
        socket.emit("stop typing", selectedChat._id);
        setIsTyping(false);
      }
    }, timerLength);
  };
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
            fontFamily={"sans-serif"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages && !selectedChat.isGroupChat ? (
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
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="scroll"
          >
            {loading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="100%"
              >
                <Spinner size="xl" color="blue.500" />
              </Box>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
                <div ref={messagesEndRef} />
              </div>
            )}
            {isTyping && (
              <div className="typing-indicator">
                <Lottie options={defaultOptions} width={70} />
              </div>
            )}
          </Box>
          <FormControl
            onKeyDown={sendMessage}
            id="first-name"
            isRequired
            mt={3}
          >
            <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message.."
              value={newMessage}
              onChange={typingHandlerIndicator}
            />
          </FormControl>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChatComponent;
