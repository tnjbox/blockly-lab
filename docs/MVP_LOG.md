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

---

## MVP-B11｜SmartRing 積木群整理與 DEMO 定位版

### 狀態

開發中，待本機與 GitHub Pages 測試確認。

### 本版目標

整理 SmartRing 工具箱的教學結構，將積木分成「連線與狀態 / 偵測 / 基礎控制」、「LED 暫存陣列」、「LED 圖樣、狀態顯示與動畫示範」三大群組，並將圖樣與狀態顯示改為課程任務 DEMO，讓學生先觀察效果，再用暫存陣列與函式寫出對應程式。

### 預計新增與調整項目

- 整理 SmartRing 工具箱三大群組與積木排列順序
- 新增直接控制 SmartRing 單顆 LED 的 RGB 數值積木
- 新增設定 SmartRing 全部 LED 顏色積木
- 新增暫存陣列單一 RGB 通道設定積木
  - 通道可選 R / G / B
  - 通道輸入可改接文字或變數
- 新增暫存陣列完整 RGB 設定積木
- 將圖樣與狀態顯示改為 DEMO 積木
  - 示範圖樣會直接顯示到 SmartRing
  - 示範狀態顯示會直接顯示到 SmartRing
- 保留 B09 / B10 舊積木定義，避免舊作品載入失敗，但不主動放入 B11 工具箱
- 更新 SR-A01 範例積木為「DEMO 觀察 → 暫存陣列 RGB 仿作」

### B11 SmartRing 積木群

```text
SmartRing
├─ 連線與狀態 / 偵測 / 基礎控制
│  ├─ SmartRing 已連線？
│  ├─ SmartRing 按鈕 [BTN] 被按下？
│  ├─ 等待 [N] 毫秒
│  ├─ 設定 SmartRing 第 [N] 顆 LED 紅色為 [0~30] 綠色為 [0~30] 藍色為 [0~30]
│  ├─ 設定 SmartRing 全部 LED 顏色為 [顏色]
│  └─ 清除 SmartRing 所有 LED
│
├─ LED 暫存陣列
│  ├─ 清除暫存陣列
│  ├─ 設定暫存陣列第 [N] 顆 LED 顏色為 [顏色]
│  ├─ 暫存陣列第 [N] 顆 LED 顏色 [R/G/B] 為 [0~30]
│  ├─ 設定暫存陣列第 [N] 顆 LED 紅色為 [0~30] 綠色為 [0~30] 藍色為 [0~30]
│  └─ 顯示暫存陣列到 SmartRing
│
└─ LED 圖樣、狀態顯示與動畫示範
   ├─ 示範圖樣 [圖樣] 顏色 [顏色]
   └─ 示範狀態顯示 [分數/生命/進度條] 值 [值] 最大 [最大值] 顏色 [顏色]
```

### 教學定位

B11 的重點不是讓學生直接使用大量特效積木，而是建立清楚的課程任務流程：

```text
看見 DEMO 效果
↓
分析 LED 如何變化
↓
用暫存陣列重做
↓
整理成函式
↓
變成自己的動畫或互動作品
```

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試重點：

- SmartRing 工具箱是否分成三個清楚群組
- 基礎控制 RGB 積木是否可直接控制單顆 LED
- 全部 LED 顏色積木是否可直接顯示
- 暫存陣列 RGB 單通道積木是否可設定 R / G / B
- 暫存陣列 RGB 單通道積木的通道輸入是否可改接變數或文字
- 暫存陣列完整 RGB 積木是否能正確顯示
- 示範圖樣是否執行後直接顯示
- 示範狀態顯示是否執行後直接顯示
- SR-A01 是否載入 B11 範例積木

### 下一版建議

進入 `MVP-B12｜基礎動畫 DEMO 版`，加入閃爍、填滿、清除、跑馬燈等基礎動畫示範積木。

---

## MVP-B11-1｜SmartRing 積木單列顯示與 RGB 亮度一致修正版

### 狀態

已建立。

### 本版目標

針對 MVP-B11 測試回饋，修正 SmartRing 積木顯示版面與 RGB 數值亮度不一致問題。

### 已完成項目

- 將 SmartRing 積木改為單列輸入顯示，減少工具箱與工作區佔用空間。
- 保留 B11 的三大 SmartRing 積木群組與 DEMO 定位。
- 修正 RGB 數值積木的亮度換算規則。
- 學生端 RGB 數值仍維持 0～30。
- 前端送給 ESP8266 的 RGB 數值改為 0～255 對應值。
- 讓「RGB 數值 30」與「顏色選單紅色」在韌體亮度限制下呈現一致亮度。

### RGB 亮度規則

學生輸入範圍：0～30。

前端送出前轉換為 0～255：

```text
0  → 0
15 → 約 128
30 → 255
```

原因是 WS2812 與韌體亮度限制通常以 0～255 顏色值搭配 brightness 顯示。若直接送出 30，韌體可能再次依 brightness 進行縮放，導致亮度明顯偏暗。

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試：

- 設定 SmartRing 第 1 顆 LED 紅色為 30 綠色為 0 藍色為 0。
- 設定 SmartRing 全部 LED 顏色為紅色。
- 比對兩者紅色亮度應接近一致。

---

## MVP-B12｜基礎動畫 DEMO 版

### 狀態

已建立。

### 本版目標

在 MVP-B11-1 的 SmartRing 積木群整理基礎上，新增基礎動畫 DEMO 積木，讓學生先觀察動畫效果，再回到 LED 暫存陣列、迴圈、等待與函式完成仿作。

### 已完成項目

- 新增播放閃爍動畫積木
- 新增播放填滿動畫積木
- 新增播放清除動畫積木
- 新增播放跑馬燈動畫積木
- 四個動畫 DEMO 積木皆為執行後直接顯示到 SmartRing
- 更新 SR-A01 範例，加入基礎動畫 DEMO 觀察流程
- 保留 B11-1 的三大 SmartRing 積木群與 RGB 亮度換算規則

### 新增積木

- 播放閃爍動畫 顏色 [顏色] 次數 [N]
- 播放填滿動畫 顏色 [顏色] 速度 [N]
- 播放清除動畫 速度 [N]
- 播放跑馬燈動畫 顏色 [顏色] 速度 [N]

### 教學定位

B12 的動畫積木是課程任務 DEMO，不是學生最後作品的唯一做法。建議教學流程為：

```text
觀看 DEMO 動畫
↓
分析 LED 變化規律
↓
用 LED 暫存陣列、迴圈與等待仿作
↓
整理成自訂函式
```

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試：

- 播放閃爍動畫 顏色紅色 次數 2。
- 播放填滿動畫 顏色黃色 速度 80。
- 播放清除動畫 速度 80。
- 播放跑馬燈動畫 顏色青色 速度 80。
- 載入 SR-A01，確認範例中包含 B12 基礎動畫 DEMO。

### 下一版建議

進入 `MVP-B13｜陣列位移動畫 DEMO 版`，加入左移、右移、來回移動與交錯閃爍動畫示範。

---

## MVP-B13｜程式中止控制與陣列位移動畫 DEMO 版

### 狀態

已建立。

### 本版目標

在 MVP-B12 基礎動畫 DEMO 版之後，新增「中止程式」按鈕，避免學生撰寫互動式無限迴圈後只能重新整理網頁。同時加入陣列位移相關動畫 DEMO，讓學生觀察 LED 資料移動、邊界與交錯規律，再用暫存陣列與函式重做。

### 已完成項目

- 新增「中止程式」按鈕
- 執行程式時停用「執行程式」按鈕，啟用「中止程式」按鈕
- 中止後恢復按鈕狀態
- SmartRing runtime 新增合作式中止機制
- `wait()`、LED 指令、showBuffer 與動畫流程支援中止檢查
- 新增播放左移動畫
- 新增播放右移動畫
- 新增播放來回移動動畫
- 新增播放交錯閃爍動畫
- 更新 SmartRing 工具箱第三群組
- 更新 SR-A01 範例積木

### 新增積木

- 播放左移動畫 顏色 [顏色] 次數 [N] 速度 [N]
- 播放右移動畫 顏色 [顏色] 次數 [N] 速度 [N]
- 播放來回移動動畫 顏色 [顏色] 次數 [N] 速度 [N]
- 播放交錯閃爍動畫 顏色1 [顏色] 顏色2 [顏色] 次數 [N]

### 中止程式限制說明

本版採用合作式中止。程式會在下一個 `await SmartRing.wait()`、LED 指令、showBuffer 或動畫步驟停止。若學生寫出完全沒有 `await` 的純 JavaScript 無限迴圈，瀏覽器仍可能無法回應，後續若需要更完整的防護，可評估 Web Worker 執行沙盒。

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試重點：

- 執行含 `while (true)` 與 `await SmartRing.wait(1)` 的程式後，可按「中止程式」停止
- 左移動畫從 LED 1 移到 LED 12
- 右移動畫從 LED 12 移到 LED 1
- 來回移動動畫會在兩端折返
- 交錯閃爍動畫會切換奇數燈與偶數燈顏色


---

## MVP-B14｜進階視覺效果 DEMO 版

### 狀態

已建立。

### 本版目標

在 MVP-B13 的程式中止控制與陣列位移動畫 DEMO 基礎上，加入進階視覺效果 DEMO，讓學生觀察亮度變化與多色規律，後續再嘗試用暫存陣列、RGB 數值、迴圈與函式重做。同時修正儲存積木時的預設檔名。

### 已完成項目

- 新增播放呼吸燈動畫
- 新增播放彩虹動畫
- 兩個進階視覺效果 DEMO 積木皆為執行後直接顯示到 SmartRing
- 呼吸燈動畫支援合作式中止
- 彩虹動畫支援合作式中止
- 更新 SmartRing 工具箱第三群組
- 更新 SR-A01 範例積木，加入呼吸燈與彩虹動畫 DEMO
- 修正儲存積木預設檔名，由 `blockly-workspace` 改為 `smartRing-blockly`

### 新增積木

- 播放呼吸燈動畫 顏色 [顏色] 次數 [N]
- 播放彩虹動畫 速度 [N]

### 儲存檔名規則

當學生未輸入課程代碼、班級、座號或姓名時，儲存積木的預設檔名改為：

```text
smartRing-blockly.blockly.xml
```

若學生有輸入課程代碼、班級、座號或姓名，仍依既有規則組成檔名。

### 教學定位

MVP-B14 的呼吸燈與彩虹動畫屬於進階 DEMO，不是要求學生立即完整重做的基礎任務。建議教學流程為：

```text
先觀察效果
↓
討論亮度變化或顏色變化規律
↓
用 RGB 數值與暫存陣列做簡化版
↓
再整理成自訂函式
```

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試重點：

- 儲存積木時，未輸入資料的預設檔名應為 `smartRing-blockly.blockly.xml`
- 播放呼吸燈動畫 顏色紫色 次數 1
- 播放彩虹動畫 速度 80
- 播放呼吸燈或彩虹動畫時，可按「中止程式」停止
- 載入 SR-A01，確認範例中包含 B14 進階視覺效果 DEMO

### 下一版建議

進入 `MVP-B15｜SmartRing 任務教材與函式仿作版`，開始把 DEMO 積木轉化為學生任務：觀察效果、拆解規律、用暫存陣列重做、整理成函式。


---

## MVP-B14-1｜進階視覺效果積木顯示與預設檔名修正版

### 狀態

已建立。

### 本版目標

修正 MVP-B14 測試後發現的工具箱顯示與儲存檔名問題，確保進階視覺效果 DEMO 積木可在 SmartRing 工具箱中清楚出現，並將未填學生資料時的預設積木檔名改為 `SmartRing.blockly.xml`。

### 已完成項目

- 在 SmartRing 工具箱的 DEMO 區段新增「進階視覺效果 DEMO」標籤
- 確認工具箱包含：播放呼吸燈動畫
- 確認工具箱包含：播放彩虹動畫
- 將呼吸燈動畫工具箱預設值調整為：紫色、次數 1
- 將彩虹動畫工具箱預設速度調整為：60
- 將儲存積木預設檔名由 `smartRing-blockly.blockly.xml` 改為 `SmartRing.blockly.xml`

### 測試方式

```powershell
cd C:\YOSEPlockly-lab
npm run dev
```

測試項目：

- SmartRing 工具箱中可看到「播放呼吸燈動畫」
- SmartRing 工具箱中可看到「播放彩虹動畫」
- 未輸入學生資料與課程代碼時，儲存積木預設檔名為 `SmartRing.blockly.xml`


---

## MVP-B15｜SmartRing 任務教材與函式仿作版

### 狀態

已建立。

### 本版目標

將 SmartRing Blockly 從「積木功能展示」推進到「課程任務教材」，建立 DEMO 觀察、暫存陣列仿作、函式整理與延伸挑戰的任務流程。

### 已完成項目

- 新增 `src/courses/smartring-tasks.js`
- 將課程任務資料從 `main.js` 抽出，集中管理
- 新增 SmartRing 任務教材欄位：
  - DEMO 觀察
  - 仿作任務
  - 函式整理
  - 延伸挑戰
- 更新完整任務視窗顯示格式
- 新增與整理課程代碼：
  - `SR-B01`：SmartRing 基礎任務：按鈕控制燈光
  - `SR-A01`：SmartRing 陣列任務：LED 圖樣陣列仿作
  - `SR-A02`：SmartRing 陣列任務：狀態顯示與進度條仿作
  - `SR-F01`：SmartRing 函式任務：填滿動畫函式仿作
  - `SR-F02`：SmartRing 函式任務：跑馬燈函式仿作
  - `SR-F03`：SmartRing 函式任務：按鈕觸發動畫
  - `JS-B01`：Blockly 解題任務：重複累加
- 課程代碼載入後會自動載入對應起始積木
- SR-F03 保留 while true 互動偵測範例，搭配 B13 的「中止程式」按鈕使用

### 教學定位

MVP-B15 的課程流程為：

1. 觀察 DEMO
2. 拆解 LED 變化規律
3. 使用 LED 暫存陣列仿作
4. 整理成自訂函式
5. 完成延伸挑戰

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試課程代碼：

```text
SR-B01
SR-A01
SR-A02
SR-F01
SR-F02
SR-F03
JS-B01
```

### 下一版建議

MVP-B16 可開始進入任務教材頁面精緻化，例如加入任務提示分層、任務完成檢核表，或將起始積木與任務資料進一步模組化。

---

## MVP-J01｜課程組模組化載入版

### 狀態

已建立，並已通過 `npm run build`。

### 本版目標

將 B15 的單一課程代碼載入，調整為「課程組代碼 → 子任務選單 → 載入子任務」的模組化課程架構，為後續 Blockly 解題題組與自動評分做準備。

### 已完成項目

- 新增 `src/courses/index.js` 作為課程組註冊表
- 新增四個預設課程組：
  - `SRB00`：SmartRing 基礎互動任務
  - `SRA00`：SmartRing 陣列任務
  - `SRF00`：SmartRing 函式仿作任務
  - `JSB00`：Blockly 解題基礎一
- 新增課程組子任務選單
- 輸入課程組代碼後，預設載入該課程組第一題
- 切換子任務時，會同步更新：
  - 課程任務摘要
  - 完整任務視窗
  - Blockly 起始積木
  - 測試任務顯示的課程組與子任務代碼
- 保留 B15 既有 SmartRing 功能、任務欄位格式與起始積木載入方式
- 先不處理 TXT / ZIP 題庫轉 JS，也不建立自動評分

### 新增檔案

```text
src/courses/index.js
src/courses/SRB00.js
src/courses/SRA00.js
src/courses/SRF00.js
src/courses/JSB00.js
```

### 修改檔案

```text
index.html
src/main.js
docs/MVP_LOG.md
```

### 測試方式

```powershell
cd C:\YOSEP\blockly-lab
npm run dev
```

測試課程組代碼：

```text
SRB00
SRA00
SRF00
JSB00
```

建議測試流程：

1. 輸入 `SRB00`，按下「載入課程」
2. 確認子任務選單自動出現 `SRB00-01`～`SRB00-05`
3. 確認預設載入第一題起始積木
4. 切換子任務，確認任務摘要與起始積木同步更新
5. 重複測試 `SRA00`、`SRF00`、`JSB00`
6. 執行 `npm run build`，確認可成功建置

### 下一版建議

MVP-J02 可正式整理 `JSB00` 解題基礎題組內容，讓每一題具備更明確的題目敘述、輸入輸出格式與範例資料。TXT / ZIP 題庫轉 JS 請另開「Blockly Lab 題庫轉換器｜TXT 轉課程 JS」對話處理。

---

## MVP-J01-1｜競賽模式上傳按鈕與程式解題題目視窗修正版

### 本版調整

1. 「上傳成績」按鈕預設隱藏。
2. 只有在競賽模式、已載入課程、已載入子任務，且按下「測試任務」產生本機測試結果後，才顯示「上傳成績」按鈕。
3. 切換模式、切換課程、切換子任務時，會重置本次測試結果並再次隱藏「上傳成績」。
4. JSB00 程式解題任務的「查看完整任務」視窗改為單純題目內容，不再顯示 DEMO 觀察、仿作任務、函式整理、延伸挑戰、自我檢核式內容。
5. JSB00 題目加入 problemStatement、輸入說明、輸出說明、範例輸出等題目欄位，供後續 J02/J03 擴充自動評分。

### 測試

已執行 npm run build，建置成功。

## MVP-J01-2｜成績上傳按鈕位置與啟用狀態修正版

- 調整課程列版面，縮短課程代碼欄位，讓「上傳成績」固定顯示在「測試任務」旁邊。
- 「上傳成績」按鈕不再隱藏，預設為灰色停用狀態。
- 只有競賽模式、已載入課程與子任務，並完成「測試任務」產生本機測試結果後，才啟用「上傳成績」。
- 切換模式、載入課程、切換子任務時會重新停用「上傳成績」，避免誤送上一題結果。

