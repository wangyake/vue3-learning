const btn = document.querySelector('button');
btn.addEventListener('click', function() {
  // 第一步：点击按钮时，这个回调函数的调用者是 btn
  // 所以 this 指向 btn（正确）
  console.log(this); // btn 元素

  setTimeout(function() {
    // 第二步：1秒后，定时器回调函数执行
    // 这个函数没有「明确的调用者」（不是 xxx.函数() 这种形式）
    // 浏览器规定：无调用者的普通函数，this 默认指向 window
    console.log(this); // window
    this.style.color = 'red'; // 报错：window 没有 style 属性
  }, 1000);

  // 对比箭头函数，摆脱this指向问题
    setTimeout(() => {
    // 箭头函数没有自己的 this，会「继承外层作用域的 this」
    // 外层是按钮的点击回调，this 指向 btn，所以这里的 this 也指向 btn
    console.log(this); // btn 元素
    this.style.color = 'red'; // 正常生效
    }, 1000);
});

    