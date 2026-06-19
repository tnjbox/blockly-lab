import { smartRingCourses } from './smartring-tasks.js';

const normalizeExamples = (overrides, merged) => {
  if (Array.isArray(overrides.examples)) {
    return overrides.examples;
  }

  const sampleInput = overrides.sampleInput ?? merged.sampleInput ?? '';
  const sampleOutput = overrides.sampleOutput ?? merged.sampleOutput ?? '';
  const sampleExplanation =
    overrides.sampleExplanation ||
    overrides.problemNote ||
    overrides.description ||
    '請比對使用者輸入、輸出與題目要求是否一致。';

  if (!sampleInput && !sampleOutput) {
    return [];
  }

  return [
    {
      input: sampleInput,
      output: sampleOutput,
      explanation: sampleExplanation,
    },
  ];
};

const normalizeTestCases = (testCases) => {
  if (!Array.isArray(testCases)) return [];

  return testCases.map((testCase) => ({
    input: testCase.input ?? '',
    expectedOutput: testCase.expectedOutput ?? testCase.output ?? '',
  }));
};

const cloneTask = (baseTask, overrides) => {
  const merged = {
    ...baseTask,
    ...overrides,
    type: 'Blockly / JavaScript 解題任務',
    smartRingRequirement: '本題不需要連接 SmartRingController。',
  };

  const problemTitle = overrides.problemTitle || overrides.title || merged.title;
  const statement = overrides.statement || overrides.problemStatement || merged.description;
  const inputDescription =
    overrides.inputDescription || '本題為 Blockly 基礎練習，請依題目要求設定資料或使用起始積木。';
  const outputDescription = overrides.outputDescription || '請使用「輸出」積木印出題目要求的結果。';
  const examples = normalizeExamples(overrides, merged);
  const testCases = normalizeTestCases(overrides.testCases);
  const problemNote =
    overrides.problemNote ||
    '本題目前屬於學習模式題目；題庫轉換器日後若在 TXT 開頭偵測到「模式：競賽模式」，會輸出 mode: contest。';

  return {
    ...merged,
    problemTitle,
    statement,
    problemStatement: statement,
    inputDescription,
    outputDescription,
    examples,
    sampleInput: overrides.sampleInput || examples[0]?.input || '',
    sampleOutput: overrides.sampleOutput || examples[0]?.output || '',
    constraints: overrides.constraints || '',
    problemNote,
    testCases,
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

const hintXml = (text) => printTextXml(text);

const base = smartRingCourses['JS-B01'];

export const JSB00 = {
  id: 'JSB00',
  title: 'Blockly 解題基礎一',
  mode: 'learning',
  type: 'programming',
  description:
    '從輸出、四則運算、變數與條件判斷開始，為後續程式解題與自動評分做準備。J02 先建立正式題目欄位與測資資料結構。',
  level: '國中初階',
  defaultTaskId: 'JSB00-01',
  sourceFormatNote:
    '未來 TXT 題目組轉 JS 時，若題目檔開頭有「模式：競賽模式」，課程組會輸出 mode: contest；未指定則預設 mode: learning。',
  tasks: [
    cloneTask(base, {
      id: 'JSB00-01',
      title: 'Hello world',
      goal: '認識文字輸出與程式執行流程。',
      description: '練習使用 Blockly 輸出 Hello world。',
      problemStatement: '請輸出一行文字：Hello world。',
      inputDescription: '無輸入。',
      outputDescription: '輸出一行文字，內容必須與範例輸出相同。',
      sampleOutput: 'Hello world',
      testCases: [{ input: '', output: 'Hello world' }],
      demoObserve: '觀察執行程式後，右側輸出區會出現文字。',
      practiceTask: '將文字改成自己的問候語。',
      functionTask: '暫不需要函式，先熟悉輸出。',
      challenge: '連續輸出三行不同文字。',
      starterXml: printTextXml('Hello world'),
      starterMessage: '已載入 JSB00-01：Hello world。',
    }),
    cloneTask(base, {
      id: 'JSB00-02',
      title: '一起學習吧',
      goal: '練習修改輸出文字。',
      description: '學生自行修改文字輸出，確認能執行與觀察結果。',
      problemStatement: '請輸出一行文字：一起學習吧。',
      inputDescription: '無輸入。',
      outputDescription: '輸出指定文字，內容必須與範例輸出相同。',
      sampleOutput: '一起學習吧',
      testCases: [{ input: '', output: '一起學習吧' }],
      demoObserve: '觀察輸出文字與積木內容是否一致。',
      practiceTask: '輸出「一起學習吧」，再嘗試加入自己的名字。',
      functionTask: '暫不需要函式。',
      challenge: '用兩個輸出積木印出兩行文字。',
      starterXml: printTextXml('一起學習吧'),
      starterMessage: '已載入 JSB00-02：一起學習吧。',
    }),
    cloneTask(base, {
      id: 'JSB00-03',
      title: '數字加總',
      goal: '理解數字、變數與加法運算。',
      description: '練習將兩個數字相加並輸出結果。',
      problemStatement: '請計算 10 與 20 的總和，並輸出加總結果。',
      inputDescription: '本題 J02 階段無鍵盤輸入，請在程式中使用固定數字 10 與 20。',
      outputDescription: '輸出格式為「總和：答案」。',
      sampleOutput: '總和：30',
      testCases: [{ input: '', output: '總和：30' }],
      demoObserve: '觀察 10 + 20 的結果。',
      practiceTask: '修改兩個數字，觀察答案變化。',
      functionTask: '進階可整理成 add(a, b) 函式。',
      challenge: '改成三個數字相加。',
      starterXml: arithmeticXml({ a: 10, b: 20, op: 'ADD', varName: 'sum', message: '總和：' }),
      starterMessage: '已載入 JSB00-03：數字加總。',
    }),
    cloneTask(base, {
      id: 'JSB00-04',
      title: '數字平均',
      goal: '理解加總後再除以數量的平均概念。',
      description: '練習計算兩個數字的平均。',
      problemStatement: '請計算 80 與 90 的平均值。',
      inputDescription: '本題 J02 階段無鍵盤輸入，請在程式中使用固定數字 80 與 90。',
      outputDescription: '輸出格式為「平均：答案」。',
      sampleOutput: '平均：85',
      testCases: [{ input: '', output: '平均：85' }],
      demoObserve: '觀察加法與除法的組合。',
      practiceTask: '修改起始積木，將總和再除以 2，輸出平均值。',
      functionTask: '進階可整理成 average(a, b) 函式。',
      challenge: '改成三個數字的平均。',
      starterXml: arithmeticXml({ a: 80, b: 90, op: 'ADD', varName: 'total', message: '先算總和：' }),
      starterMessage: '已載入 JSB00-04：數字平均。',
    }),
    cloneTask(base, {
      id: 'JSB00-05',
      title: '比較大小',
      goal: '理解條件判斷與比較運算。',
      description: '練習比較兩個數字大小。',
      problemStatement: '已知 a = 17、b = 25，請比較兩個數字，輸出比較結果。',
      inputDescription: '本題 J02 階段無鍵盤輸入，請在程式中建立 a 與 b 兩個變數。',
      outputDescription: '若 a 比較大，輸出「a 比較大」；若 b 比較大，輸出「b 比較大」；若相等，輸出「一樣大」。',
      sampleOutput: 'b 比較大',
      testCases: [{ input: '', output: 'b 比較大' }],
      demoObserve: '觀察 a > b、a < b、a = b 三種條件。',
      practiceTask: '建立 a、b 變數並完成 if / else if / else 判斷。',
      functionTask: '進階可整理成 compare(a, b) 函式。',
      challenge: '修改 a 與 b 的值，測試三種結果。',
      starterXml: hintXml('提示：建立 a=17、b=25，使用 if 判斷並輸出比較結果。'),
      starterMessage: '已載入 JSB00-05：比較大小。',
    }),
    cloneTask(base, {
      id: 'JSB00-06',
      title: '台斤公斤大PK',
      goal: '練習單位換算與數學運算。',
      description: '將台斤換算成公斤，理解輸入、運算與輸出。',
      problemStatement: '已知 1 台斤 = 0.6 公斤，請將 10 台斤換算成公斤。',
      inputDescription: '本題 J02 階段無鍵盤輸入，請在程式中使用固定數字 10。',
      outputDescription: '輸出格式為「公斤：答案」。',
      sampleOutput: '公斤：6',
      testCases: [{ input: '', output: '公斤：6' }],
      demoObserve: '觀察台斤數乘以 0.6 後的公斤數。',
      practiceTask: '修改台斤數並輸出公斤。',
      functionTask: '整理成 jinToKg(jin) 函式。',
      challenge: '加入公斤轉台斤。',
      starterXml: arithmeticXml({ a: 10, b: 0.6, op: 'MULTIPLY', varName: 'kg', message: '公斤：' }),
      starterMessage: '已載入 JSB00-06：台斤公斤大PK。',
    }),
    cloneTask(base, {
      id: 'JSB00-07',
      title: '判斷奇偶數',
      goal: '理解餘數與條件判斷。',
      description: '使用除以 2 的餘數判斷奇數或偶數。',
      problemStatement: '請判斷 number = 24 是奇數還是偶數。',
      inputDescription: '本題 J02 階段無鍵盤輸入，請在程式中建立 number 變數並設定為 24。',
      outputDescription: '若 number 可被 2 整除，輸出「偶數」；否則輸出「奇數」。',
      sampleOutput: '偶數',
      testCases: [{ input: '', output: '偶數' }],
      demoObserve: '觀察 number 除以 2 的餘數。',
      practiceTask: '修改 number，判斷不同數字。',
      functionTask: '整理成 isEven(n) 函式。',
      challenge: '測試奇數、偶數與 0。',
      starterXml: hintXml('提示：建立 number=24，使用「餘數」與 if 判斷奇偶數。'),
      starterMessage: '已載入 JSB00-07：判斷奇偶數。',
    }),
    cloneTask(base, {
      id: 'JSB00-08',
      title: '成績等第',
      goal: '練習多條件判斷。',
      description: '依照成績輸出 A、B、C 或需要加油。',
      problemStatement: '請依照 score = 92 判斷成績等第。',
      inputDescription: '本題 J02 階段無鍵盤輸入，請在程式中建立 score 變數並設定為 92。',
      outputDescription: 'score >= 90 輸出 A；score >= 80 輸出 B；score >= 70 輸出 C；未達 70 輸出「需要加油」。',
      sampleOutput: 'A',
      testCases: [{ input: '', output: 'A' }],
      demoObserve: '觀察不同分數對應不同等第。',
      practiceTask: '建立 score 變數並使用 if / else if 判斷等第。',
      functionTask: '整理成 getGrade(score) 函式。',
      challenge: '修改 score，測試 A、B、C、需要加油四種結果。',
      starterXml: hintXml('提示：建立 score=92，使用 if / else if 判斷成績等第。'),
      starterMessage: '已載入 JSB00-08：成績等第。',
    }),
  ],
};
