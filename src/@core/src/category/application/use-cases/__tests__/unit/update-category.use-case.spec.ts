import NotFoundError from "#seedwork/domain/errors/not-found.error";

import CategoryInMemoryRepository from "#category/infra/db/in-memory/category-in-memory.repository";
import { Category } from "../../../../domain/entities/category";
import { UpdateCategoryUseCase } from "../../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests",() => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found",async () => {
    expect(() => useCase.execute({ id: 'fake id', name: 'fake' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );
  });

  it("should update a category", async () => {
    const entity = new Category({ name: 'Movie' });
    repository.items= [entity];

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
        },
        expected: {
          id: entity.id,
          name: 'test',
          description: null,
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
