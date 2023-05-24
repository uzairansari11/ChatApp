import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [selectedChat, setSelectedChat] = useState();
	const [chat, setChat] = useState([]);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		setUser(userDetails);
	}, []);

	return (
		<ChatContext.Provider
			value={{
				user,
				setUser,
				selectedChat,
				setSelectedChat,
				chat,
				setChat,
				notifications,
				setNotifications,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatState = () => {

	return useContext(ChatContext);

};
