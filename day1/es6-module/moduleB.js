// --------------- moduleB.js ---------------
// 1. 导入命名导出的内容（函数/变量）
import { sayHello, PI, calculateArea } from './moduleA.js';

// 2. 导入默认导出的内容（可以自定义名称）
import add from './moduleA.js';

// 3. 调用导入的函数/使用变量
// 调用命名导出的sayHello函数
console.log(sayHello('Vue学习者')); 

// 使用命名导出的PI变量，调用calculateArea函数
console.log(`圆周率PI = ${PI}`);
console.log(`半径为5的圆面积 = ${calculateArea(5)}`);

// 调用默认导出的sum函数（自定义名称为add）
console.log(`10 + 20 = ${add(10, 20)}`);