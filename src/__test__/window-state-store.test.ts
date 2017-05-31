import * as assert from "assert";

import { WindowStateStore } from "../window-state-store";
import { TestWindow } from "./TestWindow";

describe("window state store", () => {

    it("clear", async () => {
        const w = new TestWindow();
        const state = new WindowStateStore(w);
        await state.clear();
        const values = await state.load();
        // verify clean
        assert.deepEqual(values, {}, "not clean");
    });

    it("shouldn't save bounds, when full screeen", async () => {
        const w = new TestWindow();
        const state = new WindowStateStore(w);
        await state.clear();

        const bounds1 = w.getBounds();
        const bounds2 = { x: 2, y: 2, width: 2, height: 2 };

        assert.deepEqual(w.getBounds(), bounds1, "Intial bounds dont match");

        w.setFullScreen(true);
        await state.save();
        // shoiuldn't save bounds, is full screeen
        w.setBounds(bounds2);
        assert.deepEqual(w.getBounds(), bounds2, "window did change Bounds");
        // shoiuldn't save bounds, is full screeen
        await state.save();

        state.restore();
        // Assert changed
        assert.ok(w.isFullScreen(), "restored: not fullscreen");
        assert.deepEqual(w.getBounds(), bounds1,
            "restored: bounds did change when fullscreen");
    });

    it("Should restore bounds when NOT full screen", async () => {
        const w = new TestWindow();
        const state = new WindowStateStore(w);
        await state.clear();

        const bounds1 = w.getBounds();
        const bounds2 = { x: 2, y: 2, width: 2, height: 2 };

        assert.deepEqual(w.getBounds(), bounds1,
            "Intial bounds dont match");

        w.setFullScreen(false);
        await state.save();
        // should save, is full screeen
        w.setBounds(bounds2);
        assert.deepEqual(w.getBounds(), bounds2, "window did change Bounds");
        await state.save();

        state.restore();
        // Assert changed
        assert.ok(!w.isFullScreen(), "restored: fullscreen when shouldn't");
        assert.deepEqual(w.getBounds(), bounds2,
            "restored: did restore bounds");
    });

    it("Restores devTools Open", async () => {
        const w = new TestWindow();
        const state = new WindowStateStore(w);
        await state.clear();

        w.webContents.openDevTools();
        assert.ok(w.webContents.isDevToolsOpened(),
            "win: devtools not open");

        await state.save();
        w.webContents.closeDevTools();
        assert.ok(!w.webContents.isDevToolsOpened(),
            "win: devtools not closed");

        await state.restore();
        assert.ok(w.webContents.isDevToolsOpened(),
            "restored: devTools is Not Open");
    });
});