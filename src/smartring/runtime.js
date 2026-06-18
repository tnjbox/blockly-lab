import { SmartRingSerial } from './serial.js';
import { createJsonLine, formatButtonState, parseSmartRingLine } from './protocol.js';

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

class SmartRingRuntime extends EventTarget {
  constructor() {
    super();

    this.serial = null;
    this.connected = false;
    this.lastState = null;
    this.lastCommand = null;
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
    return LED_COLOR_TABLE[colorName] || LED_COLOR_TABLE.off;
  }

  async setLedColor(ledNumber, colorName) {
    const ledIndex = Number(ledNumber);
    const color = this.getLedColorPayload(colorName);

    if (!Number.isInteger(ledIndex) || ledIndex < 1 || ledIndex > 12) {
      throw new Error('LED 編號必須是 1 到 12 的整數。');
    }

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