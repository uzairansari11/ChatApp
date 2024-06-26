import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useChatState } from "../Context/ChatContextProvider";
import UserList from "../UserList/UserList";
import Chatloading from "./Chatloading";
import UserBadgeItem from "../UserList/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chat, setChat } = useChatState();

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user?search=${search}`,
        config
      );

      setLoading(false);

      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Opps!!!",
        description: "Failed To Retrive Data",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleGroupUser = (userData) => {
    if (selectedUser.includes(userData)) {
      toast({
        title: "User Already Added",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUser([...selectedUser, userData]);
  };

  const handleDelete = (userData) => {
    setSelectedUser(
      selectedUser.filter(
        (particularUser) => particularUser._id !== userData._id
      )
    );
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUser.length === 0) {
      toast({
        title: "Please Fill All Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
        },
        config
      );

      setLoading(false);

      setChat([data, ...chat]);

      onClose();

      toast({
        title: `${groupChatName}   Created`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Opps!!!",
        description: "Failed To Create Group",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setSelectedUser([]);
      setSearchResult([]);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            fontSize={"20px"}
          >
            Create Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={2}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add Users"
                mb={2}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Box display={"flex"} m={"auto"}>
            {selectedUser.map((user) => {
              return (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              );
            })}
          </Box>
          <Box px={4}>
            {loading ? (
              <Chatloading number={3} />
            ) : (
              searchResult
                ?.map((user) => {
                  return (
                    <UserList
                      key={user._id}
                      user={user}
                      handleUser={() => handleGroupUser(user)}
                    />
                  );
                })
                .splice(0, 3)
            )}
          </Box>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
