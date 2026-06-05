# 02-nodejs-async

这是第二组可运行样例，目标是帮助你理解 `Node.js` 中最核心也最容易卡住的部分：异步编程。

## 学习目标

- 理解同步和异步的区别
- 理解 `Promise` 的基本用法
- 理解 `async/await` 的执行方式
- 理解 `try/catch` 在异步代码中的错误处理
- 学会使用 `fs/promises` 进行文件读写

## 目录说明

```text
src/
  index.js
  01-sync-vs-async.js
  02-promises.js
  03-async-await.js
  04-file-read-write.js
data/
  input.txt
```

## 运行方式

```powershell
npm start
```

## 你会看到什么

- 同步和异步输出顺序的区别
- 手写 `Promise` 示例
- `async/await` 串行调用示例
- 文件读取、处理、写入示例
- 一个刻意制造的错误处理示例

## 推荐练习

- 把 `setTimeout` 时间改成不同数值，观察输出顺序
- 自己增加一个新的异步函数并 `await` 它
- 修改 `data/input.txt` 内容，再重新运行
- 故意把读取文件名改错，观察报错信息
