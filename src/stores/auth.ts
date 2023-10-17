import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth',{
    persist: true,
    state: () => ({
      token: null,
      isAuthenticated: false,
    }),
    actions: {
      setToken(token) {
        this.isAuthenticated = true;
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      clearToken() {
        this.isAuthenticated = false;
        this.token = null;
        delete axios.defaults.headers.common['Authorization'];
      },
      async login(email, password) {
        try {
          const response = await axios.post('/api/login/', { email, password });

          if (response.data?.token?.length > 0) {
            this.setToken(response.data.token);
          }

        } catch (error) {
          console.error('Login Error:', error);
          throw error;
        }
      },
      async register(data) {
        try {
          const response = await axios.post('/api/register/', data);

          if (response.data?.token?.length > 0) {
            this.setToken(response.data.token);
          }

        } catch (error) {
          console.error('Login Error:', error);
          throw error;
        }
      },
      logout() {
        this.clearToken();
      },
    },
  });