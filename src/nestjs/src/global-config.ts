import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WrapperDataInterceptor } from "./@share/interceptors/wrapper-data/wrapper-data.interceptor";
import {
  EntityValidationErrorFilter
} from "./@share/exception-filters/entity-validation-error/entity-validation-error.filter";
import { NotFoundErrorFilter } from "./@share/exception-filters/not-found-error/not-found-error.filter";

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }))
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  app.useGlobalFilters(new EntityValidationErrorFilter(), new NotFoundErrorFilter());
}
