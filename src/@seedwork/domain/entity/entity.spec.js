"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("./entity"));
const unique_entity_id_1 = __importDefault(require("../value-objects/unique-entity.id"));
const uuid_1 = require("uuid");
class StubEntity extends entity_1.default {
}
describe('Entity Unit Tests', () => {
    it('should set props and id', () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_1.default);
        expect(entity.id).not.toBeNull();
        expect((0, uuid_1.validate)(entity.id)).toBeTruthy();
    });
    it('should accept a valid uuid', () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const uniqueEntityId = new unique_entity_id_1.default();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_1.default);
        expect(entity.id).toBe(uniqueEntityId.value);
    });
    it('should convert a entity to a Javascript Object', () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const uniqueEntityId = new unique_entity_id_1.default();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id }, arrange));
    });
});
