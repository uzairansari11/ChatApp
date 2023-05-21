import React, { useEffect } from "react";
import { useChatState } from "../Context/ChatContextProvider";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const MyChats = () => {
  const { user, setUser, selectedChat, setSelectedChat, chat, setChat } =
    useChatState();
  const toast = useToast()
  const fetchChats = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:4500/api/chat`,
        { userId },
        config,
      );

      setSelectedChat(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to retrieve data",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  useEffect(() => {
    fetchChats()

  }, []);
  return <div>my chats</div>;
};

export default MyChats;
