export const getSender = (loggedUser, users) => {
	return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const getPicture = (loggedUser, users) => {
	return users[0]?._id === loggedUser?._id ? users[1]?.pic : users[0]?.pic;
};

export const getDetails = (loggedUser, users) => {
	return users[0]?._id === loggedUser._id ? users[1]?.pic : users[0];
};

export const isLastMessage = (messages, currentIndex, userId) => {
	return (
		currentIndex === messages.length - 1 &&
		messages[messages.length - 1].sender?._id !== userId &&
		messages[messages.length - 1].sender?._id
	);
};

export const isSameUser = (messages, currentMessage, currentIndex) => {
	return (
		currentIndex > 0 &&
		messages[currentIndex - 1].sender?._id === currentMessage.sender?._id
	);
};

export const isSameSender = (
	messages,
	currentMessage,
	currentIndex,
	userId,
) => {
	return (
		currentIndex < messages.length - 1 &&
		(messages[currentIndex + 1].sender._id !== currentMessage.sender._id ||
			messages[currentIndex + 1].sender._id === undefined) &&
		messages[currentIndex].sender._id !== userId
	);
};

export const isSameSenderMargin = (
	messages,
	currentMessage,
	currentIndex,
	userId,
) => {
	if (
		currentIndex < messages.length - 1 &&
		messages[currentIndex + 1].sender._id === currentMessage.sender._id &&
		messages[currentIndex].sender._id !== userId
	) {
		return 44;
	} else if (
		(currentIndex < messages.length - 1 &&
			messages[currentIndex + 1].sender._id !== currentMessage.sender._id &&
			messages[currentIndex].sender._id !== userId) ||
		(currentIndex === messages.length - 1 &&
			messages[currentIndex].sender._id !== userId)
	) {
		return 0;
	} else {
		return "auto";
	}
};
