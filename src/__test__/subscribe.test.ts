import * as assert from "assert";
import { waitEvent } from "./wait-event";
import { WindowStateStore } from "../window-state-store";
import { TestWindow } from "./TestWindow";
import { isError } from "util";


describe("subscribing", () => {
    it("Works", async () => {
        const w = new TestWindow();
        const store = WindowStateStore(w);
        await store.clear();
        w.defaults();
        assert.ok(!w.isDestroyed(), "win destroyed");

        // Verify defaults
        assert.ok(!w.isFullScreen(), "defautls: Not fullscreen");
        assert.deepEqual(w.getBounds(), { x: 1, y: 1, width: 1, height: 1 }, "defautls: Not bounds");
        assert.ok(!w.webContents.isDevToolsOpened(), "defautls: Not devtools open");

        const subscription = store.subscribe();
        // ...
        w.setFullScreen(true);
        await waitEvent(w, "saved", 1000);
        assert.equal(
            (await store.value()).fullScreen,
            // expected:
            true,
            "didnt resize fullscreen"
        );

        w.setFullScreen(false);
        await waitEvent(w, "saved", 1000);
        assert.ok(
            !(await store.value()).fullScreen,
            "didn't resize not not-fullscreen"
        );

        const bounds3 = { x: 3, y: 3, width: 3, height: 3 };
        w.setBounds(bounds3);
        await waitEvent(w, "saved", 1000);
        const xxx = await store.value();
        assert.ok(!xxx.fullScreen, "it hsouldn't be full screen");
        assert.deepEqual(
            xxx.bounds, bounds3,
            "didn't move");

        w.webContents.openDevTools();
        await waitEvent(w, "saved", 1000)
            .catch(ex => {
                console.error("Can't save openDevTools");
                throw ex;
            });
        assert.equal(
            (await store.value()).devToolsOpened,
            // expected:
            true,
            "didn't save openDevTools"
        );

        w.webContents.closeDevTools();
        await waitEvent(w, "saved", 1000)
            .catch(ex => {
                console.error("Can't save closeDevTools");
                throw ex;
            });

        assert.equal(
            (await store.value()).devToolsOpened,
            // expected:
            false,
            "didn't closeDevTools"
        );
        // ...

        subscription.unsubscribe();
        assert.ok(subscription.isUnsubscribed(), "didn't unsubscribe");
        w.removeAllListeners();

        // ... did clear
        w.setFullScreen(true);
        const error = await waitEvent(w, "saved", 1000)
            .then(() => null)
            .catch(ex => ex);
        assert.ok(isError(error), "Should timeout");
        assert.equal(
            (await store.value()).fullScreen,
            // expected:
            false,
            "shouldn't be fullscreen"
        );
    });
});