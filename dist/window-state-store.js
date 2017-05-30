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
const is_window_alive_1 = require("./is-window-alive");
const electron_json_storage_async_1 = require("electron-json-storage-async");
const util_1 = require("util");
const subscriber_1 = require("./subscriber");
exports.WindowStateStore = (win, onError) => {
    const storeKey = `window_${win.id}`;
    const storage = electron_json_storage_async_1.AsyncStore(storeKey);
    onError = onError || ((e) => {
        console.error(e);
    });
    const get = () => {
        return storage.get(storeKey);
    };
    const save = () => __awaiter(this, void 0, void 0, function* () {
        if (!is_window_alive_1.isWindowAlive(win)) {
            return Promise.reject("Window not alive");
        }
        const state = yield get();
        state.fullScreen = win.isFullScreen();
        if (!state.fullScreen) {
            state.bounds = win.getBounds();
        }
        state.devToolsOpened = win.webContents.isDevToolsOpened();
        yield storage.set(storeKey, state);
        win.emit("saved");
        return Promise.resolve();
    });
    const restore = () => {
        return get().then(state => {
            const { bounds, devToolsOpened, fullScreen } = (state || { bounds: null, devToolsOpened: false, fullScreen: false });
            if (!util_1.isNullOrUndefined(bounds) && !fullScreen) {
                win.setBounds(state.bounds);
            }
            if (fullScreen) {
                win.setFullScreen(fullScreen);
            }
            if (devToolsOpened) {
                win.webContents.openDevTools();
            }
        });
    };
    const clear = () => {
        return storage.set(storeKey, {});
    };
    const observer = {
        next: (_key) => __awaiter(this, void 0, void 0, function* () {
            yield save();
        })
    };
    return {
        restore,
        save,
        clear,
        value: get,
        subscribe: () => {
            return subscriber_1.subscriber(observer).subscribe(win);
        },
    };
};
