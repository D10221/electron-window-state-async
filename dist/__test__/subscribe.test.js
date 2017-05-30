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
const wait_event_1 = require("./wait-event");
const window_state_store_1 = require("../window-state-store");
const TestWindow_1 = require("./TestWindow");
const util_1 = require("util");
describe("subscribing", () => {
    it("Works", () => __awaiter(this, void 0, void 0, function* () {
        const w = new TestWindow_1.TestWindow();
        const store = window_state_store_1.WindowStateStore(w);
        yield store.clear();
        w.defaults();
        assert.ok(!w.isDestroyed(), "win destroyed");
        assert.ok(!w.isFullScreen(), "defautls: Not fullscreen");
        assert.deepEqual(w.getBounds(), { x: 1, y: 1, width: 1, height: 1 }, "defautls: Not bounds");
        assert.ok(!w.webContents.isDevToolsOpened(), "defautls: Not devtools open");
        const subscription = store.subscribe();
        w.setFullScreen(true);
        yield wait_event_1.waitEvent(w, "saved", 1000);
        assert.equal((yield store.value()).fullScreen, true, "didnt resize fullscreen");
        w.setFullScreen(false);
        yield wait_event_1.waitEvent(w, "saved", 1000);
        assert.ok(!(yield store.value()).fullScreen, "didn't resize not not-fullscreen");
        const bounds3 = { x: 3, y: 3, width: 3, height: 3 };
        w.setBounds(bounds3);
        yield wait_event_1.waitEvent(w, "saved", 1000);
        const xxx = yield store.value();
        assert.ok(!xxx.fullScreen, "it hsouldn't be full screen");
        assert.deepEqual(xxx.bounds, bounds3, "didn't move");
        w.webContents.openDevTools();
        yield wait_event_1.waitEvent(w, "saved", 1000)
            .catch(ex => {
            console.error("Can't save openDevTools");
            throw ex;
        });
        assert.equal((yield store.value()).devToolsOpened, true, "didn't save openDevTools");
        w.webContents.closeDevTools();
        yield wait_event_1.waitEvent(w, "saved", 1000)
            .catch(ex => {
            console.error("Can't save closeDevTools");
            throw ex;
        });
        assert.equal((yield store.value()).devToolsOpened, false, "didn't closeDevTools");
        subscription.unsubscribe();
        assert.ok(subscription.isUnsubscribed(), "didn't unsubscribe");
        w.removeAllListeners();
        w.setFullScreen(true);
        const error = yield wait_event_1.waitEvent(w, "saved", 1000)
            .then(() => null)
            .catch(ex => ex);
        assert.ok(util_1.isError(error), "Should timeout");
        assert.equal((yield store.value()).fullScreen, false, "shouldn't be fullscreen");
    }));
});
