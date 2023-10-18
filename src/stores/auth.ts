import {defineStore} from "pinia";
import axios from "axios";


interface User {
  id: Number,
  fullname: String,
  nickName: String,
  biography: String,
  profile_photo_path: String,
  bg_photo_path: String,
  email: String,
  role_id: Number,
  point: Number,
}

interface State {
  isAuthenticated: Boolean,
  token: String,
  user: User|null
}

export const useAuthStore = defineStore('auth',{
    persist: true,
    state: () :State => ({
      token: '',
      isAuthenticated: false,
      user: {
        id: 0,
        fullname: '',
        nickName: '',
        biography: '',
        profile_photo_path: '',
        bg_photo_path: '',
        email: '',
        role_id: 1,
        point: 0,
      }
    }),
    actions: {
      setToken(token: String) {
        this.isAuthenticated = true;
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.setUser();
      },
      clearToken() {
        this.isAuthenticated = false;
        this.token = '';
        delete axios.defaults.headers.common['Authorization'];
      },
      async setUser() {
        try {
          const response = await axios.get('/api/profile/users/info');

          if (response.data) {
            this.user = response.data as User;
            this.user.fullname = response.data?.nickname?.length > 0 ? response.data.nickname : response.data.first_name + (response?.data?.last_name?.length > 0 ? ' ' + response?.data?.last_name : '');
            this.user.nickName = response.data?.nickname;
            this.user.biography = response.data?.biography;
            this.user.profile_photo_path = response.data?.profile_photo_path;
            this.user.bg_photo_path = response.data?.bg_photo_path;
            this.user.email = response.data?.email;
            this.user.role_id = response.data?.role_id;
            this.user.point = response.data?.point;

            console.log(this.user);
          }

        } catch (error) {
          console.error('Login Error:', error);
          throw error;
        }
      },
      async login(email: String, password: String) {
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
      async register(data: String) {
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