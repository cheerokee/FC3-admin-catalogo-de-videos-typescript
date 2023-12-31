import CategorySequelize from "#category/infra/db/sequelize/category-sequelize";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { Category } from "#category/domain";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("CategoryModelMapper Unit Tests",() => {
  setupSequelize({ models: [CategorySequelize.CategoryModel] });

  it('should throws error when category is invalid', () => {
    const model = CategorySequelize.CategoryModel.build({ id: '1fe145e0-e900-44fb-bd88-74bb05247ba8' });
    try {
      CategorySequelize.CategoryModelMapper.toEntity(model);
      fail('The category is valid, but it needs throws a loadEntityError')
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })
    }
  });

  it('shold throw a generic error', () => {
    const error = new Error('Generic Error');

    const spyValidate = jest.spyOn(Category, 'validate')
      .mockImplementation(() => {
        throw error;
      });

    const model = CategorySequelize.CategoryModel.build({ id: '1fe145e0-e900-44fb-bd88-74bb05247ba8' });
    expect(() => CategorySequelize.CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore()
  });

  it('shold convert a category model to a category entity', () => {
    const created_at = new Date();
    const model = CategorySequelize.CategoryModel.build({
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: 'some value',
      description: 'some description',
      is_active: true,
      created_at
    });
    const entity = CategorySequelize.CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category({
        name: 'some value',
        description: 'some description',
        is_active: true,
        created_at
      }, new UniqueEntityId('1fe145e0-e900-44fb-bd88-74bb05247ba8')
      ).toJSON()
    );
  });
})
