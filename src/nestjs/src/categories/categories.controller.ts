import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put, HttpCode, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CreateCategoryUseCase, DeleteCategoryUseCase, GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase
} from "@fc/micro-videos/category/application";
import { SearchCategoryDto } from "./dto/search-category.dto";

// Inject - casos - mongoose, typeorm

@Controller('categories')
export class CategoriesController {

  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.updateUseCase.execute({ id, ...updateCategoryDto });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({ id });
  }

  @Get()
  search(@Query() searchParams: SearchCategoryDto) {
    return this.listUseCase.execute(searchParams);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }
}
