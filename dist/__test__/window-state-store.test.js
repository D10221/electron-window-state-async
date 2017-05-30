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
const assert = require("assert");
const window_state_store_1 = require("../window-state-store");
const TestWindow_1 = require("./TestWindow");
describe("window state store", () => {
    it("clear", () => __awaiter(this, void 0, void 0, function* () {
        const w = new TestWindow_1.TestWindow();
        const state = window_state_store_1.WindowStateStore(w);
        yield state.clear();
        const values = yield state.value();
        assert.deepEqual(values, {}, "not clean");
    }));
    it("shouldn't save bounds, when full screeen", () => __awaiter(this, void 0, void 0, function* () {
        const w = new TestWindow_1.TestWindow();
        const state = window_state_store_1.WindowStateStore(w);
        yield state.clear();
        const bounds1 = w.getBounds();
        const bounds2 = { x: 2, y: 2, width: 2, height: 2 };
        assert.deepEqual(w.getBounds(), bounds1, "Intial bounds dont match");
        w.setFullScreen(true);
        yield state.save();
        w.setBounds(bounds2);
        assert.deepEqual(w.getBounds(), bounds2, "window did change Bounds");
        yield state.save();
        state.restore();
        assert.ok(w.isFullScreen(), "restored: not fullscreen");
        assert.deepEqual(w.getBounds(), bounds1, "restored: bounds did change when fullscreen");
    }));
    it("Should restore bounds when NOT full screen", () => __awaiter(this, void 0, void 0, function* () {
        const w = new TestWindow_1.TestWindow();
        const state = window_state_store_1.WindowStateStore(w);
        yield state.clear();
        const bounds1 = w.getBounds();
        const bounds2 = { x: 2, y: 2, width: 2, height: 2 };
        assert.deepEqual(w.getBounds(), bounds1, "Intial bounds dont match");
        w.setFullScreen(false);
        yield state.save();
        w.setBounds(bounds2);
        assert.deepEqual(w.getBounds(), bounds2, "window did change Bounds");
        yield state.save();
        state.restore();
        assert.ok(!w.isFullScreen(), "restored: fullscreen when shouldn't");
        assert.deepEqual(w.getBounds(), bounds2, "restored: did restore bounds");
    }));
    it("Restores devTools Open", () => __awaiter(this, void 0, void 0, function* () {
        const w = new TestWindow_1.TestWindow();
        const state = window_state_store_1.WindowStateStore(w);
        yield state.clear();
        w.webContents.openDevTools();
        assert.ok(w.webContents.isDevToolsOpened(), "win: devtools not open");
        yield state.save();
        w.webContents.closeDevTools();
        assert.ok(!w.webContents.isDevToolsOpened(), "win: devtools not closed");
        yield state.restore();
        assert.ok(w.webContents.isDevToolsOpened(), "restored: devTools is Not Open");
    }));
});
