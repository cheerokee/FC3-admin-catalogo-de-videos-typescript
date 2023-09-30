import { default as DefaultUseCase }  from "../../../@seedwork/application/use-case";

import { Category } from "../../domain/entities/category";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import CategoryRepository from "../../domain/repository/category.repository";

export namespace CreateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input,Output> {

    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Category(input);
      await this.categoryRepo.insert(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  // DTO - Data Transfer Object
  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  }

  export type Output = CategoryOutput;
}

export default CreateCategoryUseCase;



// dados - Category - dados de saída

// UseCase -> domain

// Infra -> domain
