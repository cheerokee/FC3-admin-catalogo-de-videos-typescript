import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";

import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import CategoryRepository from "../../domain/repository/category.repository";

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input,Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
      entity.update({ name: input.name, description: input.description });

      if(input.is_active === true)
        entity.activate();

      if(input.is_active === false)
        entity.deactivate();

      await this.categoryRepo.update(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
  }

  export type Output = CategoryOutput;
}
