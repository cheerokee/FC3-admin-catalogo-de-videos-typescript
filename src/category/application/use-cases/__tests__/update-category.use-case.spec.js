"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_category_use_case_1 = __importDefault(require("../update-category.use-case"));
const category_in_memory_repository_1 = __importDefault(require("../../../infra/repository/category-in-memory.repository"));
const not_found_error_1 = __importDefault(require("../../../../@seedwork/domain/errors/not-found.error"));
const category_1 = require("../../../domain/entities/category");
describe("UpdateCategoryUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new update_category_use_case_1.default(repository);
    });
    it("should throws error when entity not found", async () => {
        expect(() => useCase.execute({ id: 'fake id', name: 'fake' })).rejects.toThrow(new not_found_error_1.default('Entity Not Found using ID fake id'));
    });
    it("should update a category", async () => {
        const entity = new category_1.Category({ name: 'Movie' });
        repository.items = [entity];
        const arrange = [
            {
                input: {
                    id: entity.id,
                    name: 'test',
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: true,
                    created_at: entity.created_at
                }
            },
            {
                input: {
                    id: entity.id,
                    name: 'test',
                    description: 'some description',
                    is_active: false
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: 'some description',
                    is_active: false,
                    created_at: entity.created_at
                }
            }, {
                input: {
                    id: entity.id,
                    name: 'test'
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: false,
                    created_at: entity.created_at
                }
            }, {
                input: {
                    id: entity.id,
                    name: 'test',
                    is_active: true
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: true,
                    created_at: entity.created_at
                }
            }
        ];
        for (let item of arrange) {
            let output = await useCase.execute(item.input);
            expect(output).toStrictEqual(item.expected);
        }
    });
});
