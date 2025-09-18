import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com/v1", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
