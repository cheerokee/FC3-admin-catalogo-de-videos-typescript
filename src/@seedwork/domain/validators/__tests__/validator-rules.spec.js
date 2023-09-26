"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_rules_1 = __importDefault(require("../validator-rules"));
const validation_error_1 = require("../../errors/validation-error");
function checkAssert(expected, assertIsValid) {
    if (assertIsValid) {
        expect(() => runRule(expected)).not.toThrow(expected.error);
    }
    else
        expect(() => runRule(expected)).toThrow(expected.error);
}
function runRule({ value, property, rule, params = [] }) {
    const validator = validator_rules_1.default.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
}
describe("ValidatorRules Unit Tests", () => {
    test('values method', () => {
        const validator = validator_rules_1.default.values('some value', 'field');
        expect(validator).toBeInstanceOf(validator_rules_1.default);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });
    test('required validation rule', () => {
        const error = new validation_error_1.ValidationError(`The field is required`);
        // invalid cases
        const invalidArrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: '', property: 'field' },
        ];
        invalidArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'required',
                error
            }, false);
        });
        // valid cases
        const validArrange = [
            { value: 'test', property: 'field' },
            { value: -1, property: 'field' },
            { value: false, property: 'field' },
            { value: 0, property: 'field' },
        ];
        validArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: "required",
                error
            }, true);
        });
    });
    test('string validation rule', () => {
        const error = new validation_error_1.ValidationError(`The field must be string`);
        const invalidArrange = [
            { value: 5, property: 'field' },
            { value: {}, property: 'field' },
            { value: false, property: 'field' },
        ];
        invalidArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'string',
                error
            }, false);
        });
        const validArrange = [
            { value: 'teste', property: 'field' },
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
        ];
        validArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'string',
                error
            }, true);
        });
    });
    test('maxLength validation rule', () => {
        const error = new validation_error_1.ValidationError(`The field must be less or equal than 5 characters`);
        const invalidArrange = [
            { value: 'aaaaaa', property: 'field' }
        ];
        invalidArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                error,
                params: [5]
            }, false);
        });
        const validArrange = [
            { value: 'aaaaa', property: 'field' },
            { value: 'aaaa', property: 'field' },
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
        ];
        validArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                error,
                params: [5]
            }, true);
        });
    });
    test('boolean validation rule', () => {
        const error = new validation_error_1.ValidationError(`The field must be a boolean`);
        const invalidArrange = [
            { value: 'aaaaaa', property: 'field' },
            { value: 4, property: 'field' },
            { value: new Date(), property: 'field' },
        ];
        invalidArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'boolean',
                error
            }, false);
        });
        const validArrange = [
            { value: true, property: 'field' },
            { value: false, property: 'field' },
            { value: null, property: 'field' },
            { value: undefined, property: 'field' }
        ];
        validArrange.forEach(item => {
            checkAssert({
                value: item.value,
                property: item.property,
                rule: 'boolean',
                error
            }, true);
        });
    });
    it('should throw a validation error when combine two or more validation rules', () => {
        let validator = validator_rules_1.default.values(null, 'field');
        expect(() => validator.required().string().maxLength(5))
            .toThrow(new validation_error_1.ValidationError("The field is required"));
        validator = validator_rules_1.default.values(5, 'field');
        expect(() => validator.required().string().maxLength(5))
            .toThrow(new validation_error_1.ValidationError("The field must be string"));
        validator = validator_rules_1.default.values('abcdef', 'field');
        expect(() => validator.required().string().maxLength(5))
            .toThrow(new validation_error_1.ValidationError("The field must be less or equal than 5 characters"));
        validator = validator_rules_1.default.values(null, 'field');
        expect(() => validator.required().boolean())
            .toThrow(new validation_error_1.ValidationError("The field is required"));
        validator = validator_rules_1.default.values('a', 'field');
        expect(() => validator.required().boolean())
            .toThrow(new validation_error_1.ValidationError("The field must be a boolean"));
    });
    it('should valid when combine two or more validation rules', () => {
        expect.assertions(0); // Estamos dizendo que esse teste não vai gerar nenhuma excessão
        validator_rules_1.default.values('test', 'field').required().string();
        validator_rules_1.default.values('aaaaa', 'field').required().string().maxLength(5);
        validator_rules_1.default.values(true, "field").required().boolean();
        validator_rules_1.default.values(false, "field").required().boolean();
    });
});
