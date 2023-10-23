import { ListCategoriesUseCase } from "@fc/micro-videos/category/application";
import { Filter } from "@fc/micro-videos/@seedwork/application";
import { SortDirection } from "@fc/micro-videos/@seedwork/domain";

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  filter?: Filter | null;
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
}
