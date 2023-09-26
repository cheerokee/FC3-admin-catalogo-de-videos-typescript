"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidUpdateDataError extends Error {
    constructor(message) {
        super(message || 'Update data must be a valid object. Please look at the update dto type');
        this.name = 'InvalidUpdateDataError';
    }
}
exports.default = InvalidUpdateDataError;
