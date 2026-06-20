import { smartRingCourses } from './smartring-tasks.js';

const cloneTask = (baseTask, overrides) => ({
  ...baseTask,
  ...overrides,
});

const animationXml = ({ blockType, color = 'cyan', speed = 100, times = null, message = '動畫函式仿作' } = {}) => {
  const timesValue = times === null ? '' : `<value name="TIMES"><shadow type="math_number"><field name="NUM">${times}</field></shadow></value>`;
  return `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="${blockType}" x="40" y="40">
    <field name="COLOR">${color}</field>
    ${timesValue}
    <value name="SPEED"><shadow type="math_number"><field name="NUM">${speed}</field></shadow></value>
    <next>
      <block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">${message}：先觀察 DEMO，再用暫存陣列與函式仿作。</field></block></value></block>
    </next>
  </block>
</xml>`;
};

export const SRF00 = {
  id: 'SRF00',
  title: 'SmartRing 函式仿作任務',
  mode: 'learning',
  type: 'smartring',
  description: '觀察 LED 動畫效果，嘗試用積木流程重做，並整理成可重複使用的函式。',
  level: '國中八年級 / 九年級',
  defaultTaskId: 'SRF00-01',
  tasks: [
    cloneTask(smartRingCourses['SR-F01'], {
      id: 'SRF00-01',
      title: '填滿動畫函式仿作',
      taskDescription: '請觀察填滿動畫，讓 LED 由少到多逐步亮起，並嘗試做出相同效果。',
      passConditions: [
        'LED 能依序逐顆亮起。',
        '亮起速度可以調整。',
        '能把流程整理成可重複使用的函式。'
      ],
      hints: [
        '先觀察 DEMO 動畫的順序。',
        '可以用迴圈控制 LED 編號。',
        '每亮一顆後加一個等待時間。'
      ],
      challenges: [
        '改變填滿方向。',
        '讓填滿顏色由參數決定。'
      ],
      starterXml: animationXml({ blockType: 'smartring_play_fill_animation', color: 'cyan', speed: 100, message: '填滿動畫函式仿作' }),
      starterMessage: '已載入 SRF00-01：填滿動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F01'], {
      id: 'SRF00-02',
      title: '清除動畫函式仿作',
      taskDescription: '請觀察清除動畫，讓已亮起的 LED 依序熄滅，並嘗試做出相同效果。',
      passConditions: [
        'LED 能依序逐顆熄滅。',
        '清除速度可以調整。',
        '能把清除流程整理成函式。'
      ],
      hints: [
        '可以先讓全部 LED 亮起，再開始清除。',
        '若要反向清除，可以讓 LED 編號由 12 逐步到 1。',
        '每清除一顆後加入等待時間。'
      ],
      challenges: [
        '只清除前 N 顆或後 N 顆。',
        '清除完成後顯示另一種提示顏色。'
      ],
      starterXml: `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="smartring_play_clear_animation" x="40" y="40">
    <value name="SPEED"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
  </block>
</xml>`,
      starterMessage: '已載入 SRF00-02：清除動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-03',
      title: '跑馬燈函式仿作',
      taskDescription: '請讓一顆或一段 LED 沿著 SmartRing 移動，做出跑馬燈效果。',
      passConditions: [
        'LED 亮點能依序移動。',
        '移動速度可以調整。',
        '能重複播放跑馬燈效果。'
      ],
      hints: [
        '用位置變數表示目前亮起的 LED 編號。',
        '每次移動後，先清除舊位置，再顯示新位置。',
        '注意 LED 編號超過 12 時要如何處理。'
      ],
      challenges: [
        '做出兩顆一起移動的跑馬燈。',
        '讓跑馬燈繞一圈後自動停止。'
      ],
      starterXml: animationXml({ blockType: 'smartring_play_marquee_animation', color: 'cyan', speed: 100, times: 2, message: '跑馬燈函式仿作' }),
      starterMessage: '已載入 SRF00-03：跑馬燈函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-04',
      title: '左移動畫函式仿作',
      taskDescription: '請讓 LED 圖樣往左移動，觀察每次移動後位置如何改變。',
      passConditions: [
        'LED 圖樣能往左移動。',
        '移動次數可以設定。',
        '速度可以調整。'
      ],
      hints: [
        '先觀察左移動畫中亮點的位置變化。',
        '可以使用暫存陣列位移積木。',
        '每次位移後都要顯示暫存陣列。'
      ],
      challenges: [
        '讓移動次數由變數控制。',
        '移動到邊界後改成清除或重新開始。'
      ],
      starterXml: animationXml({ blockType: 'smartring_play_shift_left_animation', color: 'purple', speed: 80, times: 2, message: '左移動畫函式仿作' }),
      starterMessage: '已載入 SRF00-04：左移動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-05',
      title: '右移動畫函式仿作',
      taskDescription: '請讓 LED 圖樣往右移動，並比較右移與左移的差異。',
      passConditions: [
        'LED 圖樣能往右移動。',
        '移動次數可以設定。',
        '能說出右移和左移的方向差異。'
      ],
      hints: [
        '可以先完成左移，再改成右移。',
        '觀察 LED 編號是增加還是減少。',
        '每次位移後記得顯示結果。'
      ],
      challenges: [
        '做出先右移再左移的組合動畫。',
        '加入按鈕控制移動方向。'
      ],
      starterXml: animationXml({ blockType: 'smartring_play_shift_right_animation', color: 'blue', speed: 80, times: 2, message: '右移動畫函式仿作' }),
      starterMessage: '已載入 SRF00-05：右移動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-06',
      title: '來回移動動畫函式仿作',
      taskDescription: '請讓 LED 圖樣在左右方向之間來回移動，移到邊界後改變方向。',
      passConditions: [
        'LED 圖樣能往一個方向移動。',
        '到達邊界後能反向。',
        '能連續完成來回移動。'
      ],
      hints: [
        '可以用 position 表示位置，用 direction 表示方向。',
        '到達邊界時，把方向改成相反。',
        '每次移動後更新位置並顯示。'
      ],
      challenges: [
        '自訂左右邊界。',
        '按下按鈕後才開始來回移動。'
      ],
      starterXml: animationXml({ blockType: 'smartring_play_bounce_animation', color: 'green', speed: 80, times: 2, message: '來回移動動畫函式仿作' }),
      starterMessage: '已載入 SRF00-06：來回移動動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F03'], {
      id: 'SRF00-07',
      title: '按鈕觸發動畫函式',
      taskDescription: '請使用按鈕觸發你設計的 LED 動畫，做出可互動的燈光效果。',
      passConditions: [
        '能偵測至少一個按鈕。',
        '按下按鈕時會播放指定動畫。',
        '動畫播放後可以再次觸發。'
      ],
      hints: [
        '先完成一個動畫函式。',
        '再用「如果按鈕被按下」呼叫動畫函式。',
        '若連續觸發太快，可以加入等待時間。'
      ],
      challenges: [
        '不同按鈕播放不同動畫。',
        '加入清除按鈕，停止後清空 LED。'
      ],
      starterXml: animationXml({ blockType: 'smartring_play_marquee_animation', color: 'cyan', speed: 100, times: 1, message: '按鈕觸發動畫函式' }),
      starterMessage: '已載入 SRF00-07：按鈕觸發動畫函式。',
    }),
  ],
};
