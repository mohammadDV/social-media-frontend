import { createRouter, createWebHistory } from 'vue-router';

// Import layouts
import MainLayout from '@/layouts/MainLayout.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

// Import views
import Home from '@/views/Home.vue';
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
        path: '/login',
        component: Login,
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
    // require('@/assets/site/js/jquery.min.js');
    // require('@/assets/site/js/bootstrap.bundle.min.js');
    // require('@/assets/site/js/splide.min.js');
    // require('@/assets/site/js/script.js');
    // require('@/assets/site/js/modal.js');
    // require('@/assets/site/js/lazyload.js');
    // require('@/assets/site/js/func.js');

  } else if (layout === 'profileLayout') {
    require('@/assets/site/fonts/vazir-ui/vazir.css');
  }
});

export default router;