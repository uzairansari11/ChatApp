import { Avatar, Box, Text, background } from "@chakra-ui/react";
import React from "react";

const UserList = ({ user, handleUser }) => {
	return (
		<Box
			onClick={handleUser}
			cursor={"pointer"}
			w={"100%"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"space-around"}
			color={"black"}
			px={3}
			py={2}
			mb={2}
			borderRadius={"lg"}
            boxShadow={"md"}
            _hover={
                {
                    background: 'teal',
                    color: 'white',
                
                }
    
            }
		>
			<Avatar mr={2} size={"sm"} cursor={"pointer"} src={user.pic} />
			<Box w={"70%"} textAlign={"left"}>
				<Text>{user.name}</Text>
				<Text fontSize={"xs"}>
					<b>Email : </b>
					{user.email}
				</Text>
			</Box>
		</Box>
	);
};

export default UserList;
