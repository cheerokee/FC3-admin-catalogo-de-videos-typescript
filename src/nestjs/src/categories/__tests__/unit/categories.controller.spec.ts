import { CategoriesController } from '../../categories.controller';
import {
  CreateCategoryUseCase,
  GetCategoryUseCase, ListCategoriesUseCase,
  UpdateCategoryUseCase
} from "@fc/micro-videos/category/application";
import { SortDirection } from "@fc/micro-videos/@seedwork/domain";
import { CategoryCollectionPresenter, CategoryPresenter } from "../../presenter/category.presenter";

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should creates a category', async () => {
    const output: CreateCategoryUseCase.Output = {
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date()
    }

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    };

    // @ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;

    const input = {
      name: "Movie",
      description: "some description",
      is_active: true
    };

    const presenter = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(new CategoryPresenter(output));
    // expect(expectedOutput).toStrictEqual(output);
  });

  it('should updates a category', async () => {
    const id= '1fe145e0-e900-44fb-bd88-74bb05247ba8';
    const output: UpdateCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date()
    }

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    };

    // @ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;

    const input = {
      name: "Movie",
      description: "some description",
      is_active: true
    };

    const presenter = await controller.update(id,input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(new CategoryPresenter(output));
  });

  it('should deletes a category', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
    };

    // @ts-expect-error
    controller['deleteUseCase'] = mockDeleteUseCase;
    const id = '1fe145e0-e900-44fb-bd88-74bb05247ba8';

    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a category', async () => {
    const id= '1fe145e0-e900-44fb-bd88-74bb05247ba8';
    const output: GetCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date()
    }

    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    };

    // @ts-expect-error
    controller['getUseCase'] = mockGetUseCase;

    const input = {
      name: "Movie",
      description: "some description",
      is_active: true
    };

    const presenter = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toStrictEqual(new CategoryPresenter(output));
  });

  it('should list a category', async () => {
    const id= '1fe145e0-e900-44fb-bd88-74bb05247ba8';
    const output: ListCategoriesUseCase.Output = {
      items: [
        new CategoryPresenter({
          id,
          name: "Movie",
          description: "some description",
          is_active: true,
          created_at: new Date()
        })
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1
    }

    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output))
    };

    // @ts-expect-error
    controller['listUseCase'] = mockListUseCase;

    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test'
    };

    const presenter = await controller.search(searchParams);
    expect(presenter).toBeInstanceOf(CategoryCollectionPresenter);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new CategoryCollectionPresenter(output));
  });
});
