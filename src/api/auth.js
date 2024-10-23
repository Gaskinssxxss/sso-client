import axios from "axios";

const API_URL = "http://localhost:5000";

export const getCsrfToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

export const register = async (userData, csrfToken) => {
  try {
    return await axios.post(`${API_URL}/api/auth/register`, userData, {
      headers: { "csrf-token": csrfToken },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const login = async (userData, csrfToken) => {
  try {
    return await axios.post(`${API_URL}/api/auth/login`, userData, {
      headers: {
        "csrf-token": csrfToken,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    return await axios.post(
      `${API_URL}/api/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

export const logout = async (csrfToken) => {
  try {
    return await axios.post(
      `${API_URL}/api/auth/logout`,
      {},
      {
        headers: { "csrf-token": csrfToken },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
