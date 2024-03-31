<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <el-menu
          ellipsis
          class="el-menu-popper-demo"
          mode="horizontal"
          :popper-offset="16"
          style="max-width: 100%"
        >
          <el-menu-item
            v-for="item in itemList"
            :key="item.index"
            @click="toPage(`${item.url}`)"
            :index="item.index.toString()"
          >
            <!-- <el-icon>
              <component :is="item.iconHtml" />
            </el-icon> -->
            <template #title>
              <span>{{ item.urlName }}</span>
            </template>
          </el-menu-item>

          <!-- 头像 -->
          <el-dropdown :hide-on-click="false">
            <div class="basic--circle">
              <div class="block">
                <el-avatar :size="40" :src="circleUrl" />
                <p class="avator-content">{{ content }}</p>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from '../store/index';

const router = useRouter();

// 获取当前页面的url，防止刷新后所在页面焦点移到默认页面
// const route = useRoute();

type ItemType = {
  index: string;
  url: string;
  urlName: string;
  iconHtml?: any;
};

const toPage = (pageName: string) => {
  router.push({
    name: pageName
  });
};

const itemList: ItemType[] = [
  {
    index: '/homePage',
    url: 'homePage',
    urlName: '首页'
  },
  {
    index: '/topicManagement',
    url: 'topicManagement',
    urlName: '题目管理'
  },
  {
    index: '/',
    url: '',
    urlName: '训练计划管理'
  },
  {
    index: '/',
    url: '',
    urlName: '发布'
  }
];

// 头像
const store = useStore();

let state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
});

const { circleUrl } = toRefs(state);
state.circleUrl = store.getUserImage;
const content = store.user.username;

const logout = () => {
  store.logout();
  router.push({ name: 'login' });
};
</script>
<style scoped lang="scss">
.layout {
  width: 100%;
}
.header {
  --el-header-padding: 0px;
}
.el-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.el-menu-popper-demo {
  background-color: #ffffff;
  border-right: 0;
  .el-menu-item {
    font-size: 18px;
  }
  .el-menu-item::before {
    content: '';
    position: absolute;
    background: #3e8dff;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0px;
    transition: 0.3s ease;
  }

  .el-menu-item:hover::before {
    width: 100%;
  }

  .el-menu-item:hover {
    background-color: #ffffff;
  }

  .el-menu-item.is-active {
    background-color: #fff;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: #f5f5f5;
}
</style>
