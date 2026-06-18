import { SmartRingSerial } from './serial.js';
import { createJsonLine, formatButtonState, parseSmartRingLine } from './protocol.js';

const LED_COUNT = 12;

const LED_COLOR_TABLE = {
  red: { r: 255, g: 0, b: 0 },
  green: { r: 0, g: 255, b: 0 },
  blue: { r: 0, g: 0, b: 255 },
  yellow: { r: 255, g: 180, b: 0 },
  purple: { r: 180, g: 0, b: 255 },
  cyan: { r: 0, g: 180, b: 255 },
  white: { r: 255, g: 255, b: 255 },
  off: { r: 0, g: 0, b: 0 },
};

function cloneColor(color) {
  return {
    r: Number(color?.r) || 0,
    g: Number(color?.g) || 0,
    b: Number(color?.b) || 0,
  };
}

function createEmptyLedBuffer() {
  return Array.from({ length: LED_COUNT }, () => cloneColor(LED_COLOR_TABLE.off));
}

class SmartRingRuntime extends EventTarget {
  constructor() {
    super();

    this.serial = null;
    this.connected = false;
    this.lastState = null;
    this.lastCommand = null;
    this.ledBuffer = createEmptyLedBuffer();
  }

  isSupported() {
    return 'serial' in navigator;
  }

  isConnected() {
    return this.connected;
  }

  getLastState() {
    return this.lastState;
  }

  getLastCommand() {
    return this.lastCommand;
  }

  getButtons() {
    return this.lastState?.buttons || [];
  }

  isButtonPressed(buttonIndex) {
    const index = Number(buttonIndex);
    const buttons = this.getButtons();

    return Boolean(buttons[index]);
  }

  async connect() {
    if (this.connected) {
      this.emitStatus('SmartRing 已連線。');
      return;
    }

    this.serial = new SmartRingSerial({
      baudRate: 115200,
      onOpen: () => {
        this.connected = true;
        this.emitStatus('SmartRing 已連線。');
      },
      onClose: () => {
        this.connected = false;
        this.emitStatus('SmartRing 尚未連線。');
      },
      onLine: (line) => {
        this.handleIncomingLine(line);
      },
      onError: (error) => {
        this.emitError(error);
      },
      onLog: (message) => {
        this.emitLog(message);
      },
    });

    await this.serial.connect();
  }

  async disconnect() {
    if (!this.serial) {
      this.connected = false;
      this.emitStatus('SmartRing 尚未連線。');
      return;
    }

    await this.serial.disconnect();

    this.connected = false;
    this.serial = null;
    this.emitStatus('SmartRing 尚未連線。');
  }

  async sendJson(payload) {
    if (!this.serial || !this.connected) {
      throw new Error('SmartRing 尚未連線，無法送出指令。');
    }

    this.lastCommand = payload;
    this.emitCommand(payload);

    await this.serial.writeLine(createJsonLine(payload));
  }

  async sendCommand(commandName, payload = {}) {
    const commandPayload = {
      cmd: commandName,
      ...payload,
    };

    await this.sendJson(commandPayload);
  }

  getLedColorPayload(colorName) {
    return cloneColor(LED_COLOR_TABLE[colorName] || LED_COLOR_TABLE.off);
  }

  normalizeLedNumber(ledNumber) {
    const ledIndex = Number(ledNumber);

    if (!Number.isInteger(ledIndex) || ledIndex < 1 || ledIndex > LED_COUNT) {
      throw new Error(`LED 編號必須是 1 到 ${LED_COUNT} 的整數。`);
    }

    return ledIndex;
  }

  normalizeSteps(steps) {
    const value = Math.floor(Math.abs(Number(steps) || 0));

    return value % LED_COUNT;
  }

  async setLedColor(ledNumber, colorName) {
    const ledIndex = this.normalizeLedNumber(ledNumber);
    const color = this.getLedColorPayload(colorName);

    await this.sendCommand('setLed', {
      index: ledIndex,
      color: colorName,
      r: color.r,
      g: color.g,
      b: color.b,
    });

    this.emitLog(`設定第 ${ledIndex} 顆 LED 為 ${colorName}`);
  }

  async clearLeds() {
    await this.sendCommand('clearLeds');

    this.emitLog('清除所有 LED');
  }

  setBufferLedColor(ledNumber, colorName) {
    const ledIndex = this.normalizeLedNumber(ledNumber);
    const color = this.getLedColorPayload(colorName);

    this.ledBuffer[ledIndex - 1] = color;
    this.emitLog(`設定暫存陣列第 ${ledIndex} 顆 LED 為 ${colorName}`);
  }

  clearLedBuffer() {
    this.ledBuffer = createEmptyLedBuffer();
    this.emitLog('清除 LED 暫存陣列');
  }

  getLedBuffer() {
    return this.ledBuffer.map((color) => cloneColor(color));
  }

  setOddBufferLeds(colorName) {
    const color = this.getLedColorPayload(colorName);

    for (let index = 0; index < LED_COUNT; index += 1) {
      const ledNumber = index + 1;

      if (ledNumber % 2 === 1) {
        this.ledBuffer[index] = cloneColor(color);
      }
    }

    this.emitLog(`設定暫存陣列奇數燈為 ${colorName}`);
  }

  setEvenBufferLeds(colorName) {
    const color = this.getLedColorPayload(colorName);

    for (let index = 0; index < LED_COUNT; index += 1) {
      const ledNumber = index + 1;

      if (ledNumber % 2 === 0) {
        this.ledBuffer[index] = cloneColor(color);
      }
    }

    this.emitLog(`設定暫存陣列偶數燈為 ${colorName}`);
  }

  shiftLedBufferLeft(steps = 1) {
    const moveSteps = this.normalizeSteps(steps);

    if (moveSteps === 0) {
      this.emitLog('暫存陣列左移 0 格');
      return;
    }

    const nextBuffer = createEmptyLedBuffer();

    for (let index = LED_COUNT - 1; index >= 0; index -= 1) {
      const targetIndex = index + moveSteps;

      if (targetIndex < LED_COUNT) {
        nextBuffer[targetIndex] = cloneColor(this.ledBuffer[index]);
      }
    }

    this.ledBuffer = nextBuffer;
    this.emitLog(`暫存陣列向左移動 ${moveSteps} 格`);
  }

  shiftLedBufferRight(steps = 1) {
    const moveSteps = this.normalizeSteps(steps);

    if (moveSteps === 0) {
      this.emitLog('暫存陣列右移 0 格');
      return;
    }

    const nextBuffer = createEmptyLedBuffer();

    for (let index = 0; index < LED_COUNT; index += 1) {
      const targetIndex = index - moveSteps;

      if (targetIndex >= 0) {
        nextBuffer[targetIndex] = cloneColor(this.ledBuffer[index]);
      }
    }

    this.ledBuffer = nextBuffer;
    this.emitLog(`暫存陣列向右移動 ${moveSteps} 格`);
  }

  async showLedBuffer() {
    await this.sendCommand('showBuffer', {
      leds: this.getLedBuffer(),
    });

    this.emitLog('顯示 LED 暫存陣列到 SmartRing');
  }

  async wait(ms) {
    const delay = Math.max(0, Number(ms) || 0);

    await new Promise((resolve) => {
      window.setTimeout(resolve, delay);
    });
  }

  handleIncomingLine(line) {
    const state = parseSmartRingLine(line);

    if (!state) {
      return;
    }

    if (!state.ok) {
      this.emitData({
        ok: false,
        rawText: state.rawText,
        buttonText: '資料格式錯誤',
        message: state.error,
      });
      return;
    }

    this.lastState = state;

    this.emitData({
      ok: true,
      rawText: state.rawText,
      state,
      buttonText: formatButtonState(state),
      message: '收到 SmartRing 狀態資料。',
    });
  }

  emitStatus(message) {
    this.dispatchEvent(
      new CustomEvent('status', {
        detail: {
          connected: this.connected,
          message,
        },
      })
    );
  }

  emitData(detail) {
    this.dispatchEvent(
      new CustomEvent('data', {
        detail,
      })
    );
  }

  emitCommand(payload) {
    this.dispatchEvent(
      new CustomEvent('command', {
        detail: {
          payload,
          text: JSON.stringify(payload),
        },
      })
    );
  }

  emitError(error) {
    this.dispatchEvent(
      new CustomEvent('error', {
        detail: {
          message: error?.message || String(error),
        },
      })
    );
  }

  emitLog(message) {
    this.dispatchEvent(
      new CustomEvent('log', {
        detail: {
          message,
        },
      })
    );
  }
}

export const smartRingRuntime = new SmartRingRuntime();
