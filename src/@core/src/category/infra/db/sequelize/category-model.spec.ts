import { DataType } from "sequelize-typescript";
import { CategoryModel } from "#category/infra/db/sequelize/category-model";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("CategoryModel Unit Tests",() => {
  setupSequelize({ models: [CategoryModel] });

  test('mapping props',() => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(CategoryModel.getAttributes());
    expect(attributes).toStrictEqual([
      'id',
      'name',
      'description',
      'is_active',
      'created_at'
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      primaryKey: true,
      field: 'id',
      fieldName: 'id',
      type: DataType.UUID()
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(255)
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      type: DataType.TEXT()
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: 'is_active',
      fieldName: 'is_active',
      allowNull: false,
      type: DataType.BOOLEAN()
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataType.DATE()
    });

    // console.log(attributesMap)
  });

  it("create", async () => {
    // const category = CategoryModel.build();
    // category.name = "Movie";
    // category.save();

    const arrange = {
      id: "1fe145e0-e900-44fb-bd88-74bb05247ba8",
      name: "Movie",
      is_active: true,
      created_at: new Date()
    };

    const category = await CategoryModel.create(arrange);
    // toJson = Traz apenas as propriedades do modelo, em vez das infinitas propriedades que é retornado da função.
    expect(category.toJSON()).toStrictEqual(arrange);
  })

  // Iniciar a conexão
  // Criar tabelas
  // testes
  // Desconecte banco



});
