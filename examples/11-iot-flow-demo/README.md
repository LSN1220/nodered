# 11-iot-flow-demo

这是第十一个样例，也是第二条主线项目：物联网数据平台。

它把前面学过的内容串起来：

- `Node-RED` 订阅 MQTT 设备消息
- `Function` 节点标准化设备上报数据
- `Express` 提供数据接收和查询 API
- `SQLite` 保存设备、事件和告警
- `docker-compose` 统一编排 Node-RED、MQTT Broker 和 API 服务

## 架构

```text
Device MQTT Message
  -> Mosquitto
  -> Node-RED mqtt in
  -> Node-RED function normalize
  -> HTTP POST /internal/telemetry
  -> Express API
  -> SQLite
```

## 本地 API 验证

不启动 Docker，也可以先验证 API 和数据库逻辑：

```powershell
npm install
npm run smoke
```

## 流程文件校验

```powershell
npm run verify
```

## Docker 启动

```powershell
docker compose up --build -d
```

服务地址：

```text
Node-RED: http://localhost:1890
API:      http://localhost:3020
MQTT:     localhost:1893
```

## 发布测试设备消息

```powershell
docker compose exec mqtt mosquitto_pub -h localhost -t devices/TEMP-001/telemetry -m '{\"temperature\":38.6,\"humidity\":45}'
```

## 查询数据

```powershell
Invoke-RestMethod http://localhost:3020/devices
Invoke-RestMethod http://localhost:3020/telemetry/latest
Invoke-RestMethod http://localhost:3020/alerts
```

## 停止

```powershell
docker compose down
```

## 推荐练习

- 增加湿度告警规则
- 给 `/telemetry/events` 增加时间范围查询
- 把 `TEMP-001` 换成更多设备编号
- 修改 Node-RED 流程，让不同 topic 进入不同处理分支
