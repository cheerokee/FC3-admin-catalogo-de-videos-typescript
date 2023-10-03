import { default as DefaultUseCase } from "#seedwork/application/use-case";
import { SearchInput } from "#seedwork/application";
import { PaginationOutput, PaginationOutputMapper } from "#seedwork/application/dto/pagination-output";

import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import CategoryRepository from "../../domain/repository/category.repository";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input,Output> {
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

  export type Input = SearchInput;

  export type Output = PaginationOutput<CategoryOutput>;
}

export default ListCategoriesUseCase;
