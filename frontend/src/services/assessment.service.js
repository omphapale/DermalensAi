import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: "BASE_URL",
    withCredentials: true,
})

export const generateAssessment = async ({
    symptoms,
    duration,
    bodyLocation,
    painLevel,
    imageFile
}) => {

    const formData = new FormData();

    formData.append("symptoms", symptoms);
    formData.append("duration", duration);
    formData.append("bodyLocation", bodyLocation);
    formData.append("pain", painLevel);
    formData.append("image", imageFile);

    const response = await api.post("/api/assessment/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const getAssessmentById = async (assessmentId) => {

    const response = await api.get(
        `/api/assessment/${assessmentId}`
    );

    return response.data;
};