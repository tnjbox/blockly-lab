import { smartRingCourses } from './smartring-tasks.js';

const base = smartRingCourses['JS-B01'];

const normalizeTestCases = (testCases) =>
  (Array.isArray(testCases) ? testCases : []).map((testCase) => ({
    input: testCase.input ?? '',
    expectedOutput: testCase.expectedOutput ?? testCase.output ?? '',
  }));

const cloneArrayTask = (overrides) => {
  const statement = overrides.statement || overrides.problemStatement || overrides.description;
  return {
    ...base,
    ...overrides,
    type: 'Blockly / JavaScript 陣列解題任務',
    smartRingRequirement: '本題不需要連接 SmartRingController。',
    problemTitle: overrides.problemTitle || overrides.title,
    statement,
    problemStatement: statement,
    examples: overrides.examples || [],
    testCases: normalizeTestCases(overrides.testCases),
  };
};

const hintXml = (text) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="40" y="40">
    <value name="TEXT"><block type="text"><field name="TEXT">${text}</field></block></value>
  </block>
</xml>`;

export const JSA00 = {
  id: 'JSA00',
  title: 'Blockly 解題陣列基礎',
  mode: 'learning',
  type: 'programming',
  description: '練習清單、文字切割、迴圈、加總與統計等陣列基礎題型。',
  level: '國中進階',
  defaultTaskId: 'JSA00-01',
  tasks: [
    cloneArrayTask({
      id: 'JSA00-01',
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
      starterMessage: '已載入 JSA00-01：跳繩比賽。',
    }),
    cloneArrayTask({
      id: 'JSA00-02',
      title: '最高分與最低分',
      goal: '練習清單走訪與最大最小值。',
      description: '讀取一列分數，輸出最高分與最低分。',
      problemStatement: '請設計一個程式，第一行輸入 N，第二行輸入 N 個分數，輸出最高分與最低分。',
      inputDescription: '第一行輸入數字 N。第二行輸入 N 個以半形空白分隔的整數。',
      outputDescription: '第一行輸出最高分，第二行輸出最低分。',
      examples: [
        { input: '5\n80 95 70 88 60', output: '95\n60', explanation: '最高分是 95，最低分是 60。' },
      ],
      testCases: [
        { input: '5\n80 95 70 88 60', output: '95\n60' },
        { input: '3\n100 90 95', output: '100\n90' },
      ],
      starterXml: hintXml('提示：把第二行資料切成清單，逐項比較最高分與最低分。'),
      starterMessage: '已載入 JSA00-02：最高分與最低分。',
    }),
    cloneArrayTask({
      id: 'JSA00-03',
      title: '統計及格人數',
      goal: '練習清單走訪與條件計數。',
      description: '讀取多筆成績，統計大於等於 60 分的人數。',
      problemStatement: '請設計一個程式，第一行輸入 N，第二行輸入 N 個成績，輸出及格人數。',
      inputDescription: '第一行輸入數字 N。第二行輸入 N 個以半形空白分隔的整數。',
      outputDescription: '輸出成績大於等於 60 的人數。',
      examples: [
        { input: '6\n59 60 80 45 100 70', output: '4', explanation: '60、80、100、70 共 4 人及格。' },
      ],
      testCases: [
        { input: '6\n59 60 80 45 100 70', output: '4' },
        { input: '4\n10 20 30 40', output: '0' },
      ],
      starterXml: hintXml('提示：逐項取出成績，若大於等於 60，就讓計數器加 1。'),
      starterMessage: '已載入 JSA00-03：統計及格人數。',
    }),
  ],
};
