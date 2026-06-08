# 04-express-middleware

这是第四组可运行样例，目标是理解 `Express` 中间件。

中间件可以理解为请求进入路由前、路由执行中、响应返回前的一组处理函数。后端项目里的日志、认证、参数解析、错误处理，通常都依赖中间件。

## 学习目标

- 理解全局中间件
- 理解路由级中间件
- 理解 `next()` 的作用
- 理解统一响应格式
- 理解集中错误处理

## 运行方式

```powershell
npm install
npm start
```

服务默认监听：`http://localhost:3001`

## 可测试的接口

- `GET /`
- `GET /api/profile`
- `GET /api/admin`
- `GET /api/error`

## 推荐练习

- 修改 `requestLogger` 输出更多字段
- 删除 `/api/admin` 请求头里的 `x-demo-token`，观察 401 响应
- 自己增加一个校验查询参数的中间件
