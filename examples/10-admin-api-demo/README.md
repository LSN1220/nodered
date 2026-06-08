# 10-admin-api-demo

这是第十组可运行样例，也是第一条主线项目：管理后台 API。

它把前面学过的内容串起来：

- `Express` 路由
- 中间件
- 登录认证
- 用户、角色、权限模型
- 数据库 CRUD
- 操作日志
- 统一错误处理

## 运行方式

```powershell
npm install
npm run seed
npm start
```

服务默认监听：

```text
http://localhost:3010
```

## 测试账号

```text
email: alice@example.com
password: password123
```

## 常用接口

- `GET /`
- `POST /auth/login`
- `GET /me`
- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /roles`
- `GET /permissions`
- `GET /operation-logs`

## 登录示例

```powershell
$login = Invoke-RestMethod -Method Post http://localhost:3010/auth/login -ContentType 'application/json' -Body '{"email":"alice@example.com","password":"password123"}'
$token = $login.data.token
Invoke-RestMethod http://localhost:3010/me -Headers @{ Authorization = "Bearer $token" }
```

## 本地验证

```powershell
npm run smoke
```

## 说明

这个样例的密码哈希和 token 都是教学实现，方便你读懂认证流程。真实生产项目应使用成熟认证方案，例如 `bcrypt`、短期访问令牌、刷新令牌、安全 Cookie、权限缓存和审计策略。
