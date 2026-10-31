import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
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