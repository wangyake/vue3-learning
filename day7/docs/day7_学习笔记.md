# Vue3 零基础入门 Day7：子传父 & 组件通信入门

## 【学习目标】

- 掌握 Vue3 中组件间的通信方式
- 理解并使用 defineEmits 实现子组件向父组件传值
- 掌握组件插槽（slot）的使用方法
- 复习前 6 天所学内容，完成综合实战：父子通信 todo 列表

## 【Vue3：子传父通信（40分钟）】

### 为什么需要子传父通信

- **组件职责分离**：子组件专注于自身功能，父组件负责整体逻辑
- **数据流向清晰**：实现单向数据流，便于调试和维护
- **交互响应**：子组件的用户操作需要通知父组件进行处理
- **状态管理**：父组件统一管理状态，子组件通过事件触发状态变更

### 子传父通信的实现方式

#### 1. 使用 $emit 方法

**语法**：`this.$emit('事件名', 数据)`

**示例**：

```javascript
// 子组件
const ChildComponent = {
  template: `
    <button @click="sendMessage">发送消息</button>
  `,
  methods: {
    sendMessage() {
      this.$emit('message', 'Hello from child');
    }
  }
};

// 父组件
const ParentComponent = {
  components: {
    ChildComponent
  },
  template: `
    <div>
      <child-component @message="handleMessage"></child-component>
      <p>{{ message }}</p>
    </div>
  `,
  data() {
    return {
      message: ''
    };
  },
  methods: {
    handleMessage(msg) {
      this.message = msg;
    }
  }
};
```

#### 2. 使用 defineEmits（Composition API）

**语法**：`const emit = defineEmits(['事件名1', '事件名2']);`

**示例**：

```javascript
// 子组件
const ChildComponent = {
  setup(props, { emit }) {
    const sendMessage = () => {
      emit('message', 'Hello from child');
    };
    return {
      sendMessage
    };
  },
  template: `
    <button @click="sendMessage">发送消息</button>
  `
};

// 父组件
const ParentComponent = {
  components: {
    ChildComponent
  },
  setup() {
    const message = ref('');
    const handleMessage = (msg) => {
      message.value = msg;
    };
    return {
      message,
      handleMessage
    };
  },
  template: `
    <div>
      <child-component @message="handleMessage"></child-component>
      <p>{{ message }}</p>
    </div>
  `
};
```

### 详细示例

#### 基本子传父示例

```html
<!-- src/01_child_to_parent.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>子传父通信示例</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .child {
      padding: 20px;
      border: 1px solid #ddd;
      margin: 20px 0;
      background: #f9f9f9;
    }
    .parent {
      padding: 20px;
      border: 1px solid #007bff;
      background: #e7f3ff;
    }
    button {
      padding: 10px 20px;
      background: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="app" class="container">
    <h1>子传父通信示例</h1>
    
    <!-- 父组件区域 -->
    <div class="parent">
      <h2>父组件</h2>
      <p>接收到的消息：{{ message }}</p>
      <p>计数器值：{{ count }}</p>
      
      <!-- 使用子组件 -->
      <child-component 
        @message="handleMessage"
        @increment="handleIncrement"
        @decrement="handleDecrement"
      ></child-component>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;

    // 子组件
    const ChildComponent = {
      setup(props, { emit }) {
        // 发送消息
        const sendMessage = () => {
          emit('message', 'Hello from child component!');
        };
        
        // 增加计数器
        const increment = () => {
          emit('increment');
        };
        
        // 减少计数器
        const decrement = () => {
          emit('decrement');
        };
        
        return {
          sendMessage,
          increment,
          decrement
        };
      },
      template: `
        <div class="child">
          <h3>子组件</h3>
          <button @click="sendMessage">发送消息给父组件</button>
          <div style="margin: 10px 0;">
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
          </div>
        </div>
      `
    };

    createApp({
      components: {
        'child-component': ChildComponent
      },
      setup() {
        const message = ref('');
        const count = ref(0);
        
        // 处理子组件发送的消息
        const handleMessage = (msg) => {
          message.value = msg;
        };
        
        // 处理增加计数器
        const handleIncrement = () => {
          count.value++;
        };
        
        // 处理减少计数器
        const handleDecrement = () => {
          count.value--;
        };
        
        return {
          message,
          count,
          handleMessage,
          handleIncrement,
          handleDecrement
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 【Vue3：defineEmits 详解（30分钟）】

### defineEmits 的作用

- **类型定义**：明确子组件可以触发的事件
- **代码提示**：提供事件名称的代码提示
- **运行时校验**：在开发环境中校验事件名称
- **Composition API 风格**：与 setup 函数配合使用

### defineEmits 的使用方式

#### 1. 基本用法

```javascript
// 子组件
const ChildComponent = {
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    const updateItem = (id) => {
      emit('update', id);
    };
    const deleteItem = (id) => {
      emit('delete', id);
    };
    return {
      updateItem,
      deleteItem
    };
  }
};
```

#### 2. 带类型定义的用法

```javascript
// 子组件
const ChildComponent = {
  emits: {
    // 不带参数的事件
    update: () => true,
    // 带参数的事件，且参数必须是数字
    delete: (id) => typeof id === 'number'
  },
  setup(props, { emit }) {
    // ...
  }
};
```

### 详细示例

#### defineEmits 示例

```html
<!-- src/02_define_emits.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>defineEmits 示例</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .item {
      padding: 10px;
      border: 1px solid #ddd;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      padding: 5px 10px;
      margin-left: 10px;
      cursor: pointer;
    }
    .update-btn {
      background: #ffc107;
      color: #212529;
      border: none;
    }
    .delete-btn {
      background: #dc3545;
      color: #fff;
      border: none;
    }
  </style>
</head>
<body>
  <div id="app" class="container">
    <h1>defineEmits 示例</h1>
    
    <h2>待办事项列表</h2>
    <div v-if="todos.length === 0">暂无待办事项</div>
    <div v-else>
      <todo-item 
        v-for="todo in todos" 
        :key="todo.id"
        :todo="todo"
        @update="updateTodo"
        @delete="deleteTodo"
      ></todo-item>
    </div>
  </div>

  <script>
    const { createApp, ref } = Vue;

    // 待办项组件
    const TodoItem = {
      props: ['todo'],
      // 定义组件可以触发的事件
      emits: ['update', 'delete'],
      setup(props, { emit }) {
        // 触发更新事件
        const handleUpdate = () => {
          emit('update', props.todo.id);
        };
        
        // 触发删除事件
        const handleDelete = () => {
          emit('delete', props.todo.id);
        };
        
        return {
          handleUpdate,
          handleDelete
        };
      },
      template: `
        <div class="item">
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.text }}
          </span>
          <div>
            <button class="update-btn" @click="handleUpdate">
              {{ todo.completed ? '标记为未完成' : '标记为完成' }}
            </button>
            <button class="delete-btn" @click="handleDelete">删除</button>
          </div>
        </div>
      `
    };

    createApp({
      components: {
        'todo-item': TodoItem
      },
      setup() {
        // 待办事项数据
        const todos = ref([
          { id: 1, text: '学习 Vue3 组件通信', completed: false },
          { id: 2, text: '练习 defineEmits', completed: true },
          { id: 3, text: '掌握组件插槽', completed: false }
        ]);
        
        // 更新待办事项状态
        const updateTodo = (id) => {
          const todo = todos.value.find(t => t.id === id);
          if (todo) {
            todo.completed = !todo.completed;
          }
        };
        
        // 删除待办事项
        const deleteTodo = (id) => {
          todos.value = todos.value.filter(t => t.id !== id);
        };
        
        return {
          todos,
          updateTodo,
          deleteTodo
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 【Vue3：组件插槽 slot（40分钟）】

### 什么是组件插槽

组件插槽是 Vue 中一种强大的内容分发机制，允许父组件向子组件传递 HTML 内容。

### 插槽的作用

- **内容分发**：父组件可以向子组件插入任意内容
- **组件复用**：子组件可以根据不同的使用场景展示不同的内容
- **灵活性**：提高组件的灵活性和可扩展性
- **代码组织**：使组件结构更清晰

### 插槽的类型

#### 1. 默认插槽

**语法**：在子组件中使用 `<slot></slot>`，父组件在组件标签内添加内容

**示例**：

```javascript
// 子组件
const ChildComponent = {
  template: `
    <div>
      <h3>子组件</h3>
      <slot></slot>
    </div>
  `
};

// 父组件使用
<child-component>
  <p>这是插入到子组件的内容</p>
</child-component>
```

#### 2. 具名插槽

**语法**：使用 `name` 属性定义插槽名称，父组件使用 `v-slot:名称` 或 `#名称` 指定插槽内容

**示例**：

```javascript
// 子组件
const ChildComponent = {
  template: `
    <div>
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `
};

// 父组件使用
<child-component>
  <template #header>
    <h1>页面标题</h1>
  </template>
  <p>主要内容</p>
  <template #footer>
    <p>版权信息</p>
  </template>
</child-component>
```

#### 3. 作用域插槽

**语法**：子组件通过 `slotProps` 向父组件传递数据，父组件通过 `v-slot:名称="slotProps"` 接收

**示例**：

```javascript
// 子组件
const ChildComponent = {
  data() {
    return {
      items: ['item1', 'item2', 'item3']
    };
  },
  template: `
    <div>
      <slot v-for="item in items" :item="item" :index="items.indexOf(item)">
        {{ item }}
      </slot>
    </div>
  `
};

// 父组件使用
<child-component>
  <template v-slot="{ item, index }">
    <p>{{ index + 1 }}: {{ item }}</p>
  </template>
</child-component>
```

### 详细示例

#### 插槽综合示例

```html
<!-- src/03_component_slot.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>组件插槽示例</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      margin: 20px 0;
    }
    .card-header {
      background: #f8f9fa;
      padding: 15px;
      border-bottom: 1px solid #ddd;
    }
    .card-body {
      padding: 15px;
    }
    .card-footer {
      background: #f8f9fa;
      padding: 15px;
      border-top: 1px solid #ddd;
      text-align: right;
    }
    .list {
      list-style: none;
      padding: 0;
    }
    .list-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .list-item:last-child {
      border-bottom: none;
    }
  </style>
</head>
<body>
  <div id="app" class="container">
    <h1>组件插槽示例</h1>
    
    <!-- 默认插槽示例 -->
    <h2>1. 默认插槽</h2>
    <card>
      <p>这是默认插槽的内容，可以插入任意HTML</p>
      <button @click="showAlert">点击我</button>
    </card>
    
    <!-- 具名插槽示例 -->
    <h2>2. 具名插槽</h2>
    <card>
      <template #header>
        <h3>自定义卡片标题</h3>
      </template>
      <p>这是卡片的主要内容</p>
      <ul class="list">
        <li class="list-item">项目1</li>
        <li class="list-item">项目2</li>
        <li class="list-item">项目3</li>
      </ul>
      <template #footer>
        <button>确认</button>
        <button style="margin-left: 10px;">取消</button>
      </template>
    </card>
    
    <!-- 作用域插槽示例 -->
    <h2>3. 作用域插槽</h2>
    <todo-list :items="todos">
      <template #default="{ item, index }">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span :style="{ textDecoration: item.completed ? 'line-through' : 'none' }">
            {{ index + 1 }}. {{ item.text }}
          </span>
          <button @click="toggleTodo(item.id)">
            {{ item.completed ? '标记为未完成' : '标记为完成' }}
          </button>
        </div>
      </template>
    </todo-list>
  </div>

  <script>
    const { createApp, ref } = Vue;

    // 卡片组件（使用具名插槽）
    const Card = {
      template: `
        <div class="card">
          <div class="card-header">
            <slot name="header">默认标题</slot>
          </div>
          <div class="card-body">
            <slot></slot>
          </div>
          <div class="card-footer">
            <slot name="footer">默认 footer</slot>
          </div>
        </div>
      `
    };

    // 待办列表组件（使用作用域插槽）
    const TodoList = {
      props: ['items'],
      template: `
        <div class="list">
          <slot 
            v-for="item in items" 
            :key="item.id"
            :item="item"
            :index="items.indexOf(item)"
          ></slot>
        </div>
      `
    };

    createApp({
      components: {
        Card,
        TodoList
      },
      setup() {
        const todos = ref([
          { id: 1, text: '学习组件插槽', completed: false },
          { id: 2, text: '练习作用域插槽', completed: true },
          { id: 3, text: '掌握插槽的各种用法', completed: false }
        ]);
        
        const showAlert = () => {
          alert('Hello from slot content!');
        };
        
        const toggleTodo = (id) => {
          const todo = todos.value.find(t => t.id === id);
          if (todo) {
            todo.completed = !todo.completed;
          }
        };
        
        return {
          todos,
          showAlert,
          toggleTodo
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

## 【综合实战：父子通信 todo 列表】

### 需求说明

1. 创建一个待办列表应用，包含以下功能：
   - 添加新待办事项
   - 标记待办事项为完成/未完成
   - 删除待办事项
   - 筛选待办事项（全部/已完成/未完成）
   - 统计待办事项数量
2. 使用组件化开发：
   - `TodoItem` 组件：显示单个待办事项，支持切换完成状态和删除
   - `TodoList` 组件：显示待办事项列表，支持筛选
   - `TodoForm` 组件：添加新待办事项的表单
3. 实现组件间通信：
   - 父组件向子组件传递数据（props）
   - 子组件向父组件传递事件（defineEmits）

### 完整可运行代码

```html
<!-- src/04_parent_child_todo.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>父子通信 todo 列表</title>
  <!-- 引入Vue3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    /* 全局样式 */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }
    
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
    
    /* 表单样式 */
    .todo-form {
      display: flex;
      margin-bottom: 20px;
    }
    
    .todo-form input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
      font-size: 16px;
    }
    
    .todo-form button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      font-size: 16px;
    }
    
    .todo-form button:hover {
      background-color: #45a049;
    }
    
    /* 筛选按钮 */
    .filter-buttons {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .filter-buttons button {
      padding: 8px 16px;
      margin: 0 5px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .filter-buttons button.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    /* 待办事项列表 */
    .todo-list {
      margin-bottom: 20px;
    }
    
    /* 待办事项项 */
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    
    .todo-item:last-child {
      border-bottom: none;
    }
    
    .todo-item.completed {
      background-color: #f9f9f9;
    }
    
    .todo-item .todo-content {
      display: flex;
      align-items: center;
    }
    
    .todo-item input[type="checkbox"] {
      margin-right: 10px;
      transform: scale(1.2);
    }
    
    .todo-item .todo-text {
      font-size: 16px;
    }
    
    .todo-item.completed .todo-text {
      text-decoration: line-through;
      color: #999;
    }
    
    .todo-item .todo-actions {
      display: flex;
    }
    
    .todo-item button {
      padding: 5px 10px;
      margin-left: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .todo-item .delete-btn {
      background-color: #dc3545;
      color: white;
    }
    
    .todo-item .delete-btn:hover {
      background-color: #c82333;
    }
    
    /* 空状态 */
    .empty-state {
      text-align: center;
      padding: 40px 0;
      color: #999;
    }
    
    /* 统计信息 */
    .todo-stats {
      text-align: center;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="container">
      <h1>待办列表</h1>
      
      <!-- 添加待办事项表单 -->
      <todo-form @add="addTodo"></todo-form>
      
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
      <todo-list 
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      ></todo-list>
      
      <!-- 空状态提示 -->
      <div v-if="filteredTodos.length === 0" class="empty-state">
        暂无待办事项
      </div>
      
      <!-- 统计信息 -->
      <div class="todo-stats">
        共 {{ todos.length }} 项，已完成 {{ completedCount }} 项，未完成 {{ activeCount }} 项
      </div>
    </div>
  </div>

  <script>
    const { createApp, ref, computed } = Vue;

    // 待办事项表单组件
    const TodoForm = {
      setup(props, { emit }) {
        const newTodo = ref('');
        
        const addTodo = () => {
          if (newTodo.value.trim()) {
            emit('add', newTodo.value.trim());
            newTodo.value = '';
          }
        };
        
        return {
          newTodo,
          addTodo
        };
      },
      template: `
        <div class="todo-form">
          <input 
            v-model="newTodo" 
            placeholder="输入新的待办事项" 
            @keyup.enter="addTodo"
          >
          <button @click="addTodo">添加</button>
        </div>
      `
    };

    // 待办事项项组件
    const TodoItem = {
      props: ['todo'],
      emits: ['toggle', 'delete'],
      setup(props, { emit }) {
        const handleToggle = () => {
          emit('toggle', props.todo.id);
        };
        
        const handleDelete = () => {
          emit('delete', props.todo.id);
        };
        
        return {
          handleToggle,
          handleDelete
        };
      },
      template: `
        <div :class="{ completed: todo.completed }" class="todo-item">
          <div class="todo-content">
            <input 
              type="checkbox" 
              :checked="todo.completed" 
              @change="handleToggle"
            >
            <span class="todo-text">{{ todo.text }}</span>
          </div>
          <div class="todo-actions">
            <button class="delete-btn" @click="handleDelete">删除</button>
          </div>
        </div>
      `
    };

    // 待办事项列表组件
    const TodoList = {
      props: ['todos'],
      emits: ['toggle', 'delete'],
      components: {
        'todo-item': TodoItem
      },
      template: `
        <div class="todo-list">
          <todo-item 
            v-for="todo in todos" 
            :key="todo.id"
            :todo="todo"
            @toggle="$emit('toggle', $event)"
            @delete="$emit('delete', $event)"
          ></todo-item>
        </div>
      `
    };

    createApp({
      components: {
        'todo-form': TodoForm,
        'todo-list': TodoList
      },
      setup() {
        // 待办事项数据
        const todos = ref([
          { id: 1, text: '复习 Vue3 基础语法', completed: true },
          { id: 2, text: '练习组件通信', completed: false },
          { id: 3, text: '掌握组件插槽', completed: false },
          { id: 4, text: '完成综合实战项目', completed: false }
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
        const addTodo = (text) => {
          // 生成唯一ID
          const newId = todos.value.length > 0 
            ? Math.max(...todos.value.map(todo => todo.id)) + 1 
            : 1;
          
          // 添加新待办事项
          todos.value.push({
            id: newId,
            text,
            completed: false
          });
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
        
        return {
          todos,
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

## 【前 6 天内容复习】

### Day 1：Vue3 初体验
- **ES6 模块**：了解了 ES6 模块的基本语法和使用方法
- **Vue3 项目创建**：使用 Vite 创建了第一个 Vue3 项目
- **Vue3 基本结构**：了解了 Vue3 项目的目录结构和基本文件

### Day 2：Vue3 基础语法
- **ES6 基础**：复习了 ES6 的基本语法，包括 let/const、箭头函数、模板字符串等
- **Vue3 响应式数据**：使用 ref 创建响应式数据
- **Vue3 事件处理**：使用 @click 等指令处理事件

### Day 3：Vue3 计算属性和侦听器
- **ES6 数组方法**：练习了 map、filter、reduce 等数组方法
- **Vue3 计算属性**：使用 computed 创建计算属性
- **Vue3 侦听器**：使用 watch 监听数据变化

### Day 4：Vue3 条件渲染和列表渲染
- **let/const 练习**：巩固了 let/const 的使用
- **Vue3 条件渲染**：使用 v-if、v-else、v-show 进行条件渲染
- **Vue3 列表渲染**：使用 v-for 渲染列表
- **待办列表案例**：实现了带筛选功能的待办列表

### Day 5：v-model 和 ES6 Promise
- **ES6 Promise**：学习了 Promise 的基本概念和使用方法
- **Vue3 v-model**：掌握了 v-model 双向绑定的使用
- **注册表单案例**：实现了带验证功能的注册表单

### Day 6：组件基础和 ES6 对象简写
- **ES6 对象简写**：学习了对象属性和方法的简写语法
- **Vue3 组件**：掌握了组件的定义、注册和使用方法
- **组件通信**：通过 props 向子组件传递数据
- **待办项组件**：封装了待办项组件，实现了组件化开发

## 【今日重点总结】

- **子传父通信**：通过 defineEmits 和 $emit 实现子组件向父组件传递事件和数据
- **组件插槽**：掌握了默认插槽、具名插槽和作用域插槽的使用方法
- **组件化开发**：通过拆分组件，实现了更清晰、可维护的代码结构
- **综合应用**：完成了一个完整的父子通信 todo 列表，涵盖了前 6 天所学的大部分内容
- **复习巩固**：对前 6 天的内容进行了系统复习，加深了理解和记忆

## 【学习建议】

1. **多练习组件通信**：组件通信是 Vue 开发中的核心概念，需要多练习不同场景下的通信方式
2. **理解插槽的使用场景**：插槽可以使组件更加灵活，适用于需要动态内容的场景
3. **复习前 6 天内容**：定期复习前 6 天的内容，巩固基础
4. **尝试构建更复杂的应用**：将所学知识应用到更复杂的项目中，提高实战能力
5. **阅读 Vue 官方文档**：官方文档是最权威的学习资源，建议深入阅读相关章节