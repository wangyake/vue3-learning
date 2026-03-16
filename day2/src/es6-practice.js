// 1. 箭头函数练习：改写普通函数
// 普通函数
function add(a, b) {
  return a + b;
}
function sayHello() {
  console.log('Hello ES6!');
}

// 箭头函数改写
const addArrow = (a, b) => a + b;
const sayHelloArrow = () => {
  console.log('Hello ES6!');
};

// 测试
console.log(addArrow(2, 3)); // 5
sayHelloArrow(); // Hello ES6!

// 2. 对象解构练习
const framework = { name: 'Vue', age: 3, author: 'Evan You' };
// 解构name和age
const { name, age } = framework;
// 解构并给author重命名
const { author: creator } = framework;

console.log(name, age); // Vue 3
console.log(creator); // Evan You