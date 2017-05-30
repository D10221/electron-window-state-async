/**
 * TODO
 */

const electron = require("electron");
const app = electron.app;
const path = require("path");

let win;
const createWindow = ()=>{
    win = new electron.BrowserWindow();    
    win.loadURL(`file://${path.join(__dirname, "index.html")}`);
    win.on("ready-to-show", ()=>{
        win.show();
    });
    win.on("closed", ()=>{        
        app.quit();
    })
}
app.on("ready", ()=>{
    createWindow();
})
