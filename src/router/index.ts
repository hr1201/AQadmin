import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/login/index.vue')
  }
  // {
  //   path: '/reg',
  //   component: () => import('../components/reg.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
