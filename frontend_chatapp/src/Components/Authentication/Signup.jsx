import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { signUpSchema } from "../../validation/validate";
const SignUp = ({ onRegistrationComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const postDetails = (files) => {
    setPic(null);
    setLoading(true);
    if (files === undefined || files.length === 0) {
      toast("Please Select an Image");
      setLoading(false);
      return;
    }

    const file = files[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chatapp");
      data.append("cloud_name", "uzair11");

      fetch("https://api.cloudinary.com/v1_1/uzair11/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          const picUrl = data.url.toString();
          setPic(picUrl);
          setLoading(false);
          toast.success("Image Uploaded");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
          document.getElementById("pic").value = null;
        });
    } else {
      toast("Please Select a JPEG or PNG Image");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const validationResult = signUpSchema.safeParse({
        name,
        email,
        password,
        pic,
      });

      if (!validationResult.success) {
        console.log(validationResult.error);
        toast.error(validationResult.error.issues[0].message);
        setLoading(false);
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        {
          name,
          email,
          password,
          pic,
        }
      );
      setLoading(false);
      if (res.data) {
        toast.success("User Has been registered");
        onRegistrationComplete();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
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
          maxLength={30}
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
          maxLength={30}
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
            maxLength={16}
            minLength={8}
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

export default SignUp;
