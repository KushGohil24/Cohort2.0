import axios from "axios";

function getBaseUrl() {
    return (import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:3000";
}

const API = axios.create({
    baseURL: getBaseUrl() + "/api",
    withCredentials: true
})

// Add request interceptor
API.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;