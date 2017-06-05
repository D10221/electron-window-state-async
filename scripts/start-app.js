#!/usr/bin/env node

process.env.DEBUG = "window-state:*";
process.env.DEBUG_COLORS = "true";

const cmds = [
    "clear",
    "npm run rebuild",
    "electron ./built/__app__/main.js"
]
process.exit(
    require("./run")(cmds)
);
