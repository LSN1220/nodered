# 03-express-routing

这是第三组可运行样例，目标是帮助你理解 `Express` 里最重要的入口概念：路由。

## 学习目标

- 理解什么是路由
- 理解 `GET` 路由的定义方式
- 理解路径参数和查询参数
- 理解 JSON 响应的基本写法
- 理解一个最小 API 服务如何启动

## 目录说明

```text
src/
  app.js
  routes/
    hello.routes.js
    users.routes.js
```

## 安装依赖

```powershell
npm install
```

## 运行方式

```powershell
npm start
```

服务默认监听：`http://localhost:3000`

## 可测试的接口

- `GET /`
- `GET /hello`
- `GET /hello?name=Alice`
- `GET /users`
- `GET /users/1`

## 推荐练习

- 自己增加一个 `GET /health` 路由
- 给 `/users` 增加一个查询参数，比如 `role`
- 自己新增一条模拟用户数据
