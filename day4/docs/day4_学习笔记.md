# Vue3 零基础入门 Day4：计算属性/侦听器 + ES6 let/const

## 【学习目标】

- 掌握ES6中let和const的用法及与var的区别
- 理解块级作用域和变量提升的概念
- 掌握Vue3的计算属性（computed）的使用方法
- 掌握Vue3的侦听器（watch）的使用方法
- 完成综合实战：给待办列表添加已完成/未完成筛选功能

## 【ES6补学：let/const（20分钟）】

### 为什么学let/const

- **解决var的问题**：避免变量提升、作用域混乱等问题
- **代码更安全**：const定义常量，防止意外修改
- **提高代码可读性**：明确变量的作用域和可变性
- **现代JavaScript标准**：在ES6+项目中广泛使用

### let和const的基本语法

#### let 关键字

**语法**：`let 变量名 = 值;`

- 用于声明可变变量
- 支持块级作用域
- 不支持变量提升
- 同一作用域内不能重复声明

#### const 关键字

**语法**：`const 常量名 = 值;`

- 用于声明不可变常量
- 支持块级作用域
- 不支持变量提升
- 同一作用域内不能重复声明
- 声明时必须初始化
- 不能重新赋值，但对象和数组的内容可以修改

### var、let、const 对比表

| 特性     | var   | let   | const |
| ------ | ----- | ----- | ----- |
| 作用域    | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升   | 支持    | 不支持   | 不支持   |
| 重复声明   | 允许    | 不允许   | 不允许   |
| 重新赋值   | 允许    | 允许    | 不允许   |
| 声明时初始化 | 可选    | 可选    | 必须    |

### 详细示例

#### 块级作用域示例

```html
<!-- src/01_let_const_practice.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>let/const 练习</title>
</head>
<body>
  <script>
    console.log('=== 块级作用域示例 ===');
    
    // var的函数作用域
    function varExample() {
      if (true) {
        var x = 10;
      }
      console.log('var x:', x); // 10，因为var是函数作用域
    }
    varExample();
    
    // let的块级作用域
    function letExample() {
      if (true) {
        let y = 20;
      }
      // console.log('let y:', y); // 报错，因为let是块级作用域
    }
    letExample();
    
    // const的块级作用域
    function constExample() {
      if (true) {
        const z = 30;
        console.log('const z:', z); // 30
      }
      // console.log('const z:', z); // 报错，因为const是块级作用域
    }
    constExample();
  </script>
</body>
</html>
```

#### 变量提升示例

```html
<!-- src/01_let_const_practice.html -->
<script>
  console.log('\n=== 变量提升示例 ===');
  
  // var的变量提升
  console.log('var a before declaration:', a); // undefined，var会被提升
  var a = 100;
  console.log('var a after declaration:', a); // 100
  
  // let的变量提升
  // console.log('let b before declaration:', b); // 报错，let不会被提升
  let b = 200;
  console.log('let b after declaration:', b); // 200
  
  // const的变量提升
  // console.log('const c before declaration:', c); // 报错，const不会被提升
  const c = 300;
  console.log('const c after declaration:', c); // 300
</script>
```

#### const的特性示例

```html
<!-- src/01_let_const_practice.html -->
<script>
  console.log('\n=== const特性示例 ===');
  
  // const声明常量
  const PI = 3.14159;
  console.log('PI:', PI); // 3.14159
  
  // 尝试修改const常量（会报错）
  // PI = 3.14; // 报错：Assignment to constant variable
  
  // const声明对象
  const person = {
    name: '张三',
    age: 20
  };
  console.log('person:', person); // { name: '张三', age: 20 }
  
  // 修改const对象的属性（允许）
  person.age = 21;
  console.log('person after age change:', person); // { name: '张三', age: 21 }
  
  // 尝试重新赋值const对象（会报错）
  // person = { name: '李四', age: 25 }; // 报错：Assignment to constant variable
  
  // const声明数组
  const numbers = [1, 2, 3];
  console.log('numbers:', numbers); // [1, 2, 3]
  
  // 修改const数组的内容（允许）
  numbers.push(4);
  console.log('numbers after push:', numbers); // [1, 2, 3, 4]
</script>
```

### 最佳实践

- **优先使用const**：除非变量需要重新赋值
- **使用let**：当变量需要在块级作用域内重新赋值时
- **避免使用var**：减少作用域混乱和变量提升问题
- **命名规范**：const常量使用大写字母和下划线（如`MAX_VALUE`），let变量使用驼峰命名（如`userName`）

## 【Vue3：计算属性/侦听器（40分钟）】

### 计算属性（computed）

#### 什么是计算属性

计算属性是Vue中用于处理复杂逻辑的一种方式，它基于响应式依赖进行缓存，只有当依赖发生变化时才会重新计算。

#### 计算属性的优势

- **缓存机制**：避免重复计算，提高性能（配合ref：响应式变量）
- **代码更清晰**：将复杂逻辑从模板中分离出来
- **响应式**：自动追踪依赖的变化

#### 计算属性的语法

```javascript
// 在setup函数中使用计算属性
// 大括号是命名导出（单独小工具），不带大括号是默认导出（整体对象，整个工具箱）
import { computed } from 'vue';

const computedProperty = computed(() => {
  // 计算逻辑
  return result;
});
```

#### 计算属性示例

```html
<!-- src/02_computed_watch_example.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>计算属性和侦听器示例</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>计算属性示例</h2>
    <p>原始价格: {{ price }} 元</p>
    <p>折扣: {{ discount }}%</p>
    <p>折后价格: {{ discountedPrice }} 元</p>
    <p>折扣节省: {{ savings }} 元</p>
    
    <button @click="price += 10">增加价格</button>
    <button @click="discount += 5">增加折扣</button>
  </div>

  <script>
    const { createApp, ref, computed } = Vue;

    createApp({
      setup() {
        // 响应式数据
        const price = ref(100);
        const discount = ref(20);
        
        // 计算属性：折后价格
        const discountedPrice = computed(() => {
          return price.value * (1 - discount.value / 100);
        });
        
        // 计算属性：节省金额
        const savings = computed(() => {
          return price.value - discountedPrice.value;
        });
        
        return {
          price,
          discount,
          discountedPrice,
          savings
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

### 侦听器（watch）

#### 什么是侦听器

侦听器用于监听数据的变化并执行相应的操作，适合处理异步操作或复杂的副作用。

#### 侦听器的语法

```javascript
// 在setup函数中使用侦听器
import { watch } from 'vue';

watch(source, (newValue, oldValue) => {
  // 响应数据变化的逻辑
}, {
  // 选项
  immediate: true, // 是否在初始化时执行
  deep: true // 是否深度监听
});
```

#### 侦听器示例

```html
<!-- src/02_computed_watch_example.html -->
<div id="app2">
  <h2>侦听器示例</h2>
  <input v-model="message" placeholder="输入消息">
  <p>当前消息: {{ message }}</p>
  <p>消息长度: {{ messageLength }}</p>
  <p>上次修改时间: {{ lastUpdated }}</p>
</div>

<script>
  const { createApp, ref, watch, computed } = Vue;

  createApp({
    setup() {
      // 响应式数据
      const message = ref('');
      const lastUpdated = ref(new Date().toLocaleString());
      
      // 计算属性：消息长度
      const messageLength = computed(() => message.value.length);
      
      // 侦听器：监听消息变化
      watch(message, (newValue, oldValue) => {
        console.log('消息变化:', oldValue, '->', newValue);
        lastUpdated.value = new Date().toLocaleString();
      });
      
      return {
        message,
        messageLength,
        lastUpdated
      };
    }
  }).mount('#app2');
</script>
```

### 计算属性 vs 侦听器

| 特性    | 计算属性        | 侦听器              |
| ----- | ----------- | ---------------- |
| 用途    | 处理复杂计算，返回结果 | 响应数据变化，执行副作用     |
| 缓存    | 有缓存机制       | 无缓存机制            |
| 同步/异步 | 同步计算        | 支持异步操作           |
| 依赖追踪  | 自动追踪所有依赖    | 需要明确指定监听源        |
| 使用场景  | 数据转换、格式化、组合 | 异步操作、API调用、DOM操作 |

## 【综合实战：待办列表筛选功能】

### 需求说明

1. 基于Day3的待办列表案例
2. 添加「已完成/未完成」筛选功能
3. 使用computed属性实现筛选逻辑
4. 保持原有的删除功能

### 完整可运行代码

```html
<!-- src/03_todo_list_with_filter.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Vue3 待办列表（带筛选）</title>
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
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .todo-item.completed {
      text-decoration: line-through;
      color: #999;
    }
    .filter-buttons {
      margin: 20px 0;
    }
    .filter-buttons button {
      margin-right: 10px;
      padding: 5px 10px;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
    }
    .filter-buttons button.active {
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }
    .delete-btn {
      background: #dc3545;
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    .add-todo {
      margin: 20px 0;
      display: flex;
    }
    .add-todo input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
    }
    .add-todo button {
      padding: 10px 20px;
      background: #28a745;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="app" class="container">
    <h1>待办列表</h1>
    
    <!-- 添加待办事项 -->
    <div class="add-todo">
      <input v-model="newTodo" placeholder="输入新的待办事项" @keyup.enter="addTodo">
      <button @click="addTodo">添加</button>
    </div>
    
    <!-- 筛选按钮 -->
    <div class="filter-buttons">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        :class="{ active: currentFilter === filter.value }"
        @click="currentFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>
    
    <!-- 待办事项列表 -->
    <ul>
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
        class="todo-item"
      >
        <div>
          <input type="checkbox" v-model="todo.completed">
          <span>{{ todo.text }}</span>
        </div>
        <button class="delete-btn" @click="deleteTodo(todo.id)">删除</button>
      </li>
    </ul>
    
    <!-- 空状态提示 -->
    <div v-if="filteredTodos.length === 0" style="text-align: center; color: #999;">
      暂无待办事项
    </div>
    
    <!-- 统计信息 -->
    <div style="margin-top: 20px; font-weight: bold;">
      共 {{ todos.length }} 项，已完成 {{ completedCount }} 项，未完成 {{ activeCount }} 项
    </div>
  </div>

  <script>
    // Vue3 创建应用实例
    const { createApp, ref, computed } = Vue;

    createApp({
      setup() {
        // 待办事项数据
        const todos = ref([
          { id: 1, text: '学习Vue3基础', completed: true },
          { id: 2, text: '练习ES6数组方法', completed: false },
          { id: 3, text: '完成待办列表案例', completed: false },
          { id: 4, text: '学习计算属性和侦听器', completed: false }
        ]);
        
        // 新待办事项输入
        const newTodo = ref('');
        
        // 当前筛选状态
        const currentFilter = ref('all');
        
        // 筛选选项
        const filters = [
          { label: '全部', value: 'all' },
          { label: '已完成', value: 'completed' },
          { label: '未完成', value: 'active' }
        ];
        
        // 计算属性：根据当前筛选状态过滤待办事项
        const filteredTodos = computed(() => {
          if (currentFilter.value === 'all') {
            return todos.value;
          } else if (currentFilter.value === 'completed') {
            // 使用filter方法筛选已完成的待办事项
            return todos.value.filter(todo => todo.completed);
          } else {
            // 使用filter方法筛选未完成的待办事项
            return todos.value.filter(todo => !todo.completed);
          }
        });
        
        // 计算属性：已完成的待办事项数量
        const completedCount = computed(() => {
          return todos.value.filter(todo => todo.completed).length;
        });
        
        // 计算属性：未完成的待办事项数量
        const activeCount = computed(() => {
          return todos.value.filter(todo => !todo.completed).length;
        });
        
        // 添加待办事项方法
        const addTodo = () => {
          if (newTodo.value.trim()) {
            // 生成唯一ID
            const newId = todos.value.length > 0 
              ? Math.max(...todos.value.map(todo => todo.id)) + 1 
              : 1;
            
            // 添加新待办事项
            todos.value.push({
              id: newId,
              text: newTodo.value.trim(),
              completed: false
            });
            
            // 清空输入框
            newTodo.value = '';
          }
        };
        
        // 删除待办事项方法
        const deleteTodo = (id) => {
          // 使用filter方法创建不包含指定id的新数组
          todos.value = todos.value.filter(todo => todo.id !== id);
        };
        
        // 返回模板中需要用到的变量和方法
        return {
          todos,
          newTodo,
          currentFilter,
          filters,
          filteredTodos,
          completedCount,
          activeCount,
          addTodo,
          deleteTodo
        };
      }
    }).mount('#app'); // 挂载到#app容器
  </script>
</body>
</html>
```

## 【今日重点总结】

- **ES6 let/const**：let用于声明块级作用域的可变变量，const用于声明块级作用域的不可变常量，两者都不支持变量提升
- **块级作用域**：let和const的作用域限于它们所在的代码块，解决了var的作用域混乱问题
- **Vue计算属性**：基于响应式依赖进行缓存的计算值，适合处理复杂逻辑，提高性能
- **Vue侦听器**：监听数据变化并执行副作用，适合处理异步操作和复杂的响应逻辑
- **综合应用**：结合ES6语法和Vue特性，实现了具有添加、删除、筛选和统计功能的待办列表应用

