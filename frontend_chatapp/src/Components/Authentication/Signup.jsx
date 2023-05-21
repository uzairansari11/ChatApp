import React, { useState } from "react";
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

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [pic, setPic] = useState(null);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const postDetails = (files) => {
		setLoading(true);
		if (files === undefined || files.length === 0) {
			toast({
				title: "Please Select an Image",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}

		const file = files[0];
		if (file.type === "image/jpeg" || file.type === "image/png") {
			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", "chatapp");
			data.append("cloud_name", "dwsahjt72");

			fetch("https://api.cloudinary.com/v1_1/dwsahjt72/image/upload", {
				method: "post",
				body: data,
			})
				.then((response) => response.json())
				.then((data) => {
					const picUrl = data.url.toString();
					setPic(picUrl);
					setLoading(false);
				})
				.catch((error) => {
					setLoading(false);
				});
		} else {
			toast({
				title: "Please Select a JPEG or PNG Image",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);

		if (!name || !email || !password || !pic) {
			toast({
				title: "Please Provide all required fields",
				status: "warning",
				duration: 2000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		} else {
			try {
				const res = await axios.post("http://localhost:4500/user/register", {
					name,
					email,
					password,
					pic,
				});
				setLoading(false);
				if (res.data) {
					toast({
						title: "User Has been registered",
						status: "success",
						duration: 2000,
						isClosable: true,
						position: "bottom",
					});
				}
			} catch (error) {
				setLoading(false);
				toast({
					title: error.message,
					status: "error",
					duration: 2000,
					isClosable: true,
					position: "bottom",
				});
			}
		}
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<VStack spacing={"5px"}>
			<FormControl isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					id="name"
					value={name}
					type="text"
					onChange={(e) => setName(e.target.value)}
					placeholder="Please Enter Your Name ...."
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					id="user_email"
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
						id="user_password"
						value={password}
						type={showPassword ? "text" : "password"}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Please Enter Your Password ...."
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
			<FormControl isRequired>
				<FormLabel>Upload Your Picture</FormLabel>
				<Input
					id="pic"
					type="file"
					border="none"
					accept="image/*"
					onChange={(e) => postDetails(e.target.files)}
				/>
			</FormControl>
			<Button
				width="100%"
				colorScheme="teal"
				mt={10}
				isLoading={loading}
				onClick={handleSubmit}
				_hover={{ bgColor: "teal.600" }}
				_active={{ bgColor: "teal.700" }}
				transition="background-color 0.3s ease"
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default Signup;
