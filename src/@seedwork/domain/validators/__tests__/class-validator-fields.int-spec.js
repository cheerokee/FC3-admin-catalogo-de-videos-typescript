"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_validator_fields_1 = __importDefault(require("../class-validator-fields"));
class StubRules {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], StubRules.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)()
], StubRules.prototype, "price", void 0);
class StubClassValidatorFields extends class_validator_fields_1.default {
    validate(data) {
        return super.validate(new StubRules(data));
    }
}
describe('ClassValidatorFields Integration Tests', () => {
    it("should validate with errors", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ],
            price: [
                'price should not be empty',
                'price must be a number conforming to the specified constraints'
            ]
        });
    });
    it('should be valid', () => {
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ name: 'some value', price: 5 })).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(new StubRules({ name: 'some value', price: 5 }));
    });
});
