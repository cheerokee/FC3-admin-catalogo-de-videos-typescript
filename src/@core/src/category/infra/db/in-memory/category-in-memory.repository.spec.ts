import CategoryInMemoryRepository from "./category-in-memory.repository";
import { Category } from "#category/domain";
import { CategoryFakeBuilder } from "#category/domain/entities/category-fake-builder";

describe('CategoryInMemoryRepository Unit Tests', () => {

  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  describe('should no filter items when filter object is null',() => {
    it('should no filter items when param is null',async () => {
      const items = [
        Category.fake().aCategory().build()
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      const itemsFiltered = await repository['applyFilter'](items, null);
      expect(spyFilterMethod).not.toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual(items);
    });

    it('should filter using a filter param',async () => {
      const faker = Category.fake().aCategory();
      const items = [
        faker.withName("test").build(),
        faker.withName("Test").build(),
        faker.withName("Fake").build()
        // new Category({ name: "test" }),
        // new Category({ name: "Test" }),
        // new Category({ name: "Fake" }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      let itemsFiltered = await repository['applyFilter'](items, 'TEST');
      expect(itemsFiltered).toStrictEqual([items[0],items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, 'no-filter');
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);
    });
  });

  describe('applySort method',() => {
    it('should sort items by created_at when we pass null value',async () => {
      const now: Date = new Date();
      const items = [
        new Category({ name: "b", created_at: new Date(now.getTime() + 200) }),
        new Category({ name: "a", created_at: new Date(now.getTime() + 1000) })
      ];

      let itemsSorted = await repository['applySort'](items, null,null);
      expect(itemsSorted).toStrictEqual([items[1],items[0]]);
    });

    it('should sort by name',async () => {
      const items = [
        new Category({ name: "b" }),
        new Category({ name: "a" }),
        new Category({ name: "c" }),
      ];

      let itemsSorted = await repository['applySort'](items, 'name','asc');
      expect(itemsSorted).toStrictEqual([items[1],items[0],items[2]]);
    });
  });
});
