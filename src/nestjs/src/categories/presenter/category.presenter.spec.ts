import {
  CategoryCollectionPresenter,
  CategoryPresenter
} from "./category.presenter";
import { instanceToPlain } from "class-transformer";
import { PaginationPresenter } from "../../@share/presenters/pagination.presenter";

describe('CategoryPresenter Unit Tests',() => {
  describe('contructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryPresenter({
        id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
        name: 'movie',
        description: 'some description',
        is_active: true,
        created_at
      });

      expect(presenter.id).toBe('1fe145e0-e900-44fb-bd88-74bb05247ba8');
      expect(presenter.name).toBe('movie');
      expect(presenter.description).toBe('some description');
      expect(presenter.is_active).toBe(true);
      expect(presenter.created_at).toBe(created_at);
    })
  });

  it('should presenter data',() => {
    const created_at = new Date();
    const presenter = new CategoryPresenter({
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: 'movie',
      description: 'some description',
      is_active: true,
      created_at
    });
    const data = instanceToPlain(presenter);
    expect(data).toStrictEqual({
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: 'movie',
      description: 'some description',
      is_active: true,
      created_at: created_at.toISOString().slice(0,19) + '.000Z'
    });
  });
});

describe('CategoryCollectionPresenter Unit Tests',() => {
  describe('contructor', () => {
    it('should set values', () => {
      const created_at = new Date();
      const presenter = new CategoryCollectionPresenter({
        items: [
          {
            id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
            name: 'movie',
            description: 'some description',
            is_active: true,
            created_at,
          }
        ],
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4
      });

      expect(presenter.meta).toBeInstanceOf(PaginationPresenter);
      expect(presenter.meta).toEqual(new PaginationPresenter({
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4
      }));

      expect(presenter.data).toStrictEqual([
        new CategoryPresenter({
          id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
          name: 'movie',
          description: 'some description',
          is_active: true,
          created_at,
        })
      ])
    })
  });

  it('should presenter data', () => {
    const created_at = new Date();
    let presenter = new CategoryCollectionPresenter({
      items: [
        {
          id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
          name: 'movie',
          description: 'some description',
          is_active: true,
          created_at,
        }
      ],
      current_page: 1,
      per_page: 2,
      last_page: 3,
      total: 4
    });

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: {
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4
      },
      data: [
        {
          id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
          name: 'movie',
          description: 'some description',
          is_active: true,
          created_at: created_at.toISOString().slice(0,19) + '.000Z',
        }
      ]
    });

    presenter = new CategoryCollectionPresenter({
      items: [
        {
          id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
          name: 'movie',
          description: 'some description',
          is_active: true,
          created_at,
        }
      ],
      current_page: '1' as any,
      per_page: '2' as any,
      last_page: '3' as any,
      total: '4' as any
    });

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: {
        current_page: 1,
        per_page: 2,
        last_page: 3,
        total: 4
      },
      data: [
        {
          id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
          name: 'movie',
          description: 'some description',
          is_active: true,
          created_at: created_at.toISOString().slice(0,19) + '.000Z',
        }
      ]
    });
  })
})
