import { SmartRingSerial } from './serial.js';
import { createJsonLine, formatButtonState, parseSmartRingLine } from './protocol.js';

class SmartRingRuntime extends EventTarget {
  constructor() {
    super();

    this.serial = null;
    this.connected = false;
    this.lastState = null;
  }

  isSupported() {
    return 'serial' in navigator;
  }

  isConnected() {
    return this.connected;
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

    await this.serial.writeLine(createJsonLine(payload));
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