"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_validator_1 = __importStar(require("./category.validator"));
describe("CategoryValidator Tests", () => {
    let validator;
    beforeEach(() => validator = category_validator_1.default.create());
    test("invalidation cases for name field", () => {
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
        expect({ validator, data: { name: '' } }).containsErrorMessages({
            name: [
                'name should not be empty'
            ]
        });
        expect({ validator, data: { name: null } }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
        expect({ validator, data: { name: 5 } }).containsErrorMessages({
            name: [
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
        expect({ validator, data: { name: "t".repeat(256) } }).containsErrorMessages({
            name: [
                'name must be shorter than or equal to 255 characters'
            ]
        });
        // let isValid = validator.validate(null);
        // expect(isValid).toBeFalsy();
        // expect(validator.errors['name']).toStrictEqual([
        //   'name should not be empty',
        //   'name must be a string',
        //   'name must be shorter than or equal to 255 characters'
        // ]);
        //
        // isValid = validator.validate({ name: '' });
        // expect(isValid).toBeFalsy();
        // expect(validator.errors['name']).toStrictEqual([
        //   'name should not be empty'
        // ]);
        //
        // isValid = validator.validate({ name: null });
        // expect(isValid).toBeFalsy();
        // expect(validator.errors['name']).toStrictEqual([
        //   'name should not be empty',
        //   'name must be a string',
        //   'name must be shorter than or equal to 255 characters'
        // ]);
        //
        // isValid = validator.validate({ name: 5 as any });
        // expect(isValid).toBeFalsy();
        // expect(validator.errors['name']).toStrictEqual([
        //   'name must be a string',
        //   'name must be shorter than or equal to 255 characters'
        // ]);
        //
        // isValid = validator.validate({ name: "t".repeat(256) });
        // expect(isValid).toBeFalsy();
        // expect(validator.errors['name']).toStrictEqual([
        //   'name must be shorter than or equal to 255 characters'
        // ]);
    });
    test("invalidation cases for description field", () => {
        expect({ validator, data: { name: 'test', description: 5 } }).containsErrorMessages({
            description: [
                'description must be a string',
            ]
        });
    });
    test("invalidation cases for is_active field", () => {
        expect({ validator, data: { name: 'test', is_active: 5 } }).containsErrorMessages({
            is_active: [
                'is_active must be a boolean value',
            ]
        });
        expect({ validator, data: { name: 'test', is_active: 0 } }).containsErrorMessages({
            is_active: [
                'is_active must be a boolean value',
            ]
        });
        expect({ validator, data: { name: 'test', is_active: 1 } }).containsErrorMessages({
            is_active: [
                'is_active must be a boolean value',
            ]
        });
    });
    test("valid cases for fields", () => {
        const arrange = [
            { name: 'some value' },
            { name: 'some value', description: null },
            { name: 'some value', description: undefined },
            { name: 'some value', is_active: true },
            { name: 'some value', is_active: false }
        ];
        arrange.forEach(item => {
            const isValid = validator.validate(item);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData)
                .toStrictEqual(new category_validator_1.CategoryRules(item));
        });
    });
});
