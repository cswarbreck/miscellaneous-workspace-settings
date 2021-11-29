"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const loadTranslations_1 = require("./utils/loadTranslations");
__export(require("./utils/getVscodeLang"));
__export(require("./utils/loadTranslations"));
exports.DEFAULT_LANG = 'en';
exports.FS_UTF8 = 'utf-8';
exports.t = (key, placeholders = null) => {
    if (loadTranslations_1.translations.hasOwnProperty(key)) {
        let translation = loadTranslations_1.translations[key];
        if (placeholders !== null) {
            for (const [k, v] of Object.entries(placeholders)) {
                translation = translation.replace(`{{${k}}}`, v);
            }
        }
        return translation;
    }
    return key;
};
//# sourceMappingURL=index.js.map