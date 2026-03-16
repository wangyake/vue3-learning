// --------------- moduleA.js ---------------
// 1. 导出单个函数（命名导出）
export function sayHello(name) {
  return `你好，${name}！这是从moduleA导出的函数`;
}

// 2. 导出多个函数/变量（批量命名导出）
export const PI = 3.1415926;
export function calculateArea(radius) {
  return PI * radius * radius; // 计算圆的面积
}

// 3. 导出默认内容（默认导出，一个文件只能有一个默认导出）
export default function sum(a, b) {
  return a + b;
}