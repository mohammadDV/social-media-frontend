
import { createRouter, createWebHistory } from 'vue-router';

// Import layouts

import MainLayout from '@/layouts/MainLayout.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

// Import views
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Category from '@/views/Category.vue';
import Profile from '@/views/profile/index.vue';
import PostList from '@/views/post/index.vue';
import PostCreate from '@/views/post/create.vue';
import PageList from '@/views/page/index.vue';
import PageCreate from '@/views/page/create.vue';
import ClubList from '@/views/club/index.vue';
import ClubCreate from '@/views/club/create.vue';
import ClubFavorite from '@/views/club/favorite.vue';
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
import UserCreate from '@/views/user/create.vue';
import ChangePassword from '@/views/user/password.vue';
import UserList from '@/views/user/index.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import { useAuthStore } from '@/stores/auth.ts';


const routes = [
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
        name: 'news',
        path: '/news/:id/:slug',
        component: News,
      },
      {
        name: 'category',
        path: '/category/:id/:title',
        component: Category,
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
        name: 'post.index',
        path: '/profile/posts',
        component: PostList,
      },
      {
        name: 'post.create',
        path: '/profile/posts/create',
        component: PostCreate,
      },
      {
        name: 'post.edit',
        path: '/profile/posts/:id',
        component: PostCreate,
      },
      {
        name: 'page.index',
        path: '/profile/pages',
        component: PageList,
      },
      {
        name: 'page.create',
        path: '/profile/pages/create',
        component: PageCreate,
      },
      {
        name: 'page.edit',
        path: '/profile/pages/:id',
        component: PageCreate,
      },
      {
        name: 'club.index',
        path: '/profile/clubs',
        component: ClubList,
      },
      {
        name: 'club.favorite',
        path: '/profile/clubs/favorite',
        component: ClubFavorite,
      },
      {
        name: 'club.create',
        path: '/profile/clubs/create',
        component: ClubCreate,
      },
      {
        name: 'club.edit',
        path: '/profile/clubs/:id',
        component: ClubCreate,
      },
      {
        name: 'league.index',
        path: '/profile/leagues',
        component: LeagueList,
      },
      {
        name: 'league.create',
        path: '/profile/leagues/create',
        component: LeagueCreate,
      },
      {
        name: 'league.edit',
        path: '/profile/leagues/:id',
        component: LeagueCreate,
      },
      {
        name: 'league.clubs',
        path: '/profile/leagues/:id/clubs',
        component: LeagueClubs,
      },
      {
        name: 'step.clubs',
        path: '/profile/steps/:id/clubs',
        component: stepClubs,
      },
      {
        name: 'step.matches',
        path: '/profile/steps/:id/matches',
        component: stepMatches,
      },
      {
        name: 'league.steps',
        path: '/profile/leagues/:id/steps',
        component: LeagueSteps,
      },
      {
        name: 'advertise.index',
        path: '/profile/advertises',
        component: AdvertiseList,
      },
      {
        name: 'advertise.create',
        path: '/profile/advertises/create',
        component: AdvertiseCreate,
      },
      {
        name: 'advertise.edit',
        path: '/profile/advertises/:id',
        component: AdvertiseCreate,
      },
      {
        name: 'live.index',
        path: '/profile/lives',
        component: LiveList,
      },
      {
        name: 'live.create',
        path: '/profile/lives/create',
        component: LiveCreate,
      },
      {
        name: 'live.edit',
        path: '/profile/lives/:id',
        component: LiveCreate,
      },
      {
        name: 'sport.index',
        path: '/profile/sports',
        component: SportList,
      },
      {
        name: 'sport.create',
        path: '/profile/sports/create',
        component: SportCreate,
      },
      {
        name: 'sport.edit',
        path: '/profile/sports/:id',
        component: SportCreate,
      },
      {
        name: 'country.index',
        path: '/profile/countries',
        component: CountryList,
      },
      {
        name: 'country.create',
        path: '/profile/countries/create',
        component: CountryCreate,
      },
      {
        name: 'country.edit',
        path: '/profile/countries/:id',
        component: CountryCreate,
      },
      {
        name: 'status.index',
        path: '/profile/status',
        component: StatusList,
      },
      {
        name: 'status.create',
        path: '/profile/status/create',
        component: PostCreate,
      },
      {
        name: 'status.edit',
        path: '/profile/status/:id',
        component: PostCreate,
      },
      {
        name: 'account.edit',
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
        path: '/profile/users/edit/:id',
        component: UserCreate,
      },
      {
        name: 'user.index',
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
      next();
    }
  }
});

router.afterEach((to) => {
  const layout = to.meta.layout;
  if (layout === 'main') {
    require('@/assets/site/fonts/vazir-ui/vazir.css');
    require('@/assets/site/fonts/material-icons/material-icons.css');
    require('@/assets/site/css/splide.min.css');
    require('@/assets/site/css/styles.css');

  } else if (layout === 'profile') {
    require('@/assets/profile/fonts/vazir-ui/vazir.css');
    require('@/assets/profile/fonts/material-icons/material-icons.css');
    require('@/assets/profile/css/custom.css');
    require('@/assets/profile/css/styles.css');
  }
});

export default router;