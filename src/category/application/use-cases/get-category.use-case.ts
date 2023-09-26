import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import UseCase from "#seedwork/application/use-case";

export default class GetCategoryUseCase implements UseCase<Input,Output> {

  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);
    return CategoryOutputMapper.toOutput(entity)
  }
}

// DTO - Data Transfer Object
export type Input = {
  id: string;
}

export type Output = CategoryOutput;

// boundary
// request e response http
// dados - Category - dados de saída

// UseCase -> domain

// Infra -> domain
