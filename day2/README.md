# Day2：Vue3 模板语法 + ES6 核心语法（箭头函数/解构）
## 学习耗时
总计 1.5 小时（ES6 补学 25 分钟，Vue3 学习 55 分钟）

## 一、ES6 核心知识点（箭头函数 + 对象解构）
### 1. 箭头函数
#### 核心定义
箭头函数是 ES6 新增的函数简写形式，语法更简洁，且**没有自己的 this**（继承外层作用域的 this）。
#### 语法对比
| 普通函数                | 箭头函数                  | 适用场景                     |
|-------------------------|---------------------------|------------------------------|
| `function fn(a) { return a + 1; }` | `const fn = a => a + 1;`  | 单参数、单返回值的简单函数   |
| `function fn(a, b) { return a + b; }` | `const fn = (a, b) => a + b;` | 多参数、单返回值             |
| `function fn() { console.log('hello'); }` | `const fn = () => { console.log('hello'); }` | 无参数、多语句逻辑           |

#### 核心特点
- 省略 `function` 关键字，参数括号可省略（单参数时）；
- 单返回值语句可省略 `{}` 和 `return`；
- 不能作为构造函数（不能用 new 调用）；
- 没有 arguments 对象，需用剩余参数 `...args` 替代。

### 2. 对象解构
#### 核心定义
解构赋值是 ES6 新增的语法，允许从对象/数组中快速提取值并赋值给变量，简化代码。
#### 基础语法
```js
// 原始写法
const obj = { name: 'Vue', age: 3 };
const name = obj.name;
const age = obj.age;

// 解构写法（核心）
const { name, age } = { name: 'Vue', age: 3 };
console.log(name); // 'Vue'
console.log(age); // 3

// 扩展：重命名变量
const { name: frameworkName, age } = { name: 'Vue', age: 3 };
console.log(frameworkName); // 'Vue'    