console.log('=== 基本对象简写 ===');

// 变量定义
const name = 'Vue';
const version = '3.5.30';
const isOpenSource = true;

// 传统写法
const traditionalObj = {
  name: name,
  version: version,
  isOpenSource: isOpenSource,
  greet: function() {
    console.log(`Hello from ${this.name} ${this.version}`);
  }
};
console.log('传统写法:', traditionalObj);
traditionalObj.greet();

// ES6简写
const es6Obj = {
  name,
  version,
  isOpenSource,
  greet() {
    console.log(`Hello from ${this.name} ${this.version}`);
  }
};
console.log('ES6简写:', es6Obj);
es6Obj.greet();

console.log('\n=== 计算属性名 ===');

const propName = 'framework';
const versionProp = 'version';

const objWithComputedProps = {
  [propName]: 'Vue',
  [versionProp]: '3.5.30',
  [`${propName}${versionProp}`]: 'Vue3.5.30'
};

console.log('计算属性名:', objWithComputedProps);

console.log('\n=== 结合解构赋值 ===');

// 定义一个对象
const user = {
  name: '张三',
  age: 20,
  email: 'zhangsan@example.com'
};

// 解构赋值
const { name: userName, age, email } = user;

// 使用对象简写创建新对象
const userProfile = {
  userName,
  age,
  email,
  createdAt: new Date().toLocaleString(),
  // 使用方法简写
  getFullInfo() {
    return `${this.userName}, ${this.age}岁, ${this.email}`;
  }
};

console.log('解构赋值 + 对象简写:', userProfile);
console.log('用户完整信息:', userProfile.getFullInfo());

console.log('\n=== 练习：const name=\'Vue\'; const obj={name, fn(){}} ===');

const frameworkName = 'Vue';
const obj = {
  frameworkName,
  fn() {
    console.log(`Hello from ${this.frameworkName}!`);
  }
};

console.log('对象:', obj);
obj.fn();