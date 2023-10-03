import { Category, CategoryRepository } from "#category/domain";
import { UniqueEntityId } from "#seedwork/domain";
import { CategoryModel } from "#category/infra/db/sequelize/category-model";

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  sortableFields: string[] = ["name","created_at"];

  constructor(private categoryModel: typeof CategoryModel) { // typeof = Não vamos passar o objeto e sim a classe
  }

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async update(entity: Category): Promise<void> { // agregado - entidades, objetos
    return Promise.resolve(undefined);
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = this.categoryModel.findByPk(id as string);

    // converter persistencia para entidade
    return Promise.resolve(undefined);
  }

  async findAll(): Promise<Category[]> {
    return Promise.resolve([]);
  }

  async search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }
}
