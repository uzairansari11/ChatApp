import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "../../validation/validate";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { email, password, showPassword } = formData;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const payload = { email, password };
      const validationResponse = loginSchema.safeParse(payload);

      if (!validationResponse.success) {
        const failedValidation = validationResponse.error.issues[0].message;
        toast.warning(failedValidation);
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        payload
      );
      const token = res.data.token;
      const resData = res.data.data;
      var data = { ...resData, token };
      if (token) {
        localStorage.setItem("userDetails", JSON.stringify(data));
        setTimeout(() => {
          setLoading(false);
          toast("Login Successful");
          navigate("/chats", { replace: true });
        }, 2000);
      } else {
        setLoading(false);
        toast("Login Failed");
      }
    } catch (error) {
      setLoading(false);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          value={formData.email}
          type="email"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Please enter your password..."
            borderRadius="md"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() =>
                setFormData({
                  ...formData,
                  showPassword: !showPassword,
                })
              }
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
