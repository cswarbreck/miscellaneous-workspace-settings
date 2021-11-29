"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.getVscodeLang = (vscodeLangConfig) => {
    let lang = __1.DEFAULT_LANG;
    if (vscodeLangConfig) {
        const { locale } = JSON.parse(vscodeLangConfig);
        lang = locale || lang;
    }
    return lang;
};
//# sourceMappingURL=getVscodeLang.js.map