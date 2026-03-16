# Day1 学习记录（Vue3 + ES6 模块化）
## 学习目标
1. 安装 Node.js，掌握 Vite 初始化 Vue3 项目的方法
2. 理解 Vue3 项目的基本结构
3. 掌握 ES6 模块化（export/import）的基本使用

## 操作步骤
### 1. 环境验证
- 验证 Node.js：node -v → v18.18.0（自己的版本）
- 验证 npm：npm -v → 9.8.1（自己的版本）

### 2. ES6 模块化练习
- 创建 es6-module 文件夹，编写 moduleA.js（导出函数/变量）、moduleB.js（导入调用）
- 配置 package.json → "type": "module"
- 运行：node moduleB.js → 验证输出结果

### 3. Vue3 项目初始化
- 命令：npm create vite@latest vue3-first-app -- --template vue
- 安装依赖：npm install
- 启动项目：npm run dev → 访问 http://127.0.0.1:5173/ 看到页面

## 核心知识点
1. ES6 模块化：
   - export：命名导出（多个）、默认导出（一个）
      - 命名导出（export）：
         - 可以导出多个：export 变量/函数/类 或 export { 变量1, 变量2 }
         - 导入时必须和导出名称一致：import { 名称 } from '路径'
      - 默认导出（export default）：
         - 一个文件只能有一个默认导出
         - 导入时可以自定义名称：import 任意名称 from '路径'
      - 路径规则：
         - 导入本地文件必须写相对路径（./ 表示当前目录）
         - 可以省略 .js 后缀（比如 import { sayHello } from './moduleA' 也可行）
   - import：按名称导入、默认导入
   - Node.js 运行 ES6 模块需配置 "type": "module"
   - 路径规则：
     - 导入本地文件必须写相对路径（./ 表示当前目录）
     - 可以省略 .js 后缀（比如 import { sayHello } from './moduleA' 也可行）

2. Vue3 项目结构：
   - main.js：入口文件，创建 Vue 实例并挂载
   - App.vue：根组件，包含 template/script/style
   - vite.config.js：Vite 配置文件

## 遇到的问题（可选，比如）
- 问题1：运行 node moduleB.js 报错 → 原因：没配置 package.json 的 "type": "module"
- 解决：新增 package.json 并添加配置

## 运行命令总结
- 初始化 Vue3 项目：npm create vite@latest 项目名 -- --template vue
- 安装依赖：npm install
- 启动项目：npm run dev
- 运行 ES6 模块：node 文件名.js