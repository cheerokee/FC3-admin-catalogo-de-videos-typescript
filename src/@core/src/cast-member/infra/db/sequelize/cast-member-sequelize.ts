import { CastMemberTypes, CastMemberTypeVo } from "../../../domain/value-objects/cast-member-type.vo";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from "#seedwork/infra";
import { EntityValidationError, LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { CastMember } from "../../../domain/entities/cast-member";
import { CastMemberRepository as CastMemberRepositoryContract } from "../../../domain/repository/cast-member.repository";

export namespace CastMemberSequelize {
  export type ModelProps = {
    id: string;
    name: string;
    type: CastMemberTypes;
    created_at: Date;
  }

  @Table({ tableName: 'cast_members', timestamps: false })
  export class CastMemberModel extends Model<ModelProps> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({
      type: DataType.ENUM,
      values: Object.values(CastMemberTypes).map(type => "" + type)
    })
    declare type: CastMemberTypes;

    @Column({ allowNull: false, type: DataType.DATE })
    declare created_at: Date;

    static factory() {
      const chance: Chance.Chance = require('chance')();
      return new SequelizeModelFactory<CastMemberModel, ModelProps>(CastMemberModel, () => ({
        id: chance.guid(),
        name: chance.word(),
        type: chance.integer({
          min: 0,
          max: Object.values(CastMemberTypes).length - 1
        }),
        created_at: chance.date()
      }))
    }
  }

  // export class CastMemberRepository implements CastMemberRepositoryContract.Repository {
  //   findAll(): Promise<CastMember[]> {
  //   }
  //
  //   bulkInsert(entities: CastMember[]): Promise<void> {
  //   }
  // }

  export class CastMemberModelMapper {
    static toEntity(model: CastMemberModel) {
      try {
        const { id, type, ...otherData } = model.toJSON();
        return new CastMember(
          otherData,
          new CastMemberTypeVo(type),
          new UniqueEntityId(id)
        );
      } catch (e) {
        if(e instanceof EntityValidationError)
          throw new LoadEntityError(e.error);
        throw e;
      }
    }
  }
}

export default CastMemberSequelize;
