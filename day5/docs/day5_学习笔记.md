# Vue3 零基础入门 Day5：v-model + ES6 Promise

## 【学习目标】
- 掌握ES6 Promise的基础概念和使用方法
- 理解Promise的resolve、reject、then、catch等核心方法
- 掌握Vue3中v-model双向绑定的使用
- 完成综合实战：注册表单应用

## 【ES6补学：Promise基础（40分钟）】

### 为什么学Promise
- **解决回调地狱**：避免多层嵌套的回调函数
- **链式调用**：使异步代码更清晰易读
- **错误处理**：统一的错误处理机制
- **现代JavaScript标准**：在现代前端开发中广泛使用
- **求职必备**：前端面试高频考点

### Promise的基本概念
Promise是ES6中引入的一种处理异步操作的对象，它代表一个异步操作的最终完成（或失败）及其结果值。

### Promise的三种状态
- **Pending（待定）**：初始状态，既不是成功，也不是失败
- **Fulfilled（已实现）**：操作成功完成
- **Rejected（已拒绝）**：操作失败

### Promise的核心方法

#### 创建Promise
**语法**：`new Promise((resolve, reject) => { /* 异步操作 */ });`

#### resolve方法
- 用于将Promise状态从Pending变为Fulfilled
- 接受一个参数，表示操作成功的结果

#### reject方法
- 用于将Promise状态从Pending变为Rejected
- 接受一个参数，表示操作失败的原因

#### then方法
- 用于处理Promise成功的情况
- 接受两个参数：成功回调和失败回调（可选）
- 返回一个新的Promise，支持链式调用

#### catch方法
- 用于处理Promise失败的情况
- 接受一个参数：失败回调
- 返回一个新的Promise，支持链式调用

#### finally方法
- 无论Promise成功还是失败，都会执行
- 接受一个参数：回调函数
- 返回一个新的Promise

### 详细示例

#### 基本Promise示例
```javascript
// src/01_promise_practice.js
console.log('=== 基本Promise示例 ===');

// 创建一个Promise
const promise = new Promise((resolve, reject) => {
  // 模拟异步操作（如API请求）
  setTimeout(() => {
    const success = true;
    if (success) {
      // 操作成功，调用resolve
      resolve('操作成功！');
    } else {
      // 操作失败，调用reject
      reject('操作失败！');
    }
  }, 1000);
});

// 使用then处理成功，catch处理失败
promise
  .then((result) => {
    console.log('成功:', result);
  })
  .catch((error) => {
    console.log('失败:', error);
  })
  .finally(() => {
    console.log('无论成功失败都会执行');
  });
```

#### 模拟接口请求的Promise函数
```javascript
// src/01_promise_practice.js
console.log('\n=== 模拟接口请求 ===');

// 模拟API请求函数
function fetchData(url) {
  return new Promise((resolve, reject) => {
    console.log(`开始请求: ${url}`);
    
    // 模拟网络延迟
    setTimeout(() => {
      // 模拟不同URL的响应
      if (url.includes('success')) {
        // 成功响应
        resolve({
          status: 200,
          data: {
            id: 1,
            name: '张三',
            age: 20
          }
        });
      } else if (url.includes('error')) {
        // 失败响应
        reject({
          status: 404,
          message: '资源不存在'
        });
      } else {
        // 其他情况
        reject({
          status: 500,
          message: '服务器错误'
        });
      }
    }, 1500);
  });
}

// 测试成功请求
fetchData('https://api.example.com/success')
  .then((response) => {
    console.log('请求成功:', response);
    return response.data;
  })
  .then((data) => {
    console.log('处理数据:', data);
  })
  .catch((error) => {
    console.log('请求失败:', error);
  });

// 测试失败请求
fetchData('https://api.example.com/error')
  .then((response) => {
    console.log('请求成功:', response);
  })
  .catch((error) => {
    console.log('请求失败:', error);
  });
```

#### Promise链式调用
```javascript
// src/01_promise_practice.js
console.log('\n=== Promise链式调用 ===');

// 模拟多个异步操作
function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('步骤1完成');
      resolve(1);
    }, 1000);
  });
}

function step2(prevResult) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('步骤2完成，上一步结果:', prevResult);
      resolve(prevResult + 1);
    }, 1000);
  });
}

function step3(prevResult) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('步骤3完成，上一步结果:', prevResult);
      resolve(prevResult + 1);
    }, 1000);
  });
}

// 链式调用
step1()
  .then(step2)
  .then(step3)
  .then((finalResult) => {
    console.log('所有步骤完成，最终结果:', finalResult);
  });
```

### Promise的高级用法

#### Promise.all
- 并行执行多个Promise
- 所有Promise都成功才返回成功
- 有一个Promise失败就返回失败

```javascript
// src/01_promise_practice.js
console.log('\n=== Promise.all ===');

const promise1 = new Promise((resolve) => setTimeout(() => resolve('第一个Promise'), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('第二个Promise'), 2000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve('第三个Promise'), 1500));

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log('所有Promise都成功:', results);
  })
  .catch((error) => {
    console.log('有Promise失败:', error);
  });
```

#### Promise.race
- 并行执行多个Promise
- 第一个完成的Promise的结果就是最终结果

```javascript
// src/01_promise_practice.js
console.log('\n=== Promise.race ===');

const racePromise1 = new Promise((resolve) => setTimeout(() => resolve('第一个完成'), 2000));
const racePromise2 = new Promise((resolve) => setTimeout(() => resolve('第二个完成'), 1000));
const racePromise3 = new Promise((resolve) => setTimeout(() => resolve('第三个完成'), 1500));

Promise.race([racePromise1, racePromise2, racePromise3])
  .then((result) => {
    console.log('第一个完成的Promise:', result);
  });
```

## 【Vue3：v-model双向绑定（80分钟）】

### 什么是v-model
v-model是Vue中用于实现表单元素和数据之间双向绑定的指令，它可以自动处理表单元素的输入事件，并更新对应的数据。

### v-model的原理
v-model实际上是一个语法糖，它相当于：
- 对于文本输入框：`:value="data" @input="data = $event.target.value"`
- 对于复选框：`:checked="data" @change="data = $event.target.checked"`
- 对于单选按钮：`:checked="data === value" @change="data = value"`

### v-model的使用场景
- 文本输入框（input[type="text"]）
- 文本域（textarea）
- 复选框（input[type="checkbox"]）
- 单选按钮（input[type="radio"]）
- 下拉选择框（select）

### 详细示例

#### 文本输入框
```html
<!-- src/02_v_model_example.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>v-model示例</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>v-model示例</h2>
    
    <!-- 文本输入框 -->
    <div>
      <label>用户名：</label>
      <input type="text" v-model="username">
      <p>当前用户名：{{ username }}</p>
    </div>
    
    <!-- 文本域 -->
    <div>
      <label>个人简介：</label>
      <textarea v-model="bio" rows="3"></textarea>
      <p>当前简介：{{ bio }}</p>
    </div>
    
    <!-- 复选框 -->
    <div>
      <label>
        <input type="checkbox" v-model="isAgree"> 我同意协议
      </label>
      <p>同意状态：{{ isAgree }}</p>
    </div>
    
    <!-- 单选按钮 -->
    <div>
      <label>性别：</label>
      <label>
        <input type="radio" v-model="gender" value="male"> 男
      </label>
      <label>
        <input type="radio" v-model="gender" value="female"> 女
      </label>
      <p>当前性别：{{ gender }}</p>
    </div>
    
    <!-- 下拉选择框 -->
    <div>
      <label>职业：</label>
      <select v-model="occupation">
        <option value="">请选择</option>
        <option value="developer">开发工程师</option>
        <option value="designer">设计师</option>
        <option value="teacher">教师</option>
      </select>
      <p>当前职业：{{ occupation }}</p>
    </div>
    
    <!-- 多选框 -->
    <div>
      <label>兴趣爱好：</label>
      <label>
        <input type="checkbox" v-model="hobbies" value="reading"> 阅读
      </label>
      <label>
        <input type="checkbox" v-model="hobbies" value="sports"> 运动
      </label>
      <label>
        <input type="checkbox" v-model="hobbies" value="music"> 音乐
      </label>
      <p>当前爱好：{{ hobbies }}</p>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;

    createApp({
      setup() {
        // 响应式数据
        const username = ref('');
        const bio = ref('');
        const isAgree = ref(false);
        const gender = ref('male');
        const occupation = ref('');
        const hobbies = ref([]);
        
        return {
          username,
          bio,
          isAgree,
          gender,
          occupation,
          hobbies
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

### v-model的修饰符

#### .lazy
- 不是实时更新，而是在失去焦点或按下回车键时更新

```html
<input type="text" v-model.lazy="username">
```

#### .number
- 自动将输入值转换为数字

```html
<input type="number" v-model.number="age">
```

#### .trim
- 自动去除输入值的首尾空格

```html
<input type="text" v-model.trim="username">
```

## 【综合实战：注册表单】

### 需求说明
1. 创建一个注册表单，包含以下字段：
   - 用户名
   - 密码
   - 确认密码
   - 性别（单选）
   - 兴趣爱好（多选）
   - 职业（下拉选择）
   - 同意协议（复选框）
2. 实时显示表单数据
3. 实现表单验证（简单验证）
4. 提交表单时显示提交结果

### 完整可运行代码
```html
<!-- src/03_registration_form.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>注册表单</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    /* 简单样式 */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .form-group input[type="text"],
    .form-group input[type="password"],
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
      min-height: 100px;
    }
    .form-group .checkbox-group,
    .form-group .radio-group {
      display: flex;
      gap: 15px;
    }
    .form-group .checkbox-group label,
    .form-group .radio-group label {
      font-weight: normal;
    }
    .error {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }
    .success {
      color: #28a745;
      font-size: 14px;
      margin-top: 5px;
    }
    button {
      padding: 10px 20px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #0069d9;
    }
    .form-data {
      margin-top: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f8f9fa;
    }
    .form-data h3 {
      margin-top: 0;
    }
  </style>
</head>
<body>
  <div id="app" class="container">
    <h1>注册表单</h1>
    
    <!-- 注册表单 -->
    <form @submit.prevent="submitForm">
      <!-- 用户名 -->
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model.trim="form.username" placeholder="请输入用户名">
        <div v-if="errors.username" class="error">{{ errors.username }}</div>
      </div>
      
      <!-- 密码 -->
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="form.password" placeholder="请输入密码">
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>
      
      <!-- 确认密码 -->
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" placeholder="请确认密码">
        <div v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</div>
      </div>
      
      <!-- 性别 -->
      <div class="form-group">
        <label>性别</label>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="form.gender" value="male"> 男
          </label>
          <label>
            <input type="radio" v-model="form.gender" value="female"> 女
          </label>
        </div>
      </div>
      
      <!-- 兴趣爱好 -->
      <div class="form-group">
        <label>兴趣爱好</label>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="form.hobbies" value="reading"> 阅读
          </label>
          <label>
            <input type="checkbox" v-model="form.hobbies" value="sports"> 运动
          </label>
          <label>
            <input type="checkbox" v-model="form.hobbies" value="music"> 音乐
          </label>
          <label>
            <input type="checkbox" v-model="form.hobbies" value="travel"> 旅行
          </label>
        </div>
      </div>
      
      <!-- 职业 -->
      <div class="form-group">
        <label for="occupation">职业</label>
        <select id="occupation" v-model="form.occupation">
          <option value="">请选择</option>
          <option value="developer">开发工程师</option>
          <option value="designer">设计师</option>
          <option value="teacher">教师</option>
          <option value="student">学生</option>
          <option value="other">其他</option>
        </select>
      </div>
      
      <!-- 同意协议 -->
      <div class="form-group">
        <label class="checkbox-group">
          <input type="checkbox" v-model="form.isAgree"> 我同意用户协议和隐私政策
        </label>
        <div v-if="errors.isAgree" class="error">{{ errors.isAgree }}</div>
      </div>
      
      <!-- 提交按钮 -->
      <button type="submit">注册</button>
      <div v-if="submitResult" :class="submitResult.success ? 'success' : 'error'">
        {{ submitResult.message }}
      </div>
    </form>
    
    <!-- 表单数据预览 -->
    <div class="form-data">
      <h3>表单数据预览</h3>
      <pre>{{ form }}</pre>
    </div>
  </div>

  <script>
    const { createApp, ref, reactive } = Vue;

    createApp({
      setup() {
        // 表单数据
        const form = reactive({
          username: '',
          password: '',
          confirmPassword: '',
          gender: 'male',
          hobbies: [],
          occupation: '',
          isAgree: false
        });
        
        // 错误信息
        const errors = reactive({
          username: '',
          password: '',
          confirmPassword: '',
          isAgree: ''
        });
        
        // 提交结果
        const submitResult = ref(null);
        
        // 表单验证
        const validateForm = () => {
          let isValid = true;
          
          // 重置错误信息
          Object.keys(errors).forEach(key => {
            errors[key] = '';
          });
          
          // 验证用户名
          if (!form.username) {
            errors.username = '用户名不能为空';
            isValid = false;
          }
          
          // 验证密码
          if (!form.password) {
            errors.password = '密码不能为空';
            isValid = false;
          } else if (form.password.length < 6) {
            errors.password = '密码长度不能少于6位';
            isValid = false;
          }
          
          // 验证确认密码
          if (form.password !== form.confirmPassword) {
            errors.confirmPassword = '两次输入的密码不一致';
            isValid = false;
          }
          
          // 验证同意协议
          if (!form.isAgree) {
            errors.isAgree = '请同意用户协议和隐私政策';
            isValid = false;
          }
          
          return isValid;
        };
        
        // 模拟注册请求
        const register = () => {
          return new Promise((resolve, reject) => {
            // 模拟网络延迟
            setTimeout(() => {
              // 模拟注册成功
              resolve({
                success: true,
                message: '注册成功！'
              });
              
              // 模拟注册失败
              // reject({
              //   success: false,
              //   message: '注册失败，请稍后重试'
              // });
            }, 1500);
          });
        };
        
        // 提交表单
        const submitForm = async () => {
          // 验证表单
          if (!validateForm()) {
            return;
          }
          
          try {
            // 模拟注册请求
            const result = await register();
            submitResult.value = result;
          } catch (error) {
            submitResult.value = error;
          }
        };
        
        return {
          form,
          errors,
          submitResult,
          submitForm
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 【今日重点总结】
- **ES6 Promise**：用于处理异步操作的对象，具有Pending、Fulfilled、Rejected三种状态，核心方法包括resolve、reject、then、catch、finally
- **Promise链式调用**：通过then方法实现链式调用，避免回调地狱，使异步代码更清晰
- **Vue3 v-model**：实现表单元素和数据之间的双向绑定，支持多种表单元素类型和修饰符
- **表单验证**：结合v-model和数据验证，实现实时表单验证和提交处理
- **综合应用**：结合Promise和v-model，实现了具有验证功能的注册表单，展示了前端开发中常见的表单处理流程