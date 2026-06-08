# 06-db-schema-admin

这是第六组可运行样例，目标是学习管理后台中最常见的数据库模型：用户、角色、权限、菜单。

这里使用 `SQLite`，重点不是数据库产品本身，而是理解表之间的关系。

## 学习目标

- 理解后台系统的用户表
- 理解角色和权限的多对多关系
- 理解用户和角色的多对多关系
- 理解菜单资源如何和权限关联
- 理解唯一约束、外键、索引的用途

## 运行方式

```powershell
npm install
npm run seed
npm start
```

## 核心表

- `users`：系统用户
- `roles`：角色
- `permissions`：权限点
- `menus`：菜单资源
- `user_roles`：用户和角色的关系表
- `role_permissions`：角色和权限的关系表

## 推荐练习

- 给 `Alice` 增加一个新角色
- 新增一个 `audit:read` 权限并分配给 `admin`
- 给菜单增加父子层级
- 尝试插入重复的 `email` 或 `permission code`，观察唯一约束
