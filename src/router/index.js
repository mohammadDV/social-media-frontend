
import { createRouter, createWebHistory } from 'vue-router';

// Import layouts

import MainLayout from '@/layouts/MainLayout.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

// Import views
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import { useAuthStore } from '@/stores/auth.ts';


const routes = [
  {
    path: '/',
    meta: { 
      layout: 'mainLayout',
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
        path: '/news/:id/:slug',
        component: News,
      },
    ],
  },
  {
    path: '/profile',
    meta: { 
      layout: 'profileLayout',
      requiresAuth: true,
    },
    component: ProfileLayout,
    children: [
      {
        path: '',
        component: Profile,
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
  if (layout === 'mainLayout') {
    require('@/assets/site/fonts/vazir-ui/vazir.css');
    require('@/assets/site/fonts/material-icons/material-icons.css');
    require('@/assets/site/css/splide.min.css');
    require('@/assets/site/css/styles.css');

  } else if (layout === 'profileLayout') {
    require('@/assets/site/fonts/vazir-ui/vazir.css');
  }
});

export default router;