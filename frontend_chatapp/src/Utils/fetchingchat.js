/* Fetching Chats From Api */
import axios from "axios";

export const chatDataFromAPI = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};
