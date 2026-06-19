import { smartRingCourses } from './smartring-tasks.js';

const normalizeExamples = (overrides, merged) => {
  if (Array.isArray(overrides.examples)) {
    return overrides.examples;
  }

  const sampleInput = overrides.sampleInput ?? merged.sampleInput ?? '';
  const sampleOutput = overrides.sampleOutput ?? merged.sampleOutput ?? '';
  const sampleExplanation = overrides.sampleExplanation || overrides.problemNote || '';

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
  const inputDescription = overrides.inputDescription || '請依照題目輸入說明，使用 Blockly 原生輸入積木讀取資料。';
  const outputDescription = overrides.outputDescription || '請使用「輸出」積木輸出題目要求的結果。';
  const examples = normalizeExamples(overrides, merged);
  const testCases = normalizeTestCases(overrides.testCases);
  const problemNote = overrides.problemNote || '';

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

const hintXml = (text) => printTextXml(text);

const promptNumberSumXml = () => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="40" y="40">
    <field name="VAR" id="a">a</field>
    <value name="VALUE">
      <block type="text_prompt_ext">
        <mutation type="NUMBER"></mutation>
        <field name="TYPE">NUMBER</field>
        <value name="TEXT"><shadow type="text"><field name="TEXT">請輸入第一個數字</field></shadow></value>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR" id="b">b</field>
        <value name="VALUE">
          <block type="text_prompt_ext">
            <mutation type="NUMBER"></mutation>
            <field name="TYPE">NUMBER</field>
            <value name="TEXT"><shadow type="text"><field name="TEXT">請輸入第二個數字</field></shadow></value>
          </block>
        </value>
        <next>
          <block type="text_print">
            <value name="TEXT">
              <block type="math_arithmetic">
                <field name="OP">ADD</field>
                <value name="A"><block type="variables_get"><field name="VAR" id="a">a</field></block></value>
                <value name="B"><block type="variables_get"><field name="VAR" id="b">b</field></block></value>
              </block>
            </value>
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
  mode: 'learning',
  type: 'programming',
  description:
    '以 Google Blockly 原生積木練習輸出、輸入、清單、迴圈、變數與條件判斷，並使用 testCases 進行本機系統評分。',
  level: '國中初階',
  defaultTaskId: 'JSB00-01',
  sourceFormatNote:
    '未來 TXT 題目組轉 JS 時，若題目檔開頭有「模式：競賽模式」，課程組會輸出 mode: contest；未指定則預設 mode: learning。題目內容只做欄位對應與安全顯示，不改寫題面文字。',
  tasks: [
    cloneTask(base, {
      id: 'JSB00-01',
      title: 'Hello world',
      goal: '認識文字輸出與程式執行流程。',
      description: '練習使用 Blockly 輸出 Hello world。',
      problemStatement: '請輸出一行文字：Hello world。',
      inputDescription: '無輸入。',
      outputDescription: '輸出一行文字，內容必須與範例輸出相同。',
      examples: [
        {
          input: '無輸入',
          output: 'Hello world',
          explanation: '程式直接輸出 Hello world。',
        },
      ],
      testCases: [{ input: '', output: 'Hello world' }],
      demoObserve: '觀察執行程式後，右側輸出區會出現文字。',
      practiceTask: '將文字改成指定輸出內容。',
      functionTask: '暫不需要函式。',
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
      examples: [
        {
          input: '無輸入',
          output: '一起學習吧',
          explanation: '程式直接輸出指定文字。',
        },
      ],
      testCases: [{ input: '', output: '一起學習吧' }],
      demoObserve: '觀察輸出文字與積木內容是否一致。',
      practiceTask: '輸出「一起學習吧」。',
      functionTask: '暫不需要函式。',
      challenge: '用兩個輸出積木印出兩行文字。',
      starterXml: printTextXml('一起學習吧'),
      starterMessage: '已載入 JSB00-02：一起學習吧。',
    }),
    cloneTask(base, {
      id: 'JSB00-03',
      title: '兩數加總',
      goal: '使用 Blockly 原生輸入積木讀取數字並輸出加總結果。',
      description: '練習要求輸入數字、變數與加法運算。',
      problemStatement: '請設計一個程式，第一行輸入整數 A，第二行輸入整數 B，輸出 A+B 的結果。',
      inputDescription: '第一行輸入一個整數 A。第二行輸入一個整數 B。',
      outputDescription: '輸出 A+B 的結果。',
      examples: [
        {
          input: '10\n20',
          output: '30',
          explanation: '第一行輸入 10，第二行輸入 20，10+20=30。',
        },
        {
          input: '7\n8',
          output: '15',
          explanation: '第一行輸入 7，第二行輸入 8，7+8=15。',
        },
      ],
      testCases: [
        { input: '10\n20', output: '30' },
        { input: '7\n8', output: '15' },
        { input: '100\n250', output: '350' },
      ],
      demoObserve: '觀察兩次輸入如何依序提供給程式。',
      practiceTask: '使用「要求輸入數字」讀取兩個數字並相加。',
      functionTask: '進階可整理成 add(a, b) 函式。',
      challenge: '改成三個數字相加。',
      starterXml: promptNumberSumXml(),
      starterMessage: '已載入 JSB00-03：兩數加總。',
    }),
    cloneTask(base, {
      id: 'JSB00-04',
      title: '跳繩比賽',
      goal: '使用多行輸入、清單與迴圈完成資料加總。',
      description: '練習第一行讀取 N，第二行讀取 N 筆以半形空白分隔的資料。',
      problemStatement:
        '體育課上，學生進行跳繩小組競賽，小組人數不定，每人跳的次數也不同。請設計一個程式，計算小組全部人員總共跳繩幾次。',
      inputDescription:
        '第一行輸入數字 N，代表小組有 N 人。第二行輸入一串共 N 筆整數，序列的數字以半形空白間隔。',
      outputDescription: '程式輸出小組全部人員總共跳繩幾次。',
      examples: [
        {
          input: '5\n20 19 36 25 30',
          output: '130',
          explanation:
            '第一行輸入 5，表示小組有 5 人。第二行輸入 20 19 36 25 30，表示小組每人分別跳 20、19、36、25、30 下。程式輸出小組累計共跳 130 下。',
        },
        {
          input: '3\n6 12 18',
          output: '36',
          explanation:
            '第一行輸入 3，表示小組有 3 人。第二行輸入 6 12 18，表示小組每人分別跳 6、12、18 下。程式輸出小組累計共跳 36 下。',
        },
      ],
      testCases: [
        { input: '5\n20 19 36 25 30', output: '130' },
        { input: '3\n6 12 18', output: '36' },
        { input: '4\n10 20 30 40', output: '100' },
        { input: '1\n99', output: '99' },
      ],
      demoObserve: '觀察第二行文字如何用半形空白切成清單。',
      practiceTask: '使用原生輸入積木、從文本製作清單、迴圈與加總變數完成題目。',
      functionTask: '進階可整理成 sumList(list) 函式。',
      challenge: '改成輸出平均跳繩次數。',
      starterXml: hintXml('提示：第一行用「要求輸入數字」讀取 N；第二行用「要求輸入文字」讀取整串資料；用半形空白切成清單後逐項加總。'),
      starterMessage: '已載入 JSB00-04：跳繩比賽。',
    }),
    cloneTask(base, {
      id: 'JSB00-05',
      title: '數字平均',
      goal: '使用多行輸入計算一組數字的平均值。',
      description: '練習加總後再除以數量。',
      problemStatement: '請設計一個程式，第一行輸入 N，第二行輸入 N 個整數，輸出這 N 個整數的平均值。',
      inputDescription: '第一行輸入數字 N。第二行輸入 N 個以半形空白分隔的整數。',
      outputDescription: '輸出平均值；本題測資皆可整除，不會出現小數。',
      examples: [
        {
          input: '4\n80 90 70 60',
          output: '75',
          explanation: '80+90+70+60=300，300/4=75。',
        },
        {
          input: '3\n10 20 30',
          output: '20',
          explanation: '10+20+30=60，60/3=20。',
        },
      ],
      testCases: [
        { input: '4\n80 90 70 60', output: '75' },
        { input: '3\n10 20 30', output: '20' },
        { input: '5\n5 10 15 20 25', output: '15' },
      ],
      demoObserve: '觀察平均值等於總和除以資料筆數。',
      practiceTask: '先完成加總，再除以 N。',
      functionTask: '進階可整理成 averageList(list) 函式。',
      challenge: '若平均值不是整數，改為輸出小數。',
      starterXml: hintXml('提示：讀取 N 與一整行資料，將文字以半形空白切成清單，逐項轉成數字後加總，再除以 N。'),
      starterMessage: '已載入 JSB00-05：數字平均。',
    }),
    cloneTask(base, {
      id: 'JSB00-06',
      title: '比較大小',
      goal: '使用條件判斷比較兩個輸入數字。',
      description: '練習 if / else if / else。',
      problemStatement: '請設計一個程式，輸入兩個整數 A、B，判斷哪一個比較大。',
      inputDescription: '第一行輸入整數 A。第二行輸入整數 B。',
      outputDescription: '若 A 比較大，輸出 A。若 B 比較大，輸出 B。若兩數相同，輸出 SAME。',
      examples: [
        {
          input: '17\n25',
          output: 'B',
          explanation: '17 小於 25，因此輸出 B。',
        },
        {
          input: '30\n30',
          output: 'SAME',
          explanation: '兩個數字相同，因此輸出 SAME。',
        },
      ],
      testCases: [
        { input: '17\n25', output: 'B' },
        { input: '30\n30', output: 'SAME' },
        { input: '100\n3', output: 'A' },
      ],
      demoObserve: '觀察大於、小於、等於三種分支。',
      practiceTask: '使用兩次「要求輸入數字」與 if 判斷。',
      functionTask: '進階可整理成 compare(a, b) 函式。',
      challenge: '改成輸出較大的數值。',
      starterXml: hintXml('提示：讀取 A 與 B，使用 if 判斷 A>B、A<B、其他狀況。'),
      starterMessage: '已載入 JSB00-06：比較大小。',
    }),
    cloneTask(base, {
      id: 'JSB00-07',
      title: '判斷奇偶數',
      goal: '使用餘數與條件判斷。',
      description: '練習將輸入數字除以 2 後觀察餘數。',
      problemStatement: '請設計一個程式，輸入一個整數 N，判斷它是奇數或偶數。',
      inputDescription: '第一行輸入一個整數 N。',
      outputDescription: '若 N 是偶數，輸出 EVEN。若 N 是奇數，輸出 ODD。',
      examples: [
        {
          input: '24',
          output: 'EVEN',
          explanation: '24 可以被 2 整除，因此輸出 EVEN。',
        },
        {
          input: '15',
          output: 'ODD',
          explanation: '15 除以 2 餘 1，因此輸出 ODD。',
        },
      ],
      testCases: [
        { input: '24', output: 'EVEN' },
        { input: '15', output: 'ODD' },
        { input: '0', output: 'EVEN' },
      ],
      demoObserve: '觀察 N 除以 2 的餘數。',
      practiceTask: '使用「餘數」與 if 判斷奇偶數。',
      functionTask: '進階可整理成 isEven(n) 函式。',
      challenge: '測試 0、正數與較大的數字。',
      starterXml: hintXml('提示：讀取 N，若 N 除以 2 的餘數是 0，輸出 EVEN，否則輸出 ODD。'),
      starterMessage: '已載入 JSB00-07：判斷奇偶數。',
    }),
    cloneTask(base, {
      id: 'JSB00-08',
      title: '成績等第',
      goal: '練習多條件判斷。',
      description: '依照輸入成績輸出等第。',
      problemStatement: '請設計一個程式，輸入一個整數分數 S，依照分數輸出等第。',
      inputDescription: '第一行輸入一個整數 S，代表分數。',
      outputDescription: 'S >= 90 輸出 A；S >= 80 輸出 B；S >= 70 輸出 C；未達 70 輸出 D。',
      examples: [
        {
          input: '92',
          output: 'A',
          explanation: '92 大於等於 90，因此輸出 A。',
        },
        {
          input: '75',
          output: 'C',
          explanation: '75 大於等於 70 且未達 80，因此輸出 C。',
        },
      ],
      testCases: [
        { input: '92', output: 'A' },
        { input: '85', output: 'B' },
        { input: '75', output: 'C' },
        { input: '60', output: 'D' },
      ],
      demoObserve: '觀察 if / else if 的判斷順序。',
      practiceTask: '建立 score 變數並使用 if / else if 判斷等第。',
      functionTask: '進階可整理成 getGrade(score) 函式。',
      challenge: '加入更多等第，例如 A+。',
      starterXml: hintXml('提示：讀取 S，依序判斷 S>=90、S>=80、S>=70，最後輸出 D。'),
      starterMessage: '已載入 JSB00-08：成績等第。',
    }),
  ],
};
