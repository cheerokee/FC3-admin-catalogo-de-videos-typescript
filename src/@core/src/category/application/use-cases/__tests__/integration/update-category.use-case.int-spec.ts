import NotFoundError from "#seedwork/domain/errors/not-found.error";
import { UpdateCategoryUseCase } from "#category/application";
import CategorySequelize from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CategoryFakeBuilder } from "#category/domain/entities/category-fake-builder";
import { Category } from "#category/domain";
const { CategoryRepository, CategoryModel } = CategorySequelize;

describe("UpdateCategoryUseCase Integration Tests",() => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found",async () => {
    await expect(() => useCase.execute({ id: 'fake id', name: 'fake' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );
  });

  it("should update a category", async () => {
    const entity = Category.fake().aCategory().build();
    await repository.insert(entity);
    // const entity = await CategoryModel.factory().create();

    let output = await useCase.execute({ id: entity.id, name: 'test' });
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: entity.created_at
    });

    type Arrange = {
      input: {
        id: string,
        name: string,
        description?: string,
        is_active?: boolean
      },
      expected: {
        id: string,
        name: string,
        description: string,
        is_active: boolean,
        created_at: Date
      }
    };

    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          name: 'test',
          description: 'some description'
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: 'some description',
          is_active: true,
          created_at: entity.created_at
        }
      },
      {
        input: {
          id: entity.id,
          name: 'test',
          description: 'some description',
          is_active: false
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: 'some description',
          is_active: false,
          created_at: entity.created_at
        }
      }, {
        input: {
          id: entity.id,
          name: 'test'
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          is_active: false,
          created_at: entity.created_at
        }
      }, {
        input: {
          id: entity.id,
          name: 'test',
          is_active: true
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
          is_active: true,
          created_at: entity.created_at
        }
      }
    ];

    for(let item of arrange) {
      let output = await useCase.execute(item.input);
      expect(output).toStrictEqual(item.expected);
    }
  })
});
