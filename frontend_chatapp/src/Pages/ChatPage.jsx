/* -------------Importing Part------------------ */
import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { chatDataFromAPI } from "../Utils/fetchingchat";

/* -------------------------------------------- */
export const ChatPage = () => {

    const url = "http://localhost:4500/api/chat"
    const [chats, setChats] = useState([]);


    /* ----------------------UseEffect & Logic---------------------- */
    useEffect(() => {
        window.scrollTo(0, 0);
        chatDataFromAPI(url).then((res) => {
            setChats(...chats, res);
        })
    }, []);
    /* -------------------------------------------- */
    return (
        <Box>
            {chats.length &&
                chats.map((users) => {
                    return <Text key={users._id}>{users.chatName}</Text>;
                })}
        </Box>
    );
};
