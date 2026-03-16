
### 三、src/es6-practice.js 代码
```js
// Day2 ES6 练习：箭头函数 + 对象解构

// 一、箭头函数练习：改写普通函数
// 1. 普通函数（单返回值、多参数）
function add(a, b) {
  return a + b;
}
// 箭头函数改写
const addArrow = (a, b) => a + b;

// 2. 普通函数（无参数、多语句）
function sayHello() {
  const msg = 'Hello ES6 箭头函数!';
  console.log(msg);
}
// 箭头函数改写
const sayHelloArrow = () => {
  const msg = 'Hello ES6 箭头函数!';
  console.log(msg);
};

// 测试箭头函数
console.log('addArrow(2, 3) =', addArrow(2, 3)); // 输出 5
sayHelloArrow(); // 输出 Hello ES6 箭头函数!

// 二、对象解构练习
// 1. 基础解构
const framework = { name: 'Vue', age: 3, author: 'Evan You' };
const { name, age } = framework;
console.log('解构name和age：', name, age); // 输出 Vue 3

// 2. 解构并重命名变量
const { author: creator } = framework;
console.log('解构并重命名author为creator：', creator); // 输出 Evan You

// 3. 解构默认值（扩展练习）
const { version = '3.4.0' } = framework;
console.log('解构带默认值：', version); // 输出 3.4.0（framework无version属性，取默认值）