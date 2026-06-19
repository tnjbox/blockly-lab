import './style.css';

import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import * as ZhHant from 'blockly/msg/zh-hant';

import { competitionToolbox } from './blockly/toolbox.js';
import { registerSmartRingBlocks } from './blockly/smartring-blocks.js';
import { smartRingRuntime } from './smartring/runtime.js';

Blockly.setLocale(ZhHant);
registerSmartRingBlocks();

const blocklyDiv = document.getElementById('blocklyDiv');
const codePreview = document.getElementById('codePreview');
const outputArea = document.getElementById('outputArea');

const btnConnectSmartRing = document.getElementById('btnConnectSmartRing');
const btnDisconnectSmartRing = document.getElementById('btnDisconnectSmartRing');
const btnTestLedRed = document.getElementById('btnTestLedRed');
const btnTestLedClear = document.getElementById('btnTestLedClear');

const btnLoadSample = document.getElementById('btnLoadSample');
const btnRun = document.getElementById('btnRun');
const btnStop = document.getElementById('btnStop');
const btnClear = document.getElementById('btnClear');
const btnSaveBlocks = document.getElementById('btnSaveBlocks');
const btnLoadBlocks = document.getElementById('btnLoadBlocks');
const blockFileInput = document.getElementById('blockFileInput');
const btnCopyCode = document.getElementById('btnCopyCode');
const btnClearOutput = document.getElementById('btnClearOutput');

const studentClass = document.getElementById('studentClass');
const studentNumber = document.getElementById('studentNumber');
const studentName = document.getElementById('studentName');
const courseCode = document.getElementById('courseCode');
const practiceMode = document.getElementById('practiceMode');

const btnLoadCourse = document.getElementById('btnLoadCourse');
const btnTestTask = document.getElementById('btnTestTask');
const btnSubmitScore = document.getElementById('btnSubmitScore');

const taskInfo = document.getElementById('taskInfo');
const modeStatus = document.getElementById('modeStatus');
const smartRingStatus = document.getElementById('smartRingStatus');

const serialStatusValue = document.getElementById('serialStatusValue');
const buttonStateValue = document.getElementById('buttonStateValue');
const rawStateValue = document.getElementById('rawStateValue');
const lastCommandValue = document.getElementById('lastCommandValue');

const tabBlocks = document.getElementById('tabBlocks');
const tabCode = document.getElementById('tabCode');
const blocksView = document.getElementById('blocksView');
const codeView = document.getElementById('codeView');

const taskModal = document.getElementById('taskModal');
const taskModalTitle = document.getElementById('taskModalTitle');
const taskModalBody = document.getElementById('taskModalBody');
const btnOpenTaskModal = document.getElementById('btnOpenTaskModal');
const btnCloseTaskModal = document.getElementById('btnCloseTaskModal');

let workspace = null;
let currentCourse = null;
let isUserProgramRunning = false;

const demoCourses = {
  'SR-B01': {
    id: 'SR-B01',
    title: 'SmartRing 基礎任務：按鈕控制燈光',
    type: 'SmartRing 互動任務',
    level: '國小高年級 / 國中初階',
    goal: '透過按鈕與 LED 燈光互動，理解條件判斷與輸出控制。',
    description:
      '本任務要求學生連接 SmartRingController，按下指定按鈕後，讓指定 LED 顯示指定顏色。',
    operation:
      '學生需要先連線 SmartRingController，再使用「SmartRing 按鈕被按下？」與「設定 SmartRing LED 顏色」積木完成互動任務。',
    blockLimit:
      '建議使用邏輯、迴圈、變數、SmartRing 按鈕與 SmartRing 燈光積木。',
    smartRingRequirement:
      '需要使用 ESP8266 SmartRingController。按鈕輸入會控制 LED 輸出。',
    scoring:
      '學習模式會顯示提示；競賽模式未來會檢查按鈕反應與 LED 狀態是否符合要求。',
    hint: 'MVP-B13 已加入中止程式與陣列位移動畫 DEMO 積木，學生可先觀察動畫，再用暫存陣列與函式仿作。',
  },
  'SR-A01': {
    id: 'SR-A01',
    title: 'SmartRing 陣列任務：程式中止、陣列位移動畫 DEMO 與暫存陣列仿作',
    type: 'SmartRing 陣列任務',
    level: '國中八年級',
    goal: '透過 SmartRing DEMO 觀察 LED 圖樣、狀態顯示與基礎動畫、陣列位移動畫與程式中止控制，再使用暫存陣列與 RGB 參數寫出對應程式。',
    description:
      '本任務先用 DEMO 積木示範圖樣、狀態顯示與基礎動畫、陣列位移與交錯閃爍效果，再引導學生使用 LED 暫存陣列、RGB 通道、完整 RGB 參數與函式重做相同效果。',
    operation:
      '學生先執行「示範圖樣」「示範狀態顯示」與基礎動畫 DEMO 觀察效果，再使用「清除暫存陣列」「設定暫存陣列第 N 顆 LED」「顯示暫存陣列到 SmartRing」完成仿作。',
    blockLimit:
      '建議使用 SmartRing LED 暫存陣列、RGB 通道、完整 RGB 設定、變數、迴圈、數學、等待與函式積木。DEMO 積木僅作觀察與任務示範。',
    smartRingRequirement:
      '需要使用 12 顆 LED 顯示陣列狀態。學生端 LED 編號維持 1～12。',
    scoring:
      '未來評分會檢查學生是否能不用 DEMO 積木，而以暫存陣列、迴圈、等待與函式完成指定圖樣、狀態顯示或基礎動畫。',
    hint: 'B13 的教學脈絡是：先看 DEMO，再分析 LED 變化，最後用暫存陣列、迴圈、等待與函式自己寫出來。',
  },
  'JS-B01': {
    id: 'JS-B01',
    title: 'Blockly 解題任務：重複累加',
    type: '程式解題任務',
    level: '國中初階',
    goal: '使用變數與迴圈完成累加，並輸出結果。',
    description:
      '未來本任務會載入測資與標準答案，學生按下測試後由系統自動評分。',
    operation:
      '學生使用變數紀錄目前總和，透過迴圈重複累加，最後輸出結果。',
    blockLimit:
      '建議使用變數、迴圈、數學與文字輸出積木。',
    smartRingRequirement:
      '本題不需要連接 SmartRingController。',
    scoring:
      '未來評分會比對程式輸出與標準答案，計算通過測資數。',
    hint: '目前可先使用「載入範例」觀察變數、迴圈與輸出。',
  },
};

function initBlockly() {
  workspace = Blockly.inject(blocklyDiv, {
    toolbox: competitionToolbox,
    trashcan: true,
    scrollbars: true,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.9,
      maxScale: 1.4,
      minScale: 0.5,
      scaleSpeed: 1.1,
    },
    grid: {
      spacing: 24,
      length: 3,
      colour: '#d8dce3',
      snap: true,
    },
    renderer: 'geras',
  });

  workspace.addChangeListener(updateCodePreview);
  updateCodePreview();
}

function updateCodePreview() {
  if (!workspace) return;

  const code = javascriptGenerator.workspaceToCode(workspace);
  codePreview.textContent = code.trim() || '// 尚未建立程式';
}

function writeOutput(message) {
  const currentText = outputArea.textContent;

  if (currentText === '尚未執行程式。' || currentText === '') {
    outputArea.textContent = String(message);
    return;
  }

  outputArea.textContent += `\n${String(message)}`;
}

function clearOutput() {
  outputArea.textContent = '';
}

function setProgramRunningUi(isRunning) {
  isUserProgramRunning = isRunning;

  if (btnRun) {
    btnRun.disabled = isRunning;
  }

  if (btnStop) {
    btnStop.disabled = !isRunning;
  }
}

function stopUserCode() {
  if (!isUserProgramRunning) {
    outputArea.textContent = '目前沒有正在執行的程式。';
    return;
  }

  smartRingRuntime.stopProgram();
  writeOutput('已送出中止程式請求，程式會在下一個 SmartRing 等待或硬體指令處停止。');
}

async function runUserCode() {
  if (!workspace) return;

  if (isUserProgramRunning) {
    writeOutput('程式仍在執行中，請先按「中止程式」。');
    return;
  }

  clearOutput();

  const code = javascriptGenerator.workspaceToCode(workspace);

  if (!code.trim()) {
    outputArea.textContent = '目前沒有可以執行的程式。';
    return;
  }

  const originalAlert = window.alert;
  const originalConsoleLog = console.log;

  smartRingRuntime.resetProgramStop();
  setProgramRunningUi(true);

  try {
    window.alert = (message) => {
      writeOutput(message);
    };

    console.log = (...args) => {
      writeOutput(args.join(' '));
      originalConsoleLog(...args);
    };

    const safePrint = (message) => {
      writeOutput(message);
    };

    const runner = new Function(
      'print',
      'SmartRing',
      `
      "use strict";
      return (async () => {
        ${code}
      })();
      `
    );

    await runner(safePrint, smartRingRuntime);

    if (!outputArea.textContent.trim()) {
      outputArea.textContent = '程式執行完成，沒有輸出內容。';
    }
  } catch (error) {
    if (error?.name === 'AbortError' || error?.message === '程式已中止。') {
      outputArea.textContent = '程式已中止。';
    } else {
      outputArea.textContent = `程式執行發生錯誤：\n${error.message}`;
    }
  } finally {
    window.alert = originalAlert;
    console.log = originalConsoleLog;
    setProgramRunningUi(false);
    smartRingRuntime.resetProgramStop();
  }
}

function clearWorkspace() {
  if (!workspace) return;

  const confirmed = window.confirm('確定要清除目前所有積木嗎？');

  if (!confirmed) return;

  workspace.clear();
  updateCodePreview();
  outputArea.textContent = '已清除工作區。';
}

function copyCode() {
  const code = codePreview.textContent || '';

  navigator.clipboard
    .writeText(code)
    .then(() => {
      outputArea.textContent = '已複製 JavaScript 程式碼。';
    })
    .catch(() => {
      outputArea.textContent = '複製失敗，請手動選取程式碼。';
    });
}

function switchWorkspaceTab(targetTab) {
  const showCode = targetTab === 'code';

  tabBlocks.classList.toggle('active', !showCode);
  tabCode.classList.toggle('active', showCode);
  blocksView.classList.toggle('active', !showCode);
  codeView.classList.toggle('active', showCode);

  updateCodePreview();

  if (!showCode && workspace) {
    setTimeout(() => {
      Blockly.svgResize(workspace);
    }, 0);
  }
}

function loadSample() {
  if (!workspace) return;

  workspace.clear();

  const xmlText = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="variables_set" x="40" y="40">
        <field name="VAR" id="score">score</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
        </value>
        <next>
          <block type="controls_repeat_ext">
            <value name="TIMES">
              <shadow type="math_number">
                <field name="NUM">5</field>
              </shadow>
            </value>
            <statement name="DO">
              <block type="math_change">
                <field name="VAR" id="score">score</field>
                <value name="DELTA">
                  <shadow type="math_number">
                    <field name="NUM">1</field>
                  </shadow>
                </value>
                <next>
                  <block type="text_print">
                    <value name="TEXT">
                      <block type="text_join">
                        <mutation items="2"></mutation>
                        <value name="ADD0">
                          <block type="text">
                            <field name="TEXT">目前分數：</field>
                          </block>
                        </value>
                        <value name="ADD1">
                          <block type="variables_get">
                            <field name="VAR" id="score">score</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </xml>
  `;

  const xmlDom = Blockly.utils.xml.textToDom(xmlText);
  Blockly.Xml.domToWorkspace(xmlDom, workspace);

  updateCodePreview();
  switchWorkspaceTab('blocks');
  outputArea.textContent = '已載入範例：重複累加分數。';
}

function loadSmartRingSample() {
  if (!workspace) return;

  workspace.clear();

  const xmlText = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="controls_if" x="40" y="40">
        <value name="IF0">
          <block type="smartring_button_pressed">
            <field name="BUTTON">1</field>
          </block>
        </value>
        <statement name="DO0">
          <block type="smartring_set_led_rgb">
            <value name="INDEX">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="R">
              <shadow type="math_number">
                <field name="NUM">30</field>
              </shadow>
            </value>
            <value name="G">
              <shadow type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
            <value name="B">
              <shadow type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
            <next>
              <block type="smartring_wait_ms">
                <value name="MS">
                  <shadow type="math_number">
                    <field name="NUM">100</field>
                  </shadow>
                </value>
                <next>
                  <block type="text_print">
                    <value name="TEXT">
                      <block type="text">
                        <field name="TEXT">BTN1/F 被按下，用 RGB 點亮第 1 顆 LED</field>
                      </block>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </xml>
  `;

  const xmlDom = Blockly.utils.xml.textToDom(xmlText);
  Blockly.Xml.domToWorkspace(xmlDom, workspace);

  updateCodePreview();
  switchWorkspaceTab('blocks');
  outputArea.textContent = '已載入 SmartRing 範例：按鈕控制 LED。';
}

function loadSmartRingArraySample() {
  if (!workspace) return;

  workspace.clear();

  const xmlText = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="smartring_demo_pattern" x="40" y="40">
        <field name="PATTERN">centerFour</field>
        <field name="COLOR">blue</field>
        <next>
          <block type="smartring_wait_ms">
            <value name="MS"><shadow type="math_number"><field name="NUM">500</field></shadow></value>
            <next>
              <block type="smartring_demo_status_display">
                <field name="STATUS">progress</field>
                <value name="VALUE"><shadow type="math_number"><field name="NUM">6</field></shadow></value>
                <value name="MAX"><shadow type="math_number"><field name="NUM">12</field></shadow></value>
                <field name="COLOR">green</field>
                <next>
                  <block type="smartring_wait_ms">
                    <value name="MS"><shadow type="math_number"><field name="NUM">500</field></shadow></value>
                    <next>
                      <block type="smartring_play_blink_animation">
                        <field name="COLOR">red</field>
                        <value name="TIMES"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
                        <next>
                          <block type="smartring_wait_ms">
                            <value name="MS"><shadow type="math_number"><field name="NUM">300</field></shadow></value>
                            <next>
                              <block type="smartring_play_fill_animation">
                                <field name="COLOR">yellow</field>
                                <value name="SPEED"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                                <next>
                                  <block type="smartring_wait_ms">
                                    <value name="MS"><shadow type="math_number"><field name="NUM">300</field></shadow></value>
                                    <next>
                                      <block type="smartring_play_running_light_animation">
                                        <field name="COLOR">cyan</field>
                                        <value name="SPEED"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                                        <next>
                                          <block type="smartring_wait_ms">
                                            <value name="MS"><shadow type="math_number"><field name="NUM">300</field></shadow></value>
                                            <next>
                                              <block type="smartring_play_shift_left_animation">
                                                <field name="COLOR">purple</field>
                                                <value name="TIMES"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
                                                <value name="SPEED"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                                                <next>
                                                  <block type="smartring_wait_ms">
                                                    <value name="MS"><shadow type="math_number"><field name="NUM">300</field></shadow></value>
                                                    <next>
                                                      <block type="smartring_play_alternate_blink_animation">
                                                        <field name="COLOR1">red</field>
                                                        <field name="COLOR2">blue</field>
                                                        <value name="TIMES"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
                                                        <next>
                                                          <block type="smartring_wait_ms">
                                                            <value name="MS"><shadow type="math_number"><field name="NUM">300</field></shadow></value>
                                                            <next>
                                                              <block type="smartring_play_clear_animation">
                                                                <value name="SPEED"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
                                                              </block>
                                                            </next>
                                                          </block>
                                                        </next>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </next>
                                              </block>
                                            </next>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>

      <block type="smartring_clear_led_buffer" x="40" y="430">
        <next>
          <block type="smartring_set_buffer_led_color">
            <value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            <field name="COLOR">red</field>
            <next>
              <block type="smartring_set_buffer_led_channel">
                <value name="INDEX"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
                <value name="CHANNEL"><shadow type="smartring_rgb_channel"><field name="CHANNEL">g</field></shadow></value>
                <value name="VALUE"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
                <next>
                  <block type="smartring_set_buffer_led_rgb">
                    <value name="INDEX"><shadow type="math_number"><field name="NUM">3</field></shadow></value>
                    <value name="R"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
                    <value name="G"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
                    <value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                    <next>
                      <block type="smartring_show_led_buffer" />
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </xml>
  `;

  const xmlDom = Blockly.utils.xml.textToDom(xmlText);
  Blockly.Xml.domToWorkspace(xmlDom, workspace);

  updateCodePreview();
  switchWorkspaceTab('blocks');
  outputArea.textContent = '已載入 SR-A01 範例：程式中止、陣列位移動畫 DEMO 與暫存陣列 RGB 仿作。';
}

function getStudentProfile() {
  return {
    className: studentClass.value.trim(),
    seatNumber: studentNumber.value.trim(),
    name: studentName.value.trim(),
    courseCode: courseCode.value.trim().toUpperCase(),
    mode: practiceMode.value,
  };
}

function createSafeFileName(text) {
  return String(text)
    .trim()
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function createWorkspaceFileName() {
  const profile = getStudentProfile();

  const parts = [
    profile.courseCode || 'blockly-workspace',
    profile.className,
    profile.seatNumber,
    profile.name,
  ]
    .map(createSafeFileName)
    .filter(Boolean);

  return `${parts.join('_') || 'blockly-workspace'}.blockly.xml`;
}

function saveWorkspaceToFile() {
  if (!workspace) return;

  const xmlDom = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  const blob = new Blob([xmlText], { type: 'text/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const fileName = createWorkspaceFileName();

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  outputArea.textContent = `已下載積木檔案：${fileName}`;
}

function requestLoadWorkspaceFromFile() {
  if (!workspace) return;
  blockFileInput.value = '';
  blockFileInput.click();
}

function loadWorkspaceFromFile(file) {
  if (!file || !workspace) return;

  const confirmed = window.confirm(
    '載入積木檔會取代目前工作區內容，確定要繼續嗎？'
  );

  if (!confirmed) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const xmlText = String(reader.result || '');
      const xmlDom = Blockly.utils.xml.textToDom(xmlText);

      workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, workspace);

      updateCodePreview();
      switchWorkspaceTab('blocks');
      outputArea.textContent = `已載入積木檔案：${file.name}`;
    } catch (error) {
      outputArea.textContent = `載入積木檔案失敗：\n${error.message}`;
    }
  };

  reader.onerror = () => {
    outputArea.textContent = '讀取檔案失敗，請重新選擇檔案。';
  };

  reader.readAsText(file, 'utf-8');
}

function updateModeStatus() {
  const modeText =
    practiceMode.value === 'competition' ? '競賽模式' : '學習模式';

  modeStatus.textContent = `目前模式：${modeText}`;

  if (practiceMode.value === 'competition') {
    writeOutput('已切換為競賽模式：未來測試結果將可上傳 Google Sheet。');
  } else {
    writeOutput('已切換為學習模式：目前只在本機顯示測試結果。');
  }
}

function renderCourseInfo(course) {
  taskInfo.innerHTML = `
    <h2>${course.title}</h2>
    <p><strong>課程代碼：</strong>${course.id}</p>
    <p><strong>任務類型：</strong>${course.type}</p>
    <p><strong>適用程度：</strong>${course.level}</p>
    <p><strong>學習目標：</strong>${course.goal}</p>
    <p class="summary-note">完整任務說明請按右上角「查看完整任務」。</p>
  `;

  taskModalTitle.textContent = course.title;
  taskModalBody.innerHTML = `
    <section class="modal-section">
      <h3>課程基本資料</h3>
      <p><strong>課程代碼：</strong>${course.id}</p>
      <p><strong>任務類型：</strong>${course.type}</p>
      <p><strong>適用程度：</strong>${course.level}</p>
    </section>

    <section class="modal-section">
      <h3>學習目標</h3>
      <p>${course.goal}</p>
    </section>

    <section class="modal-section">
      <h3>任務說明</h3>
      <p>${course.description}</p>
    </section>

    <section class="modal-section">
      <h3>操作說明</h3>
      <p>${course.operation}</p>
    </section>

    <section class="modal-section">
      <h3>積木限制 / 建議</h3>
      <p>${course.blockLimit}</p>
    </section>

    <section class="modal-section">
      <h3>SmartRing 要求</h3>
      <p>${course.smartRingRequirement}</p>
    </section>

    <section class="modal-section">
      <h3>評分方式</h3>
      <p>${course.scoring}</p>
    </section>

    <section class="modal-section">
      <h3>教學提示</h3>
      <p>${course.hint}</p>
    </section>
  `;
}

function loadCourse() {
  const profile = getStudentProfile();
  const code = profile.courseCode;

  if (!code) {
    outputArea.textContent = '請先輸入課程代碼，例如 SR-B01。';
    courseCode.focus();
    return;
  }

  const course = demoCourses[code];

  if (!course) {
    currentCourse = null;
    taskInfo.innerHTML = `
      <h2>找不到課程：${code}</h2>
      <p>目前 MVP-B07 只內建示範課程：</p>
      <ul>
        <li>SR-B01：SmartRing 基礎任務</li>
        <li>SR-A01：SmartRing 陣列任務</li>
        <li>JS-B01：Blockly 解題任務</li>
      </ul>
    `;

    taskModalTitle.textContent = '找不到課程';
    taskModalBody.innerHTML = `
      <p>找不到課程代碼：${code}</p>
      <p>請先測試以下示範課程：</p>
      <ul>
        <li>SR-B01</li>
        <li>SR-A01</li>
        <li>JS-B01</li>
      </ul>
    `;

    outputArea.textContent = `找不到課程代碼：${code}`;
    return;
  }

  currentCourse = course;
  renderCourseInfo(course);

  if (course.id === 'SR-B01') {
    loadSmartRingSample();
  }

  if (course.id === 'SR-A01') {
    loadSmartRingArraySample();
  }

  outputArea.textContent = `已載入課程：${course.id}｜${course.title}`;
}

async function testTask() {
  const profile = getStudentProfile();

  if (!currentCourse) {
    outputArea.textContent = '請先輸入課程代碼並按下「載入課程」。';
    return;
  }

  await runUserCode();

  const modeText =
    profile.mode === 'competition' ? '競賽模式' : '學習模式';

  writeOutput('');
  writeOutput('---');
  writeOutput(`任務測試模式：${modeText}`);
  writeOutput(`課程代碼：${currentCourse.id}`);
  writeOutput('MVP-B13 測試結果：已執行目前 Blockly 程式，請確認 SmartRing LED 顯示、動畫或中止控制是否符合任務。');
  writeOutput('若暫存陣列沒有顯示，請檢查韌體 showBuffer 是否接收 leds 陣列欄位。');
}

function submitScore() {
  const profile = getStudentProfile();

  if (profile.mode !== 'competition') {
    outputArea.textContent =
      '目前是學習模式，不會上傳成績。請切換為競賽模式後再試。';
    return;
  }

  if (!profile.className || !profile.seatNumber || !profile.name) {
    outputArea.textContent =
      '競賽模式上傳前，請先填寫班級、座號與姓名。';
    return;
  }

  if (!currentCourse) {
    outputArea.textContent = '請先載入課程後再上傳成績。';
    return;
  }

  outputArea.textContent = [
    'MVP-B10：成績上傳介面測試',
    `班級：${profile.className}`,
    `座號：${profile.seatNumber}`,
    `姓名：${profile.name}`,
    `課程代碼：${currentCourse.id}`,
    '狀態：尚未接 Google Sheet，後續 MVP-J02 會建置正式上傳功能。',
  ].join('\n');
}

function openTaskModal() {
  taskModal.classList.add('active');
  taskModal.setAttribute('aria-hidden', 'false');
}

function closeTaskModal() {
  taskModal.classList.remove('active');
  taskModal.setAttribute('aria-hidden', 'true');
}

function setSmartRingConnectedUi(isConnected, message) {
  const text = message || (isConnected ? 'SmartRing 已連線' : 'SmartRing 尚未連線');

  smartRingStatus.textContent = text;
  serialStatusValue.textContent = isConnected ? '已連線' : '尚未連線';

  smartRingStatus.classList.toggle('connected', isConnected);
  serialStatusValue.classList.toggle('connected', isConnected);

  btnConnectSmartRing.disabled = isConnected;
  btnDisconnectSmartRing.disabled = !isConnected;
  btnTestLedRed.disabled = !isConnected;
  btnTestLedClear.disabled = !isConnected;
}

async function connectSmartRing() {
  if (!smartRingRuntime.isSupported()) {
    outputArea.textContent =
      '此瀏覽器不支援 WebSerial。請使用 Chrome 或 Edge，並確認網頁在 localhost 或 HTTPS 環境執行。';
    return;
  }

  try {
    outputArea.textContent = '正在開啟 SmartRing 序列埠選擇視窗...';
    await smartRingRuntime.connect();
  } catch (error) {
    outputArea.textContent = `SmartRing 連線失敗：\n${error.message}`;
    setSmartRingConnectedUi(false, 'SmartRing：連線失敗');
  }
}

async function disconnectSmartRing() {
  try {
    await smartRingRuntime.disconnect();
    buttonStateValue.textContent = '尚無資料';
    rawStateValue.textContent = '尚未收到 ESP8266 資料。';
    lastCommandValue.textContent = '尚未送出 LED 指令。';
    outputArea.textContent = 'SmartRing 已斷開連線。';
  } catch (error) {
    outputArea.textContent = `SmartRing 斷線時發生錯誤：\n${error.message}`;
  }
}

async function testLedRed() {
  try {
    await smartRingRuntime.setLedColor(1, 'red');
    renderLastCommand(smartRingRuntime.getLastCommand());
    outputArea.textContent = '已送出測試指令：設定第 1 顆 LED 為紅色。';
  } catch (error) {
    outputArea.textContent = `送出 LED 測試指令失敗：\n${error.message}`;
  }
}

function renderLastCommand(payload) {
  if (!lastCommandValue) return;

  if (!payload) {
    lastCommandValue.textContent = '尚未送出 LED 指令。';
    return;
  }

  lastCommandValue.textContent = JSON.stringify(payload);
}

async function testLedClear() {
  try {
    await smartRingRuntime.clearLeds();
    renderLastCommand(smartRingRuntime.getLastCommand());
    outputArea.textContent = '已送出測試指令：清除所有 LED。';
  } catch (error) {
    outputArea.textContent = `送出清除 LED 指令失敗：\n${error.message}`;
  }
}

function bindSmartRingRuntimeEvents() {
  smartRingRuntime.addEventListener('status', (event) => {
    const { connected, message } = event.detail;
    setSmartRingConnectedUi(connected, message);
    writeOutput(message);
  });

  smartRingRuntime.addEventListener('data', (event) => {
    const { ok, rawText, buttonText, message } = event.detail;

    buttonStateValue.textContent = buttonText || '尚無資料';
    rawStateValue.textContent = rawText || '尚未收到 ESP8266 資料。';

    if (!ok && message) {
      writeOutput(message);
    }
  });

  smartRingRuntime.addEventListener('command', (event) => {
    const { payload } = event.detail;
    renderLastCommand(payload);
  });

  smartRingRuntime.addEventListener('error', (event) => {
    const { message } = event.detail;
    setSmartRingConnectedUi(false, 'SmartRing：連線錯誤');
    writeOutput(`SmartRing 錯誤：${message}`);
  });

  smartRingRuntime.addEventListener('log', (event) => {
    const { message } = event.detail;
    console.log('[SmartRing]', message);
  });
}

function bindEvents() {
  btnConnectSmartRing.addEventListener('click', connectSmartRing);
  btnDisconnectSmartRing.addEventListener('click', disconnectSmartRing);
  btnTestLedRed.addEventListener('click', testLedRed);
  btnTestLedClear.addEventListener('click', testLedClear);

  btnLoadSample.addEventListener('click', loadSample);
  btnRun.addEventListener('click', runUserCode);
  btnStop.addEventListener('click', stopUserCode);
  btnClear.addEventListener('click', clearWorkspace);
  btnSaveBlocks.addEventListener('click', saveWorkspaceToFile);
  btnLoadBlocks.addEventListener('click', requestLoadWorkspaceFromFile);

  blockFileInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    loadWorkspaceFromFile(file);
  });

  btnCopyCode.addEventListener('click', copyCode);
  btnClearOutput.addEventListener('click', clearOutput);

  btnLoadCourse.addEventListener('click', loadCourse);
  btnTestTask.addEventListener('click', testTask);
  btnSubmitScore.addEventListener('click', submitScore);
  practiceMode.addEventListener('change', updateModeStatus);

  tabBlocks.addEventListener('click', () => switchWorkspaceTab('blocks'));
  tabCode.addEventListener('click', () => switchWorkspaceTab('code'));

  btnOpenTaskModal.addEventListener('click', openTaskModal);
  btnCloseTaskModal.addEventListener('click', closeTaskModal);

  taskModal.addEventListener('click', (event) => {
    if (event.target === taskModal) {
      closeTaskModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeTaskModal();
    }
  });

  window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
  });
}

function initStatus() {
  modeStatus.textContent = '目前模式：學習模式';
  setSmartRingConnectedUi(false, 'SmartRing：尚未連線');
  serialStatusValue.textContent = '尚未連線';
  buttonStateValue.textContent = '尚無資料';
  rawStateValue.textContent = '尚未收到 ESP8266 資料。';
  renderLastCommand(null);
  setProgramRunningUi(false);
}

initBlockly();
bindEvents();
bindSmartRingRuntimeEvents();
initStatus();