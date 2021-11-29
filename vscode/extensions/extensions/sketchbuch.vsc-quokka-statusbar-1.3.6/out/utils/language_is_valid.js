"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const languageIsValid = (languageId) => {
    if (languageId.indexOf('javascript') === 0 || languageId.indexOf('typescript') === 0) {
        return true;
    }
    return false;
};
exports.default = languageIsValid;
//# sourceMappingURL=language_is_valid.js.map