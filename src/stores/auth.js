import { defineStore } from "pinia";
import Cookies from "js-cookie";
import {
  login,
  register,
  refreshToken,
  logout,
  getCsrfToken,
} from "@/api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    accessToken: Cookies.get("accessToken") || null,
    csrfToken: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async fetchCsrfToken() {
      try {
        const csrfToken = await getCsrfToken();
        this.csrfToken = csrfToken;
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    },

    async register(userData) {
      await this.fetchCsrfToken();
      try {
        const response = await register(userData, this.csrfToken);
        this.user = response.data.user;
        this.accessToken = response.data.accessToken;

        Cookies.set("user", JSON.stringify(this.user), { expires: 7 });
        Cookies.set("accessToken", this.accessToken, { expires: 7 });
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },

    async login(userData) {
      await this.fetchCsrfToken();
      try {
        const response = await login(userData, this.csrfToken);
        this.user = response.data.user;
        this.accessToken = response.data.accessToken;

        Cookies.set("user", JSON.stringify(this.user), { expires: 7 });
        Cookies.set("accessToken", this.accessToken, { expires: 7 });
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async logout() {
      await this.fetchCsrfToken();
      try {
        await logout(this.csrfToken);

        this.user = null;
        this.accessToken = null;
        this.csrfToken = null;

        Cookies.remove("user");
        Cookies.remove("accessToken");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    async refreshToken() {
      try {
        const response = await refreshToken();
        this.accessToken = response.data.accessToken;

        Cookies.set("accessToken", this.accessToken, { expires: 7 });
      } catch (error) {
        console.error("Refresh token failed:", error);
      }
    },
  },
});
