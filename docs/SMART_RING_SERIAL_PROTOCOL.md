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

## LED 編號規則

從 MVP-B08-1 起，SmartRing LED 編號採用學生較容易理解的 1 起算。

| 學生看到的 LED 編號 | ESP8266 內部 WS2812 index |
|---:|---:|
| 1 | 0 |
| 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 4 |
| 6 | 5 |
| 7 | 6 |
| 8 | 7 |
| 9 | 8 |
| 10 | 9 |
| 11 | 10 |
| 12 | 11 |

前端送出的 JSON 使用 LED 編號 1～12：

```json
{"cmd":"setLed","index":1,"color":"red","r":255,"g":0,"b":0}

