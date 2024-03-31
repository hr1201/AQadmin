<template>
  <div>
    <el-menu
      ellipsis
      class="el-menu-popper-demo"
      mode="horizontal"
      :popper-offset="16"
      style="max-width: 100%"
      background-color="#fff"
      text-color="#000"
      active-text-color="#000"
    >
      <el-menu-item
        v-for="item in typeOptions"
        :key="item.index"
        :index="item.index?.toString()"
        @click="handleMenuItemClick(item.value)"
      >
        <el-icon>
          <img src="../../assets/topicManagement/category.png" width="40px" height="40px" />
        </el-icon>
        <template #title>
          <span>{{ item.label }}</span>
        </template>
      </el-menu-item>
    </el-menu>

    <div class="select">
      <!-- 类型选择器 -->
      <el-select v-model="typeValue" clearable placeholder="类型" style="width: 120px">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- 难度选择器 -->
      <el-select v-model="dfValue" clearable placeholder="难度" style="width: 120px">
        <el-option
          v-for="item in dfOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 搜索框 -->
      <el-input
        v-model="input1"
        style="width: 240px"
        placeholder="搜索题目、编号、或内容"
        :suffix-icon="Search"
      />
    </div>

    <!-- 通过v-bind向父组件传入类型value和难度value -->
    <topicTable :typeValue :dfValue />

    <el-button type="primary" class="addbtn" @click="addTopic">添加题目</el-button>
  </div>
</template>
<script setup lang="ts">
import topicTable from './component/topicTable.vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
// icon+type的data
type ItemType = {
  index?: number;
  value: string;
  label: string;
};

// 需要传给表格的类型value
const typeValue = ref('');

// icon+type进行数据变更
const handleMenuItemClick = (value: string) => {
  typeValue.value = value;
};

// 类型选择器的data
const typeOptions: ItemType[] = [
  {
    index: 1,
    value: '加法',
    label: '加法'
  },
  {
    index: 2,
    value: '减法',
    label: '减法'
  },
  {
    index: 3,
    value: '乘法',
    label: '乘法'
  },
  {
    index: 4,
    value: '除法',
    label: '除法'
  }
];

// 难度选择器的data
const dfValue = ref('');
const dfOptions: ItemType[] = [
  {
    value: '简单',
    label: '简单'
  },
  {
    value: '中等',
    label: '中等'
  },
  {
    value: '困难',
    label: '困难'
  }
];

// 搜索框的value
const input1 = ref('');

// 添加题目按钮
const router = useRouter();
const addTopic = () => {
  router.push('topicManagement/addTopic');
};

// 修改页面，需要在点击修改按钮后，获取到表格的原本数据，然后进行修改
// 添加页面，需要填入数据后可以直接添加至表格中
</script>
<style lang="scss" scoped>
.el-menu {
  border-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1% 20px;
  .el-menu-item {
    font-size: 20px;

    :deep(.el-icon) {
      margin-right: 20px;
    }
  }
  .el-menu-item::before {
    content: '';
    position: absolute;
    background: #000000;
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
    background-color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #fff;
  }
}

.select {
  display: flex;
  align-items: flex-end;
  justify-content: end;
  .el-select {
    margin: 0 50px 2% 0;
  }
  .el-input {
    margin: 0 40px 2% 0;
  }
}

.addbtn {
  width: 150px;
  height: 45px;
  font-size: 18px;
}
</style>
