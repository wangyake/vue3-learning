<template>
  <!-- 第一个 Vue3 模板 -->
  <div class="app-container">
    <h1>我的第一个 Vue3 项目</h1>
    <p>Day1 学习：Vite 初始化 + 单文件组件</p>
  </div>
</template>

<script setup>
// setup 语法糖（Day8 会深入，Day1 先认识结构）
console.log('Vue3 项目启动成功！');
</script>

<style scoped>
.app-container {
  width: 80%;
  margin: 20px auto;
  text-align: center;
}
</style>