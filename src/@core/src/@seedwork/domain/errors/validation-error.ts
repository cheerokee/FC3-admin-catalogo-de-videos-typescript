import { FieldsErrors } from "../index";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super('Entity validation error');
    this.name = "EntityValidationError";
  }
}
