import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
	isLastMessage,
	isSameSender,
	isSameSenderMargin,
} from "../config/Chatlogic";
import { useChatState } from "../Context/ChatContextProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
const ScrollableChat = ({ messages }) => {
	const { user } = useChatState();
	return (
		<ScrollableFeed>
			{messages &&
				messages.map((currentMessage, index) => {
					return (
						<div style={{ display: "flex" }} key={currentMessage._id}>
							{(isSameSender(messages, currentMessage, index, user._id) ||
								isLastMessage(messages, index, user._id)) && (
								<Tooltip
									label={currentMessage.sender.name}
									placement="bottom-start"
									hasArrow
								>
									<Avatar
										mt="6px"
										mr={"1"}
										size={"sm"}
										cursor={"pointer"}
										name={currentMessage.sender.name}
										src={currentMessage.sender.pic}
									/>
								</Tooltip>
							)}
							<span
								style={{
									backgroundColor: `${
										currentMessage.sender._id === user._id
											? "#BEE3F8"
											: "#B9F5D0"
									}`,
									borderRadius: "20px",
									padding: "5px 15px",
									marginLeft: isSameSenderMargin(
										messages,
										currentMessage,
										index,
										user._id,
									),
									marginTop: isSameSender(
										messages,
										currentMessage,
										index,
										user._id,
									)
										? 3
										: 10,

									maxWidth: "75%",
								}}
							>
								{currentMessage.content}
							</span>
						</div>
					);
				})}
		</ScrollableFeed>
	);
};

export default ScrollableChat;
