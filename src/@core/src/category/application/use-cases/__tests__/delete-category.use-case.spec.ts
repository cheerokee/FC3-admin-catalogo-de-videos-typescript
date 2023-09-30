import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";

import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import DeleteCategoryUseCase from "../delete-category.use-case";
import { Category } from "../../../domain/entities/category";

describe("DeleteCategoryUseCase Unit Tests",() => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found",async () => {
    expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );
  });

  it("should delete a category", async () => {
    const items = [
      new Category({ name: 'movie' })
    ];

    repository.items = items;
    const id: string = items[0].id;

    const spyFindById = jest.spyOn(repository,'delete');
    let output = await useCase.execute({ id });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    // expect(output).toStrictEqual({ id });
    expect(repository.items).toHaveLength(0);
  })
});
