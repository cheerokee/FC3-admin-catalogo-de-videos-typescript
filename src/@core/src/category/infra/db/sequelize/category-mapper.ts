import { CategoryModel } from "#category/infra/db/sequelize/category-model";
import { Category } from "#category/domain";
import { EntityValidationError, UniqueEntityId, LoadEntityError } from "#seedwork/domain";

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    try {
      const { id, ...otherData } = model.toJSON();
      return new Category(otherData,new UniqueEntityId(id));
    } catch (e) {
      if(e instanceof EntityValidationError)
        throw new LoadEntityError(e.error);
      throw e;
    }
  }
}
