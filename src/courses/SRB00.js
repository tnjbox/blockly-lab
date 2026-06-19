import { smartRingCourses } from './smartring-tasks.js';

const cloneTask = (baseTask, overrides) => ({
  ...baseTask,
  ...overrides,
});

const basicLedXml = ({ index = 1, color = 'red', r = 30, g = 0, b = 0, message = 'SmartRing 基礎任務' } = {}) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="smartring_set_led_rgb" x="40" y="40">
    <value name="INDEX"><shadow type="math_number"><field name="NUM">${index}</field></shadow></value>
    <value name="R"><shadow type="math_number"><field name="NUM">${r}</field></shadow></value>
    <value name="G"><shadow type="math_number"><field name="NUM">${g}</field></shadow></value>
    <value name="B"><shadow type="math_number"><field name="NUM">${b}</field></shadow></value>
    <next>
      <block type="text_print">
        <value name="TEXT"><block type="text"><field name="TEXT">${message}：第 ${index} 顆 LED 顯示 ${color}</field></block></value>
      </block>
    </next>
  </block>
</xml>`;

const allLedXml = ({ color = 'blue', message = '全部 LED 顏色控制' } = {}) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="smartring_set_all_leds" x="40" y="40">
    <field name="COLOR">${color}</field>
    <next>
      <block type="smartring_wait_ms">
        <value name="MS"><shadow type="math_number"><field name="NUM">500</field></shadow></value>
        <next>
          <block type="smartring_clear_leds">
            <next>
              <block type="text_print">
                <value name="TEXT"><block type="text"><field name="TEXT">${message}：先全亮，再清除。</field></block></value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

const buttonColorXml = ({ button = 1, index = 1, r = 30, g = 0, b = 0, message = '按鈕控制 LED' } = {}) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if" x="40" y="40">
    <value name="IF0">
      <block type="smartring_button_pressed"><field name="BUTTON">${button}</field></block>
    </value>
    <statement name="DO0">
      <block type="smartring_set_led_rgb">
        <value name="INDEX"><shadow type="math_number"><field name="NUM">${index}</field></shadow></value>
        <value name="R"><shadow type="math_number"><field name="NUM">${r}</field></shadow></value>
        <value name="G"><shadow type="math_number"><field name="NUM">${g}</field></shadow></value>
        <value name="B"><shadow type="math_number"><field name="NUM">${b}</field></shadow></value>
        <next>
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">${message}</field></block></value>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>`;

const base = smartRingCourses['SR-B01'];

export const SRB00 = {
  id: 'SRB00',
  title: 'SmartRing 基礎互動任務',
  description: '從連線、單顆 LED、全部 LED 到按鈕互動，建立 SmartRingController 的基本操作能力。',
  level: '國小高年級 / 國中初階',
  defaultTaskId: 'SRB00-01',
  tasks: [
    cloneTask(base, {
      id: 'SRB00-01',
      title: 'SmartRing 連線檢查',
      goal: '確認瀏覽器可連線 SmartRingController，並理解「已連線？」狀態判斷。',
      description: '本任務先使用 SmartRing 已連線？積木，確認硬體連線狀態。',
      demoObserve: '連線前與連線後分別執行程式，觀察輸出文字差異。',
      practiceTask: '修改輸出文字，讓程式能提醒自己是否已完成連線。',
      functionTask: '整理成 checkSmartRing() 函式，之後每個硬體任務開頭都可以呼叫。',
      challenge: '若尚未連線，輸出提醒；若已連線，讓第 1 顆 LED 閃一下。',
      starterXml: `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if" x="40" y="40">
    <value name="IF0"><block type="smartring_is_connected"></block></value>
    <statement name="DO0">
      <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">SmartRing 已連線，可以開始任務。</field></block></value></block>
    </statement>
  </block>
</xml>`,
      starterMessage: '已載入 SRB00-01：SmartRing 連線檢查。',
    }),
    cloneTask(base, {
      id: 'SRB00-02',
      title: '單顆 LED RGB 控制',
      goal: '理解 LED 編號 1～12 與 RGB 0～30 的輸入規則。',
      description: '設定指定 LED 的紅、綠、藍亮度，觀察 RGB 數值改變後的顏色。',
      demoObserve: '觀察第 1 顆 LED 在 RGB 30,0,0 時顯示紅色。',
      practiceTask: '改變 LED 編號與 RGB 數值，做出不同顏色。',
      functionTask: '整理成 setOneLed(index, r, g, b) 函式。',
      challenge: '做出紅、綠、藍三顆不同顏色 LED。',
      starterXml: basicLedXml({ index: 1, color: '紅色', r: 30, g: 0, b: 0, message: '單顆 LED RGB 控制' }),
      starterMessage: '已載入 SRB00-02：單顆 LED RGB 控制。',
    }),
    cloneTask(base, {
      id: 'SRB00-03',
      title: '全部 LED 顏色控制',
      goal: '理解整體輸出控制與清除 LED 的基本流程。',
      description: '讓全部 LED 顯示同一顏色，再使用清除 LED 關閉燈光。',
      demoObserve: '觀察全部 LED 同時變色與清除。',
      practiceTask: '修改顏色與等待時間，設計自己的提示燈效果。',
      functionTask: '整理成 showAllThenClear(color, ms) 函式。',
      challenge: '做出紅、黃、綠三段交通號誌效果。',
      starterXml: allLedXml({ color: 'blue', message: '全部 LED 顏色控制' }),
      starterMessage: '已載入 SRB00-03：全部 LED 顏色控制。',
    }),
    cloneTask(base, {
      id: 'SRB00-04',
      title: '按鈕控制 LED',
      starterMessage: '已載入 SRB00-04：按鈕控制 LED。',
    }),
    cloneTask(base, {
      id: 'SRB00-05',
      title: '按鈕觸發顏色變化',
      goal: '使用條件判斷讓不同按鈕觸發不同 LED 顏色。',
      description: '按下不同 SmartRing 按鈕時，讓同一顆或不同顆 LED 顯示不同顏色。',
      demoObserve: '觀察按下 BTN1 時是否改變 LED 顏色。',
      practiceTask: '新增第二個 if，讓 BTN2 觸發另一種顏色。',
      functionTask: '整理成 handleButtonColor() 函式。',
      challenge: '做出 BTN1 紅、BTN2 綠、BTN3 藍、BTN4 清除。',
      starterXml: buttonColorXml({ button: 1, index: 1, r: 30, g: 0, b: 0, message: 'BTN1 被按下，LED 變紅。' }),
      starterMessage: '已載入 SRB00-05：按鈕觸發顏色變化。',
    }),
  ],
};
