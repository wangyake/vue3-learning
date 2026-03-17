# Day2 核心知识点速记
## ES6 部分
1. 箭头函数：() => {}，单参数省略()，单返回值省略{}和return，无独立this；
   单返回值例子：const add = (a, b) => a + b;
2. 对象解构：const {a, b} = obj，快速提取属性，可重命名（{a: newA}）、设默认值（{a = 1}）。

## Vue3 部分
1. 模板语法：
   - {{}}：插值表达式，渲染变量/简单运算；
   - v-bind(:)：动态绑定HTML属性（如:disabled、:class）；
   - v-on(@)：绑定事件（如@click、@input）。
2. 响应式：setup中用ref声明响应式变量，修改需用.value；
3. 计数器核心：点击事件修改ref变量，页面自动响应更新。

createApp 先创建了包含 count、增减函数的「Vue 应用实例（app）」，mount('#app') 只是把这个「已经装好功能的实例」「挂载 / 渲染」到页面的 #app 容器里（让功能在页面上生效）。