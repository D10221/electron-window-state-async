#!/usr/bin/env node


const React = require("react");
const reactDOMserver = require("react-dom/server");
const R = React.createElement;

/**
 * React Component to render 'index'
 */
exports.IndexPage = (props) => {
    const { title, scripts, styles } = props;
    return (
        R("html", null,
            R("head", null,
                // Title
                R("title", null, title),
                R("meta", { charSet: "UTF-8" }),
                // Styles
                styles.map((css, i) => (
                    // <link />
                    R("link", { key: `css_${i}`, rel: "stylesheet", type: "text/css", href: css }))
                )),
        R("body", null,
            R("div", { id: "main" }),
            scripts.map((src, i) => (
                // <script />
                R("script", { key: `script_${i}`, src: src }))))));
};
/**
 * to String
 */
/**
 * @param props Render HTML from props to string
 */
exports.render = (props) => reactDOMserver.renderToString(R(exports.IndexPage, Object.assign({}, props)));
/**
 * To file....
 */
const fs = require("fs");
const path = require("path");

/**
 * render 'HTML' to path.join(outDir, fileName) whet @see {render} returns
 * @returns joined path
 */
exports.renderToFile = (props) => {
    const { title, scripts, styles } = props;
    _outPath = path.join(props.outDir, props.fileName);
    fs.writeFileSync(_outPath, exports.render({ title, scripts, styles }));
    return _outPath;
};

exports.fromPkg = (_pathToJsonProps) => {
    const props = JSON.parse(
        fs.readFileSync(_pathToJsonProps, "utf-8"));

    const {
            outDir,
        fileName,
        title,
        scripts,
        styles
        } = props;

    return exports.renderToFile({
        outDir,
        fileName,
        title,
        scripts,
        styles
    });
}

/**
 * if launched with --run <path-to-json-file-as-props>
 * ex: "node index-page.js --run 'src/index.json'"
 * ex: "./index-page.js --run 'src/index.json'"
 */
const i = process.argv.indexOf("--run");
if (i !== -1) {
    const pathToJsonFIleProps = process.argv[i+1];
    console.log("path:to:json: %s", pathToJsonFIleProps);
    console.log("out: %s", exports.fromPkg(pathToJsonFIleProps));
}