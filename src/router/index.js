import { createRouter, createWebHistory } from 'vue-router';

// Import layouts
import MainLayout from '@/layouts/MainLayout.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

// Import views
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    meta: { layout: 'mainLayout' },
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        path: '/news/:id/:slug',
        component: News,
      },
    ],
  },
  {
    path: '/profile',
    meta: { layout: 'profileLayout' },
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