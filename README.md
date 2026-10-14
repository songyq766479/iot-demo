# iot-demo

物联网设计与创新课程实践项目。

## 功能说明

| 文件 | 说明 |
| --- | --- |
| `publisher.js` | MQTT 发布者，模拟温湿度传感器，每 2 秒向主题发布一条 JSON 数据 |
| `subscriber.js` | MQTT 订阅者，订阅主题并打印收到的消息 |
| `server.js` | Express 可视化服务，订阅同一主题，向网页提供最新数值与历史数据 |
| `public/index.html` | 数据可视化网页，显示最新温湿度与实时折线图 |

## 运行方式

1. 启动本地 Mosquitto 服务（监听 1883 端口）。
2. 安装依赖：`npm install`
3. 启动数据发布者：`npm run pub`
4. 启动可视化服务：`npm start`，然后用浏览器访问 http://localhost:3000

## 环境变量

参考项目根目录的 `.env`（已被 `.gitignore` 忽略，不提交到仓库）：

```text
MQTT_URL=mqtt://localhost:1883
TOPIC=iot/demo/temperature
WEB_PORT=3000
```

## 验证记录

- 2026-10-14：本地启动 publisher.js 与 server.js，网页每 2 秒自动更新，最新数值与折线图随发布数据同步变化。
