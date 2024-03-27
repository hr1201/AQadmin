<template>
  <canvas
    id="canvasDom"
    :width="props.canvasWidth"
    :height="props.canvasHeight"
    @click="drawPic"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

let props = defineProps({
  canvasWidth: {
    // 容器宽度
    type: Number,
    default: 100
  },
  canvasHeight: {
    // 容器高度
    type: Number,
    default: 40
  }
});

const emits = defineEmits(['getVerifyCodeStr']);
const randomStr = '0123456789abcdefghijklmnopqrstuvwxyz'; // 所有随机字符串

let verifyCodeStr = ''; //验证码字符串

// 初始化
onMounted(() => {
  drawPic();
});

// 绘制验证码图片
const drawPic = () => {
  randomCode();
  let canvas: any = document.getElementById('canvasDom');
  let ctx = canvas.getContext('2d');
  ctx.textBaseline = 'bottom';
  // 绘制背景
  ctx.fillStyle = '#e6ecfd';
  ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
  // 绘制文字
  for (let i = 0; i < verifyCodeStr.length; i++) {
    drawText(ctx, verifyCodeStr[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
};

//4个随机字符
const randomCode = () => {
  verifyCodeStr = '';
  for (let i = 0; i < 4; i++) {
    let txt = randomStr[randomNum(0, randomStr.length)];
    verifyCodeStr += txt;
  }
  emits('getVerifyCodeStr', verifyCodeStr);
};

// 随机数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 随机色
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

// 绘制文字
const drawText = (
  ctx: {
    fillStyle: string;
    font: string;
    translate: (arg0: number, arg1: number) => void;
    rotate: (arg0: number) => void;
    fillText: (arg0: any, arg1: number, arg2: number) => void;
  },
  txt: string,
  i: number
) => {
  let fontSizeMin = 30, // 字体最小值
    fontSizeMax = 40; // 字体最大值
  ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
  ctx.font = randomNum(fontSizeMin, fontSizeMax) + 'px SimHei'; // 随机生成字体大小
  let x = (i + 1) * (props.canvasWidth / (verifyCodeStr.length + 1));
  let y = randomNum(fontSizeMax, props.canvasHeight - 5);
  var deg = randomNum(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
};

// 绘制干扰线
const drawLine = (ctx: {
  strokeStyle: string;
  beginPath: () => void;
  moveTo: (arg0: number, arg1: number) => void;
  lineTo: (arg0: number, arg1: number) => void;
  stroke: () => void;
}) => {
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, props.canvasWidth), randomNum(0, props.canvasHeight));
    ctx.lineTo(randomNum(0, props.canvasWidth), randomNum(0, props.canvasHeight));
    ctx.stroke();
  }
};

// 绘制干扰点
const drawDot = (ctx: {
  fillStyle: string;
  beginPath: () => void;
  arc: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: number) => void;
  fill: () => void;
}) => {
  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, props.canvasWidth), randomNum(0, props.canvasHeight), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
};

//暴露绘制图片方法供父组件使用
defineExpose({
  drawPic
});
</script>

<style scoped lang="scss">
#canvasDom {
  cursor: pointer;
}
</style>
