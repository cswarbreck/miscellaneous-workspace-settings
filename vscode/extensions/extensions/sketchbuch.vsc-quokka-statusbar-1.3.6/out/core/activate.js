"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_ext_localisation_1 = require("vscode-ext-localisation");
const vscode = require("vscode");
const quokka_1 = require("../constants/quokka");
const buttons_1 = require("../buttons/buttons");
const create_buttons_1 = require("../utils/create_buttons");
const update_statusbar_1 = require("../utils/update_statusbar");
const watch_editors_1 = require("../utils/watch_editors");
exports.setupExtension = (quokkaExt, extensionPath, lang) => {
    if (quokkaExt !== undefined) {
        vscode_ext_localisation_1.loadTranslations(lang, extensionPath);
        const statusButtons = create_buttons_1.default(buttons_1.default);
        watch_editors_1.default(statusButtons);
        update_statusbar_1.default(vscode.window.activeTextEditor, statusButtons);
    }
};
exports.activate = (context) => {
    exports.setupExtension(vscode.extensions.getExtension(quokka_1.QUOKKA_EXT_NAME), context.extensionPath, vscode_ext_localisation_1.getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
exports.default = exports.activate;
//# sourceMappingURL=activate.js.map