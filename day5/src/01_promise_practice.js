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

console.log('\n=== Promise.race ===');

const racePromise1 = new Promise((resolve) => setTimeout(() => resolve('第一个完成'), 2000));
const racePromise2 = new Promise((resolve) => setTimeout(() => resolve('第二个完成'), 1000));
const racePromise3 = new Promise((resolve) => setTimeout(() => resolve('第三个完成'), 1500));

Promise.race([racePromise1, racePromise2, racePromise3])
  .then((result) => {
    console.log('第一个完成的Promise:', result);
  });