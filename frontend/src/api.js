import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API = axios.create({
    baseURL: BaseURL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Retry on network errors (1 retry)
API.interceptors.response.use(
    (res) => res,
    async (err) => {
        const cfg = err.config;
        if (!cfg._retry && err.code === "ERR_NETWORK") {
            cfg._retry = true;
            return API(cfg);
        }
        return Promise.reject(err);
    }
);