import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth',{
    persist: true,
    state: () => ({
      token: null,
    }),
    actions: {
      setToken(token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      clearToken() {
        this.token = null;
        delete axios.defaults.headers.common['Authorization'];
      },
      async login(email, password) {
        try {
          const response = await axios.post('/api/login/', { email, password });
          this.setToken(response.data.token);
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