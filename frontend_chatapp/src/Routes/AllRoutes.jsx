const { Route, Routes } = require("react-router-dom");
const { HomePage } = require("../Pages/HomePage");
const { ChatPage } = require("../Pages/ChatPage");

export const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/chats" element={<ChatPage />} />
		</Routes>
	);
};
