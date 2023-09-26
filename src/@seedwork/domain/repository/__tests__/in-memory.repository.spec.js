"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("../../entity/entity"));
const not_found_error_1 = __importDefault(require("../../errors/not-found.error"));
const unique_entity_id_1 = __importDefault(require("../../value-objects/unique-entity.id"));
const in_memory_repository_1 = require("../in-memory.repository");
class StubEntity extends entity_1.default {
}
class StubInMemoryRepository extends in_memory_repository_1.InMemoryRepository {
}
describe("InMemoryRepository Unit Tests", () => {
    let repository;
    beforeEach(() => {
        repository = new StubInMemoryRepository();
    });
    it("should insert a new entity", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it("should throws error when entity not found", () => {
        expect(repository.findById('fake id')).rejects.toThrow(new not_found_error_1.default('Entity Not Found using ID fake id'));
        expect(repository.findById(new unique_entity_id_1.default('89dc36f5-b3da-45f8-8849-ad020ebf009d'))).rejects.toThrow(new not_found_error_1.default('Entity Not Found using ID 89dc36f5-b3da-45f8-8849-ad020ebf009d'));
    });
    it('should finds a entity by id', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);
        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
    it('should returns all entities', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);
        const entities = await repository.findAll();
        expect(entities).toStrictEqual([entity]);
    });
    it("should throws error on update when entity not found", () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        expect(repository.update(entity)).rejects.toThrow(new not_found_error_1.default(`Entity Not Found using ID ${entity.id}`));
    });
    it('should updates an entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);
        const entityUpdated = new StubEntity({ name: 'updated', price: 1 }, entity.uniqueEntityId);
        await repository.update(entityUpdated);
        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
    it("should throws error on delete when entity not found", () => {
        expect(repository.delete('fake id')).rejects.toThrow(new not_found_error_1.default('Entity Not Found using ID fake id'));
        expect(repository.delete(new unique_entity_id_1.default('89dc36f5-b3da-45f8-8849-ad020ebf009d'))).rejects.toThrow(new not_found_error_1.default('Entity Not Found using ID 89dc36f5-b3da-45f8-8849-ad020ebf009d'));
    });
    it('should deletes an entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);
        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});
