"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const is_window_alive_1 = require("../is-window-alive");
const create_debug_1 = require("../create-debug");
const storage_1 = require("../storage");
const has_bounds_1 = require("./has-bounds");
const update_state_1 = require("./update-state");
const validate_bounds_1 = require("./validate-bounds");
const is_valid_state_1 = require("./is-valid-state");
const debug = create_debug_1.createDebug("store");
class WindowStateStore extends events_1.EventEmitter {
    constructor(win) {
        super();
        this.win = win;
        this.next = (_key) => __awaiter(this, void 0, void 0, function* () {
            yield this.save()
                .then(() => debug(`after-save: ${_key}`));
        });
        const storeKey = `window_${win.id}`;
        this.getState = () => {
            return storage_1.storage.get(storeKey)
                .catch(e => {
                debug("%e", e.message);
                return {};
            });
        };
        this.save = () => __awaiter(this, void 0, void 0, function* () {
            if (!is_window_alive_1.isWindowAlive(win)) {
                debug("%x", "Window not alive");
                return Promise.resolve();
            }
            const state = {};
            update_state_1.updateState(win, state);
            validate_bounds_1.validateBounds(state);
            if (!is_valid_state_1.isValidState(state))
                return;
            const me = this;
            return storage_1.storage.set(storeKey, state)
                .then(_ => me.emit("saved"));
        });
        this.restore = () => __awaiter(this, void 0, void 0, function* () {
            const state = (yield this.getState());
            const { devToolsOpened, fullScreen, isMaximized } = state;
            if (has_bounds_1.hasBounds(state)) {
                win.setBounds(state.bounds);
            }
            if (isMaximized) {
                win.maximize();
            }
            if (fullScreen) {
                win.setFullScreen(fullScreen);
            }
            if (devToolsOpened) {
                win.webContents.openDevTools();
            }
            this.emit("restored");
        });
        this.clear = () => {
            const me = this;
            return storage_1.storage.set(storeKey, {})
                .then(_ => {
                me.emit("cleared");
            });
        };
    }
    get window() {
        return this.win;
    }
}
exports.WindowStateStore = WindowStateStore;
