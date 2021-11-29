"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.getLangFileName = (lang) => {
    if (lang === __1.DEFAULT_LANG) {
        return 'package.nls.json';
    }
    return `package.nls.${lang}.json`;
};
//# sourceMappingURL=getLangFileName.js.map