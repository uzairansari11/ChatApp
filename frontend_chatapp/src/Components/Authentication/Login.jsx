import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	return (
		<VStack spacing={"5px"}>
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					id="email"
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Please Enter Your Email ...."
				/>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						id="password"
						value={password}
						type={show ? "text" : "password"}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Please Enter Your Password ...."
					/>
					<InputRightElement size={"md"}>
						<Button onClick={() => setShow(!show)} size={"md"} p={4} borderRadius={4}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button width={"100%"} colorScheme={"red"} mt={10}>
				Login
			</Button>
		</VStack>
	);
};

export default Signup;
