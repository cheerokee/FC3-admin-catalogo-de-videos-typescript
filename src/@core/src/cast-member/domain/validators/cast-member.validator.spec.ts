import { CastMemberRules, CastMemberValidator, CastMemberValidatorFactory } from "./cast-member.validator";

describe("CastMemberValidator Tests",() => {
  let validator: CastMemberValidator;

  beforeEach(() => validator = CastMemberValidatorFactory.create());

  describe("invalidation cases for name field",() => {
    const errorMessages = {
      notBeEmpty: 'name should not be empty',
      beString: 'name must be a string',
      be255Char: 'name must be shorter than or equal to 255 characters'
    };

    const arrange = [
      {
        insert: null,
        expected: {
          name: [
            errorMessages.notBeEmpty,
            errorMessages.beString,
            errorMessages.be255Char
          ]
        }
      },
      {
        insert: { name: '' },
        expected: {
          name: [
            errorMessages.notBeEmpty
          ]
        }
      },
      {
        insert: { name: null },
        expected: {
          name: [
            errorMessages.notBeEmpty,
            errorMessages.beString,
            errorMessages.be255Char
          ]
        }
      },
      {
        insert: { name: 5 },
        expected: {
          name: [
            errorMessages.beString,
            errorMessages.be255Char
          ]
        }
      },
      {
        insert: { name: "t".repeat(256) },
        expected: {
          name: [
            errorMessages.be255Char
          ]
        }
      },
    ]

    test.each(arrange)('insert invalidation case',({ insert, expected }) => {
      expect({ validator, data: insert }).containsErrorMessages(expected);
    });
  });

  describe('valid cases for fields',() => {
    const arrange = [
      { name: 'some value' }
    ];

    test.each(arrange)('validate %o',(arrange) => {
      const isValid = validator.validate(arrange);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData)
        .toStrictEqual(new CastMemberRules(arrange))
    })
  })
})
