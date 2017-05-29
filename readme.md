### Electron window state async store:

inspired by **[electron-window-state](https://github.com/mawie81/electron-window-state)**


Usage:

    const win = new BrowserWindow();
    const store = WindowStateStore(w);
    const subscription = store.subscribe();
    // ...
    win.on("close", ()=>{
        // ....
        subscription.unsubscribe();
    })