### Electron window state async store:

Based on **[electron-window-state](https://github.com/mawie81/electron-window-state)**


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

worked on: 

    ./src/__app__

##### [Docs:](https://d10221.github.io/electron-window-state-async/)