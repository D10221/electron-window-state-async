import { TestWindow } from "./TestWindow";
import * as assert from "assert";

describe("TestWindow", () => {
    it("Works", () => {
        const w = new TestWindow();
        assert.ok(!w.isDestroyed());

        assert.ok(!w.webContents.isDevToolsOpened());
        w.webContents.openDevTools();
        assert.ok(w.webContents.isDevToolsOpened());
        assert.equal(w.id, "main");
    });
});