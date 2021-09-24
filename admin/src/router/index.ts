import checkLogin from '@/middleware/auth';
// import checkLogin from '@/middleware/auth';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Auth from '@/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Auth.vue'),
    beforeEnter: checkLogin
  },
  {
    path: '/dash-board',
    name: 'DashBoard',
    // beforeEnter: checkLogin,
    component: () => import('../views/DashBoard.vue'),
    beforeEnter: Auth.routeGuard,
    children: [
      {
        path: 'user',
        component: () => import('@/components/UserComponent.vue')
      },
      {
        path: 'chat-bot',
        component: () => import('@/components/ChatBot.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
