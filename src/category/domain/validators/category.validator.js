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
exports.CategoryValidator = exports.CategoryRules = void 0;
const class_validator_fields_1 = __importDefault(require("../../../@seedwork/domain/validators/class-validator-fields"));
const class_validator_1 = require("class-validator");
class CategoryRules {
    constructor({ name, description, created_at, is_active }) {
        Object.assign(this, { name, description, created_at, is_active });
    }
}
exports.CategoryRules = CategoryRules;
__decorate([
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], CategoryRules.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], CategoryRules.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)()
], CategoryRules.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)()
], CategoryRules.prototype, "created_at", void 0);
class CategoryValidator extends class_validator_fields_1.default {
    validate(data) {
        return super.validate(new CategoryRules(data !== null && data !== void 0 ? data : {}));
    }
}
exports.CategoryValidator = CategoryValidator;
// Anti-corrupção
class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}
exports.default = CategoryValidatorFactory;
