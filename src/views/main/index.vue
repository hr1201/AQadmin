<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <headers />
      <el-main>
        <!-- 接收视图转变 -->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import headers from '../../components/header.vue';
</script>
<style lang="scss" scoped>
.layout-container {
  flex-direction: column;
  .el-header {
    --el-header-padding: 0;
  }
}
</style>
