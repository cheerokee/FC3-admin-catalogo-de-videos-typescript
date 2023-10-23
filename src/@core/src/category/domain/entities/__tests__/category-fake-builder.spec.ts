import { CategoryFakeBuilder } from "#category/domain/entities/category-fake-builder";
import { Chance } from 'chance';
import { UniqueEntityId } from "#seedwork/domain";
import { Category } from "#category/domain";

describe('CategoryFakerBuild Unit Tests',() => {

  describe("unitque_entity_id prop",() => {
    const faker = Category.fake().aCategory();

    it('should throw error when any with methods has called',() => {
      expect(() => faker['getValue']("unique_entity_id")).toThrow(new Error(
        "Property unique_entity_id not have a factory, use 'with' methods"
      ));
    })

    it("should be undefined",() => {
      expect(faker["_unique_entity_id"]).toBeUndefined();
    });

    test("withUniqueEntityId", () => {
      const uniqueEntityId = new UniqueEntityId();
      const $this = faker.withUniqueEntityId(uniqueEntityId);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["_unique_entity_id"]).toBe(uniqueEntityId);

      faker.withUniqueEntityId(() => uniqueEntityId);
      expect(faker["_unique_entity_id"]()).toBe(uniqueEntityId);

      expect(faker.unique_entity_id).toBe(uniqueEntityId);
    });

    it("should pass index to unique_entity_id factory", () => {
      let mockFactory = jest.fn().mockReturnValue(new UniqueEntityId);
      faker.withUniqueEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest.fn().mockReturnValue(new UniqueEntityId)
      const fakerMany = Category.fake().theCategories(2);
      fakerMany.withUniqueEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    })
  });

  describe('name prop', () => {
    const faker = Category.fake().aCategory();

    it('should be a function', () => {
      expect(typeof faker['_name'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const chance = new Chance();
      const spywordMethod = jest.spyOn(chance,'word');

      faker['chance'] = chance;
      faker.build();

      expect(spywordMethod).toHaveBeenCalled();
    });

    test('withName', () => {
      faker.withName('test name');
      expect(faker['_name']).toBe('test name');

      faker.withName(() => 'test name');
      // @ts-ignore
      expect(faker['_name']()).toBe('test name');

      expect(faker.name).toBe("test name");
    });

    it('should pass index to name factory', () => {
      faker.withName((index) => `test name ${ index }`);
      const category = faker.build();
      // @ts-ignore
      expect(category.name).toBe('test name 0');

      const fakerMany = Category.fake().theCategories(2);
      fakerMany.withName((index) => `test name ${ index }`);
      const categories = fakerMany.build();
      expect(categories[0].name).toBe('test name 0');
      expect(categories[1].name).toBe('test name 1');
    });

    test('invalid empty case',() => {
      const $this = faker.withInvalidNameEmpty(undefined);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker['_name']).toBeUndefined();

      faker.withInvalidNameEmpty(null);
      expect(faker['_name']).toBeNull();

      faker.withInvalidNameEmpty("");
      expect(faker['_name']).toBe("");
    });

    test("invalid too long case", () => {
      const $this =  faker.withInvalidNameTooLong();
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker['_name'].length).toBe(256);

      faker.withInvalidNameTooLong("a".repeat(256));
      expect(faker["_name"].length).toBe(256);
      expect(faker['_name']).toBe("a".repeat(256));
    });
  });

  describe('description prop', () => {
    const faker = Category.fake().aCategory();

    it('should be a function', () => {
      expect(typeof faker['_description'] === 'function').toBeTruthy();
    });

    it('should call the paragraph method', () => {
      const chance = new Chance();
      const spyParagraphMethod = jest.spyOn(chance,'paragraph');

      faker['chance'] = chance;
      faker.build();

      expect(spyParagraphMethod).toHaveBeenCalled();
    });

    test('withDescription', () => {
      faker.withDescription('test description');
      expect(faker['_description']).toBe('test description');

      faker.withDescription(() => 'test description');
      // @ts-ignore
      expect(faker['_description']()).toBe('test description');

      expect(faker.description).toBe("test description");
    });

    it('should pass index to description factory', () => {
      faker.withDescription((index) => `test description ${ index }`);
      const category = faker.build();
      // @ts-ignore
      expect(category.description).toBe('test description 0');

      const fakerMany = Category.fake().theCategories(2);
      fakerMany.withDescription((index) => `test description ${ index }`);
      const categories = fakerMany.build();
      expect(categories[0].description).toBe('test description 0');
      expect(categories[1].description).toBe('test description 1');
    });
  });

  describe('is_active prop', () => {
    const faker = Category.fake().aCategory();

    it('should be a function', () => {
      expect(typeof faker['_is_active'] === 'function').toBeTruthy();
    });

    test('activate',() => {
      const $this = faker.activate();
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["_is_active"]).toBeTruthy();
      expect(faker.is_active).toBeTruthy();
    })

    test('deactivate', () => {
      const $this = faker.deactivate();
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["_is_active"]).toBeFalsy();
      expect(faker.is_active).toBeFalsy();
    });
  });

  describe("created_at prop",() => {
    const faker = Category.fake().aCategory();

    it('should throw error when any with methods has called',() => {
      expect(() => faker['getValue']("created_at")).toThrow(new Error(
        "Property created_at not have a factory, use 'with' methods"
      ));
    })

    it("should be undefined",() => {
      expect(faker['_created_at']).toBeUndefined();
    });

    test("withCreatedAt",() => {
      const date = new Date;
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["_created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker['_created_at']()).toBe(date);
      expect(faker.created_at).toBe(date);
    });

    it("should pass index to created_at factory",() => {
      const date = new Date;
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const category = faker.build();
      expect(category.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = Category.fake().theCategories(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const categories = fakerMany.build();

      expect(categories[0].created_at.getTime()).toBe(date.getTime() + 2);
      expect(categories[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    })
  });

  it('should create a category', () => {
    const faker = Category.fake().aCategory();
    let category = faker.build();

    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(typeof category.name === 'string').toBeTruthy();
    expect(typeof category.description === 'string').toBeTruthy();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    const uniqueEntityId = new UniqueEntityId();
    category = faker.withUniqueEntityId(uniqueEntityId)
      .withName('name test')
      .withDescription('description test')
      .deactivate()
      .withCreatedAt(created_at)
      .build();

    expect(category.uniqueEntityId.value).toBe(uniqueEntityId.value);
    expect(category.name).toBe('name test');
    expect(category.description).toBe('description test');
    expect(category.is_active).toBeFalsy();
    expect(category.props.created_at).toBe(created_at);
  })

  it('should create many categories', () => {
    const faker = Category.fake().theCategories(2);
    let categories = faker.build();

    categories.forEach(category => {
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      expect(typeof category.name === 'string').toBeTruthy();
      expect(typeof category.description === 'string').toBeTruthy();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();
    const uniqueEntityId = new UniqueEntityId();
    categories = faker.withUniqueEntityId(uniqueEntityId)
      .withName('name test')
      .withDescription('description test')
      .deactivate()
      .withCreatedAt(created_at)
      .build();

    categories.forEach(category => {
      expect(category.uniqueEntityId.value).toBe(uniqueEntityId.value);
      expect(category.name).toBe('name test');
      expect(category.description).toBe('description test');
      expect(category.is_active).toBeFalsy();
      expect(category.props.created_at).toBe(created_at);
    });
  })
});
