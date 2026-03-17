# Day3 学习计划：条件/列表渲染 + ES6数组方法
## 耗时
1.5小时（ES6：25分钟，Vue3：55分钟）

## 学习目标
1. 掌握ES6数组方法（map/filter/forEach）的使用场景和区别
2. 掌握Vue3条件渲染（v-if/v-show）的用法和核心差异
3. 掌握Vue3列表渲染（v-for）的用法、key的作用、v-if与v-for优先级
4. 综合实战：实现可删除、可筛选的待办列表

## 代码文件说明
- 01_es6数组方法练习.html：ES6 map/filter/forEach 基础练习
- 02_vue待办列表案例.html：Vue条件/列表渲染综合实战（核心）

## 重点提醒
1. v-for必须加唯一key（优先用数据ID，不用index）
2. v-if适合低频切换，v-show适合高频切换
3. v-for和v-if不要写在同一元素上（先筛选再遍历）
4. ES6数组方法（map/filter）不改变原数组，是Vue处理列表的核心工具