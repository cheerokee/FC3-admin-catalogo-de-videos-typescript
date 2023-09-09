import { validate as uuidValidate } from "uuid";

import UniqueEntityId from "../unique-entity-id.vo";
import InvalidUuidError from "../../../errors/invalid-uuid.error";

// function spyValidationMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any,'validate')
// }

describe('UniqueEntityId Unit Tests',() => {

  // beforeEach(() => {
  //   jest.clearAllMocks();
  // })

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any,'validate');

  // beforeEach(() => validateSpy.mockClear())

  it('should throw error when uuid is invalid',() => {
    // const validateSpy = spyValidationMethod();
    expect(() => new UniqueEntityId('fake id'))
      .toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();// Checa se a função foi executada
  });

  it('should accept a uuid in constructor', () => {
    // const validateSpy = spyValidationMethod();
    const uuid = '1fe145e0-e900-44fb-bd88-74bb05247ba8';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid in constructor', () => {
    // const validateSpy = spyValidationMethod();
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
