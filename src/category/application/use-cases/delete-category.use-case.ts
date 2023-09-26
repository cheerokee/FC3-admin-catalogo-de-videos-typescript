import CategoryRepository from "../../domain/repository/category.repository";
import UseCase from "../../../@seedwork/application/use-case";

export default class DeleteCategoryUseCase implements UseCase<Input,Output> {

  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(entity: Input): Promise<Output> {
    await this.categoryRepo.delete(entity.id);
    return {
      id: entity.id
    };
  }
}

// DTO - Data Transfer Object
export type Input = {
  id: string;
}

export type Output = {
  id: string;
};

// dados - Category - dados de saída

// UseCase -> domain

// Infra -> domain
