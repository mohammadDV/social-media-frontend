import { createRouter, createWebHistory } from 'vue-router';

// Import layouts
import MainLayout from '@/layouts/MainLayout.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

// Import views
import HomeComponent from '@/views/Home.vue';
import ProfileComponent from '@/views/Profile.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '/profile',
    component: ProfileLayout,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;