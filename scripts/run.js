#!/usr/bin/env node
const shelljs = require("shelljs");

/**
 * Run commands
 * @param {string[]} cmds - command to run
 */
const run = (cmds) => {
    let code = 0;
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
        return code;
    }
};

module.exports = run;