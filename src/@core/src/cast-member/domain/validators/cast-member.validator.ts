import { ClassValidatorFields } from "#seedwork/domain";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CastMemberProperties } from "../entities/cast-member";

export class CastMemberRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ name, created_at }: CastMemberProperties) {
    Object.assign(this,{ name, created_at });
  }
}

export class CastMemberValidator extends ClassValidatorFields<CastMemberRules>{
  validate(data: CastMemberProperties): boolean {
    return super.validate(new CastMemberRules(data ?? {} as any));
  }
}

export class CastMemberValidatorFactory {
  static create() {
    return new CastMemberValidator();
  }
}

export default CastMemberValidatorFactory;
