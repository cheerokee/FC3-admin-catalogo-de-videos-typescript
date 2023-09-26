"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_repository_1 = require("../../../@seedwork/domain/repository/in-memory.repository");
class CategoryInMemoryRepository extends in_memory_repository_1.InMemorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['name', 'created_at'];
    }
    async applyFilter(items, filter) {
        if (!filter) {
            return items;
        }
        return items.filter(i => {
            return (i.props.name.toLowerCase().includes(filter.toLowerCase()));
        });
    }
    async applySort(items, sort, sort_dir) {
        return !sort ? super.applySort(items, "created_at", "desc") : super.applySort(items, sort, sort_dir);
    }
}
exports.default = CategoryInMemoryRepository;
