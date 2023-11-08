import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from "../../../@seedwork/domain/repository/repository-contracts";
import { CastMember } from "../entities/cast-member";

export namespace CastMemberRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<CastMember, Filter> {}

  export interface Repository extends SearchableRepositoryInterface<CastMember, Filter, SearchParams, SearchResult> {}
}
