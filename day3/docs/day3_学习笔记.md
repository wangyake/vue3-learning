# Vue3 零基础入门 Day3：条件/列表渲染 + ES6数组方法

## 【学习目标】
- 掌握ES6数组方法（forEach、map、filter）的使用场景和语法
- 理解并应用Vue3的条件渲染（v-if、v-show）
- 掌握Vue3的列表渲染（v-for）及key的作用
- 完成综合实战：待办列表应用

## 【ES6数组方法补学（25分钟）】

### 为什么学ES6数组方法
- 简化代码：比传统for循环更简洁易读
- 函数式编程：支持链式调用，代码更优雅
- 提高效率：内置方法性能优化，减少手动实现
- 应用广泛：在Vue等现代框架中频繁使用

### 核心方法对比表
| 方法 | 作用 | 返回值 | 是否修改原数组 | 使用场景 |
|------|------|--------|----------------|----------|
| forEach | 遍历数组，执行回调 | undefined | 否（但可通过索引修改） | 仅需遍历执行操作，不需要返回新数组 |
| map | 遍历数组，返回新数组 | 新数组（长度与原数组相同） | 否 | 需要基于原数组创建新数组 |
| filter | 过滤数组，返回符合条件的元素 | 新数组（长度可能小于原数组） | 否 | 需要从原数组中筛选符合条件的元素 |

### 方法详解与示例

#### forEach 方法
**语法**：`array.forEach(callback(currentValue, index, array))`

**示例代码**：
```html
<!-- src/01_es6数组方法练习.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>ES6数组方法练习</title>
</head>
<body>
  <script>
    // 定义一个数组
    const numbers = [1, 2, 3, 4, 5];
    
    console.log('=== forEach 方法示例 ===');
    // 使用forEach遍历数组
    numbers.forEach((num, index) => {
      // 计算每个元素的平方并打印
      const square = num * num;
      console.log(`索引 ${index} 的元素 ${num} 的平方是 ${square}`);
    });
    
    // 注意：forEach没有返回值
    const result = numbers.forEach(num => num * 2);
    console.log('forEach的返回值:', result); // undefined
  </script>
</body>
</html>
```

#### map 方法
**语法**：`array.map(callback(currentValue, index, array))`

**示例代码**：
```html
<!-- src/01_es6数组方法练习.html -->
<script>
  console.log('\n=== map 方法示例 ===');
  // 使用map创建新数组，每个元素是原元素的2倍
  const doubledNumbers = numbers.map(num => num * 2);
  console.log('原数组:', numbers); // [1, 2, 3, 4, 5]
  console.log('新数组:', doubledNumbers); // [2, 4, 6, 8, 10]
  
  // 使用map处理对象数组
  const users = [
    { name: '张三', age: 20 },
    { name: '李四', age: 25 },
    { name: '王五', age: 30 }
  ];
  
  const userNames = users.map(user => user.name);
  console.log('用户姓名数组:', userNames); // ['张三', '李四', '王五']
</script>
```

#### filter 方法
**语法**：`array.filter(callback(currentValue, index, array))`

**示例代码**：
```html
<!-- src/01_es6数组方法练习.html -->
<script>
  console.log('\n=== filter 方法示例 ===');
  // 使用filter筛选出偶数
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  console.log('偶数数组:', evenNumbers); // [2, 4]
  
  // 使用filter筛选出年龄大于25的用户
  const olderUsers = users.filter(user => user.age > 25);
  console.log('年龄大于25的用户:', olderUsers); // [{ name: '王五', age: 30 }]
</script>
```

### 方法对比总结
- **forEach**：适合不需要返回值的遍历操作
- **map**：适合需要转换数组元素并返回新数组的场景
- **filter**：适合需要根据条件筛选数组元素的场景
- 三者都不会修改原数组（forEach可通过索引修改，但不推荐）
- 都支持链式调用，例如：`array.filter().map()`

## 【Vue3条件/列表渲染（55分钟）】

### 条件渲染

#### v-if 指令
**语法**：`v-if="表达式"`
- 表达式为真时，元素会被渲染
- 表达式为假时，元素会被从DOM中移除

**示例代码**：
```html
<div v-if="isShow">
  这是v-if控制的元素
</div>
```

#### v-show 指令
**语法**：`v-show="表达式"`
- 表达式为真时，元素会显示（display: block）
- 表达式为假时，元素会隐藏（display: none）
- 元素始终存在于DOM中

**示例代码**：
```html
<div v-show="isShow">
  这是v-show控制的元素
</div>
```

#### v-if 与 v-show 核心差异
| 特性 | v-if | v-show |
|------|------|--------|
| DOM存在 | 条件为假时移除 | 始终存在 |
| 性能消耗 | 切换时消耗较大（DOM操作） | 初始渲染消耗较大 |
| 适用场景 | 不频繁切换的场景 | 频繁切换的场景 |
| 编译方式 | 惰性编译 | 始终编译 |

### 列表渲染

#### v-for 指令
**语法**：`v-for="(item, index) in items" :key="item.id"`
- `item`：当前遍历的元素
- `index`：当前元素的索引
- `items`：要遍历的数组
- `:key`：必须提供唯一标识符，用于Vue的虚拟DOM diff算法

**示例代码**：
```html
<ul>
  <li v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </li>
</ul>
```

#### key 的作用
- **唯一标识**：帮助Vue识别每个节点的身份
- **优化渲染**：当列表变化时，只更新变化的元素，而不是重新渲染整个列表
- **避免错误**：防止因元素重用导致的状态混乱
- **最佳实践**：使用唯一且稳定的ID作为key，避免使用index

#### v-for 与 v-if 优先级
- **不推荐同时使用**：v-for的优先级高于v-if，会导致性能问题
- **推荐做法**：先使用computed属性过滤数据，再用v-for渲染

**示例代码**：
```javascript
// 不推荐的写法
<li v-for="item in items" v-if="item.active" :key="item.id">
  {{ item.name }}
</li>

// 推荐的写法
// 1. 在computed中过滤数据
computed: {
  activeItems() {
    return this.items.filter(item => item.active);
  }
}

// 2. 在模板中使用过滤后的数据
<li v-for="item in activeItems" :key="item.id">
  {{ item.name }}
</li>
```

## 【综合实战：待办列表】

### 需求说明
1. 显示待办事项列表
2. 实现待办事项的删除功能
3. 实现按状态筛选待办事项（全部/已完成/未完成）
4. 使用v-if/v-show切换筛选状态

### 完整可运行代码
```html
<!-- src/02_vue待办列表案例.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Vue3 待办列表</title>
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
  </style>
</head>
<body>
  <div id="app" class="container">
    <h1>待办列表</h1>
    
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
        <span>{{ todo.text }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">删除</button>
      </li>
    </ul>
    
    <!-- 空状态提示 -->
    <div v-if="filteredTodos.length === 0" style="text-align: center; color: #999;">
      暂无待办事项
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
          { id: 3, text: '完成待办列表案例', completed: false }
        ]);
        
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
        
        // 删除待办事项方法
        const deleteTodo = (id) => {
          // 使用filter方法创建不包含指定id的新数组
          todos.value = todos.value.filter(todo => todo.id !== id);
        };
        
        // 返回模板中需要用到的变量和方法
        return {
          todos,
          currentFilter,
          filters,
          filteredTodos,
          deleteTodo
        };
      }
    }).mount('#app'); // 挂载到#app容器
  </script>
</body>
</html>
```

## 【今日重点总结】
- **ES6数组方法**：forEach用于遍历执行操作，map用于创建新数组，filter用于筛选元素，三者都不会修改原数组
- **Vue条件渲染**：v-if通过DOM操作控制元素显示/隐藏，适合不频繁切换的场景；v-show通过CSS控制元素显示/隐藏，适合频繁切换的场景
- **Vue列表渲染**：使用v-for遍历数组，必须提供唯一的key属性（推荐使用稳定的ID而非index），避免v-for与v-if同时使用
- **综合应用**：结合ES6数组方法和Vue渲染指令，实现了具有筛选和删除功能的待办列表应用，展示了前端开发的核心流程