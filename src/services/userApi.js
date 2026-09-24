import api from "./api";

// Login
export const loginUser = async (data) => {
  const response = await api.post("/users/login", data);
  return response.data;
};

// Register
export const registerUser = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

// Get all users
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Update user
export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};