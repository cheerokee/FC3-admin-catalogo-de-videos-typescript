"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_output_1 = require("../dto/category-output");
const category_repository_1 = __importDefault(require("../../domain/repository/category.repository"));
const pagination_output_1 = require("../../../@seedwork/application/dto/pagination-output");
class ListCategoriesUseCase {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async execute(input) {
        const params = new category_repository_1.default.SearchParams(input);
        const searchResult = await this.categoryRepo.search(params);
        return this.toOutput(searchResult);
    }
    toOutput(searchResult) {
        return Object.assign({ items: searchResult.items.map(item => {
                return category_output_1.CategoryOutputMapper.toOutput(item);
            }) }, pagination_output_1.PaginationOutputMapper.toOutput(searchResult));
    }
}
exports.default = ListCategoriesUseCase;
// dados - Category - dados de saída
// UseCase -> domain
// Infra -> domain
