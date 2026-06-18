# Younger Dream Workshop 平台介面規劃

## 一、文件目的

本文件記錄 Blockly x SmartRingControler 教學實驗室的平台介面規劃，作為後續課程代碼、學習模式、競賽模式、自動評分與 Google Sheet 上傳功能的開發依據。

---

## 二、平台定位

本平台的核心定位是：

- 先透過 SmartRingController 互動提升學生學習動機
- 再透過 Blockly 建立程式設計基本概念
- 對進階學生導入程式解題與競賽評分
- 支援學習模式與競賽模式
- 未來可透過 Google Sheet 收集競賽成績

---

## 三、MVP-B04 介面架構

MVP-B04 將平台從單純 Blockly 編輯器，擴充為課程任務平台。

### 上方標題區

- 平台名稱：Younger Dream Workshop
- 副標題：Blockly x SmartRingControler 教學實驗室
- 功能按鈕：
  - 載入範例
  - 執行程式
  - 清除工作區

### 課程操作列

包含：

- 班級
- 座號
- 姓名
- 課程代碼
- 模式選擇
  - 學習模式
  - 競賽模式
- 載入課程
- 測試任務
- 上傳成績

### Blockly 編輯區

學生主要拖拉積木的位置。

### 右側任務與結果區

包含：

- 課程任務說明
- JavaScript 程式碼預覽
- 測試結果 / 執行輸出

### 下方狀態列

包含：

- 系統版本
- 目前模式
- SmartRing 連線狀態

---

## 四、學習模式

學習模式的定位是協助學生練習與探索。

預計功能：

- 顯示較多任務提示
- 可重複測試
- 可顯示詳細錯誤原因
- 不上傳成績
- 適合國小、國中初學者與課堂練習

---

## 五、競賽模式

競賽模式的定位是提供正式測驗或競賽紀錄。

預計功能：

- 顯示較少提示
- 使用正式測資
- 記錄提交結果
- 上傳 Google Sheet
- 可記錄作答時間、分數與程式碼
- 適合進階學生與競賽培訓

---

## 六、課程代碼規劃

建議課程代碼採用固定格式：

- SR-B01：SmartRing 基礎互動任務
- SR-A01：SmartRing 陣列任務
- SR-G01：SmartRing 遊戲任務
- JS-B01：Blockly / JavaScript 基礎題
- JS-A01：Blockly / JavaScript 陣列題
- CP-001：競賽解題任務

代碼說明：

- SR：SmartRing 任務
- JS：一般 Blockly / JavaScript 解題
- CP：Competition 競賽題
- B：Basic 基礎
- A：Array 陣列
- G：Game 遊戲

---

## 七、MVP-B04 暫時不處理的功能

MVP-B04 只建立介面骨架，以下功能留待後續版本：

- 真正連接 SmartRingController
- 真正載入後台題庫
- 真正執行測資評分
- 真正上傳 Google Sheet
- 真正記錄學生作答歷程

---

## 八、後續 MVP 建議

### MVP-B05｜SmartRing WebSerial 連線版

- 建立 WebSerial 連線
- 顯示 connected / disconnected
- 讀取 ESP8266 按鈕狀態
- 送出 LED 控制指令

### MVP-B06｜SmartRing 基礎積木版

- 新增 SmartRing 連線積木
- 新增 SmartRing 按鈕積木
- 新增 SmartRing LED 積木

### MVP-C01｜課程代碼載入版

- 建立正式課程資料格式
- 依課程代碼載入任務說明
- 依課程載入工具箱與範例積木

### MVP-J01｜學習模式評分版

- 建立本機測資
- 執行學生程式
- 比對輸出與標準答案
- 顯示測試結果

### MVP-J02｜競賽模式 Google Sheet 上傳版

- 建立 Google Apps Script
- 將競賽模式評分結果上傳 Google Sheet
- 記錄班級、座號、姓名、課程代碼、分數與時間

---

## 九、MVP-B04 結論

MVP-B04 的重點是先把平台介面從「單純 Blockly 編輯器」轉向「課程任務平台」，讓後續 SmartRingController、課程代碼、評分與雲端成績紀錄都能逐步整合進來。

---

## 十、MVP-B04-1 版面調整

MVP-B04-1 將版面從「右側同時顯示任務、程式碼、結果」改為更適合學生使用的配置。

### 主工作區分頁

主工作區包含兩個分頁：

- 積木程式
- JavaScript 程式碼

預設顯示積木程式，學生需要觀察文字碼時，再切換至 JavaScript 程式碼分頁。

### 任務說明呈現方式

右側任務區只顯示摘要：

- 題目名稱
- 課程代碼
- 任務類型
- 適用程度
- 學習目標

完整題目資訊改由浮動視窗顯示，避免右側欄位過於擁擠。

### 完整任務浮動視窗

完整任務視窗包含：

- 課程基本資料
- 學習目標
- 任務說明
- 操作說明
- 積木限制 / 建議
- SmartRing 要求
- 評分方式
- 教學提示

### 積木程式存取

新增：

- 存檔積木
- 載入積木

積木程式以 `.blockly.xml` 格式儲存，方便學生保存作品、下次繼續編輯，或繳交給老師。

### 教學價值

此版本讓平台更符合以下使用情境：

- 國小學生以積木操作為主
- 國中學生可逐步觀察 JavaScript 程式碼
- 教師可提供起始積木檔
- 學生可保存與繳交自己的積木作品

---

## 十一、MVP-B05 SmartRing WebSerial 連線

MVP-B05 開始加入 SmartRingController 實體硬體連線能力。

### 介面新增

- 連線 SmartRing
- 斷開 SmartRing
- SmartRing 狀態面板
- 按鈕狀態顯示
- 原始 JSON 資料顯示
- 下方 SmartRing 狀態列

### 技術架構

新增三個模組：

- `serial.js`：負責 WebSerial 連線、斷線、讀取與寫入
- `protocol.js`：負責解析 ESP8266 傳回的 JSON 資料
- `runtime.js`：負責整合 Serial 與平台狀態，提供後續 Blockly 積木呼叫

### 教學定位

本版是 SmartRingController 與 Blockly Lab 整合的第一步。  
學生尚未使用 SmartRing 積木，但教師可以先確認硬體連線與按鈕資料讀取是否正常。

### 後續發展

MVP-B06 將新增 SmartRing 基礎積木，讓學生可以透過 Blockly 控制 LED 與讀取按鈕。

---

## 十三、MVP-B07 SmartRing LED 指令協定校準

MVP-B07 針對 SmartRing LED 控制建立固定 JSON 指令格式。

### 新增測試功能

SmartRing 狀態面板新增：

- 測試第 0 顆紅燈
- 清除 LED
- 最後送出指令

此設計讓教師可以不透過 Blockly，直接測試前端是否能送出 LED 控制指令。

### LED 指令格式

設定單顆 LED：

```json
{"cmd":"setLed","index":0,"color":"red","r":255,"g":0,"b":0}