import { instanceToPlain } from "class-transformer";

import request from 'supertest';

import { Category, CategoryRepository } from "@fc/micro-videos/category/domain";

import { CATEGORY_PROVIDERS } from "../../src/categories/category.providers";
import { CategoryFixture, ListCategoriesFixture, UpdateCategoryFixture } from "../../src/categories/fixtures";
import { CategoriesController } from "../../src/categories/categories.controller";
import { startApp } from "../../src/@share/testing/helpers";

describe('CategoriesController (e2e)', () => {
  const nestApp = startApp();

  describe('/categories (GET)', () => {

    describe('should return categories sorted by created_at when request query is empty', () => {
      let categoryRepo: CategoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeIncrementeWithCreatedAt();

      beforeEach(async () => {
        categoryRepo = nestApp.app.get<CategoryRepository.Repository>(CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide);
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)('when query params is $send_data', async ({ send_data, expected }) => {
        const queryParams = new URLSearchParams(send_data as any).toString();

        return request(nestApp.app.getHttpServer())
          .get(`/categories?${ queryParams }`)
          // .expect(200)
          .expect({
            data: expected.entities.map(e => instanceToPlain(CategoriesController.categoryToResponse(e))),
            meta: expected.meta
          });
      })
    });

    describe('should return categories using paginate, filter and sort', () => {
      let categoryRepo: CategoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

      beforeEach(async () => {
        categoryRepo = nestApp.app.get<CategoryRepository.Repository>(CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide);
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)('when query params is $send_data', async ({ send_data, expected }) => {
        const queryParams = new URLSearchParams(send_data as any).toString();

        return request(nestApp.app.getHttpServer())
          .get(`/categories?${ queryParams }`)
          // .expect(200)
          .expect({
            data: expected.entities.map(e => instanceToPlain(CategoriesController.categoryToResponse(e))),
            meta: expected.meta
          });
      })
    });
  });
});
