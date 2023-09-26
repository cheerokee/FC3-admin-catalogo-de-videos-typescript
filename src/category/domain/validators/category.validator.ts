import ClassValidatorFields from "#seedwork/domain/validators/class-validator-fields";
import { CategoryProperties } from "../entities/category";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ name, description, created_at, is_active }: CategoryProperties) {
    Object.assign(this, { name, description, created_at, is_active });
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? {} as any));
  }
}
// Anti-corrupção

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
