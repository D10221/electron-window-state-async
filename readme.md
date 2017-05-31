### Electron window state async store:

Based on **[electron-window-state](https://github.com/mawie81/electron-window-state)**


Intended Usage:

    app.on("ready", async ()=> {
        const win = new BrowserWindow({ show: false }); 
        const store = new WindowStateStore(win);
        win.loadURL("file://index.html");
        await start(store);
        win.show();
    })


worked on: 

    ./src/__app__

##### [Docs:](https://d10221.github.io/electron-window-state-async/)