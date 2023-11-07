
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