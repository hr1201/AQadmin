<template>
  <div class="body">
    <div class="imgs">
      <div class="titles">
        <img src="../../assets/login/idea.png" />
        <img src="../../assets/login/title.png" />
        <img src="../../assets/login/thumbsUp.png" />
      </div>

      <img src="../../assets/login/Group.png" alt="" />
    </div>

    <!-- 在一开始登录页面中，展示用户登录页面，在这个vue文件放login组件 -->
    <!-- 若用户点击注册或忘记密码，则动态切换组件，用户点击注册完成或者确认按钮跳转回登录组件进行登录 -->
    <login class="loginall" />
  </div>
</template>

<script setup lang="ts">
import login from './components/login.vue';
</script>

<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.imgs {
  display: flex;
  flex-direction: column;
  width: 45%;

  .titles {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 850px) {
  .body {
    flex-direction: column-reverse;
    justify-content: center;
  }
  .loginall {
    margin-top: 10%;
    margin-bottom: 20px;
  }
}
</style>
