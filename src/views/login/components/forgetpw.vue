<template>
  <div v-if="!change" class="forms">
    <div class="titles">
      <p class="title">忘记密码</p>
    </div>
    <el-form
      label-position="left"
      :inline="true"
      label-width="auto"
      :model="userData"
      class="demo-form-inline"
      style="max-width: 50%; line-height: 50px"
      @submit.prevent="onSubmit"
    >
      <el-form-item class="elinput" prop="password" label="请输入新密码:">
        <el-input
          class="elinput"
          style="height: 50px"
          v-model="userData.password"
          type="password"
          placeholder="新密码"
          show-password
        />
      </el-form-item>
      <el-form-item class="elinput" prop="captcha" label="图形验证码:">
        <el-input
          class="elinput"
          style="height: 50px"
          v-model="userData.captcha"
          placeholder="验证码"
        >
          <template #append>
            <captcha ref="captchaN" @get-verify-code-str="getVerifyCodeStr" />
          </template>
        </el-input>
      </el-form-item>

      <el-button @click="onSubmit(userData)" type="primary" style="font-size: 20px" class="elinput">
        确认
      </el-button>
    </el-form>
  </div>
  <div v-else>
    <component :is="change" />
  </div>
</template>

<script setup lang="ts">
import login from './login.vue';
import captcha from './captcha.vue';
// 动态组件，可以动态切换
const change = shallowRef<any>(0);

const userData = reactive({
  password: '',
  captcha: ''
});

// 获取captcha组件的引用
const captchaN = ref<InstanceType<typeof captcha>>();

let captchaTrue = ref<string>('');
// 获取到验证码
const getVerifyCodeStr = (codestr: string) => {
  captchaTrue.value = codestr;
};

// 修改密码确认按钮，判断用户输入的验证码是否正确，不正确进行重新输入，后调用请求
const onSubmit = async (userData: any) => {
  console.log(userData.password + 'submit!' + userData.captcha);
  if (userData.password == '') {
    ElMessage.error('新密码不能为空！！！');
  } else if (captchaTrue.value !== userData.captcha) {
    captchaN.value?.drawPic();
    ElMessage.error('验证码输入错误！！！');
  } else {
    // 最后一步，切换组件
    change.value = login;
  }
};
</script>

<style scoped>
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
  height: 50px;
}

@media screen and (max-width: 850px) {
  .elinput {
    width: 60vw;
    height: 50px;
  }
}

:deep(.el-form-item__label) {
  font-size: 16px;
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
