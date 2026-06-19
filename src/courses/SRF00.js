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
  description: '從內建動畫 DEMO 回推程式流程，再整理成可重複使用的自訂函式。',
  level: '國中八年級 / 九年級',
  defaultTaskId: 'SRF00-01',
  tasks: [
    cloneTask(smartRingCourses['SR-F01'], {
      id: 'SRF00-01',
      title: '填滿動畫函式仿作',
      starterMessage: '已載入 SRF00-01：填滿動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F01'], {
      id: 'SRF00-02',
      title: '清除動畫函式仿作',
      goal: '從清除動畫理解反向索引、逐步關燈與函式封裝。',
      description: '先播放清除動畫，再用暫存陣列、迴圈與等待重做。',
      demoObserve: '觀察 LED 如何逐顆清除。',
      practiceTask: '使用 for 迴圈由 12 到 1，逐步清除 LED。',
      functionTask: '整理成 clearAnimation(speed) 函式。',
      challenge: '改成只清除前 N 顆或後 N 顆。',
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
      starterMessage: '已載入 SRF00-03：跑馬燈函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-04',
      title: '左移動畫函式仿作',
      goal: '理解陣列資料向左位移時，索引位置如何改變。',
      description: '觀察左移動畫，再用暫存陣列與迴圈重做位移效果。',
      demoObserve: '觀察亮燈位置如何往左移動。',
      practiceTask: '使用位置變數控制 LED 由高編號往低編號移動。',
      functionTask: '整理成 shiftLeftAnimation(color, times, speed) 函式。',
      challenge: '讓移動次數由參數控制。',
      starterXml: animationXml({ blockType: 'smartring_play_shift_left_animation', color: 'purple', speed: 80, times: 2, message: '左移動畫函式仿作' }),
      starterMessage: '已載入 SRF00-04：左移動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-05',
      title: '右移動畫函式仿作',
      goal: '理解陣列資料向右位移時，索引位置如何改變。',
      description: '觀察右移動畫，再用暫存陣列與迴圈重做位移效果。',
      demoObserve: '觀察亮燈位置如何往右移動。',
      practiceTask: '使用位置變數控制 LED 由低編號往高編號移動。',
      functionTask: '整理成 shiftRightAnimation(color, times, speed) 函式。',
      challenge: '比較左移與右移的索引變化。',
      starterXml: animationXml({ blockType: 'smartring_play_shift_right_animation', color: 'blue', speed: 80, times: 2, message: '右移動畫函式仿作' }),
      starterMessage: '已載入 SRF00-05：右移動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F02'], {
      id: 'SRF00-06',
      title: '來回移動動畫函式仿作',
      goal: '理解方向改變與邊界判斷，完成往返移動效果。',
      description: '觀察來回移動動畫，思考何時要改變方向。',
      demoObserve: '觀察 LED 移動到邊界後如何反向。',
      practiceTask: '使用 position 與 direction 兩個變數控制移動。',
      functionTask: '整理成 bounceAnimation(color, times, speed) 函式。',
      challenge: '讓左右邊界可自訂。',
      starterXml: animationXml({ blockType: 'smartring_play_bounce_animation', color: 'green', speed: 80, times: 2, message: '來回移動動畫函式仿作' }),
      starterMessage: '已載入 SRF00-06：來回移動動畫函式仿作。',
    }),
    cloneTask(smartRingCourses['SR-F03'], {
      id: 'SRF00-07',
      title: '按鈕觸發動畫函式',
      starterMessage: '已載入 SRF00-07：按鈕觸發動畫函式。',
    }),
  ],
};
