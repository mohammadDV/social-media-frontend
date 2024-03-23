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
  is_admin: Boolean,
  is_private: Boolean,
  clubs: null
}

interface State {
  isAuthenticated: Boolean,
  token: String,
  permissions: Array<string>,
  roles: Array<string>,
  menu: Array<any>,
  user: User|null
}

export const useAuthStore = defineStore('auth',{
    // persist: true,
    state: () :State => ({
      token: '',
      isAuthenticated: false,
      roles:[],
      permissions:[],
      menu: [{
            route: '/profile/posts',
            icon: 'article',
            name: 'site.Post management',
            matches: ['post.index'],
            permission: 'post_show',
        },{
            route: '/profile/videos',
            icon: 'article',
            name: 'site.Video management',
            matches: ['video.index'],
            permission: 'video_show',
        },{
          route: '/profile/status',
          icon: 'article',
          name: 'site.Status management',
          matches: ['status.index'],
          permission: 'status_show',
        },{
          route: '/profile/account',
          icon: 'article',
          name: 'site.Edit profile',
          matches: ['account.edit'],
        },{
          route: '/profile/chats',
          icon: 'article',
          name: 'site.Private messages',
          matches: ['chat.index'],
          permission: 'chat_show',
        },{
          route: '/profile/block-users',
          icon: 'block',
          name: 'site.Blocked users',
          matches: ['block.users'],
        },{
          route: '/profile/tickets',
          icon: 'article',
          name: 'site.Ticket management',
          matches: ['ticket.index'],
          permission: 'ticket_show',
        },{
          route: '/profile/subjects',
          icon: 'article',
          name: 'site.Ticket subjects management',
          matches: ['subject.index'],
          permission: 'subject_show',
        },{
          route: '/profile/users',
          icon: 'article',
          name: 'site.User management',
          matches: ['user.index'],
          permission: 'user_show',
        },{
          route: '/profile/clubs',
          icon: 'article',
          name: 'site.Club management',
          matches: ['club.index'],
          permission: 'club_show',
        },{
          route: '/profile/sports',
          icon: 'article',
          name: 'site.Sport management',
          matches: ['sport.index'],
          permission: 'sport_show',
        },{
          route: '/profile/countries',
          icon: 'article',
          name: 'site.Country management',
          matches: ['country.index'],
          permission: 'country_show',
        },{
          route: '/profile/lives',
          icon: 'article',
          name: 'site.Live management',
          matches: ['live.index'],
          permission: 'live_show',
        },{
          route: '/profile/advertises',
          icon: 'article',
          name: 'site.Advertise management',
          matches: ['advertise.index'],
          permission: 'advertise_show',
        },{
          route: '/profile/pages',
          icon: 'article',
          name: 'site.Page management',
          matches: ['page.index'],
          permission: 'page_show',
        },{
          route: '/profile/leagues',
          icon: 'article',
          name: 'site.League management',
          matches: ['league.index'],
          permission: 'league_show',
        },{
          route: '/profile/users/change-password',
          icon: 'article',
          name: 'site.Change password',
          matches: ['user.password'],
        },{
          route: '/profile/clubs/favorite',
          icon: 'article',
          name: 'site.Choose your favorite club',
          matches: ['club.favorite'],
        },
      ],
      user: {
        id: 0,
        fullname: '',
        nickName: '',
        biography: '',
        profile_photo_path: '',
        bg_photo_path: '',
        email: '',
        role_id: 1,
        clubs: null,
        is_admin: false,
        is_private: false,
        point: 0,
      }
    }),
    actions: {
      setToken(token: String) {
        this.isAuthenticated = true;
        this.token = token;
        this.setUser(token);
      },
      clearToken() {
        this.isAuthenticated = false;
        this.user = {
          id: 0,
          fullname: '',
          nickName: '',
          biography: '',
          profile_photo_path: '',
          bg_photo_path: '',
          email: '',
          role_id: 1,
          clubs: null,
          is_admin: false,
          is_private: false,
          point: 0,
        };
        this.token = '';
        delete axios.defaults.headers.common['Authorization'];
      },
      async setUser(token: String) {
        try {

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          const response = await axios.get('/api/user/info');

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
            this.user.clubs = response.data?.clubs;
            this.roles = response.data?.roles;
            this.user.is_admin = response.data?.is_admin;
            this.user.is_private = response.data?.is_private;
            this.permissions = response.data?.permissions;
          }

        } catch (error) {
          this.clearToken();
          console.error('Login Error:', error);
          throw error;
        }
      },
      logout() {
        this.clearToken();
      },
    },
  });