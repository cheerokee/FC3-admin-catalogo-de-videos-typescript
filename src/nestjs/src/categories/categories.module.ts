import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { CategorySequelize } from "@fc/micro-videos/category/infra";

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from "./category.providers";

@Module({
  imports: [
    SequelizeModule.forFeature([CategorySequelize.CategoryModel])
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ]
})
export class CategoriesModule {}

// testes no categoriesmodule
// levantar module
// verificar imports
// verificar controllers
// verificar providers
