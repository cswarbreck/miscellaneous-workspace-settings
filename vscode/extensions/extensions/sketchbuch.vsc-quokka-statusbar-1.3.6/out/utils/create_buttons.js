"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_ext_localisation_1 = require("vscode-ext-localisation");
const vscode = require("vscode");
const buttons_1 = require("../constants/buttons");
const createButtons = (buttons) => {
    return buttons.map((command) => {
        const newBtn = vscode.window.createStatusBarItem(buttons_1.BTN_ALIGNMENT, buttons_1.BTN_PRIORITY);
        newBtn.command = command.command;
        newBtn.text = vscode_ext_localisation_1.t(command.text);
        newBtn.tooltip = vscode_ext_localisation_1.t(command.tooltip);
        return newBtn;
    });
};
exports.default = createButtons;
//# sourceMappingURL=create_buttons.js.map