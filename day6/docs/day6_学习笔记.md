# Vue3 零基础入门 Day6：组件基础 + ES6对象简写

## 【学习目标】

- 掌握ES6对象简写的语法和使用方法
- 理解Vue3组件的基本概念
- 掌握Vue3组件的定义、注册和使用方法
- 完成综合实战：封装待办项组件

## 【ES6补学：对象简写（20分钟）】

### 为什么学对象简写

- **代码更简洁**：减少重复代码，提高代码可读性
- **语法更优雅**：使对象定义更加简洁明了
- **现代JavaScript标准**：在ES6+项目中广泛使用
- **与Vue3配合使用**：在组件定义和props传递中经常用到

### 对象属性简写

**语法**：当对象的属性名与变量名相同时，可以只写属性名，省略冒号和值

**示例**：

```javascript
// 传统写法
const name = 'Vue';
const version = '3.0';
const obj = {
  name: name,
  version: version
};

// ES6简写
const name = 'Vue';
const version = '3.0';
const obj = {
  name,
  version
};
```

### 对象方法简写

**语法**：对象的方法可以省略function关键字和冒号。裸的函数不能省略。

**示例**：

```javascript
// 传统写法
const obj = {
  name: 'Vue',
  greet: function() {
    console.log('Hello!');
  }
};

// ES6简写
const obj = {
  name: 'Vue',
  greet() {
    console.log('Hello!');
  }
};
```

### 详细示例

#### 基本对象简写

```javascript
// src/01_object_shorthand.js
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
```

#### 计算属性名

**语法**：使用方括号 `[]` 来定义动态的属性名

```javascript
// src/01_object_shorthand.js
console.log('\n=== 计算属性名 ===');

const propName = 'framework';
const versionProp = 'version';

const objWithComputedProps = {
  [propName]: 'Vue',
  [versionProp]: '3.5.30',
  [`${propName}${versionProp}`]: 'Vue3.5.30'
};

console.log('计算属性名:', objWithComputedProps);
```

#### 结合解构赋值

```javascript
// src/01_object_shorthand.js
console.log('\n=== 结合解构赋值 ===');

// 定义一个对象
const user = {
  name: '张三',
  age: 20,
  email: 'zhangsan@example.com'
};

// 解构赋值
const { name, age, email } = user;

// 使用对象简写创建新对象
const userProfile = {
  name,
  age,
  email,
  createdAt: new Date().toLocaleString()
};

console.log('解构赋值 + 对象简写:', userProfile);
```

### 最佳实践

- **优先使用对象简写**：当属性名与变量名相同时，使用简写形式
- **方法定义**：使用简写形式定义对象方法
- **计算属性名**：当属性名需要动态生成时，使用计算属性名语法
- **代码风格**：保持代码风格一致，提高代码可读性

## 【Vue3：组件基础（40分钟）】

### 什么是组件

组件是Vue应用的基本构建块，它允许我们将UI拆分为独立、可复用的部分。

### 组件的优点

- **代码复用**：将重复的UI和逻辑封装为组件
- **模块化**：使代码结构更清晰，便于维护
- **可测试性**：组件可以独立测试
- **团队协作**：不同团队成员可以同时开发不同组件

### 组件的定义和注册

#### 全局注册

**语法**：`app.component('组件名', 组件选项)`

**示例**：

```javascript
const app = createApp({});

// 全局注册组件
app.component('my-component', {
  template: '<div>这是一个全局组件</div>'
});

app.mount('#app');
```

#### 局部注册

**语法**：在组件的components选项中注册

**示例**：

```javascript
const MyComponent = {
  template: '<div>这是一个局部组件</div>'
};

createApp({
  components: {
    'my-component': MyComponent
  }
}).mount('#app');
```

### 组件的使用

**语法**：在模板中使用组件标签

**示例**：

```html
<my-component></my-component>
```

### 组件的props

props是组件的输入，允许父组件向子组件传递数据。

**示例**：

```javascript
const TodoItem = {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
};

// 使用组件
<todo-item :todo="item"></todo-item>
```

### 组件的事件

子组件可以通过事件向父组件传递消息。

**示例**：

```javascript
const TodoItem = {
  props: ['todo'],
  template: `
    <li>
      {{ todo.text }}
      <button @click="$emit('delete', todo.id)">删除</button>
    </li>
  `
};

// 使用组件
<todo-item :todo="item" @delete="deleteTodo"></todo-item>
```

### 详细示例

#### 基本组件示例

```html
<!-- src/02_component_basics.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>组件基础示例</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h2>组件基础示例</h2>
    
    <!-- 使用全局组件 -->
    <global-component></global-component>
    
    <!-- 使用局部组件 -->
    <local-component></local-component>
    
    <!-- 使用带props的组件 -->
    <greeting-component name="张三"></greeting-component>
    <greeting-component name="李四"></greeting-component>
  </div>

  <script>
    const { createApp } = Vue;

    // 全局注册组件
    createApp({
      // 局部组件
      components: {
        'local-component': {
          template: '<div>这是一个局部组件</div>'
        },
        'greeting-component': {
          props: ['name'],
          template: '<div>你好，{{ name }}！</div>'
        }
      }
    })
    // 全局注册组件
    .component('global-component', {
      template: '<div>这是一个全局组件</div>'
    })
    .mount('#app');
  </script>
</body>
</html>
```

## 【综合实战：待办项组件】

### 需求说明

1. 封装一个「待办项组件」（TodoItem）
2. 组件接收一个todo对象作为prop
3. 组件支持点击复选框切换完成状态
4. 组件支持删除功能，通过事件通知父组件
5. 在待办列表中引入使用该组件

### 完整可运行代码

```html
<!-- src/03_todo_list_with_components.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>待办列表（带组件）</title>
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
      <!-- 使用待办项组件 -->
      <todo-item 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      ></todo-item>
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
    const { createApp, ref, computed } = Vue;

    // 待办项组件
    const TodoItem = {
      // 接收props
      props: ['todo'],
      // 模板
      template: `
        <li :class="{ completed: todo.completed }" class="todo-item">
          <div>
            <input 
              type="checkbox" 
              :checked="todo.completed" 
              @change="$emit('toggle', todo.id)"
            >
            <span>{{ todo.text }}</span>
          </div>
          <button class="delete-btn" @click="$emit('delete', todo.id)">删除</button>
        </li>
      `
    };

    createApp({
      // 注册组件
      components: {
        'todo-item': TodoItem
      },
      
      setup() {
        // 待办事项数据
        const todos = ref([
          { id: 1, text: '学习Vue3组件', completed: true },
          { id: 2, text: '练习ES6对象简写', completed: false },
          { id: 3, text: '完成待办列表案例', completed: false }
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
            return todos.value.filter(todo => todo.completed);
          } else {
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
            
            // 使用ES6对象简写
            todos.value.push({
              id: newId,
              text: newTodo.value.trim(),
              completed: false
            });
            
            // 清空输入框
            newTodo.value = '';
          }
        };
        
        // 切换待办事项完成状态
        const toggleTodo = (id) => {
          const todo = todos.value.find(todo => todo.id === id);
          if (todo) {
            todo.completed = !todo.completed;
          }
        };
        
        // 删除待办事项方法
        const deleteTodo = (id) => {
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
          toggleTodo,
          deleteTodo
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 【今日重点总结】

- **ES6对象简写**：当属性名与变量名相同时，可以只写属性名；对象方法可以省略function关键字和冒号
- **Vue3组件**：组件是Vue应用的基本构建块，允许将UI拆分为独立、可复用的部分
- **组件注册**：可以全局注册（app.component）或局部注册（components选项）
- **组件通信**：通过props向子组件传递数据，通过事件向父组件传递消息
- **综合应用**：封装了待办项组件，实现了组件的定义、注册和使用，以及组件间的通信

