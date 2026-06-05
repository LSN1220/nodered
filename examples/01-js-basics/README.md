# 01-js-basics

这是第一组可运行样例，目标是帮助你建立 `JavaScript + Node.js` 的最小代码感觉。

## 学习目标

- 理解变量、常量和常见数据类型
- 理解函数的输入、输出和复用
- 理解对象与数组的基本用法
- 理解模块拆分和 `require`
- 用 `Node.js` 直接运行 JavaScript 代码

## 目录说明

```text
src/
  index.js
  01-variables.js
  02-functions.js
  03-objects-arrays.js
  04-modules.js
  utils/
    math-utils.js
```

## 运行方式

在当前目录执行：

```powershell
npm start
```

或者直接执行：

```powershell
node src/index.js
```

## 你会看到什么

程序会按顺序运行 4 组示例，并在终端输出：

- 变量和数据类型示例
- 函数和参数示例
- 对象与数组示例
- 模块拆分示例

## 建议学习方式

1. 先运行一次，看完整输出
2. 再逐个打开 `src/` 下的文件阅读注释
3. 修改示例中的值，再重新运行观察结果
4. 自己新增一个函数或对象字段，验证理解是否正确

## 推荐练习

- 把 `price` 和 `quantity` 改成别的值，重新计算总价
- 自己写一个 `multiply` 函数
- 给用户对象新增 `email` 字段
- 在 `math-utils.js` 里新增 `subtract` 函数并在主程序中调用
