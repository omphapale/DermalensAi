import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
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