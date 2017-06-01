import { BrowserWindow } from "electron";
import { WindowStateStore } from "../store";
import * as assert from "assert";
import * as fs from "fs";

/**
 * TODO: Broken
 */
describe("window store", () => {
    it("works", async () => {

        const ok = fs.statSync(process.env.WINDOW_STATE_HOME).isDirectory();
        assert.ok(ok,
            `$WINDOW_STATE_HOME='${process.env.WINDOW_STATE_HOME}' is not a directory or doesn't exists`);

        const store = new WindowStateStore(
            new BrowserWindow({ show: false })
        );
        const win = store.window;
        const bounds = win.getBounds();

        await store.clear();  // no need every test has its own unique path?
        const state = (await store.getState());
        assert.deepEqual({}, state, "didn't clear ?");

        await store.restore(); // from {}
        assert.deepEqual(win.getBounds(), bounds, "shouldn't changed when state {}");
        assert.ok(!win.isMaximized(), "shouldn't be maximized");
        assert.ok(!win.isFullScreen(), "shouldn't be fullScreen");

        win.setFullScreen(true); // on
        assert.ok(win.isFullScreen(), "should be fullScreen");
        await store.save();
        win.setFullScreen(false); // off
        assert.ok(win.isFullScreen());
        await store.restore(); // back on
        assert.ok(win.isFullScreen(), "should be fullScreen after restore");
    });
});