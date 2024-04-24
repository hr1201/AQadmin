<template>
  <el-table
    :data="fillterTableData.slice((currentPages - 1) * pageSize, currentPages * pageSize)"
    width="100%"
    style="width: 100%; font-size: 20px; height: 356px"
  >
    <el-table-column prop="index" label="序号" min-width="10%" />
    <el-table-column align="center" prop="topic" label="题目" min-width="21%" />
    <el-table-column align="center" prop="answer" label="答案" min-width="19%" />
    <el-table-column align="center" prop="type" label="类型" min-width="15%" />
    <el-table-column align="center" prop="difficulty" label="难度" min-width="15%">
      <template #default="scope">
        <div :style="{ color: getDifficultyColor(scope.row.difficulty) }">
          {{ scope.row.difficulty }}
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" min-width="20%">
      <template #default="scope">
        <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
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
      :page-count="Math.ceil(fillterTableData.length / pageSize)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      hide-on-single-page:true
    />
  </div>
</template>

<script lang="ts" setup>
import { TopicData, TopicDataAdmin } from '../helper/rules.ts';
import { useRouter } from 'vue-router';
import { selectAllProblem, deleteProblem } from '../../../http/index.ts';

// const route = useRoute();
const router = useRouter();

let tableData = ref<TopicData[]>([]);

function getTypeBySymbol(symbol: string): string {
  switch (symbol) {
    case '+':
      return '加法';
    case '-':
      return '减法';
    case '*':
      return '乘法';
    case '/':
      return '除法';
    default:
      return '未知';
  }
}

function selectAllproblem() {
  tableData.value = []; // 初始化
  selectAllProblem().then((response) => {
    response.data.forEach((element: TopicDataAdmin) => {
      tableData.value.push({
        index: element.problemid,
        topic: element.parm1 + element.symbol + element.parm2,
        answer: element.answer,
        type: getTypeBySymbol(element.symbol),
        difficulty: element.rank
      });
    });
    tableData.value = tableData.value.filter((item) => item.index !== 0).map(toRaw);
  });
}

onMounted(() => {
  // 请求后端所有题目数据
  // 后端传过来parm1，parm2，symbol，需要组合为topic；
  // 并且需要根据symbol，修改type，
  // 那么就可以将response.data中的数据进行转换
  selectAllproblem();
});

// 修改和删除方法
// 修改按钮
const handleEdit = (index: number, row: TopicData) => {
  console.log(index, row.answer);
  // 传入参数
  // 创建一个新对象，将所有属性值转换为字符串
  const queryParameters = Object.keys(row).reduce(
    (acc, key) => {
      // 将每个属性值转换为字符串
      acc[key as keyof TopicData] = String(row[key as keyof TopicData]);
      return acc;
    },
    {} as Record<string, string>
  );

  // 使用转换后的对象作为query参数
  router.push({
    path: '/topicManagement/editTopic',
    query: queryParameters
  });
};

// 删除按钮
const handleDelete = (index: number, row: TopicData) => {
  console.log(row.index, index);
  deleteProblem(row.index.toString()).then((response: any) => {
    if (response.status === 200 && response.data === '删除题目成功') {
      ElMessage.success('删除题目成功');
      selectAllproblem();
      router.push({
        path: '/topicManagement'
      });
    } else {
      ElMessage.error('删除题目失败');
    }
  });
};

// 难度颜色划分
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case '简单':
      return '#15bd66';
    case '中等':
      return '#febc11';
    case '困难':
      return '#ff334b';
    default:
      return 'black'; // 默认颜色
  }
};

// 用defineProps接入父组件传过来的类型value和难度value，然后进行数据过滤
const props = defineProps({
  typeValue: {
    type: String,
    default: ''
  },
  dfValue: {
    type: String,
    default: ''
  },
  input1: {
    type: String,
    default: ''
  }
});

// 用计算属性来监测props数据的变化，实时进行数据过滤
const fillterTableData = computed(() => {
  return tableData.value.filter((item: { type: string; difficulty: string }) => {
    if (!props.typeValue && !props.dfValue) return true;
    if (props.typeValue && !props.dfValue) return item.type === props.typeValue;
    if (!props.typeValue && props.dfValue) return item.difficulty === props.dfValue;
    return item.type === props.typeValue && item.difficulty === props.dfValue;
  });
  // 当input1变化时，就对后端发起请求获取数据，需要进行防抖节流，将请求获取的数据直接赋值给tableData.value
});

// 分页
const currentPages = ref(1); // 当前页数
const pageSize = ref(5); // 每页显示条目个数
const background = ref(false);
// page-size 改变时触发
const handleSizeChange = (size: number) => {
  pageSize.value = size;
};
// current-page 改变时触发
const handleCurrentChange = (currentPage: number) => {
  currentPages.value = currentPage;
};

// // 接收添加题目页面传过来的数据
// let obj: TopicData = {
//   index: tableData.value.length,
//   topic: route.query.one ? route.query?.one.toString() : '',
//   answer: route.query.two ? route.query?.two.toString() : '',
//   type: route.query.type ? route.query?.type.toString() : '',
//   difficulty: route.query.difficulty ? route.query?.difficulty.toString() : ''
// };
// onMounted(() => {
//   tableData.value.push(obj);
// });
// router.replace({ query: {} });
</script>
<style lang="scss" scoped>
:deep(.el-table__row) {
  height: 63.1px;
}
.el-button {
  width: 57px;
  height: 32px;
  font-size: 16px;
  border-radius: 5px;
}

.pagination-block {
  display: flex;
  justify-content: end;
  margin-top: 30px;
  margin-right: 3%;
  .el-pagination {
    font-size: 18px;
  }
  :deep(.el-icon) {
    font-size: 18px;
  }
  :deep(li) {
    font-size: 18px;
  }
  :deep(.el-input__inner) {
    font-size: 18px;
  }
}
</style>
