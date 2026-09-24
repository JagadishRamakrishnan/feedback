import api from "./api";

// Create assignment
export const createAssignment = async (data) => {
  const response = await api.post("/assignments", data);
  return response.data;
};

// Get all assignments
export const getAssignments = async () => {
  const response = await api.get("/assignments");
  return response.data;
};

// Get assignment by ID
export const getAssignmentById = async (id) => {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
};

// Update assignment
export const updateAssignment = async (id, data) => {
  const response = await api.put(`/assignments/${id}`, data);
  return response.data;
};

// Delete assignment
export const deleteAssignment = async (id) => {
  const response = await api.delete(`/assignments/${id}`);
  return response.data;
};