// axiosInstance.ts
import axios from 'axios';

// Define the server URL
export const serverUrl = 'https://localhost:443';

// Create Axios instance
const server = axios.create({
  baseURL: serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refreshes at once
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to add subscribers for refresh requests
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Notify all subscribers once the token has been refreshed
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Request interceptor to attach access token
server.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
server.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and request is not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue the request until the token is refreshed
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(server(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(`${serverUrl}/users/refresh-token`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        isRefreshing = false;
        onRefreshed(data.accessToken); // Notify all subscribers that the token is refreshed
        return server(originalRequest);
      } catch (err) {
        isRefreshing = false;
        onRefreshed(""); // Notify subscribers that refresh failed
         // Call the logout function to handle failed refresh
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default server;
