import { defineStore } from 'pinia';

export const useTestStore = defineStore('Test', {
  state: () => {
    return {
      current: 1,
      name: 'rarrot'
    };
  },
  // computed 修饰值
  getters: {},
  // methods 可以做同步异步，提交state
  actions: {
    setCurrent(num: number) {
      // this是由定义好的store实例调用的，箭头函数只会保存当前作用域的this
      this.current = num;
    }
  }
});
