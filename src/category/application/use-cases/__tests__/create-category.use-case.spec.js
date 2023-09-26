"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_category_use_case_1 = __importDefault(require("../create-category.use-case"));
const category_in_memory_repository_1 = __importDefault(require("../../../infra/repository/category-in-memory.repository"));
describe("CreateCategoryUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new create_category_use_case_1.default(repository);
    });
    it("should create a category", async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
        let output = await useCase.execute({ name: 'test' });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: repository.items[0].created_at
        });
        output = await useCase.execute({ name: 'test', description: 'some description', is_active: false });
        expect(spyInsert).toHaveBeenCalledTimes(2);
        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: 'test',
            description: 'some description',
            is_active: false,
            created_at: repository.items[1].created_at
        });
    });
});
