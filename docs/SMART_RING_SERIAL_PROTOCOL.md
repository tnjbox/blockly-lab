# SmartRing Serial JSON Protocol

## 一、文件目的

本文件記錄 Blockly Lab 與 ESP8266 SmartRingController 之間的 WebSerial JSON 通訊協定。

MVP-B07 起，前端固定使用本文件定義的 LED 控制指令格式。

---

## 二、通訊方式

- 連線方式：WebSerial
- baudRate：115200
- 資料格式：一行一筆 JSON
- 每筆資料以換行字元 `\n` 結束

---

## 三、ESP8266 傳送到前端的狀態資料

ESP8266 應持續送出按鈕狀態：

```json
{"btn":[false,false,false,false,false,false,false,false],"func":0,"mode":0}