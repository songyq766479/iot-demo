// server.js —— Express 可视化服务：订阅 publisher.js 发布的 MQTT 数据，向网页提供最新数值和历史记录
require('dotenv').config();
const path = require('path');
const express = require('express');
const mqtt = require('mqtt');

const url = process.env.MQTT_URL || 'mqtt://localhost:1883';
const topic = process.env.TOPIC || 'iot/demo/temperature';
const port = Number(process.env.WEB_PORT) || 3000;
const MAX_POINTS = 60; // 折线图最多保留最近 60 条数据

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// 内存中保存最近收到的数据，供网页读取
const history = [];
let latest = null;

app.get('/api/data', (req, res) => {
  res.json({ topic, latest, history });
});

const client = mqtt.connect(url, {
  username: process.env.MQTT_USERNAME || undefined,
  password: process.env.MQTT_PASSWORD || undefined,
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('[WEB] MQTT connected:', url);
  client.subscribe(topic, { qos: 0 }, (err) => {
    if (err) {
      console.error('[WEB] Subscribe error:', err.message);
    } else {
      console.log('[WEB] Subscribed to:', topic);
    }
  });
});

client.on('message', (t, payload) => {
  try {
    const data = JSON.parse(payload.toString());
    latest = data;
    history.push({
      ts: data.ts,
      temperature: Number(data.temperature),
      humidity: Number(data.humidity),
    });
    if (history.length > MAX_POINTS) {
      history.shift();
    }
    console.log('[WEB] Received:', payload.toString());
  } catch (err) {
    console.error('[WEB] 数据解析失败:', err.message);
  }
});

client.on('error', (err) => console.error('[WEB] MQTT error:', err.message));

app.listen(port, () => {
  console.log(`[WEB] 可视化网页: http://localhost:${port}`);
});
