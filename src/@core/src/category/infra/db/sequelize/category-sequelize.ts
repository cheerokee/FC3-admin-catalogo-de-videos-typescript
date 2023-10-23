import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";
import { SequelizeModelFactory } from "#seedwork/infra/sequelize/sequelize.model-factory";
import { Op, where } from "sequelize";

import { Category, CategoryRepository as CategoryRepositoryContract } from "#category/domain";
import {
  NotFoundError,
  UniqueEntityId,
  EntityValidationError,
  LoadEntityError
} from "#seedwork/domain";

export namespace CategorySequelize {
  export type ModelProps = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
  }

  @Table({ tableName: 'categories', timestamps: false })
  export class CategoryModel extends Model<ModelProps> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;
    // declare = Dizer para o typescript que esse campo vai existir,
    // e essa existencia é fake na modelagem. Na hora de compilar a classe nao terá os
    // campos pois isso será gerenciado pelo proprio sequelize

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({ type: DataType.TEXT })
    declare description: string | null;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare is_active: boolean;

    @Column({ allowNull: false, type: DataType.DATE })
    declare created_at: Date;

    static factory() {
      const chance: Chance.Chance = require('chance')();
      return new SequelizeModelFactory<CategoryModel, ModelProps>(CategoryModel, () => ({
        id: chance.guid(),
        name: chance.word(),
        description: chance.paragraph(),
        is_active: true,
        created_at: chance.date()
      }));
    }
  }

  export class CategoryRepository implements CategoryRepositoryContract.Repository {
    sortableFields: string[] = ["name","created_at"];

    constructor(private categoryModel: typeof CategoryModel) { // typeof = Não vamos passar o objeto e sim a classe
    }

    async insert(entity: Category): Promise<void> {
      await this.categoryModel.create(entity.toJSON());
    }

    async bulkInsert(entities: Category[]): Promise<void> {
      await this.categoryModel.bulkCreate(entities.map(entity => entity.toJSON()));
    }

    async update(entity: Category): Promise<void> { // agregado - entidades, objetos
      await this._get(entity.id);
      await this.categoryModel.update(entity.toJSON(),{ where: { id: entity.id } });
    }

    async delete(id: string | UniqueEntityId): Promise<void> {
      const _id = `${ id }`;
      await this._get(_id);
      await this.categoryModel.destroy({ where: { id: _id } });
    }

    async findById(id: string | UniqueEntityId): Promise<Category> {
      const _id = `${id}`;
      const model = await this._get(_id);
      // converter persistencia para entidade
      return ModelMapper.toEntity(model);
    }

    async findAll(): Promise<Category[]> {
      const models = await this.categoryModel.findAll();
      return models.map((m) => ModelMapper.toEntity(m));
    }

    private async _get(id: string): Promise<CategoryModel> {
      return this.categoryModel
        .findByPk(id, {
          rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${ id }`)
        });
    }

    async search(
      props: CategoryRepositoryContract.SearchParams
    ): Promise<CategoryRepositoryContract.SearchResult> {
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

      return new CategoryRepositoryContract.SearchResult({
        items: models.map(m => ModelMapper.toEntity(m)),
        filter: props.filter,
        current_page: props.page,
        per_page: props.per_page,
        sort: props.sort,
        sort_dir: props.sort_dir,
        total: count
      })
    }
  }

  export class ModelMapper {
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
}

export default CategorySequelize;
