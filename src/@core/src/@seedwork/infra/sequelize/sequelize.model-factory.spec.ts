import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import _chance from "chance";
import { validate as uuidValidate } from "uuid";
import { SequelizeModelFactory } from "#seedwork/infra/sequelize/sequelize.model-factory";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
// import { Config } from "@swc/core";

const chance = _chance();

@Table({})
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name;

  static mockFactory = jest.fn(() => ({
    id: chance.guid({ version: 4 }),
    name: chance.word()
  }));

  static factory() {
    return new SequelizeModelFactory<StubModel, { id: string, name: string }>(StubModel, StubModel.mockFactory);
  }
}

describe('SequelizeModelFactory Unit Tests',() => {
  setupSequelize({ models: [StubModel] });

  test('create method',async () => {
    let model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    let modelFound =await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);

    model = await StubModel.factory().create({
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: 'test'
    });
    expect(model.id).toBe('1fe145e0-e900-44fb-bd88-74bb05247ba8');
    expect(model.name).toBe('test');
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    modelFound =await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);
  });

  test('make method',async () => {
    let model = StubModel.factory().make();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    model = StubModel.factory().make({
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: 'test'
    });

    expect(model.id).toBe('1fe145e0-e900-44fb-bd88-74bb05247ba8');
    expect(model.name).toBe('test');
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  })

  test('bulkCreate method using count = 1', async () => {
    let models = await StubModel.factory().bulkCreate();
    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    let modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);

    models = await StubModel.factory().bulkCreate(() => ({
      id: '1fe145e0-e900-44fb-bd88-74bb05247ba8',
      name: "test"
    }));
    expect(models[0].id).toBe('1fe145e0-e900-44fb-bd88-74bb05247ba8');
    expect(models[0].name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    modelFound = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound.id);
    expect(models[0].name).toBe(modelFound.name);
  });

  test('bulkCreate method using count > 1', async () => {
    let models = await StubModel.factory().count(2).bulkCreate();
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(models[0].id).not.toBe(models[1].name);
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

    let modelFound1 = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound1.id);
    expect(models[0].name).toBe(modelFound1.name);

    let modelFound2 = await StubModel.findByPk(models[1].id);
    expect(models[1].id).toBe(modelFound2.id);
    expect(models[1].name).toBe(modelFound2.name);

    models = await StubModel.factory().count(2).bulkCreate(() => ({
      id: chance.guid({ version: 4 }),
      name: "test"
    }));
    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe("test");
    expect(models[1].name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });

  test('bulkMake method using count > 1', async () => {
    let models = StubModel.factory().count(2).bulkMake();

    expect(models).toHaveLength(2);
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(models[0].id).not.toBe(models[1].name);

    models = StubModel.factory().count(2).bulkMake(() => ({
      id: chance.guid({ version: 4 }),
      name: "test"
    }));

    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe("test");
    expect(models[1].name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });
})

// function makeSequelizeOptions(config: Config) {
//
// }
