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
    this.setColour('#0f766e');
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
    this.setColour('#0f766e');
    this.setTooltip('判斷指定的 SmartRing 按鈕是否被按下。');
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
    this.setColour('#0f766e');
    this.setTooltip('設定第 1 到第 12 顆 LED 的顏色，並立即送到 SmartRing。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_set_led_color = function (block, generator) {
  const indexCode = generator.valueToCode(block, 'INDEX', Order.NONE) || '1';
  const color = block.getFieldValue('COLOR');

  return `await SmartRing.setLedColor(${indexCode}, "${color}");\n`;
};

Blockly.Blocks.smartring_clear_leds = {
  init() {
    this.appendDummyInput().appendField('清除 SmartRing 所有 LED');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0f766e');
    this.setTooltip('關閉 SmartRing 上所有 WS2812 LED。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_clear_leds = function () {
  return 'await SmartRing.clearLeds();\n';
};

Blockly.Blocks.smartring_set_buffer_led_color = {
  init() {
    this.appendValueInput('INDEX')
      .setCheck('Number')
      .appendField('設定暫存陣列第');

    this.appendDummyInput()
      .appendField('顆 LED 顏色為')
      .appendField(new Blockly.FieldDropdown(SMART_RING_COLORS), 'COLOR');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('只修改前端 LED 暫存陣列，不會立刻顯示到 SmartRing。LED 編號為 1 到 12。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_set_buffer_led_color = function (block, generator) {
  const indexCode = generator.valueToCode(block, 'INDEX', Order.NONE) || '1';
  const color = block.getFieldValue('COLOR');

  return `SmartRing.setBufferLedColor(${indexCode}, "${color}");\n`;
};

Blockly.Blocks.smartring_clear_led_buffer = {
  init() {
    this.appendDummyInput().appendField('清除暫存陣列');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('清除前端 LED 暫存陣列，需搭配「顯示暫存陣列到 SmartRing」才會更新硬體。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_clear_led_buffer = function () {
  return 'SmartRing.clearLedBuffer();\n';
};

Blockly.Blocks.smartring_show_led_buffer = {
  init() {
    this.appendDummyInput().appendField('顯示暫存陣列到 SmartRing');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('將目前前端 LED 暫存陣列一次送到 SmartRing 顯示。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_show_led_buffer = function () {
  return 'await SmartRing.showLedBuffer();\n';
};

Blockly.Blocks.smartring_shift_led_buffer_left = {
  init() {
    this.appendValueInput('STEPS')
      .setCheck('Number')
      .appendField('暫存陣列向左移動');

    this.appendDummyInput().appendField('格');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('將暫存陣列向左移動。教學定義：LED 1 會移到 LED 2。超出 LED 12 的資料會消失。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_shift_led_buffer_left = function (block, generator) {
  const stepsCode = generator.valueToCode(block, 'STEPS', Order.NONE) || '1';

  return `SmartRing.shiftLedBufferLeft(${stepsCode});\n`;
};

Blockly.Blocks.smartring_shift_led_buffer_right = {
  init() {
    this.appendValueInput('STEPS')
      .setCheck('Number')
      .appendField('暫存陣列向右移動');

    this.appendDummyInput().appendField('格');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('將暫存陣列向右移動。教學定義：LED 12 會移到 LED 11。超出 LED 1 的資料會消失。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_shift_led_buffer_right = function (block, generator) {
  const stepsCode = generator.valueToCode(block, 'STEPS', Order.NONE) || '1';

  return `SmartRing.shiftLedBufferRight(${stepsCode});\n`;
};

Blockly.Blocks.smartring_set_odd_buffer_leds = {
  init() {
    this.appendDummyInput()
      .appendField('設定暫存陣列奇數燈顏色為')
      .appendField(new Blockly.FieldDropdown(SMART_RING_COLORS), 'COLOR');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('設定暫存陣列 LED 1、3、5、7、9、11 的顏色。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_set_odd_buffer_leds = function (block) {
  const color = block.getFieldValue('COLOR');

  return `SmartRing.setOddBufferLeds("${color}");\n`;
};

Blockly.Blocks.smartring_set_even_buffer_leds = {
  init() {
    this.appendDummyInput()
      .appendField('設定暫存陣列偶數燈顏色為')
      .appendField(new Blockly.FieldDropdown(SMART_RING_COLORS), 'COLOR');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#14b8a6');
    this.setTooltip('設定暫存陣列 LED 2、4、6、8、10、12 的顏色。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_set_even_buffer_leds = function (block) {
  const color = block.getFieldValue('COLOR');

  return `SmartRing.setEvenBufferLeds("${color}");\n`;
};

Blockly.Blocks.smartring_wait_ms = {
  init() {
    this.appendValueInput('MS')
      .setCheck('Number')
      .appendField('等待');

    this.appendDummyInput().appendField('毫秒');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0f766e');
    this.setTooltip('讓程式暫停指定毫秒數。');
    this.setHelpUrl('');
  },
};

javascriptGenerator.forBlock.smartring_wait_ms = function (block, generator) {
  const msCode = generator.valueToCode(block, 'MS', Order.NONE) || '100';

  return `await SmartRing.wait(${msCode});\n`;
};

export function registerSmartRingBlocks() {
  // 匯入本檔案時，Blockly.Blocks 與 JavaScript generator 已完成註冊。
}
