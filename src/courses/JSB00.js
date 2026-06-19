import { smartRingCourses } from './smartring-tasks.js';

const cloneTask = (baseTask, overrides) => {
  const merged = {
    ...baseTask,
    ...overrides,
    type: 'Blockly / JavaScript 解題任務',
    smartRingRequirement: '本題不需要連接 SmartRingController。',
  };

  return {
    ...merged,
    problemStatement: overrides.problemStatement || merged.description,
    inputDescription: overrides.inputDescription || '本題為 Blockly 基礎練習，請依起始積木或題目要求設定資料。',
    outputDescription: overrides.outputDescription || '請使用「輸出」積木印出題目要求的結果。',
    sampleInput: overrides.sampleInput || '',
    sampleOutput: overrides.sampleOutput || '',
    problemNote: overrides.problemNote || '',
  };
};

const printTextXml = (text) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="40" y="40">
    <value name="TEXT"><block type="text"><field name="TEXT">${text}</field></block></value>
  </block>
</xml>`;

const arithmeticXml = ({ a = 10, b = 20, op = 'ADD', varName = 'answer', message = '答案：' } = {}) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="40" y="40">
    <field name="VAR" id="${varName}">${varName}</field>
    <value name="VALUE">
      <block type="math_arithmetic">
        <field name="OP">${op}</field>
        <value name="A"><shadow type="math_number"><field name="NUM">${a}</field></shadow></value>
        <value name="B"><shadow type="math_number"><field name="NUM">${b}</field></shadow></value>
      </block>
    </value>
    <next>
      <block type="text_print">
        <value name="TEXT">
          <block type="text_join">
            <mutation items="2"></mutation>
            <value name="ADD0"><block type="text"><field name="TEXT">${message}</field></block></value>
            <value name="ADD1"><block type="variables_get"><field name="VAR" id="${varName}">${varName}</field></block></value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>`;

const compareXml = () => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="40" y="40">
    <field name="VAR" id="a">a</field>
    <value name="VALUE"><block type="math_number"><field name="NUM">17</field></block></value>
    <next>
      <block type="variables_set">
        <field name="VAR" id="b">b</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">25</field></block></value>
        <next>
          <block type="controls_if">
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">GT</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="a">a</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR" id="b">b</field></block></value>
              </block>
            </value>
            <statement name="DO0"><block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">a 比較大</field></block></value></block></statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

const base = smartRingCourses['JS-B01'];

export const JSB00 = {
  id: 'JSB00',
  title: 'Blockly 解題基礎一',
  description: '從輸出、四則運算、變數與條件判斷開始，為後續程式解題與自動評分做準備。',
  level: '國中初階',
  defaultTaskId: 'JSB00-01',
  tasks: [
    cloneTask(base, {
      id: 'JSB00-01',
      title: 'Hello world（老師示範）',
      goal: '認識文字輸出與程式執行流程。',
      description: '老師示範如何用 Blockly 輸出 Hello world。',
      problemStatement: '請輸出一行文字：Hello world。',
      inputDescription: '無輸入。',
      outputDescription: '輸出一行文字。',
      sampleOutput: 'Hello world',
      demoObserve: '觀察執行程式後，右側輸出區會出現文字。',
      practiceTask: '將文字改成自己的問候語。',
      functionTask: '暫不需要函式，先熟悉輸出。',
      challenge: '連續輸出三行不同文字。',
      starterXml: printTextXml('Hello world'),
      starterMessage: '已載入 JSB00-01：Hello world。',
    }),
    cloneTask(base, {
      id: 'JSB00-02',
      title: '一起學習吧（學生練習）',
      goal: '練習修改輸出文字。',
      description: '學生自行修改文字輸出，確認能執行與觀察結果。',
      problemStatement: '請輸出「一起學習吧」，並嘗試加入自己的名字。',
      inputDescription: '無輸入。',
      outputDescription: '輸出指定文字。',
      sampleOutput: '一起學習吧',
      demoObserve: '觀察輸出文字與積木內容是否一致。',
      practiceTask: '輸出「一起學習吧」與自己的名字。',
      functionTask: '暫不需要函式。',
      challenge: '用兩個輸出積木印出兩行文字。',
      starterXml: printTextXml('一起學習吧'),
      starterMessage: '已載入 JSB00-02：一起學習吧。',
    }),
    cloneTask(base, {
      id: 'JSB00-03',
      title: '數字加總（老師示範）',
      goal: '理解數字、變數與加法運算。',
      description: '老師示範將兩個數字相加並輸出結果。',
      problemStatement: '請計算兩個數字的總和，並輸出加總結果。',
      inputDescription: '起始練習使用 10 與 20。',
      outputDescription: '輸出兩個數字相加後的總和。',
      sampleOutput: '總和：30',
      demoObserve: '觀察 10 + 20 的結果。',
      practiceTask: '修改兩個數字，觀察答案變化。',
      functionTask: '進階可整理成 add(a, b) 函式。',
      challenge: '改成三個數字相加。',
      starterXml: arithmeticXml({ a: 10, b: 20, op: 'ADD', varName: 'sum', message: '總和：' }),
      starterMessage: '已載入 JSB00-03：數字加總。',
    }),
    cloneTask(base, {
      id: 'JSB00-04',
      title: '數字平均（學生練習）',
      goal: '理解加總後再除以數量的平均概念。',
      description: '學生練習計算兩個數字的平均。',
      problemStatement: '請計算兩個數字的平均值。',
      inputDescription: '起始練習使用 80 與 90。',
      outputDescription: '輸出平均值。',
      sampleOutput: '平均：85',
      demoObserve: '觀察加法與除法的組合。',
      practiceTask: '修改兩個數字，輸出平均值。',
      functionTask: '進階可整理成 average(a, b) 函式。',
      challenge: '改成三個數字的平均。',
      starterXml: arithmeticXml({ a: 80, b: 90, op: 'ADD', varName: 'total', message: '先算總和：' }),
      starterMessage: '已載入 JSB00-04：數字平均。',
    }),
    cloneTask(base, {
      id: 'JSB00-05',
      title: '比較大小（老師示範）',
      goal: '理解條件判斷與比較運算。',
      description: '老師示範如何比較兩個數字大小。',
      problemStatement: '請比較兩個數字，輸出哪一個數字比較大。',
      inputDescription: '起始練習使用 a = 17、b = 25。',
      outputDescription: '輸出比較結果。',
      sampleOutput: 'b 比較大',
      demoObserve: '觀察 a > b 是否成立。',
      practiceTask: '修改 a 與 b 的值，觀察輸出是否改變。',
      functionTask: '進階可整理成 max(a, b) 函式。',
      challenge: '補上 b 比較大與一樣大的情況。',
      starterXml: compareXml(),
      starterMessage: '已載入 JSB00-05：比較大小。',
    }),
    cloneTask(base, {
      id: 'JSB00-06',
      title: '台斤公斤大PK（學生練習）',
      goal: '練習單位換算與數學運算。',
      description: '將台斤換算成公斤，理解輸入、運算與輸出。',
      problemStatement: '已知 1 台斤 = 0.6 公斤，請將台斤換算成公斤。',
      inputDescription: '起始練習使用 10 台斤。',
      outputDescription: '輸出換算後的公斤數。',
      sampleOutput: '公斤：6',
      demoObserve: '觀察台斤數乘以 0.6 後的公斤數。',
      practiceTask: '修改台斤數並輸出公斤。',
      functionTask: '整理成 jinToKg(jin) 函式。',
      challenge: '加入公斤轉台斤。',
      starterXml: arithmeticXml({ a: 10, b: 0.6, op: 'MULTIPLY', varName: 'kg', message: '公斤：' }),
      starterMessage: '已載入 JSB00-06：台斤公斤大PK。',
    }),
    cloneTask(base, {
      id: 'JSB00-07',
      title: '判斷奇偶數（老師示範）',
      goal: '理解餘數與條件判斷。',
      description: '使用除以 2 的餘數判斷奇數或偶數。',
      problemStatement: '請判斷一個整數是奇數還是偶數。',
      inputDescription: '請自行建立 number 變數並設定一個整數。',
      outputDescription: '若 number 可被 2 整除，輸出「偶數」；否則輸出「奇數」。',
      sampleOutput: '偶數',
      demoObserve: '觀察 number 除以 2 的餘數。',
      practiceTask: '修改 number，判斷不同數字。',
      functionTask: '整理成 isEven(n) 函式。',
      challenge: '輸出「奇數」或「偶數」。',
      starterXml: printTextXml('提示：使用「餘數」與 if 判斷奇偶數。'),
      starterMessage: '已載入 JSB00-07：判斷奇偶數。',
    }),
    cloneTask(base, {
      id: 'JSB00-08',
      title: '成績等第（學生練習）',
      goal: '練習多條件判斷。',
      description: '依照成績輸出 A、B、C 或需要加油。',
      problemStatement: '請依照分數判斷成績等第。',
      inputDescription: '請自行建立 score 變數並設定 0～100 的分數。',
      outputDescription: '依條件輸出 A、B、C 或需要加油。',
      sampleOutput: 'A',
      demoObserve: '觀察不同分數對應不同等第。',
      practiceTask: '建立 score 變數並使用 if 判斷等第。',
      functionTask: '整理成 getGrade(score) 函式。',
      challenge: '加入 90、80、70、60 多層級判斷。',
      starterXml: printTextXml('提示：建立 score 變數，使用 if 判斷成績等第。'),
      starterMessage: '已載入 JSB00-08：成績等第。',
    }),
  ],
};
