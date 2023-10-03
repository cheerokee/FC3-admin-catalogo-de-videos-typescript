import { Sequelize } from "sequelize-typescript";
import { Category } from "#category/domain";
import { CategoryModel } from "#category/infra/db/sequelize/category-model";
import { CategorySequelizeRepository } from "#category/infra/db/sequelize/category-repository";

describe("CategorySequelizeRepository Unit Tests",() => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ':memory:', // ativar modo em memória
      logging: false,
      models: [CategoryModel]
    });
  });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true }); // force: Limpar o banco a cada teste
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should insert a new entity",async () => {
    let category = new Category({ name: 'Movie' });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({ name: 'Movie', description: 'some description', is_active: false });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());
  });


})
