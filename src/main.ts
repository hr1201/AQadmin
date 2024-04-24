import { createApp, createVNode, render } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { ElMessage } from 'element-plus';
import loadingBar from './components/loadingBar.vue';

const app = createApp(App);
const store = createPinia();

app.use(store);
app.use(router);

const Vnode = createVNode(loadingBar);
render(Vnode, document.body);

// 白名单
const whileList = ['/'];

// 前置守卫，进行拦截
router.beforeEach((to, _from, next) => {
  Vnode.component?.exposed?.startLoading();
  // to.path为跳转的地址，如果正好在whileList中，就允许跳转
  // to.meta.requiresAuth ||
  if (whileList.includes(to.path) || sessionStorage.getItem('token')) {
    next();
  } else {
    ElMessage({
      message: '请登录后再来！！！',
      type: 'error',
      duration: 1200
    });
    next('/');
  }
});

// 后置守卫，放了一个顶部的进度条
router.afterEach((_to, _from) => {
  Vnode.component?.exposed?.endLoading();
});

app.mount('#app');
