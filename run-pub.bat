@echo off
chcp 65001 >nul
title MQTT-Publisher
cd /d e:\tare\iot-demo
"E:\node\node.exe" publisher.js
pause
