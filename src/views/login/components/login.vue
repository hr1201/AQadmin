<template>
  <div v-if="!change" class="forms">
    <div class="titles">
      <p class="title">教师登录</p>
    </div>

    <el-form
      :inline="true"
      label-width="auto"
      :model="userData"
      ref="formRef"
      :rules="rules"
      class="demo-form-inline"
      style="max-width: 50%; line-height: 50px"
    >
      <el-form-item prop="username">
        <el-input
          v-model="userData.username"
          class="elinput"
          placeholder="工号"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="userData.password"
          :type="showpwd ? 'text' : 'password'"
          placeholder="密码"
          :prefix-icon="Search"
          class="elinput"
        >
          <template #suffix>
            <span class="input_icon" @click="switchpwd">
              <el-icon v-if="showpwd"><View style="font-size: 16px" /></el-icon>
              <el-icon v-else><Hide style="font-size: 16px" /></el-icon>
            </span>
            <span class="span" @click="select(cpName[1], 1)"> 忘记密码? </span>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="font-size: 20px" @click="onSubmit(userData)" class="elinput">
        登录
      </el-button>
      <!-- <p class="p">还没有账号? <span class="span" @click="select(cpName[0], 0)">立即注册</span></p> -->
    </el-form>
  </div>
  <div v-else>
    <component :is="change" :adminname="userData.username" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, markRaw } from 'vue';
import register from './register.vue';
import forgetpw from './forgetpw.vue';
import { User, Search, View, Hide } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { FormItemRule } from 'element-plus';
import { loginh } from '../../../http/index.ts';

// 动态组件，可以动态切换
const change = ref(0);
const active = ref();
const cpName = reactive([
  {
    name: '立即注册',
    cpn: markRaw(register)
  },
  {
    name: '忘记密码',
    cpn: markRaw(forgetpw)
  }
]);

const select = (item: any, index: any) => {
  active.value = index;
  change.value = item.cpn;
};

type From = {
  username: string;
  password: string;
};

const userData = reactive<From>({
  username: '',
  password: ''
});

const formRef = ref();

type Rules = {
  [k in keyof From]?: Array<FormItemRule>;
};
const rules = reactive<Rules>({
  username: [
    {
      required: true, //设为必填字段
      message: '请输入工号',
      type: 'string'
    }
  ],
  password: [
    {
      required: true, //设为必填字段
      message: '请输入密码',
      type: 'string'
    }
  ]
});

// 控制eye图标
let showpwd = ref<boolean>(false);
const switchpwd = () => {
  showpwd.value = !showpwd.value;
};

// 只有用户名在数据库中存在时才可以点击忘记密码

// 登录按钮
const router = useRouter();
const onSubmit = async (userData: any) => {
  loginh(userData.username, userData.password).then((response: any) => {
    console.log(response);
    if (response.status === 200 && response.data === '登录成功') {
      ElMessage.success(`欢迎教师！！！` + response.msg);
      sessionStorage.setItem('token', '666');
      router.push('/homePage');
    } else {
      ElMessage.error('账号或密码输入错误！！！');
      // console.log(response.data)
    }
  });
  // formRef.value.validate(async (valid: any) => {
  //   if (valid) {
  //     console.log(userData.password + 'submit!' + userData.username);

  //   } else {
  //     console.log('验证失败');
  //     // 可以在这里显示一些错误信息
  //   }
  // });
  // router.push('/homePage');
};
</script>

<style lang="scss" scoped>
.forms {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titles {
  width: 50%;
  .title {
    color: #1989fa;
    font-size: 35px;
    margin-bottom: 50px;
  }
}

:deep(.el-input__inner) {
  width: 20px;
  font-size: 15px;
}

.elinput {
  width: 36vw;
  max-width: 480px;
  height: 50px;
}

@media screen and (max-width: 850px) {
  .elinput {
    width: 60vw;
    height: 50px;
  }
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

:deep(.el-input .el-input__icon) {
  width: 20px;
  line-height: 40px;
}

:deep(.el-icon svg) {
  height: 20px;
  width: 20px;
  font-size: 18px;
}

.input_icon {
  cursor: pointer;
  width: 25px;
  height: 25px;
  font-size: 18px;
  padding-right: 4px;
}
</style>
