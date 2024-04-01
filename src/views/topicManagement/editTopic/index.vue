<template>
  <div class="layouts">
    <el-button type="default" :icon="DArrowLeft" @click="back" />
    <div class="avatar">
      <p class="title">更新题目</p>
      <img
        class="avatar-image"
        src="../../../assets/topicManagement/addTopixImg2.png"
        alt="addTopixImg"
      />
    </div>
    <div class="card">
      <div class="card-front">
        <el-form
          ref="ruleFormRef"
          style="max-width: 100%"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          label-position="top"
          class="demo-ruleForm"
          size="large"
          status-icon
        >
          <div class="layout">
            <el-form-item class="select" label="类型" prop="region">
              <el-select v-model="ruleForm.type" placeholder="类型">
                <el-option label="加法" value="加法" />
                <el-option label="减法" value="减法" />
                <el-option label="乘法" value="乘法" />
                <el-option label="除法" value="除法" />
              </el-select>
            </el-form-item>

            <el-button :key="button.text" @click="ranbuild" type="default" size="large" text>
              随机生成算术参数
            </el-button>
          </div>
          <el-form-item class="text" label="参数1" prop="one">
            <el-input v-model="ruleForm.one" />
          </el-form-item>
          <el-form-item class="text" label="参数2" prop="two">
            <el-input v-model="ruleForm.two" />
          </el-form-item>
          <el-form-item class="radio" label="难度" prop="difficulty">
            <el-radio-group v-model="ruleForm.difficulty">
              <el-radio value="简单">简单</el-radio>
              <el-radio value="中等">中等</el-radio>
              <el-radio value="困难">困难</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="btns">
            <el-button class="btn" type="primary" @click="submitForm(ruleFormRef)">
              更新
            </el-button>
            <el-button class="btn" type="info" @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { DArrowLeft } from '@element-plus/icons-vue';
import { generateMathProblems } from '../helper/topicBuild.ts';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

interface RuleForm {
  type: string;
  one: string;
  two: string;
  difficulty: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  type: '',
  one: '',
  two: '',
  difficulty: ''
});

const rules = reactive<FormRules<RuleForm>>({
  type: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change'
    }
  ],
  one: [
    {
      type: 'string',
      required: true,
      message: '请输入参数',
      trigger: 'change'
    }
  ],
  two: [
    {
      type: 'string',
      required: true,
      message: '请输入参数',
      trigger: 'change'
    }
  ],
  difficulty: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change'
    }
  ]
});

const button = { type: '', text: 'plain' };

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      router.push({
        // 使用params进行路由传参必须传入name
        // name: 'topicManagement',
        path: '/topicManagement',
        // 路由传参
        query: ruleForm
        // params: ruleForm
      });
    } else {
      console.log('错误提交!', fields);
    }
  });
};

// 随机生产算术参数
const ranbuild = () => {
  let nums = generateMathProblems(1)[0];
  ruleForm.type = nums.type;
  ruleForm.one = nums.topic;
  ruleForm.two = nums.answer;
  ruleForm.difficulty = nums.difficulty;
};

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 返回按钮
const back = () => {
  router.go(-1);
};

// 将参数赋值过去
console.log(route.query.type);
// 接收题目管理页面传过来的数据
onMounted(() => {
  (ruleForm.one = route.query.topic ? route.query?.topic.toString() : ''),
    (ruleForm.two = route.query.answer ? route.query?.answer.toString() : ''),
    (ruleForm.type = route.query.type ? route.query?.type.toString() : ''),
    (ruleForm.difficulty = route.query.difficulty ? route.query?.difficulty.toString() : '');
});

router.replace({ query: {} });
</script>
<style lang="scss" scoped>
.layouts {
  display: flex;
  justify-content: space-between;
}
.avatar {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 60px;
    font-weight: 600;
    color: #161c5f;
    margin: 2% 0 3% 0;
  }
  .avatar-image {
    width: 595.5px;
    height: 508.5px;
  }
}
.topic-margin {
  width: 50%;
  border: 1px solid #6387ff;
  .topic-padding {
    width: 45%;
    border: 1px solid #6387ff;
  }
}

/* 右边的card */
.card {
  color: #1b1b1b;
  width: 550px;
  height: 77vh;
  position: relative;
  outline: 6px solid #f5f5f5;
  border-radius: 8px;
  line-height: 150%;
  padding: 16px;
  background: #fff;
  transition: background-color 1s ease-in-out;
  overflow: hidden;
}

.card-front {
  bottom: 16px;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.select {
  width: 100px;
  margin-right: 30px;
}
.text {
  width: 400px;
}

.radio {
  margin-top: 40px;
}

.btn {
  width: 130px;
  height: 40px;
  font-size: 18px;
}

:deep(.el-form-item__content) {
  justify-content: space-between;
}
</style>
