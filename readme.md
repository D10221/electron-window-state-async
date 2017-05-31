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


see: 

    ./src/__app__

launching tests:

    $export WINDOW_STATE_HOME=$HOME/tmp && electron-mocha ./built/__test__/**/*.test.js

Or ..

    $export WINDOW_STATE_HOME=$HOME/tmp && clear  && ./scripts/test.js

...that rebuilds 1st  


#### set debug on: 

    $export DEBUG="window-state:*"


#### [Docs:](https://d10221.github.io/electron-window-state-async/)