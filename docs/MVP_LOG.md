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
```

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
```

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
```

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
```


---

## MVP-B07｜SmartRing LED 指令協定校準版

### 狀態

已建立，已測試成功。

### 本版目標

建立 Blockly Lab 前端送往 ESP8266 SmartRingController 的 LED JSON 指令格式，並提供教師測試用按鈕，確認前端能正確送出 LED 控制指令。

### 已完成項目

- SmartRing 狀態面板新增「測試第 1 顆紅燈」
- SmartRing 狀態面板新增「清除 LED」
- SmartRing 狀態面板新增「最後送出指令」
- 前端固定送出 `setLed` JSON 指令
- 前端固定送出 `clearLeds` JSON 指令
- 建立 LED 控制指令協定文件

### 指令格式

設定單顆 LED：

```json
{"cmd":"setLed","index":1,"color":"red","r":255,"g":0,"b":0}
```

清除所有 LED：

```json
{"cmd":"clearLeds"}
```

### 尚未加入

- ESP8266 統一韌體接收完整指令
- `setAllLeds`
- `setBrightness`
- `showBuffer`
- LED buffer 暫存陣列積木

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

---

## MVP-B07-1｜最後送出指令顯示修正版

### 狀態

已建立，已測試成功。

### 本版目標

修正「最後送出指令」沒有正確顯示的問題，讓教師可以從畫面確認前端實際送出的 JSON 指令內容。

### 已完成項目

- `smartRingRuntime` 新增 `lastCommand`
- 新增 `getLastCommand()`
- 新增 `emitCommand(payload)`
- `sendJson(payload)` 送出指令時同步更新最後指令
- 畫面可即時顯示最後送出的 JSON 指令

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

---

## MVP-B08｜ESP8266 統一韌體協定版

### 狀態

已建立，韌體已燒錄測試成功，已推送到 GitHub。

### 本版目標

建立同一份 ESP8266 SmartRingController 統一韌體，讓 Scratch、Blockly、GitHub 測試頁可共用同一套 WebSerial JSON 協定，不需要因為切換教學介面而重新燒錄。

### 已完成項目

- 保留 ESP8266 持續輸出按鈕狀態 JSON
- 新增接收 WebSerial JSON 指令
- 支援 `setLed`
- 支援 `clearLeds`
- 支援 `setAllLeds`
- 支援 `setBrightness`
- 支援 `showBuffer`
- 韌體採靜默接收 LED 指令，不額外回傳 ack，避免干擾前端按鈕狀態解析
- 韌體檔案已加入 repo

### 狀態資料格式

```json
{"btn":[false,false,false,false,false,false,false,false],"func":0,"mode":0}
```

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

---

## MVP-B08-1｜LED 編號 1 起算修正版

### 狀態

已建立，已部署到 GitHub Pages，運作成功。

### 本版目標

將 SmartRing LED 編號統一調整為學生較容易理解的 1 起算。學生在 Blockly 與畫面上看到 LED 1～12，前端送出的 JSON 也使用 `index: 1`～`index: 12`，ESP8266 韌體內部再轉換為 WS2812 的 0～11。

### 已完成項目

- 前端 LED 編號改為 1～12
- Blockly LED 積木預設值與限制改為 1～12
- 測試按鈕改為送出第 1 顆 LED
- 文件更新 LED 1～12 對應規則
- 韌體負責將 `index` 1～12 轉換為內部 0～11

### LED 編號規則

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

### 指令格式

```json
{"cmd":"setLed","index":1,"color":"red","r":255,"g":0,"b":0}
```

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
npm run deploy
```

### 下一版建議

進入 `MVP-B09｜Blockly LED Buffer 積木版`，建立前端 LED 暫存陣列，銜接八年級陣列概念。

## MVP-B09｜Blockly LED Buffer 積木版

### 狀態

已建立，已上傳 GitHub，測試結果正確。

### 本版目標

建立 SmartRing LED 暫存陣列，讓學生可以先在前端操作 12 顆 LED 的資料狀態，再一次顯示到 SmartRing，作為八年級陣列任務 SR-A01 的基礎。

### 已完成項目

- 建立 12 顆 LED 暫存陣列
- 新增設定暫存陣列第 N 顆 LED 顏色
- 新增清除暫存陣列
- 新增顯示暫存陣列到 SmartRing
- 新增暫存陣列左移 / 右移
- 新增奇數燈 / 偶數燈操作

### LED 編號規則

學生端維持 LED 1～12，程式內部轉為陣列 index 0～11。

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

### 下一版建議

進入 `MVP-B10｜Blockly LED Pattern 與陣列任務基礎版`，將 LED 暫存陣列擴充為圖樣、進度、分數與生命值顯示。


---

## MVP-B10｜Blockly LED Pattern 與陣列任務基礎版

### 狀態

開發中，待本機與 GitHub Pages 測試確認。

### 本版目標

在 MVP-B09 LED 暫存陣列基礎上，新增常用 LED 圖樣、進度條、分數顯示與生命值顯示，讓學生從「操作陣列資料」進一步理解「用陣列表達狀態與視覺化資訊」。

### 預計新增項目

- 新增設定暫存陣列為圖樣
  - 全亮
  - 左半邊
  - 右半邊
  - 中間四顆
  - 外側四顆
  - 交錯燈
- 新增設定暫存陣列進度條 N 顆
- 新增設定暫存陣列分數 / 滿分比例顯示
- 新增設定暫存陣列生命值 / 最大生命比例顯示
- 更新 SR-A01 課程內容與範例積木

### 教學定位

B09 強調「LED 暫存陣列有 12 格」。B10 強調「陣列可以表達圖樣、進度、分數與生命值」。

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試重點：

- 圖樣積木是否能正確顯示全亮、半邊、中間、外側與交錯燈
- 進度條數量是否能限制在 0～12
- 分數 / 滿分是否能換算為 12 顆 LED 比例
- 生命值 / 最大生命是否能換算為 12 顆 LED 比例
- SR-A01 是否能載入 B10 範例積木
