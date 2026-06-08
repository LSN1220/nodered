# 09-nodered-mqtt-flow

这是第九组可运行样例，目标是学习 `Node-RED + MQTT` 如何处理设备数据。

这个样例用 `docker-compose` 同时启动：

- `Node-RED`
- `Eclipse Mosquitto` MQTT Broker

启动后可以在浏览器里打开 `http://localhost:1882` 查看流程。

## 学习目标

- 理解 MQTT topic 的基本设计
- 理解 `mqtt in` 节点如何订阅设备消息
- 理解 `json` 节点如何解析设备上报数据
- 理解 `function` 节点如何标准化消息
- 理解如何用 flow context 保存最新设备状态
- 理解如何做简单阈值告警

## 启动方式

```powershell
docker compose up -d
```

打开：

```text
http://localhost:1882
```

## 发布一条测试设备消息

```powershell
docker compose exec mqtt mosquitto_pub -h localhost -t devices/TEMP-001/telemetry -m '{\"temperature\":38.6,\"humidity\":45}'
```

## 查询最新设备状态

```powershell
Invoke-RestMethod http://localhost:1882/api/iot/latest
```

## 停止服务

```powershell
docker compose down
```

## 本地校验

```powershell
npm run verify
```

## 推荐练习

- 把告警阈值从 `37` 改成 `40`
- 增加 `humidity` 湿度告警
- 修改 topic 结构，比如 `factory/a/devices/TEMP-001/telemetry`
- 把最新状态从 flow context 改成写入数据库
