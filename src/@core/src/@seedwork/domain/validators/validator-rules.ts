import { ValidationError } from "../index";

export class ValidatorRules {
  // private no constructor permite a gente não poder passar um "new [nome da classe]"
  private constructor(private value: any, private property: string) {
  }

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): Omit<this, 'required'> {
    // same !this.value. Mas vamos deixar claro nossa intenção
    if(this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationError(`The ${ this.property } is required`);
    }

    return this;
  }

  string(): Omit<this, 'string'> {
    if(!isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidationError(`The ${ this.property } must be string`);
    }

    return this;
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if(!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(`The ${ this.property } must be less or equal than ${ max } characters`);
    }

    return this;
  }

  boolean(): Omit<this, 'boolean'> {
    if(!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new ValidationError(`The ${ this.property } must be a boolean`);
    }

    return this;
  }
}

export default ValidatorRules;

export function isEmpty(value: any) {
  return value === undefined || value === null;
}

ValidatorRules
  .values('xtpo','name')
  .required()
  .string()
  .maxLength(255);

// Dá pra trabalhar na forma abaixo tbm

// namespace Validator {
//   values() {
//
//   }
//   required() {
//
//   }
//
//   string() {
//
//   }
//
//   maxLength(max: number) {
//
//   }
// }
