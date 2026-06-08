# 08-nodered-http-flow

这是第八组可运行样例，目标是学习 `Node-RED` 如何提供 HTTP API。

这个样例使用 `docker-compose` 启动 `Node-RED`，并挂载本地 `data/flows.json`。启动后可以在浏览器里打开 `http://localhost:1881` 查看流程。

## 学习目标

- 理解 `http in` 和 `http response` 节点
- 理解 `json` 节点如何解析请求体
- 理解 `function` 节点如何处理业务逻辑
- 理解 `flow context` 如何保存简单运行时状态
- 理解如何用 Node-RED 快速做一个轻量 API

## 启动方式

```powershell
docker compose up -d
```

打开：

```text
http://localhost:1881
```

## 可测试的接口

```powershell
Invoke-RestMethod http://localhost:1881/api/health
```

```powershell
Invoke-RestMethod -Method Post http://localhost:1881/api/devices -ContentType 'application/json' -Body '{"sn":"TEMP-001","name":"Workshop Sensor","type":"temperature"}'
```

```powershell
Invoke-RestMethod http://localhost:1881/api/context/count
```

## 停止服务

```powershell
docker compose down
```

## 本地校验

不启动 Docker，也可以先校验流程 JSON：

```powershell
npm run verify
```

## 推荐练习

- 给 `/api/devices` 增加 `location` 字段校验
- 新增一个 `GET /api/devices/example` 接口返回模拟设备
- 修改 `flow context`，让它保存最后一次提交的设备信息
