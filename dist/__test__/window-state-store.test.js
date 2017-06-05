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
const electron_1 = require("electron");
const store_1 = require("../store");
const assert = require("assert");
const fs = require("fs");
describe("window store", () => {
    it("works", () => __awaiter(this, void 0, void 0, function* () {
        const ok = fs.statSync(process.env.WINDOW_STATE_HOME).isDirectory();
        assert.ok(ok, `$WINDOW_STATE_HOME='${process.env.WINDOW_STATE_HOME}' is not a directory or doesn't exists`);
        const store = new store_1.WindowStateStore(new electron_1.BrowserWindow({ show: false }));
        const win = store.window;
        const bounds = win.getBounds();
        yield store.clear();
        const state = (yield store.getState());
        assert.deepEqual({}, state, "didn't clear ?");
        yield store.restore();
        assert.deepEqual(win.getBounds(), bounds, "shouldn't changed when state {}");
        assert.ok(!win.isMaximized(), "shouldn't be maximized");
        assert.ok(!win.isFullScreen(), "shouldn't be fullScreen");
        win.setFullScreen(true);
        assert.ok(win.isFullScreen(), "should be fullScreen");
        yield store.save();
        win.setFullScreen(false);
        assert.ok(!win.isFullScreen(), "Wtf?");
        yield store.restore();
        assert.ok(win.isFullScreen(), "should be fullScreen after restore");
    }));
});
