<template>
  <div v-if="!change" class="forms">
    <p class="title">用户注册</p>
    <el-form
      :inline="true"
      label-width="auto"
      :model="userData"
      class="demo-form-inline"
      style="max-width: 450px; line-height: 75px"
    >
      <el-form-item>
        <el-input v-model="userData.adminname" placeholder="用户名" :prefix-icon="User" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="userData.adminphone" placeholder="手机号" :prefix-icon="Phone" />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="userData.adminpsw"
          type="password"
          placeholder="密码"
          show-password
          :prefix-icon="Search"
        />
      </el-form-item>
      <el-button @click="onSubmit(userData)" class="button-submit">注册</el-button>
    </el-form>
  </div>
  <div v-else>
    <component :is="change" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import login from './login.vue';
import { loginh } from '../../../http/index.ts';
import { User, Phone, Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 动态组件，可以动态切换
const change = ref<any>(0);

const userData = reactive({
  adminname: '',
  adminphone: '',
  adminpsw: ''
});

const onSubmit = (userData: any) => {
  console.log(userData.password + 'submit!' + userData.adminname);
  loginh(userData).then((response: any) => {
    if (response.data.code == '200' && response.data.data) {
      ElMessage.success(`欢迎管理员！！！` + response.msg);
    } else {
      ElMessage.error('账号或密码输入错误！！！');
      // console.log(response.data)
    }
  });
  change.value = login;
};
</script>

<style lang="scss" scoped>
::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}

.form button {
  align-self: flex-end;
}

.flex-column > label {
  color: #151717;
  font-weight: 600;
}

.title {
  color: #1989fa;
  font-size: 35px;
  margin-bottom: 50px;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  /* width: 85%; */
  height: 100%;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row > div > label {
  font-size: 14px;
  color: black;
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #1989fa;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #252727;
}

.p {
  text-align: left;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn:hover {
  border: 1px solid #2d79f3;
}
</style>
