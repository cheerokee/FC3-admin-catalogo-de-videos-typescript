import { Controller, Get, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { NotFoundErrorFilter } from './not-found-error.filter';
import { AppModule } from "../../../app.module";
import { NotFoundError } from "@fc/micro-videos/@seedwork/domain";

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new NotFoundError('fake not found error message')
  }
}

describe('NotFoundErrorFilter Unit Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundErrorFilter());
    await app.init();
  });

  it('should catch a NotFoundErrorFilter',() => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(404)
      .expect({
        statusCode: 404,
        error: 'Not Found',
        message: 'fake not found error message'
      })
  })
});
