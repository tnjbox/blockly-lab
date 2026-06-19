import { smartRingCourses } from './smartring-tasks.js';

const cloneTask = (baseTask, overrides) => ({
  ...baseTask,
  ...overrides,
});

const patternXml = ({ pattern = 'centerFour', color = 'blue', message = 'LED 圖樣陣列仿作' } = {}) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="smartring_demo_pattern" x="40" y="40">
    <field name="PATTERN">${pattern}</field>
    <field name="COLOR">${color}</field>
    <next>
      <block type="smartring_wait_ms">
        <value name="MS"><shadow type="math_number"><field name="NUM">800</field></shadow></value>
        <next>
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">${message}：先觀察 DEMO，再用暫存陣列仿作。</field></block></value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

const statusXml = ({ status = 'progress', value = 6, max = 12, color = 'green', message = '狀態顯示仿作' } = {}) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="smartring_demo_status_display" x="40" y="40">
    <field name="STATUS">${status}</field>
    <value name="VALUE"><shadow type="math_number"><field name="NUM">${value}</field></shadow></value>
    <value name="MAX"><shadow type="math_number"><field name="NUM">${max}</field></shadow></value>
    <field name="COLOR">${color}</field>
    <next>
      <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">${message}</field></block></value></block>
    </next>
  </block>
</xml>`;

export const SRA00 = {
  id: 'SRA00',
  title: 'SmartRing 陣列任務',
  description: '用 LED 暫存陣列理解索引、位置、數值與狀態顯示。',
  level: '國中八年級',
  defaultTaskId: 'SRA00-01',
  tasks: [
    cloneTask(smartRingCourses['SR-A01'], {
      id: 'SRA00-01',
      title: 'LED 圖樣陣列仿作',
      starterMessage: '已載入 SRA00-01：LED 圖樣陣列仿作。',
    }),
    cloneTask(smartRingCourses['SR-A01'], {
      id: 'SRA00-02',
      title: '中間四顆圖樣',
      goal: '使用暫存陣列設定 LED 5～8，理解連續索引代表連續位置。',
      description: '觀察中間四顆 DEMO，再用暫存陣列指定 LED 5、6、7、8。',
      practiceTask: '不用 DEMO 積木，改用四個「設定暫存陣列第 N 顆 LED 顏色」。',
      challenge: '改做中間六顆，或讓中間四顆使用不同顏色。',
      starterXml: patternXml({ pattern: 'centerFour', color: 'blue', message: '中間四顆圖樣' }),
      starterMessage: '已載入 SRA00-02：中間四顆圖樣。',
    }),
    cloneTask(smartRingCourses['SR-A01'], {
      id: 'SRA00-03',
      title: '奇數燈與偶數燈',
      goal: '理解索引規律，觀察奇數與偶數位置的 LED 圖樣。',
      description: '使用暫存陣列做出奇數燈或偶數燈亮起的規律圖樣。',
      demoObserve: '觀察交錯位置的 LED 亮起。',
      practiceTask: '用迴圈或手動指定 LED 1、3、5、7、9、11。',
      functionTask: '整理成 showOddLeds(color) 與 showEvenLeds(color) 函式。',
      challenge: '讓奇數燈與偶數燈交替閃爍。',
      starterXml: patternXml({ pattern: 'odd', color: 'yellow', message: '奇數燈與偶數燈' }),
      starterMessage: '已載入 SRA00-03：奇數燈與偶數燈。',
    }),
    cloneTask(smartRingCourses['SR-A02'], {
      id: 'SRA00-04',
      title: '進度條顯示',
      starterMessage: '已載入 SRA00-04：進度條顯示。',
    }),
    cloneTask(smartRingCourses['SR-A02'], {
      id: 'SRA00-05',
      title: '分數顯示',
      goal: '將分數轉換成 LED 顆數，理解數值比例與陣列顯示。',
      description: '例如分數 8/12 顯示 8 顆 LED，未來可延伸到 80/100 轉換成 10 顆。',
      demoObserve: '觀察分數值改變時，LED 顆數如何改變。',
      practiceTask: '修改 value 與 max，觀察顯示結果。',
      functionTask: '整理成 showScore(score, maxScore, color) 函式。',
      challenge: '把 0～100 分轉成 0～12 顆 LED。',
      starterXml: statusXml({ status: 'score', value: 8, max: 12, color: 'yellow', message: '分數顯示：8 / 12' }),
      starterMessage: '已載入 SRA00-05：分數顯示。',
    }),
    cloneTask(smartRingCourses['SR-A02'], {
      id: 'SRA00-06',
      title: '生命值顯示',
      goal: '使用 LED 顆數呈現生命值，理解遊戲狀態資料的視覺化。',
      description: '生命值越高，亮起 LED 越多；生命值歸零時可清除全部 LED。',
      demoObserve: '觀察 life=3、max=5 時的 LED 顯示。',
      practiceTask: '修改生命值與最大值，觀察 LED 顯示變化。',
      functionTask: '整理成 showLife(life, maxLife, color) 函式。',
      challenge: '生命值低於 2 時改成紅色警示。',
      starterXml: statusXml({ status: 'life', value: 3, max: 5, color: 'red', message: '生命值顯示：3 / 5' }),
      starterMessage: '已載入 SRA00-06：生命值顯示。',
    }),
  ],
};
