import { omit } from 'lodash';

import { Category, CategoryProperties } from "./category";
import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo";

describe("Category Unit Tests",() => {
  test('constructor of category',() => {
    let category = new Category({ name: 'Movie' });

    // Dessa forma conseguimos omitir o created at, pois ele só conseguimos obter dentro da classe Category
    let props = omit(category.props,'created_at');

    // Sem omitir o created at nao conseguiriamos trabalhar com strictEqual
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let  created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: true
    });
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at
    });

    category = new Category({
      name: 'Movie',
      description: 'other description'
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description'
    });

    category = new Category({
      name: 'Movie',
      is_active: true
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true
    });

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at
    });
  });

  test('id field',() => {
    type CategoryData = { props: CategoryProperties, id?: UniqueEntityId };

    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
    ];

    data.forEach(i => {
      const category = new Category(i.props,i.id);
      expect(category.id).not.toBeNull(); // Usando o not como combinação
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  })

  test('getter of name field',() => {
    const category = new Category({ name: 'Movie' });
    expect(category.name).toBe('Movie');
  });

  test('getter and setter of description field',() => {
    let category = new Category({ name: 'Movie', description: 'some description' });
    expect(category.description).toBe('some description');

    category = new Category({ name: 'Movie' });
    expect(category.description).toBeNull();

    category = new Category({ name: 'Movie', description: undefined });
    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active props',() => {
    let category = new Category({
      name: 'Movie'
    });

    expect(category.props.is_active).toBeTruthy();

    category = new Category({
      name: 'Movie',
      is_active: true
    });

    expect(category.description).toBeNull();

    category = new Category({
      name: 'Movie',
      is_active: false
    });

    expect(category.is_active).toBeFalsy();
  });

  test('getter of created_at props',() => {
    let category = new Category({
      name: 'Movie'
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at
    });

    expect(category.created_at).toBe(created_at);
  });
})
