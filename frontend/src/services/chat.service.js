import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: "BASE_URL",
    withCredentials: true,
});

// GET /api/chat/:assessmentId
// Fetch previous messages for an assessment
export const getChatMessages = async (assessmentId) => {
    const response = await api.get(
        `/api/chat/${assessmentId}`
    );

    return response.data;
};

// POST /api/chat/:assessmentId
// Send a message and receive the AI response
export const sendChatMessage = async ({
    assessmentId,
    message,
}) => {
    const response = await api.post(
        `/api/chat/${assessmentId}`,
        { message }
    );

    return response.data;
};