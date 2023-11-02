import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundError } from "rxjs";

import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase
} from "@fc/micro-videos/category/application";
import { Category, CategoryRepository } from "@fc/micro-videos/category/domain";

import { CategoriesController } from "../../categories.controller";
import { ConfigModule } from "../../../config/config.module";
import { DatabaseModule } from "../../../database/database.module";
import { CategoriesModule } from "../../categories.module";
import { CATEGORY_PROVIDERS } from "../../category.providers";
import { CategoryCollectionPresenter, CategoryPresenter } from "../../presenter/category.presenter";
import { CreateCategoryFixture, ListCategoriesFixture, UpdateCategoryFixture } from "../../fixtures";

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;
  let repository: CategoryRepository.Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        CategoriesModule
      ]
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateCategoryUseCase.UseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateCategoryUseCase.UseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteCategoryUseCase.UseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListCategoriesUseCase.UseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetCategoryUseCase.UseCase);
  });

  describe('should create a category', () => {
    const arrange = CreateCategoryFixture.arrangeForSave();

    test.each(arrange)('when body is $send_data', async ({ send_data, expected }) => {
      const presenter = await controller.create(send_data);
      const entity = await repository.findById(presenter.id);

      // @ts-ignore
      expect(entity.toJSON()).toStrictEqual({
        id: presenter.id,
        created_at: presenter.created_at,
        ...send_data,
        ...expected
      })

      expect(presenter).toEqual(new CategoryPresenter(entity as any));
    });
  });

  describe('should update a category', () => {
    const arrange = UpdateCategoryFixture.arrangeForSave();
    const category = Category.fake().aCategory().build();

    beforeEach(async () => {
      await repository.insert(category);
    });

    test.each(arrange)(
      'with request $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.update(category.id, send_data);
        const entity = await repository.findById(presenter.id);

        expect(entity).toMatchObject({
          id: presenter.id,
          created_at: presenter.created_at,
          ...send_data,
          ...expected
        });

        expect(presenter).toEqual(new CategoryPresenter(entity as any));
      }
    )

    // const category = Category.fake().aCategory().build();
    // beforeEach(async () => {
    //   await repository.insert(category);
    // });
    //
    // const arrange = [
    //   {
    //     request: {
    //       name: 'Movie'
    //     },
    //     expectedPresenter: {
    //       name: 'Movie',
    //       description: null,
    //       is_active: true
    //     }
    //   },
    //   {
    //     request: {
    //       name: 'Movie',
    //       description: null
    //     },
    //     expectedPresenter: {
    //       name: 'Movie',
    //       description: null,
    //       is_active: true
    //     }
    //   },
    //   {
    //     request: {
    //       name: 'Movie',
    //       is_active: false
    //     },
    //     expectedPresenter: {
    //       name: 'Movie',
    //       description: null,
    //       is_active: false
    //     }
    //   },
    //   {
    //     request: {
    //       name: 'Movie',
    //       is_active: true
    //     },
    //     expectedPresenter: {
    //       name: 'Movie',
    //       description: null,
    //       is_active: true
    //     }
    //   },
    //   {
    //     request: {
    //       name: 'Movie',
    //       description: 'description test'
    //     },
    //     expectedPresenter: {
    //       name: 'Movie',
    //       description: 'description test',
    //       is_active: true
    //     }
    //   }
    // ];
    //
    // test.each(arrange)(
    //   'with request $request',
    //   async ({ request, expectedPresenter }) => {
    //     const presenter = await controller.update(category.id, request);
    //     const entity = await repository.findById(presenter.id);
    //
    //     expect(entity).toMatchObject({
    //       id: presenter.id,
    //       name: expectedPresenter.name,
    //       description: expectedPresenter.description,
    //       is_active: expectedPresenter.is_active,
    //       created_at: presenter.created_at,
    //     })
    //
    //     // @ts-ignore
    //     expect(presenter.id).toBe(entity.id);
    //     expect(presenter.name).toBe(expectedPresenter.name);
    //     expect(presenter.description).toBe(expectedPresenter.description);
    //     expect(presenter.is_active).toBe(expectedPresenter.is_active);
    //     expect(presenter.created_at).toStrictEqual(entity.created_at);
    //   });
  });

  it('should delete a category', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    // const category: CategorySequelize.CategoryModel = await CategorySequelize.CategoryModel.factory().create();
    const response = await controller.remove(category.id);
    expect(response).not.toBeDefined();
    expect(repository.findById(category.id))
      .rejects
      .toThrowError(new NotFoundError(`Entity Not Found using ID ${ category.id }`));
  });

  it('should get a category', async () => {
    const category = Category.fake().aCategory().build();
    // const category = new Category({
    //   name: 'xpto',
    //   description: null
    // });
    await repository.insert(category);

    // const category = await CategorySequelize.CategoryModel.factory().create();
    // @ts-ignore
    const presenter = await controller.findOne(category.id);

    // @ts-ignore
    expect(presenter.id).toBe(category.id);
    expect(presenter.name).toBe(category.name);
    expect(presenter.description).toBe(category.description);
    expect(presenter.is_active).toBe(category.is_active);
    expect(presenter.created_at).toStrictEqual(category.created_at);
  });

  describe('search method', () => {
    describe('should returns categories using query empty ordered by created_at',() => {
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeIncrementeWithCreatedAt();
      // const categories = Category.fake().theCategories(4)
      //   .withName((index) => index + '')
      //   .withCreatedAt((index) => new Date(new Date().getTime() + index))
      //   .build();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      })

      // const arrange = [
      //   {
      //     send_data: {},
      //     expected: {
      //       items: [
      //         categories[3],
      //         categories[2],
      //         categories[1],
      //         categories[0]
      //       ],
      //       current_page: 1,
      //       last_page: 1,
      //       per_page: 15,
      //       total: 4
      //     }
      //   },
      //   {
      //     send_data: { per_page: 2 },
      //     expected: {
      //       items: [categories[3],categories[2]],
      //       current_page: 1,
      //       last_page: 2,
      //       per_page: 2,
      //       total: 4
      //     }
      //   },
      //   {
      //     send_data: { page: 2, per_page: 2 },
      //     expected: {
      //       items: [
      //         categories[1],
      //         categories[0]
      //       ],
      //       current_page: 2,
      //       last_page: 2,
      //       per_page: 2,
      //       total: 4
      //     }
      //   }
      // ];

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(new CategoryCollectionPresenter({
            items: expected.entities,
            ...paginationProps.meta
          }));
        })
    });

    describe('should returns output using paginate, sort and filter',() => {
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

      beforeEach(async () => {
        await repository.bulkInsert(Object.values(entitiesMap));
      })

      test.each(arrange)(
        'when send_data is $send_data',
        async ({ send_data, expected }) => {
          const presenter = await controller.search(send_data);
          const { entities, ...paginationProps } = expected;
          expect(presenter).toEqual(new CategoryCollectionPresenter({
            items: expected.entities,
            ...paginationProps.meta
          }));
        })
    });
  })
});
