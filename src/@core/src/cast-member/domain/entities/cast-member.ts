import { Entity, EntityValidationError, UniqueEntityId } from "#seedwork/domain";
import CastMemberTypeVo, { CastMemberTypes } from "../value-objects/cast-member-type.vo";
import CastMemberValidatorFactory from "../validators/cast-member.validator";

export type CastMemberProperties = {
  name: string;
  created_at?: Date;
}

export class CastMember extends Entity<CastMemberProperties> {

  public castMemberType: CastMemberTypeVo;

  constructor(
    public readonly props: CastMemberProperties,
    type?: CastMemberTypeVo,
    id?: UniqueEntityId
  ) {
    super(props, id);
    this.castMemberType = type;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate(props: CastMemberProperties) {
    const validator = CastMemberValidatorFactory.create();
    const isValid = validator.validate(props);

    if(!isValid)
      throw new EntityValidationError(validator.errors);
  }

  update(name: string, type: CastMemberTypes) {
    CastMember.validate({ name } as CastMemberProperties);
    this.name = name;
    this.castMemberType = new CastMemberTypeVo(type);
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value ?? null;
  }

  get created_at() {
    return this.props.created_at;
  }

  get type() {
    return this.castMemberType.value;
  }

  toJSON(): Required<{ id: string, type: CastMemberTypes } & CastMemberProperties> {
    const json = super.toJSON();
    return {
      ...json,
      type: this.type
    };
  }
}
