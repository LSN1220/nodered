# 05-express-crud-with-db

这是第五组可运行样例，目标是把 `Express`、REST API、数据库 CRUD 串起来。

为了让样例尽量容易运行，这里使用 `SQLite`。它是一个本地文件数据库，不需要额外启动数据库服务，但建表、查询、插入、更新、删除这些思路和后续学习 MySQL/PostgreSQL 是相通的。

## 学习目标

- 理解数据库连接模块
- 理解建表和种子数据
- 理解 REST 风格 CRUD
- 理解分页和简单过滤
- 理解服务层如何隔离数据库细节

## 运行方式

```powershell
npm install
npm run seed
npm start
```

服务默认监听：`http://localhost:3002`

## 可测试的接口

- `GET /`
- `GET /users`
- `GET /users?role=admin&page=1&pageSize=10`
- `GET /users/1`
- `POST /users`
- `PUT /users/1`
- `DELETE /users/1`

## 示例请求

```powershell
Invoke-RestMethod -Method Post http://localhost:3002/users -ContentType 'application/json' -Body '{"name":"Dave","email":"dave@example.com","role":"viewer"}'
```

## 推荐练习

- 给 `users` 表增加 `phone` 字段
- 给列表接口增加 `keyword` 搜索
- 尝试创建重复邮箱，观察唯一约束带来的错误
- 把删除改成软删除，增加 `deleted_at` 字段
