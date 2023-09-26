"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const validation_error_1 = require("../errors/validation-error");
class ValidatorRules {
    // private no constructor permite a gente não poder passar um "new [nome da classe]"
    constructor(value, property) {
        this.value = value;
        this.property = property;
    }
    static values(value, property) {
        return new ValidatorRules(value, property);
    }
    required() {
        // same !this.value. Mas vamos deixar claro nossa intenção
        if (this.value === null || this.value === undefined || this.value === '') {
            throw new validation_error_1.ValidationError(`The ${this.property} is required`);
        }
        return this;
    }
    string() {
        if (!isEmpty(this.value) && typeof this.value !== 'string') {
            throw new validation_error_1.ValidationError(`The ${this.property} must be string`);
        }
        return this;
    }
    maxLength(max) {
        if (!isEmpty(this.value) && this.value.length > max) {
            throw new validation_error_1.ValidationError(`The ${this.property} must be less or equal than ${max} characters`);
        }
        return this;
    }
    boolean() {
        if (!isEmpty(this.value) && typeof this.value !== "boolean") {
            throw new validation_error_1.ValidationError(`The ${this.property} must be a boolean`);
        }
        return this;
    }
}
exports.default = ValidatorRules;
function isEmpty(value) {
    return value === undefined || value === null;
}
exports.isEmpty = isEmpty;
ValidatorRules
    .values('xtpo', 'name')
    .required()
    .string()
    .maxLength(255);
// Dá pra trabalhar na forma abaixo tbm
// namespace Validator {
//   values() {
//
//   }
//   required() {
//
//   }
//
//   string() {
//
//   }
//
//   maxLength(max: number) {
//
//   }
// }
