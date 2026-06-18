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

---

## MVP-B06｜SmartRing 基礎積木版

### 狀態

已建立。

### 本版目標

在 B05 WebSerial 連線基礎上，新增 SmartRing 基礎 Blockly 積木，讓學生可以透過 Blockly 判斷按鈕狀態與送出 LED 控制指令。

### 已完成項目

- 新增 `src/blockly/smartring-blocks.js`
- 新增 SmartRing 工具箱分類
- 新增 SmartRing 基礎積木：
  - SmartRing 已連線？
  - SmartRing 按鈕是否被按下？
  - 設定 SmartRing 第 N 顆 LED 顏色
  - 清除 SmartRing 所有 LED
  - 等待 N 毫秒
- 更新 `smartRingRuntime`
  - `isConnected()`
  - `getLastState()`
  - `getButtons()`
  - `isButtonPressed(buttonIndex)`
  - `setLedColor(index, colorName)`
  - `clearLeds()`
  - `wait(ms)`
- 更新使用者程式執行器，支援 `await`
- 讓 Blockly 產生的 JavaScript 可以呼叫 `SmartRing`
- `SR-B01` 課程代碼會載入 SmartRing 範例積木

### 尚未加入

- LED buffer 暫存陣列
- LED bar / score / life 顯示
- SmartRing 動畫積木
- SmartRing 陣列任務積木
- SmartRing 任務自動評分
- Google Sheet 上傳

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev

---

## MVP-B06-1｜工具箱順序與課程列版面修正版

### 狀態

已建立。

### 本版目標

針對 MVP-B06 測試後的介面回饋，調整 SmartRing 積木分類順序與課程操作列版面，使平台更符合教學使用情境。

### 已完成項目

- 調整 Blockly 工具箱分類順序
  - 原本 SmartRing 位於清單與變數之間
  - 改為 SmartRing 位於函式之後
- 保留競賽 Blockly 標準分類順序
  - 邏輯
  - 迴圈
  - 數學
  - 文字
  - 清單
  - 變數
  - 函式
- 將 SmartRing 作為硬體擴充分類放在最後
- 課程列改為標籤與輸入框同列
- 降低課程列高度
- 增加 Blockly 編輯區可視空間

### 尚未加入

- LED 指令協定校準
- ESP8266 韌體接收指令確認
- LED buffer 暫存陣列
- SmartRing 動畫積木
- SmartRing 任務評分

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev