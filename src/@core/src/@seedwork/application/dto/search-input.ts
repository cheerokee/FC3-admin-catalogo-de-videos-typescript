import { SortDirection } from "../../domain";

export type Filter = string;

export type SearchInput<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
}
