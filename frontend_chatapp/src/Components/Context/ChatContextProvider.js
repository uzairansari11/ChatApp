import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {

	const [user, setUser] = useState();
	const [selectedChat, setSelectedChat] = useState();
	const [chat, setChat] = useState([]);
	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		setUser(userDetails);
		
	}, []);

	return (
		<ChatContext.Provider
			value={{ user, setUser, selectedChat, setSelectedChat, chat, setChat }}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatState = () => {
	return useContext(ChatContext);
};
