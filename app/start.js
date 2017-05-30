#!/usr/bin/env node
const shelljs = require("shelljs");
const cmds = [
    "clear",
    "rimraf app/built",
    "tsc -p app/",
    "electron app/main.js"
]
let code = 0 ;
try {
    for (let cmd of cmds) {
        code = shelljs.exec(cmd).code;
        if (code !== 0) {
            throw new Error(
                `cmd: ${cmd}\n` +
                `exited with code ${code}`
            )
        }
    }
} catch (e) {
    console.error(e);
} finally {
    process.exit(code);
}
