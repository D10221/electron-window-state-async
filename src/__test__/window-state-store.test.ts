import { BrowserWindow } from "electron";
import { WindowStateStore } from "../store";
import * as assert from "assert";

/**
 * TODO: Broken
 */
describe("window store test", () => {
    it("works", async () => {

        const store = new WindowStateStore(new BrowserWindow({ show: false }));
        const win = store.window;
        const bounds = win.getBounds();
        await store.clear();
        await store.restore();
        assert.deepEqual(win.getBounds(), bounds, "shouldn't changed when state {}");
        assert.ok(!win.isMaximized(), "shouldn't be maximized");
        assert.ok(!win.isFullScreen(), "shouldn't be fullScreen");

        win.maximize();
        assert.ok(win.isMaximized(), "should be maximized");
        win.setFullScreen(true);
        assert.ok(win.isFullScreen(), "should be fullScreen");
        await store.save();
        await store.restore();

        // ???
        assert.ok(win.isMaximized(), "should be maximized after restore");
        assert.ok(win.isFullScreen(), "should be fullScreen after restore");
    });
});