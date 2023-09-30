import { FieldsErrors } from "../domain";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R
    }
  }
}
