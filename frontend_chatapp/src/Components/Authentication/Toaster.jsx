import React from "react";
import { useToast } from "@chakra-ui/react";
export function Toaster(title, message, duration) {
    const toast = useToast();
    return toast({
        title: title,
        description: message,
        status: "success",
        duration: duration,
        isClosable: true,
    });
}
