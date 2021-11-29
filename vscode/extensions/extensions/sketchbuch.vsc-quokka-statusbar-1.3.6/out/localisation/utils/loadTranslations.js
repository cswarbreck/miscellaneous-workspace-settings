"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const __1 = require("..");
const getLangFileName_1 = require("./getLangFileName");
exports.translations = {};
exports.loadTranslations = (lang, extensionPath) => {
    const defaultLangFile = path.join(extensionPath, getLangFileName_1.getLangFileName(__1.DEFAULT_LANG));
    const langFile = path.join(extensionPath, getLangFileName_1.getLangFileName(lang));
    let fileToLoad = langFile;
    if (!fs.existsSync(defaultLangFile)) {
        throw Error(`Default translation file does not exist (${defaultLangFile})`);
    }
    if (!fs.lstatSync(defaultLangFile).isFile()) {
        throw Error(`Default translation file is not a file (${defaultLangFile})`);
    }
    if (!fs.existsSync(langFile) || !fs.lstatSync(langFile).isFile()) {
        fileToLoad = defaultLangFile;
    }
    try {
        exports.translations = JSON.parse(fs.readFileSync(fileToLoad, __1.FS_UTF8));
    }
    catch (error) {
        throw Error(`Unable to read translation file (${fileToLoad}) - ${error}`);
    }
};
//# sourceMappingURL=loadTranslations.js.map