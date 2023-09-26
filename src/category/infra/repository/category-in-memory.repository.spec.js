"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = __importDefault(require("./category-in-memory.repository"));
const category_1 = require("../../domain/entities/category");
describe('CategoryInMemoryRepository Unit Tests', () => {
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
    });
    describe('should no filter items when filter object is null', () => {
        it('should no filter items when param is null', async () => {
            const items = [new category_1.Category({ name: "name value" })];
            const spyFilterMethod = jest.spyOn(items, 'filter');
            const itemsFiltered = await repository['applyFilter'](items, null);
            expect(spyFilterMethod).not.toHaveBeenCalled();
            expect(itemsFiltered).toStrictEqual(items);
        });
        it('should filter using a filter param', async () => {
            const items = [
                new category_1.Category({ name: "test" }),
                new category_1.Category({ name: "Test" }),
                new category_1.Category({ name: "Fake" }),
            ];
            const spyFilterMethod = jest.spyOn(items, 'filter');
            let itemsFiltered = await repository['applyFilter'](items, 'TEST');
            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);
            itemsFiltered = await repository['applyFilter'](items, 'no-filter');
            expect(itemsFiltered).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);
        });
    });
    describe('applySort method', () => {
        it('should sort items by created_at when we pass null value', async () => {
            const now = new Date();
            const items = [
                new category_1.Category({ name: "b", created_at: new Date(now.getTime() + 200) }),
                new category_1.Category({ name: "a", created_at: new Date(now.getTime() + 1000) })
            ];
            let itemsSorted = await repository['applySort'](items, null, null);
            expect(itemsSorted).toStrictEqual([items[1], items[0]]);
        });
        it('should sort by name', async () => {
            const items = [
                new category_1.Category({ name: "b" }),
                new category_1.Category({ name: "a" }),
                new category_1.Category({ name: "c" }),
            ];
            let itemsSorted = await repository['applySort'](items, 'name', 'asc');
            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);
        });
    });
});
