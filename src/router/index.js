
import { createRouter, createWebHistory } from 'vue-router';
import {helper} from '@/utils/helper.ts';

// Import layouts

import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ClubLayout from '@/layouts/ClubLayout.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';
import MemberLayout from '@/layouts/MemberLayout.vue';

// Import views
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Page from '@/views/Page.vue';
import Member from '@/views/member/index.vue';
import Category from '@/views/Category.vue';
import Tag from '@/views/Tag.vue';
import SearchPost from '@/views/Search.vue';
import Profile from '@/views/profile/index.vue';
import Status from '@/views/profile/status.vue';
import Notification from '@/views/notification/index.vue';
import PostList from '@/views/post/index.vue';
import PostCreate from '@/views/post/create.vue';
import VideoList from '@/views/video/index.vue';
import VideoCreate from '@/views/video/create.vue';
import PageList from '@/views/page/index.vue';
import PageCreate from '@/views/page/create.vue';
import ClubList from '@/views/club/index.vue';
import ClubCreate from '@/views/club/create.vue';
import ClubInfo from '@/views/club/info.vue';
import TicketList from '@/views/ticket/index.vue';
import TicketCreate from '@/views/ticket/create.vue';
import TicketMessages from '@/views/ticket/messages.vue';
import ChatList from '@/views/chat/index.vue';
import SubjectList from '@/views/subject/index.vue';
import SubjectCreate from '@/views/subject/create.vue';
import ClubFavorite from '@/views/club/favorite.vue';
import Followings from '@/views/follow/fallowings.vue';
import Followers from '@/views/follow/followers.vue';
import Block from '@/views/follow/block.vue';
import LeagueList from '@/views/league/index.vue';
import LeagueCreate from '@/views/league/create.vue';
import stepClubs from '@/views/step/clubs.vue';
import stepMatches from '@/views/step/matches.vue';
import LeagueClubs from '@/views/league/clubs.vue';
import LeagueSteps from '@/views/league/steps.vue';
import AdvertiseList from '@/views/advertise/index.vue';
import AdvertiseCreate from '@/views/advertise/create.vue';
import LiveList from '@/views/live/index.vue';
import LiveCreate from '@/views/live/create.vue';
import SportList from '@/views/sport/index.vue';
import SportCreate from '@/views/sport/create.vue';
import CountryList from '@/views/country/index.vue';
import CountryCreate from '@/views/country/create.vue';
import StatusList from '@/views/status/index.vue';
import StatusCreate from '@/views/status/create.vue';
import UserCreate from '@/views/user/create.vue';
import ChangePassword from '@/views/user/password.vue';
import UserList from '@/views/user/index.vue';
import Logout from '@/views/Auth/Logout.vue';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import { useAuthStore } from '@/stores/auth.ts';


const routes = [
  {
    path: '/auth',
    meta: { 
      layout: 'auth',
      requiresAuth: false,
     },
    component: AuthLayout,
    children: [
      
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        name: 'register',
        path: '/register',
        component: Register,
      },
      {
        name: 'logout',
        path: '/logout',
        component: Logout,
      },
      
    ],
  },
  {
    path: '/club',
    meta: { 
      layout: 'club',
      requiresAuth: false,
     },
    component: ClubLayout,
    children: [
      {
        name: 'club.info',
        path: '/club/:id',
        component: ClubInfo,
      }
    ],
  },
  {
    path: '/',
    meta: { 
      layout: 'main',
      requiresAuth: false,
     },
    component: MainLayout,
    children: [
      {
        name:'home',
        path: '',
        component: Home,
      },
      {
        name: 'news',
        path: '/news/:id/:slug',
        component: News,
      },
      {
        name: 'page',
        path: '/page/:slug',
        component: Page,
      },
      {
        name: 'category',
        path: '/category/:id/:title',
        component: Category,
      },
      {
        name: 'tag',
        path: '/tag/:id/:title',
        component: Tag,
      },
      {
        name: 'search',
        path: '/search',
        component: SearchPost,
      },
    ],
  },
  {
    path: '/member',
    meta: { 
      layout: 'member',
      requiresAuth: false,
     },
    component: MemberLayout,
    children: [
      {
        name: 'member',
        path: '/member/:id',
        component: Member,
      },
      {
        name: 'member.followings',
        path: '/member/:id/followings',
        component: Followings,
      },
      {
        name: 'member.followers',
        path: '/member/:id/followers',
        component: Followers,
      },
    ],
  },
  {
    path: '/profile',
    meta: { 
      layout: 'profile',
      requiresAuth: true,
    },
    component: ProfileLayout,
    children: [
      {
        name: 'profile',
        path: '',
        component: Profile,
      },
      {
        name: 'notification',
        path: '/profile/notifications',
        component: Notification,
      },
      {
        name: 'status.show',
        path: '/profile/:id',
        component: Status,
      },
      {
        name: 'video.index',
        permission: 'video_show',
        path: '/profile/videos',
        component: VideoList,
      },
      {
        name: 'video.create',
        meta: { 
          permission: 'video_store',
        },
        path: '/profile/videos/create',
        component: VideoCreate,
      },
      {
        name: 'video.edit',
        permission: 'video_update',
        path: '/profile/videos/:id',
        component: VideoCreate,
      },
      {
        name: 'post.index',
        permission: 'post_show',
        path: '/profile/posts',
        component: PostList,
      },
      {
        name: 'post.create',
        meta: { 
          permission: 'post_store',
        },
        path: '/profile/posts/create',
        component: PostCreate,
      },
      {
        name: 'post.edit',
        permission: 'post_update',
        path: '/profile/posts/:id',
        component: PostCreate,
      },
      {
        name: 'page.index',
        permission: 'page_show',
        path: '/profile/pages',
        component: PageList,
      },
      {
        name: 'page.create',
        permission: 'page_store',
        path: '/profile/pages/create',
        component: PageCreate,
      },
      {
        name: 'page.edit',
        permission: 'page_update',
        path: '/profile/pages/:id',
        component: PageCreate,
      },
      {
        name: 'follow.followings',
        path: '/profile/followings',
        component: Followings,
      },
      {
        name: 'follow.followers',
        path: '/profile/followers',
        component: Followers,
      },
      {
        name: 'block.users',
        path: '/profile/block-users',
        component: Block,
      },
      {
        name: 'club.favorite',
        path: '/profile/clubs/favorite',
        component: ClubFavorite,
      },
      {
        name: 'club.index',
        permission: 'club_show',
        path: '/profile/clubs',
        component: ClubList,
      },
      {
        name: 'club.create',
        permission: 'club_show',
        path: '/profile/clubs/create',
        component: ClubCreate,
      },
      {
        name: 'club.edit',
        permission: 'club_update',
        path: '/profile/clubs/:id',
        component: ClubCreate,
      },
      {
        name: 'league.index',
        permission: 'league_show',
        path: '/profile/leagues',
        component: LeagueList,
      },
      {
        name: 'league.create',
        permission: 'league_store',
        path: '/profile/leagues/create',
        component: LeagueCreate,
      },
      {
        name: 'league.edit',
        permission: 'league_update',
        path: '/profile/leagues/:id',
        component: LeagueCreate,
      },
      {
        name: 'league.clubs',
        permission: 'league_show',
        path: '/profile/leagues/:id/clubs',
        component: LeagueClubs,
      },
      {
        name: 'step.clubs',
        permission: 'step_show',
        path: '/profile/steps/:id/clubs',
        component: stepClubs,
      },
      {
        name: 'step.matches',
        permission: 'matche_show',
        path: '/profile/steps/:id/matches',
        component: stepMatches,
      },
      {
        name: 'league.steps',
        permission: 'league_show',
        path: '/profile/leagues/:id/steps',
        component: LeagueSteps,
      },
      {
        name: 'advertise.index',
        permission: 'advertise_show',
        path: '/profile/advertises',
        component: AdvertiseList,
      },
      {
        name: 'advertise.create',
        permission: 'advertise_store',
        path: '/profile/advertises/create',
        component: AdvertiseCreate,
      },
      {
        name: 'advertise.edit',
        permission: 'advertise_update',
        path: '/profile/advertises/:id',
        component: AdvertiseCreate,
      },
      {
        name: 'live.index',
        permission: 'live_show',
        path: '/profile/lives',
        component: LiveList,
      },
      {
        name: 'live.create',
        permission: 'live_store',
        path: '/profile/lives/create',
        component: LiveCreate,
      },
      {
        name: 'live.edit',
        permission: 'live_update',
        path: '/profile/lives/:id',
        component: LiveCreate,
      },
      {
        name: 'subject.index',
        permission: 'ticket_show',
        path: '/profile/subjects',
        component: SubjectList,
      },
      {
        name: 'subject.create',
        permission: 'subject_store',
        path: '/profile/subjects/create',
        component: SubjectCreate,
      },
      {
        name: 'subject.edit',
        permission: 'subject_update',
        path: '/profile/subjects/:id',
        component: SubjectCreate,
      },
      {
        name: 'ticket.index',
        permission: 'ticket_show',
        path: '/profile/tickets',
        component: TicketList,
      },
      {
        name: 'ticket.create',
        permission: 'ticket_store',
        path: '/profile/tickets/create',
        component: TicketCreate,
      },
      {
        name: 'ticket.show',
        permission: 'ticket_show',
        path: '/profile/tickets/:id',
        component: TicketMessages,
      },
      {
        name: 'chat.index',
        permission: 'chat_show',
        path: '/profile/chats/:id?',
        component: ChatList,
      },
      {
        name: 'sport.index',
        permission: 'sport_show',
        path: '/profile/sports',
        component: SportList,
      },
      {
        name: 'sport.create',
        permission: 'sport_store',
        path: '/profile/sports/create',
        component: SportCreate,
      },
      {
        name: 'sport.edit',
        permission: 'sport_update',
        path: '/profile/sports/:id',
        component: SportCreate,
      },
      {
        name: 'country.index',
        permission: 'country_show',
        path: '/profile/countries',
        component: CountryList,
      },
      {
        name: 'country.create',
        permission: 'country_store',
        path: '/profile/countries/create',
        component: CountryCreate,
      },
      {
        name: 'country.edit',
        permission: 'country_update',
        path: '/profile/countries/:id',
        component: CountryCreate,
      },
      {
        name: 'status.index',
        permission: 'status_show',
        path: '/profile/status',
        component: StatusList,
      },
      {
        name: 'status.create',
        permission: 'status_store',
        path: '/profile/status/create',
        component: StatusCreate,
      },
      {
        name: 'status.edit',
        permission: 'status_update',
        path: '/profile/status/:id',
        component: StatusCreate,
      },
      {
        name: 'account.edit',
        permission: 'account_update',
        path: '/profile/account',
        component: UserCreate,
      },
      {
        name: 'user.password',
        path: '/profile/users/change-password',
        component: ChangePassword,
      },
      {
        name: 'user.edit',
        permission: 'user_update',
        path: '/profile/users/edit/:id',
        component: UserCreate,
      },
      {
        name: 'user.index',
        permission: 'user_show',
        path: '/profile/users',
        component: UserList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next('/login');
  } else {
    if (authStore.isAuthenticated && ['login', 'register'].includes(to.name)) {
        next('/profile');
    } else {
      // Otherwise, allow access to the route
      if (!to?.meta?.permission?.length || authStore.permissions.includes(to?.meta?.permission)) {
        next();
      } else {
        next('/profile');
      }
    }
  }

  helper().goToTop();
});

// router.afterEach((to) => {
//   const layout = to.meta.layout;
//   if (layout === 'main') {
//     require('@/assets/site/css/splide.min.css');
//     require('@/assets/site/css/styles.css');

//   } else {
//     require('@/assets/profile/css/custom.css');
//     require('@/assets/profile/css/styles.css');
//   }
// });

export default router;