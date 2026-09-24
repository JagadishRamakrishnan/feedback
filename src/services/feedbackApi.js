import api from "./api";

// Create feedback
export const createFeedback = async (data) => {
  const response = await api.post("/feedbacks", data);
  return response.data;
};

// Get all feedback
export const getFeedbacks = async () => {
  const response = await api.get("/feedbacks");
  return response.data;
};

// Get feedback by ID
export const getFeedbackById = async (id) => {
  const response = await api.get(`/feedbacks/${id}`);
  return response.data;
};

// Update feedback
export const updateFeedback = async (id, data) => {
  const response = await api.put(`/feedbacks/${id}`, data);
  return response.data;
};

// Delete feedback
export const deleteFeedback = async (id) => {
  const response = await api.delete(`/feedbacks/${id}`);
  return response.data;
};
