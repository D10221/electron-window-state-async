"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestWindow_1 = require("./TestWindow");
const assert = require("assert");
describe("TestWindow", () => {
    it("Works", () => {
        const w = new TestWindow_1.TestWindow();
        assert.ok(!w.isDestroyed());
        assert.ok(!w.webContents.isDevToolsOpened());
        w.webContents.openDevTools();
        assert.ok(w.webContents.isDevToolsOpened());
        assert.equal(w.id, "main");
    });
});
