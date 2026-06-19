import './style.css';

import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import * as ZhHant from 'blockly/msg/zh-hant';

import { competitionToolbox } from './blockly/toolbox.js';
import { registerSmartRingBlocks } from './blockly/smartring-blocks.js';
import { smartRingRuntime } from './smartring/runtime.js';
import {
  getAvailableCourseGroupListHtml,
  getCourseGroup,
  getDefaultTask,
  getTaskById,
} from './courses/index.js';

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
const taskSelector = document.getElementById('taskSelector');

const btnLoadCourse = document.getElementById('btnLoadCourse');
const btnTestTask = document.getElementById('btnTestTask');
const btnSubmitScore = document.getElementById('btnSubmitScore');

const taskInfo = document.getElementById('taskInfo');
const sidePanel = document.querySelector('.side-panel');
const taskPanelHeading = document.getElementById('taskPanelHeading');
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
let currentCourseGroup = null;
let currentTask = null;
let isUserProgramRunning = false;
let hasCompetitionAssessmentResult = false;


function isCompetitionMode() {
  return practiceMode.value === 'competition';
}

function isProgrammingProblemTask(task = currentTask, courseGroup = currentCourseGroup) {
  return (
    String(courseGroup?.id || '').startsWith('JS') ||
    String(task?.type || '').includes('解題')
  );
}

function updateSubmitScoreVisibility() {
  if (!btnSubmitScore) return;

  const shouldEnable = Boolean(
    isCompetitionMode() &&
      currentCourseGroup &&
      currentTask &&
      hasCompetitionAssessmentResult
  );

  btnSubmitScore.hidden = false;
  btnSubmitScore.disabled = !shouldEnable;
}

function resetCompetitionAssessmentResult() {
  hasCompetitionAssessmentResult = false;
  updateSubmitScoreVisibility();
}

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
                                                              <block type="smartring_play_breathing_animation">
                                                                <field name="COLOR">purple</field>
                                                                <value name="TIMES"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
                                                                <next>
                                                                  <block type="smartring_wait_ms">
                                                                    <value name="MS"><shadow type="math_number"><field name="NUM">300</field></shadow></value>
                                                                    <next>
                                                                      <block type="smartring_play_rainbow_animation">
                                                                        <value name="SPEED"><shadow type="math_number"><field name="NUM">60</field></shadow></value>
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
  outputArea.textContent = '已載入 SR-A01 範例：程式中止、陣列位移動畫、進階視覺效果 DEMO 與暫存陣列 RGB 仿作。';
}

function getStudentProfile() {
  return {
    className: studentClass.value.trim(),
    seatNumber: studentNumber.value.trim(),
    name: studentName.value.trim(),
    courseCode: courseCode.value.trim().toUpperCase(),
    taskId: taskSelector.value,
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
    profile.taskId || profile.courseCode || 'SmartRing',
    profile.className,
    profile.seatNumber,
    profile.name,
  ]
    .map(createSafeFileName)
    .filter(Boolean);

  return `${parts.join('_') || 'SmartRing'}.blockly.xml`;
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

function loadCourseStarter(course) {
  if (!workspace || !course?.starterXml) {
    return false;
  }

  try {
    workspace.clear();

    const xmlDom = Blockly.utils.xml.textToDom(course.starterXml);
    Blockly.Xml.domToWorkspace(xmlDom, workspace);

    updateCodePreview();
    switchWorkspaceTab('blocks');

    outputArea.textContent =
      course.starterMessage || `已載入 ${course.id} 起始積木。`;

    return true;
  } catch (error) {
    outputArea.textContent = `載入 ${course.id} 起始積木失敗：\n${error.message}`;
    return false;
  }
}

function renderOptionalTaskSection(title, content) {
  if (!content) {
    return '';
  }

  return `
    <section class="modal-section">
      <h3>${title}</h3>
      <p>${content}</p>
    </section>
  `;
}

function stripPreTag(content) {
  return String(content || '')
    .replace(/^\s*<pre>/i, '')
    .replace(/<\/pre>\s*$/i, '')
    .trim();
}

function escapeHtml(content) {
  return String(content || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderProblemTextSection(title, content) {
  if (!content) return '';

  return `
    <section class="problem-section modal-section">
      <h3>${title}</h3>
      <p>${escapeHtml(content)}</p>
    </section>
  `;
}

function renderProblemPreSection(title, content) {
  if (!content) return '';

  return `
    <section class="problem-section modal-section">
      <h3>${title}</h3>
      <pre class="problem-sample-block">${escapeHtml(stripPreTag(content))}</pre>
    </section>
  `;
}

function renderProblemTaskContent(task, courseGroup, { includeMeta = true } = {}) {
  const problemStatement = task.problemStatement || task.description || '尚未建立題目內容。';
  const inputDescription = task.inputDescription || '';
  const outputDescription = task.outputDescription || '';
  const sampleInput = task.sampleInput || '';
  const sampleOutput = task.sampleOutput || '';
  const problemNote = task.problemNote || task.hint || '';

  return `
    <article class="problem-task-content">
      ${
        includeMeta
          ? `
            <section class="problem-section modal-section">
              <h3>題目資料</h3>
              <p><strong>課程組：</strong>${courseGroup.id}｜${courseGroup.title}</p>
              <p><strong>題目代碼：</strong>${task.id}</p>
              <p><strong>題目名稱：</strong>${task.title}</p>
            </section>
          `
          : `
            <div class="problem-code-badge">${task.id}</div>
          `
      }
      ${renderProblemTextSection('題目說明', problemStatement)}
      ${renderProblemTextSection('輸入說明', inputDescription)}
      ${renderProblemTextSection('輸出說明', outputDescription)}
      ${renderProblemPreSection('範例輸入', sampleInput)}
      ${renderProblemPreSection('範例輸出', sampleOutput)}
      ${renderProblemTextSection('補充說明', problemNote)}
    </article>
  `;
}


function updateModeStatus() {
  const modeText = isCompetitionMode() ? '競賽模式' : '學習模式';

  modeStatus.textContent = `目前模式：${modeText}`;
  resetCompetitionAssessmentResult();

  if (isCompetitionMode()) {
    writeOutput('已切換為競賽模式：請先載入課程並按「測試任務」，產生評分結果後才會啟用「上傳成績」。');
  } else {
    writeOutput('已切換為學習模式：目前只在本機顯示測試結果，「上傳成績」會維持灰色停用。');
  }
}

function renderProblemTaskModal(task, courseGroup) {
  taskModalTitle.textContent = `${task.id}｜${task.title}`;
  taskModalBody.innerHTML = renderProblemTaskContent(task, courseGroup, {
    includeMeta: true,
  });
}

function renderLearningTaskModal(task, courseGroup) {
  taskModalTitle.textContent = `${task.id}｜${task.title}`;
  taskModalBody.innerHTML = `
    <section class="modal-section">
      <h3>課程組資料</h3>
      <p><strong>課程組代碼：</strong>${courseGroup.id}</p>
      <p><strong>課程組名稱：</strong>${courseGroup.title}</p>
      <p><strong>課程組說明：</strong>${courseGroup.description}</p>
    </section>

    <section class="modal-section">
      <h3>子任務基本資料</h3>
      <p><strong>子任務代碼：</strong>${task.id}</p>
      <p><strong>任務類型：</strong>${task.type}</p>
      <p><strong>適用程度：</strong>${task.level}</p>
    </section>

    <section class="modal-section">
      <h3>學習目標</h3>
      <p>${task.goal}</p>
    </section>

    <section class="modal-section">
      <h3>任務說明</h3>
      <p>${task.description}</p>
    </section>

    ${renderOptionalTaskSection('DEMO 觀察', task.demoObserve)}
    ${renderOptionalTaskSection('仿作任務', task.practiceTask)}
    ${renderOptionalTaskSection('函式整理', task.functionTask)}
    ${renderOptionalTaskSection('延伸挑戰', task.challenge)}

    <section class="modal-section">
      <h3>操作說明</h3>
      <p>${task.operation}</p>
    </section>

    <section class="modal-section">
      <h3>積木限制 / 建議</h3>
      <p>${task.blockLimit}</p>
    </section>

    <section class="modal-section">
      <h3>SmartRing 要求</h3>
      <p>${task.smartRingRequirement}</p>
    </section>

    <section class="modal-section">
      <h3>評分方式</h3>
      <p>${task.scoring}</p>
    </section>

    <section class="modal-section">
      <h3>教學提示</h3>
      <p>${task.hint}</p>
    </section>
  `;
}

function renderTaskInfo(task, courseGroup) {
  const isProblemTask = isProgrammingProblemTask(task, courseGroup);

  sidePanel?.classList.toggle('programming-problem', isProblemTask);

  if (taskPanelHeading) {
    taskPanelHeading.textContent = isProblemTask ? '競賽題目' : '課程任務摘要';
  }

  if (isProblemTask) {
    taskInfo.innerHTML = `
      <div class="problem-task-fixed-panel">
        <h2>${task.title}</h2>
        <p class="problem-fixed-note">此區會固定顯示目前題目，方便解題時閱讀、比對與複製範例資料。</p>
        ${renderProblemTaskContent(task, courseGroup, { includeMeta: false })}
      </div>
    `;
    renderProblemTaskModal(task, courseGroup);
    return;
  }

  taskInfo.innerHTML = `
    <h2>${task.title}</h2>
    <p><strong>課程組：</strong>${courseGroup.id}｜${courseGroup.title}</p>
    <p><strong>子任務代碼：</strong>${task.id}</p>
    <p><strong>任務類型：</strong>${task.type}</p>
    <p><strong>適用程度：</strong>${task.level}</p>
    <p><strong>學習目標：</strong>${task.goal}</p>
    <p class="summary-note">完整任務說明請按右上角「查看完整任務」。</p>
  `;

  renderLearningTaskModal(task, courseGroup);
}

function renderTaskSelector(courseGroup, selectedTaskId) {
  taskSelector.innerHTML = courseGroup.tasks
    .map((task) => {
      const selected = task.id === selectedTaskId ? ' selected' : '';
      return `<option value="${task.id}"${selected}>${task.id}｜${task.title}</option>`;
    })
    .join('');

  taskSelector.disabled = false;
}

function resetTaskSelector() {
  taskSelector.innerHTML = '<option value="">請先載入課程組</option>';
  taskSelector.disabled = true;
}

function loadTask(task, courseGroup, { shouldLoadStarter = true } = {}) {
  if (!task || !courseGroup) return;

  resetCompetitionAssessmentResult();
  currentTask = task;
  renderTaskSelector(courseGroup, task.id);
  renderTaskInfo(task, courseGroup);

  if (shouldLoadStarter) {
    const hasStarter = loadCourseStarter(task);

    if (!hasStarter) {
      outputArea.textContent = `已載入子任務：${task.id}｜${task.title}`;
    }
  }
}

function loadCourse() {
  const profile = getStudentProfile();
  const code = profile.courseCode;

  if (!code) {
    outputArea.textContent = '請先輸入課程組代碼，例如 SRB00、SRA00、SRF00、JSB00。';
    courseCode.focus();
    return;
  }

  const courseGroup = getCourseGroup(code);

  if (!courseGroup) {
    currentCourseGroup = null;
    currentTask = null;
    resetCompetitionAssessmentResult();
    resetTaskSelector();
    sidePanel?.classList.remove('programming-problem');

    if (taskPanelHeading) {
      taskPanelHeading.textContent = '課程任務摘要';
    }

    taskInfo.innerHTML = `
      <h2>找不到課程組：${code}</h2>
      <p>目前內建課程組：</p>
      <ul>
        ${getAvailableCourseGroupListHtml()}
      </ul>
    `;

    taskModalTitle.textContent = '找不到課程組';
    taskModalBody.innerHTML = `
      <p>找不到課程組代碼：${code}</p>
      <p>請先測試以下內建課程組：</p>
      <ul>
        ${getAvailableCourseGroupListHtml()}
      </ul>
    `;

    outputArea.textContent = `找不到課程組代碼：${code}`;
    return;
  }

  currentCourseGroup = courseGroup;
  const defaultTask = getDefaultTask(courseGroup);

  if (!defaultTask) {
    currentTask = null;
    resetCompetitionAssessmentResult();
    resetTaskSelector();
    sidePanel?.classList.remove('programming-problem');

    if (taskPanelHeading) {
      taskPanelHeading.textContent = '課程任務摘要';
    }

    outputArea.textContent = `課程組 ${courseGroup.id} 尚未建立子任務。`;
    return;
  }

  loadTask(defaultTask, courseGroup);
}

function changeTask() {
  if (!currentCourseGroup) return;

  const task = getTaskById(currentCourseGroup, taskSelector.value);

  if (!task) {
    outputArea.textContent = `找不到子任務：${taskSelector.value}`;
    return;
  }

  loadTask(task, currentCourseGroup);
}

async function testTask() {
  const profile = getStudentProfile();

  if (!currentTask) {
    outputArea.textContent = '請先輸入課程組代碼並按下「載入課程」。';
    return;
  }

  await runUserCode();

  const modeText = isCompetitionMode() ? '競賽模式' : '學習模式';
  const taskLabel = isProgrammingProblemTask() ? '題目代碼' : '子任務代碼';

  writeOutput('');
  writeOutput('---');
  writeOutput(`任務測試模式：${modeText}`);
  writeOutput(`課程組代碼：${currentCourseGroup.id}`);
  writeOutput(`${taskLabel}：${currentTask.id}`);

  if (isProgrammingProblemTask()) {
    writeOutput('MVP-J01 測試結果：已執行目前 Blockly 程式，請先比對輸出結果是否符合題目要求。');
  } else {
    writeOutput('MVP-J01 測試結果：已執行目前 Blockly 程式，請依任務要求確認 DEMO 觀察、暫存陣列仿作或函式整理是否符合目標。');
    writeOutput('若程式無法停止，請確認迴圈中有 SmartRing.wait；若暫存陣列沒有顯示，請檢查韌體 showBuffer 是否接收 leds 陣列欄位。');
  }

  if (isCompetitionMode()) {
    hasCompetitionAssessmentResult = true;
    writeOutput('競賽評分結果：MVP-J01 已產生本機測試結果，會啟用「上傳成績」，可進行介面流程測試。');
  } else {
    hasCompetitionAssessmentResult = false;
  }

  updateSubmitScoreVisibility();
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

  if (!currentTask) {
    outputArea.textContent = '請先載入課程組與子任務後再上傳成績。';
    return;
  }

  if (!hasCompetitionAssessmentResult) {
    outputArea.textContent = '請先按「測試任務」並產生評分結果後，再上傳成績。';
    updateSubmitScoreVisibility();
    return;
  }

  outputArea.textContent = [
    'MVP-J01：成績上傳介面測試',
    `班級：${profile.className}`,
    `座號：${profile.seatNumber}`,
    `姓名：${profile.name}`,
    `課程組代碼：${currentCourseGroup.id}`,
    `子任務代碼：${currentTask.id}`,
    '狀態：尚未接 Google Sheet，後續 MVP-J03 / J04 會建置正式測資與評分功能。',
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
  taskSelector.addEventListener('change', changeTask);
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
  resetTaskSelector();
}

initBlockly();
bindEvents();
bindSmartRingRuntimeEvents();
initStatus();