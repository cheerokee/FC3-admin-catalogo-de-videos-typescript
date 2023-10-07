import { Op } from "sequelize";

import { Category, CategoryRepository } from "#category/domain";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { CategoryModel } from "#category/infra/db/sequelize/category-model";
import { CategoryModelMapper } from "#category/infra/db/sequelize/category-mapper";

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
    const _id = `${id}`;
    const model = await this._get(_id);
    // converter persistencia para entidade
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((m) => CategoryModelMapper.toEntity(m));
  }

  private async _get(id: string): Promise<CategoryModel> {
    return this.categoryModel
      .findByPk(id, {
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${ id }`)
      });
  }

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    // 2 SQL
    // contar o total geral baseado em filtro
    const { rows: models, count} = await this.categoryModel.findAndCountAll({
      ...( props.filter && {
        where: { name: { [Op.like]: `%${ props.filter }%` } }
      }),
      // ...(props.sort && this.sortableFields.includes(props.sort)),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [['created_at', 'DESC']] }
      ),
      limit,
      offset
    });

    return new CategoryRepository.SearchResult({
      items: models.map(m => CategoryModelMapper.toEntity(m)),
      filter: props.filter,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      total: count
    })
  }
}
