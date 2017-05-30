import * as fs from "fs";
import * as path from "path";

export const render = (
    model: {
        title: string,
        scripts: string[],
        csss?: string[]
    }) => {
    const _path = path.join(__dirname, "window.html");
    fs.writeFileSync(_path, `
<!DOCTYPE html>
<html>
    <head>
        <title>${model.title}</title>
        <meta charset="UTF-8">
        ${model.csss && model.csss.length
            ? model.csss.map(css => (`<link rel="stylesheet" type="text/css" href="${css}"/>`))
            : ""}
    </head>
    <body>
        <div id="main"></div>
        ${model.scripts.map(s => (`<script src="${s}"></script>\n`))}
    </body>
</html>
  `);
    return "file://" + _path;
};
