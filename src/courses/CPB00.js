import { smartRingCourses } from './smartring-tasks.js';

const base = smartRingCourses['JS-B01'];

const cloneContestTask = (overrides) => {
  const statement = overrides.statement || overrides.problemStatement || overrides.description;
  return {
    ...base,
    ...overrides,
    type: 'Blockly / JavaScript 競賽題目',
    smartRingRequirement: '本題不需要連接 SmartRingController。',
    problemTitle: overrides.problemTitle || overrides.title,
    statement,
    problemStatement: statement,
    examples: overrides.examples || [],
    testCases: (overrides.testCases || []).map((testCase) => ({
      input: testCase.input ?? '',
      expectedOutput: testCase.expectedOutput ?? testCase.output ?? '',
    })),
  };
};

const hintXml = (text) => `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="40" y="40">
    <value name="TEXT"><block type="text"><field name="TEXT">${text}</field></block></value>
  </block>
</xml>`;

export const CPB00 = {
  id: 'CPB00',
  title: '程式競賽基礎題組',
  mode: 'contest',
  type: 'programming',
  description: '競賽模式示範題組。系統評分完成後，才會啟用上傳成績。',
  level: '國中競賽入門',
  defaultTaskId: 'CPB00-01',
  tasks: [
    cloneContestTask({
      id: 'CPB00-01',
      title: '競賽示範：兩數加總',
      goal: '確認競賽模式、系統評分與上傳成績按鈕流程。',
      description: '讀取兩個整數並輸出總和。',
      problemStatement: '請設計一個程式，第一行輸入整數 A，第二行輸入整數 B，輸出 A+B 的結果。',
      inputDescription: '第一行輸入一個整數 A。第二行輸入一個整數 B。',
      outputDescription: '輸出 A+B 的結果。',
      examples: [
        { input: '12\n30', output: '42', explanation: '12+30=42。' },
        { input: '100\n8', output: '108', explanation: '100+8=108。' },
      ],
      testCases: [
        { input: '12\n30', output: '42' },
        { input: '100\n8', output: '108' },
        { input: '7\n9', output: '16' },
      ],
      starterXml: hintXml('提示：使用兩次「要求輸入數字」，最後輸出兩數相加。'),
      starterMessage: '已載入 CPB00-01：競賽示範兩數加總。',
    }),
  ],
};
