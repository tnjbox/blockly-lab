import './style.css';

import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import * as ZhHant from 'blockly/msg/zh-hant';

import { competitionToolbox } from './blockly/toolbox.js';

Blockly.setLocale(ZhHant);

const blocklyDiv = document.getElementById('blocklyDiv');
const codePreview = document.getElementById('codePreview');
const outputArea = document.getElementById('outputArea');

const btnLoadSample = document.getElementById('btnLoadSample');
const btnRun = document.getElementById('btnRun');
const btnClear = document.getElementById('btnClear');
const btnCopyCode = document.getElementById('btnCopyCode');
const btnClearOutput = document.getElementById('btnClearOutput');

let workspace = null;

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

    // geras：接近 Google Blockly 原始方正風格
    // zelos：較圓潤，接近 Scratch / App Inventor 風格
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

function runUserCode() {
  if (!workspace) return;

  clearOutput();

  const code = javascriptGenerator.workspaceToCode(workspace);

  if (!code.trim()) {
    outputArea.textContent = '目前沒有可以執行的程式。';
    return;
  }

  const originalAlert = window.alert;
  const originalConsoleLog = console.log;

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
      `
      "use strict";
      ${code}
      `
    );

    runner(safePrint);

    if (!outputArea.textContent.trim()) {
      outputArea.textContent = '程式執行完成，沒有輸出內容。';
    }
  } catch (error) {
    outputArea.textContent = `程式執行發生錯誤：\n${error.message}`;
  } finally {
    window.alert = originalAlert;
    console.log = originalConsoleLog;
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
  outputArea.textContent = '已載入範例：重複累加分數。';
}

function bindEvents() {
  btnLoadSample.addEventListener('click', loadSample);
  btnRun.addEventListener('click', runUserCode);
  btnClear.addEventListener('click', clearWorkspace);
  btnCopyCode.addEventListener('click', copyCode);
  btnClearOutput.addEventListener('click', clearOutput);

  window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
  });
}

initBlockly();
bindEvents();