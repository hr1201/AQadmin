<template>
  <div>
    <el-menu
      ellipsis
      class="el-menu-popper-demo"
      mode="horizontal"
      :popper-offset="16"
      style="max-width: 100%"
    >
      <el-menu-item v-for="item in itemList" :key="item.index" :index="item.index.toString()">
        <el-icon>
          <img src="../../assets/topicManagement/category.png" width="35px" height="35px" />
        </el-icon>
        <template #title>
          <span>{{ item.urlName }}</span>
        </template>
      </el-menu-item>
    </el-menu>

    <topicTable />
  </div>
</template>
<script setup lang="ts">
import topicTable from './component/topicTable.vue';
type ItemType = {
  index: string;
  url: string;
  urlName: string;
  iconHtml?: any;
};

const itemList: ItemType[] = [
  {
    index: '/homePage',
    url: 'homePage',
    urlName: '加法'
  },
  {
    index: '/topicManagement',
    url: 'topicManagement',
    urlName: '减法'
  },
  {
    index: '/',
    url: '',
    urlName: '乘法'
  },
  {
    index: '/',
    url: '',
    urlName: '除法'
  }
];
</script>
<style scoped>
.el-menu {
  border-bottom: 0;
}
</style>
