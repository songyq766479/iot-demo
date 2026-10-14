@echo off
chcp 65001 >nul
title MQTT-Subscriber
cd /d e:\tare\iot-demo
"E:\node\node.exe" subscriber.js
pause
