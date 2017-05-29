### Electron window state async store:

inspired by **[electron-window-state](https://github.com/mawie81/electron-window-state)**


Intended Usage:

    const win = new BrowserWindow();
    const store = WindowStateStore(w);    
    const subscription = store.subscribe();
    // ...
    win.on("close", ()=>{
        // ....
        subscription.unsubscribe();
    });
    app.on("ready", async ()=>{
        // ...
        await store.restore();
    });

[Docs:](https://d10221.github.io/electron-window-state-async/)