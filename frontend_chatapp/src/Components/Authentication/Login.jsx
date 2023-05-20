import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const handleLogin = async () => {
		setLoading(true);
		const payload = { email, password };
		try {
			const res = await axios.post("http://localhost:4500/user/login", payload);
			const token = res.data.token;

			if (token) {
				localStorage.setItem("token", token);
				setLoading(false);
				toast({
					title: "Login Successful",
					description: "Redirecting ....",
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			} else {
				setLoading(false);
				toast({
					title: "Login Failed",
					description: "Wrong Crediential",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			setLoading(false);
			toast({
				title: "Something went wrong",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}

	};
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
			<Button
				width={"100%"}
				colorScheme={"red"}
				mt={10}
				onClick={handleLogin}
				isLoading={loading}
			>
				Login
			</Button>
		</VStack>
	);
};

export default Signup;
