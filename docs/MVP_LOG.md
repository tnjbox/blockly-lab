---

## MVP-B04｜平台首頁與課程模式架構版

### 狀態

已建立。

### 本版目標

將平台從單純 Blockly 編輯器，擴充為可支援課程任務、學生資料、學習模式、競賽模式與 SmartRing 狀態的課程平台介面。

### 已完成項目

- 新增學生資料輸入欄位
  - 班級
  - 座號
  - 姓名
- 新增課程代碼輸入欄位
- 新增模式選擇
  - 學習模式
  - 競賽模式
- 新增載入課程按鈕
- 新增測試任務按鈕
- 新增上傳成績按鈕
- 新增課程任務說明面板
- 新增測試結果 / 執行輸出面板
- 新增 SmartRing 狀態列
- 內建三個示範課程代碼
  - SR-B01
  - SR-A01
  - JS-B01

### 尚未加入

- 真正課程資料庫
- 真正測資評分
- 真正 SmartRing WebSerial 連線
- 真正 Google Sheet 上傳

### 測試方式

```powershell
cd D:\YOSEP\blockly-lab
npm run dev

---

## MVP-B05｜SmartRing WebSerial 連線版

### 狀態

已建立。

### 本版目標

建立 SmartRingController 的 WebSerial 連線架構，讓網頁可以連接 ESP8266、讀取序列資料，並顯示 SmartRing 按鈕狀態。

### 已完成項目

- 新增 SmartRing WebSerial 模組
  - `src/smartring/serial.js`
  - `src/smartring/protocol.js`
  - `src/smartring/runtime.js`
- 新增「連線 SmartRing」按鈕
- 新增「斷開 SmartRing」按鈕
- 新增 SmartRing 狀態面板
- 顯示連線狀態
- 顯示按鈕狀態
- 顯示 ESP8266 原始 JSON 資料
- 更新下方 SmartRing 狀態列
- 支援 WebSerial 瀏覽器檢查
- 保留既有 Blockly 編輯、存檔、載入與課程模式功能

### 尚未加入

- SmartRing Blockly 積木
- LED 控制積木
- 按鈕判斷積木
- SmartRing 陣列顯示積木
- 自動評分與 Google Sheet 上傳

### 測試方式

```powershell
cd D:\YOSEP\blockly-lab
npm run dev