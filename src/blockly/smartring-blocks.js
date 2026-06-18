import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

const SMART_RING_BUTTONS = [
  ['BTN1 / F', '0'],
  ['BTN2 / B', '1'],
  ['BTN3 / L', '2'],
  ['BTN4 / R', '3'],
  ['BTN0 / U', '4'],
  ['BTN5 / D', '5'],
  ['BTN6 / O', '6'],
  ['BTN7 / C', '7'],
];

const SMART_RING_COLORS = [
  ['紅色', 'red'],
  ['綠色', 'green'],
  ['藍色', 'blue'],
  ['黃色', 'yellow'],
  ['紫色', 'purple'],
  ['青色', 'cyan'],
  ['白色', 'white'],
  ['關閉', 'off'],
];

Blockly.Blocks.smartring_is_connected = {
  init() {
    this.appendDummyInput().appendField('SmartRing 已連線？');
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip('判斷 SmartRingController 是否已透過 WebSerial 連線。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_is_connected = function () {
  return ['SmartRing.isConnected()', Order.FUNCTION_CALL];
};

Blockly.Blocks.smartring_button_pressed = {
  init() {
    this.appendDummyInput()
      .appendField('SmartRing 按鈕')
      .appendField(new Blockly.FieldDropdown(SMART_RING_BUTTONS), 'BUTTON')
      .appendField('被按下？');
    this.setOutput(true, 'Boolean');
    this.setColour(200);
    this.setTooltip('判斷指定 SmartRing 按鈕目前是否被按下。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_button_pressed = function (block) {
  const buttonIndex = block.getFieldValue('BUTTON');
  return [`SmartRing.isButtonPressed(${buttonIndex})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.smartring_set_led_color = {
  init() {
    this.appendValueInput('INDEX')
      .setCheck('Number')
      .appendField('設定 SmartRing 第');
    this.appendDummyInput()
      .appendField('顆 LED 顏色為')
      .appendField(new Blockly.FieldDropdown(SMART_RING_COLORS), 'COLOR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('設定 SmartRing 指定編號 LED 的顏色。LED 編號建議使用 0 到 11。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_set_led_color = function (block, generator) {
  const indexCode =
    generator.valueToCode(block, 'INDEX', Order.NONE) || '0';
  const color = block.getFieldValue('COLOR');

  return `await SmartRing.setLedColor(${indexCode}, "${color}");\n`;
};

Blockly.Blocks.smartring_clear_leds = {
  init() {
    this.appendDummyInput().appendField('清除 SmartRing 所有 LED');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('關閉 SmartRing 上所有 LED。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_clear_leds = function () {
  return 'await SmartRing.clearLeds();\n';
};

Blockly.Blocks.smartring_wait_ms = {
  init() {
    this.appendValueInput('MS')
      .setCheck('Number')
      .appendField('等待');
    this.appendDummyInput().appendField('毫秒');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('讓程式等待指定毫秒數，適合搭配 LED 動畫。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_wait_ms = function (block, generator) {
  const msCode = generator.valueToCode(block, 'MS', Order.NONE) || '100';
  return `await SmartRing.wait(${msCode});\n`;
};

export function registerSmartRingBlocks() {
  // 匯入本檔時 Blockly.Blocks 與 generator 已完成註冊。
}