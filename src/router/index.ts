import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 用declare进行
declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '教师端登录'
    }
  },
  {
    path: '/index',
    redirect: '/homePage',
    component: () => import('../views/main/index.vue'),
    meta: {
      title: '教师端后台'
    },
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../views/homePage/index.vue'),
        meta: {
          title: '教师端首页',
          requiresAuth: true
        }
      },
      {
        path: '/topicManagement',
        name: 'topicManagement',
        component: () => import('../views/topicManagement/index.vue'),
        meta: {
          title: '题目管理页',
          requiresAuth: true
        },
        children: [
          {
            path: '/addTopic',
            name: 'addTopic',
            component: () => import('../views/topicManagement/views/addTopic.vue'),
            meta: {
              title: '添加题目',
              requiresAuth: true
            }
          },
          {
            path: '/editTopic',
            name: 'editTopic',
            component: () => import('../views/topicManagement/views/editTopic.vue'),
            meta: {
              title: '修改题目',
              requiresAuth: true
            }
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' });
  location.reload();
}

export default router;
