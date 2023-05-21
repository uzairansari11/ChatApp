import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	const handleLogin = async () => {
		setLoading(true);
		const payload = { email, password };
		try {
			const res = await axios.post("http://localhost:4500/user/login", payload);
			const token = res.data.token;
			const resData = res.data.data;
			var data = { ...resData, token };
			if (token) {
				localStorage.setItem("userDetails", JSON.stringify(data));
				setTimeout(() => {
					setLoading(false);
					toast({
						title: "Login Successful",
						description: "Redirecting ....",
						status: "success",
						duration: 2000,
						isClosable: true,
					});
					navigate("/chats", { replace: true });
				}, 2000);
			} else {
				setLoading(false);
				toast({
					title: "Login Failed",
					description: "Wrong Credential",
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

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<VStack spacing={4} align="center">
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					id="email"
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Please enter your email..."
					borderRadius="md"
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						id="password"
						value={password}
						type={showPassword ? "text" : "password"}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Please enter your password..."
						borderRadius="md"
					/>
					<InputRightElement width="4.5rem">
						<Button
							h="1.75rem"
							size="sm"
							onClick={handleTogglePassword}
							borderRadius="md"
							_hover={{ bgColor: "gray.400" }}
							_active={{ bgColor: "gray.600" }}
						>
							{showPassword ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button
				width="100%"
				colorScheme="teal"
				mt={6}
				onClick={handleLogin}
				isLoading={loading}
				borderRadius="md"
				_hover={{ bgColor: "teal.600" }}
				_active={{ bgColor: "teal.700" }}
			>
				Login
			</Button>
		</VStack>
	);
};

export default Login;
