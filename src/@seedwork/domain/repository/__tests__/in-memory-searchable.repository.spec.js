"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("../../entity/entity"));
const in_memory_repository_1 = require("../in-memory.repository");
const repository_contracts_1 = require("../repository-contracts");
class StubEntity extends entity_1.default {
}
class StubInMemorySearchableRepository extends in_memory_repository_1.InMemorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['name'];
    }
    async applyFilter(items, filter) {
        if (!filter) {
            return items;
        }
        return items.filter(i => {
            return (i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
                i.props.price.toString() === filter);
        });
    }
}
describe('InMemorySearchableRepository Unit Tests', () => {
    let repository;
    beforeEach(() => {
        repository = new StubInMemorySearchableRepository();
    });
    describe('applyFilter method', () => {
        it('should no filter items when param is null', async () => {
            const items = [new StubEntity({ name: "name value", price: 5 })];
            const spyFilterMethod = jest.spyOn(items, 'filter');
            const itemsFiltered = await repository['applyFilter'](items, null);
            expect(itemsFiltered).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });
        it('should filter using a filter param', async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "Test", price: 5 }),
                new StubEntity({ name: "Fake", price: 0 }),
            ];
            const spyFilterMethod = jest.spyOn(items, 'filter');
            let itemsFiltered = await repository['applyFilter'](items, 'TEST');
            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);
            itemsFiltered = await repository['applyFilter'](items, '5');
            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);
            itemsFiltered = await repository['applyFilter'](items, 'no-filter');
            expect(itemsFiltered).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    });
    describe('applySort method', () => {
        it('should no sort items', async () => {
            const items = [
                new StubEntity({ name: "b", price: 6 }),
                new StubEntity({ name: "a", price: 5 })
            ];
            let itemsSorted = await repository['applySort'](items, null, null);
            expect(itemsSorted).toStrictEqual(items);
            itemsSorted = await repository['applySort'](items, 'price', 'asc');
            expect(itemsSorted).toStrictEqual(items);
        });
        it('should sort items', async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "c", price: 5 }),
            ];
            let itemsSorted = await repository['applySort'](items, 'name', 'asc');
            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);
            itemsSorted = await repository['applySort'](items, 'name', 'desc');
            expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
        });
    });
    describe('applyPaginate method', () => {
        it('should paginate items', async () => {
            const items = [
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "c", price: 5 }),
                new StubEntity({ name: "d", price: 5 }),
                new StubEntity({ name: "e", price: 5 }),
            ];
            let itemsPaginated = await repository['applyPaginate'](items, 1, 2);
            expect(itemsPaginated).toStrictEqual([items[0], items[1]]);
            itemsPaginated = await repository['applyPaginate'](items, 2, 2);
            expect(itemsPaginated).toStrictEqual([items[2], items[3]]);
            itemsPaginated = await repository['applyPaginate'](items, 3, 2);
            expect(itemsPaginated).toStrictEqual([items[4]]);
            itemsPaginated = await repository['applyPaginate'](items, 4, 2);
            expect(itemsPaginated).toStrictEqual([]);
        });
    });
    describe('search method', () => {
        it("should apply only paginate when other params are null", async () => {
            const entity = new StubEntity({ name: 'a', price: 5 });
            const items = Array(16).fill(entity);
            repository.items = items;
            const result = await repository.search(new repository_contracts_1.SearchParams());
            expect(result).toStrictEqual(new repository_contracts_1.SearchResult({
                items: Array(15).fill(entity),
                total: 16,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null
            }));
        });
        it('should apply paginate and filter', async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "TEST", price: 0 }),
                new StubEntity({ name: "TeSt", price: 0 }),
            ];
            repository.items = items;
            let result = await repository.search(new repository_contracts_1.SearchParams({
                page: 1,
                per_page: 2,
                filter: 'TEST'
            }));
            expect(result).toStrictEqual(new repository_contracts_1.SearchResult({
                items: [items[0], items[2]],
                total: 3,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: "TEST"
            }));
            result = await repository.search(new repository_contracts_1.SearchParams({
                page: 2,
                per_page: 2,
                filter: 'TEST'
            }));
            expect(result).toStrictEqual(new repository_contracts_1.SearchResult({
                items: [items[3]],
                total: 3,
                current_page: 2,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: "TEST"
            }));
        });
        it('should apply paginate and sort', async () => {
            const items = [
                new StubEntity({ name: "b", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "d", price: 5 }),
                new StubEntity({ name: "e", price: 5 }),
                new StubEntity({ name: "c", price: 5 }),
            ];
            repository.items = items;
            const arrange = [
                {
                    params: new repository_contracts_1.SearchParams({ page: 1, per_page: 2, sort: 'name' }),
                    result: new repository_contracts_1.SearchResult({
                        items: [items[1], items[0]],
                        total: 5,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: null
                    })
                },
                {
                    params: new repository_contracts_1.SearchParams({ page: 2, per_page: 2, sort: 'name' }),
                    result: new repository_contracts_1.SearchResult({
                        items: [items[4], items[2]],
                        total: 5,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: null
                    })
                },
                {
                    params: new repository_contracts_1.SearchParams({ page: 1, per_page: 2, sort: 'name', sort_dir: 'desc' }),
                    result: new repository_contracts_1.SearchResult({
                        items: [items[3], items[2]],
                        total: 5,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'desc',
                        filter: null
                    })
                },
                {
                    params: new repository_contracts_1.SearchParams({ page: 2, per_page: 2, sort: 'name', sort_dir: 'desc' }),
                    result: new repository_contracts_1.SearchResult({
                        items: [items[4], items[0]],
                        total: 5,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'desc',
                        filter: null
                    })
                }
            ];
            for (let i of arrange) {
                let result = await repository.search(i.params);
                expect(result).toStrictEqual(i.result);
            }
        });
        it('should search using filter, sort and paginate', async () => {
            const items = [
                new StubEntity({ name: "test", price: 5 }),
                new StubEntity({ name: "a", price: 5 }),
                new StubEntity({ name: "TEST", price: 5 }),
                new StubEntity({ name: "e", price: 5 }),
                new StubEntity({ name: "TeSt", price: 5 }),
            ];
            repository.items = items;
            const arrange = [
                {
                    params: new repository_contracts_1.SearchParams({ page: 1, per_page: 2, sort: 'name', filter: 'TEST' }),
                    result: new repository_contracts_1.SearchResult({
                        items: [items[2], items[4]],
                        total: 3,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                },
                {
                    params: new repository_contracts_1.SearchParams({ page: 2, per_page: 2, sort: 'name', filter: 'TEST' }),
                    result: new repository_contracts_1.SearchResult({
                        items: [items[0]],
                        total: 3,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: 'asc',
                        filter: 'TEST'
                    })
                }
            ];
            for (let i of arrange) {
                let result = await repository.search(i.params);
                expect(result).toStrictEqual(i.result);
            }
        });
    });
});
