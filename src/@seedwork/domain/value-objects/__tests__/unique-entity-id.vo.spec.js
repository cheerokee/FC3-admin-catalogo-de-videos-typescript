"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const unique_entity_id_1 = __importDefault(require("../unique-entity.id"));
const invalid_uuid_error_1 = __importDefault(require("../../errors/invalid-uuid.error"));
// function spyValidationMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any,'validate')
// }
describe('UniqueEntityId Unit Tests', () => {
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // })
    const validateSpy = jest.spyOn(unique_entity_id_1.default.prototype, 'validate');
    // beforeEach(() => validateSpy.mockClear())
    it('should throw error when uuid is invalid', () => {
        // const validateSpy = spyValidationMethod();
        expect(() => new unique_entity_id_1.default('fake id'))
            .toThrow(new invalid_uuid_error_1.default());
        expect(validateSpy).toHaveBeenCalled(); // Checa se a função foi executada
    });
    it('should accept a uuid in constructor', () => {
        // const validateSpy = spyValidationMethod();
        const uuid = '1fe145e0-e900-44fb-bd88-74bb05247ba8';
        const vo = new unique_entity_id_1.default(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
    it('should accept a uuid in constructor', () => {
        // const validateSpy = spyValidationMethod();
        const vo = new unique_entity_id_1.default();
        expect((0, uuid_1.validate)(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});
