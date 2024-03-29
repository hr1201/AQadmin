<template>
  <el-table
    :data="tableData.slice((currentPages - 1) * pageSize, currentPages * pageSize)"
    width="100%"
    style="width: 100%; height: 462px"
  >
    <el-table-column prop="index" label="序号" min-width="10%" />
    <el-table-column align="center" prop="topic" label="题目" min-width="21%" />
    <el-table-column align="center" prop="answer" label="答案" min-width="19%" />
    <el-table-column align="center" prop="type" label="类型" min-width="15%" />
    <el-table-column align="center" prop="difficulty" label="难度" min-width="15%" />
    <el-table-column align="center" label="操作" min-width="20%">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="pagination-block">
    <el-pagination
      :hide-on-single-page="false"
      v-model:current-page="currentPages"
      v-model:page-size="pageSize"
      :background="background"
      layout="prev, pager, next, jumper"
      :page-count="Math.ceil(tableData.length / 10)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      hide-on-single-page:true
    />
  </div>
</template>

<script lang="ts" setup>
interface topicData {
  index: Number;
  topic: String;
  answer: String;
  type: String;
  difficulty: String;
}
const tableData: topicData[] = [
  {
    index: 1,
    topic: '3+7',
    answer: '10',
    type: '加法',
    difficulty: '简单'
  },
  {
    index: 2,
    topic: '3*6',
    answer: '18',
    type: '乘法',
    difficulty: '中等'
  },
  {
    index: 3,
    topic: '10-7',
    answer: '3',
    type: '减法',
    difficulty: '困难'
  }
];

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

// 分页
const currentPages = ref(1); // 当前页数
const pageSize = ref(10); // 每页显示条目个数
const background = ref(false);
// page-size 改变时触发
const handleSizeChange = (size: number) => {
  pageSize.value = size;
};
// current-page 改变时触发
const handleCurrentChange = (currentPage: number) => {
  currentPages.value = currentPage;
};
</script>
<style lang="scss" scoped>
.pagination-block {
  display: flex;
  justify-content: end;
  margin-top: 30px;
  margin-right: 3%;
}
</style>
