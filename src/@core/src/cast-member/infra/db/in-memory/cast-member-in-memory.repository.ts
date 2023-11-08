import { InMemorySearchableRepository } from "#seedwork/domain";
import { CastMember } from "../../../domain/entities/cast-member";
import { CastMemberRepository } from "../../../domain/repository/cast-member.repository";

export class CastMemberInMemoryRepository
  extends InMemorySearchableRepository<CastMember>
  implements CastMemberRepository.Repository {

  sortableFields: string[] = ['name','created_at'];

  protected async applyFilter(
    items: CastMember[],
    filter: CastMemberRepository.Filter | null
  ): Promise<CastMember[]> {
    if(!filter) {
      return items;
    }

    return items.filter(i => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  protected async applySort(items: CastMember[], sort: string | null, sort_dir: string | null): Promise<CastMember[]> {
    return !sort ? super.applySort(items, "created_at", "desc") : super.applySort(items,sort,sort_dir);
  }
}
