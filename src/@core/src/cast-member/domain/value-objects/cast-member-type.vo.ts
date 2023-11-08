import { ValueObject } from "#seedwork/domain";
import InvalidCastMemberTypeError from "#seedwork/domain/errors/invalid-cast-member-type.error";

export enum CastMemberTypes {
  DIRECTOR = 1,
  ACTOR = 2
}

export class CastMemberTypeVo extends ValueObject<CastMemberTypes> {
  constructor(readonly type: CastMemberTypes) {
    super(type);
    this.validate();
  }

  validate() {
    const isInvalid = Object.values(CastMemberTypes).includes(this.value);
    if(!isInvalid)
      throw new InvalidCastMemberTypeError();
  }
}

export default CastMemberTypeVo;
