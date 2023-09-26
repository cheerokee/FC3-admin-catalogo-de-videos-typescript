import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import CategoryRepository from "../../domain/repository/category.repository";
import UseCase from "#seedwork/application/use-case";
import { SearchInput } from "#seedwork/application/dto/search-input";
import { PaginationOutput, PaginationOutputMapper } from "#seedwork/application/dto/pagination-output";

export default class ListCategoriesUseCase implements UseCase<Input,Output> {

  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    return {
      items: searchResult.items.map(item => {
        return CategoryOutputMapper.toOutput(item);
      }),
      ...PaginationOutputMapper.toOutput(searchResult)
    }
  }
}

// DTO - Data Transfer Object
export type Input = SearchInput;

export type Output = PaginationOutput<CategoryOutput>;

// dados - Category - dados de saída

// UseCase -> domain

// Infra -> domain
