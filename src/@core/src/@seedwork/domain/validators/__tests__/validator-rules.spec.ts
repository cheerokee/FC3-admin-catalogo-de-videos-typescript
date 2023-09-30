import ValidatorRules from "../validator-rules";
import { ValidationError } from "../../index";

type Values = {
  value: any;
  property: string;
}

type ExpectedRule ={
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
}

function checkAssert(expected: ExpectedRule, assertIsValid: boolean) {
  if(assertIsValid) {
    expect(() => runRule(expected)).not.toThrow(expected.error);
  } else
    expect(() => runRule(expected)).toThrow(expected.error);
}

function runRule({value,property,rule,params = []}: Omit<ExpectedRule,'error'>) {
  const validator = ValidatorRules.values(value, property);
  const method: any = validator[rule];
  method.apply(validator,params);
}

describe("ValidatorRules Unit Tests", () => {
  test('values method',() => {
    const validator = ValidatorRules.values('some value','field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('required validation rule',() => {
    const error = new ValidationError(`The field is required`);

    // invalid cases
    const invalidArrange: Values[] = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: '', property: 'field' },
    ];

    invalidArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'required',
        error
      },false);
    });

    // valid cases
    const validArrange: Values[] = [
      { value: 'test', property: 'field' },
      { value: -1, property: 'field' },
      { value: false, property: 'field' },
      { value: 0, property: 'field' },
    ]

    validArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: "required",
        error
      },true);
    });
  })

  test('string validation rule',() => {
    const error = new ValidationError(`The field must be string`);

    const invalidArrange: Values[] = [
      { value: 5, property: 'field' },
      { value: {}, property: 'field' },
      { value: false, property: 'field' },
    ];

    invalidArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'string',
        error
      },false);
    });

    const validArrange: Values[] = [
      { value: 'teste', property: 'field' },
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
    ]

    validArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'string',
        error
      },true);
    });
  })

  test('maxLength validation rule',() => {
    const error = new ValidationError(`The field must be less or equal than 5 characters`);

    const invalidArrange: Values[] = [
      { value: 'aaaaaa', property: 'field' }
    ];

    invalidArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'maxLength',
        error,
        params: [5]
      },false);
    });

    const validArrange: Values[] = [
      { value: 'aaaaa', property: 'field' },
      { value: 'aaaa', property: 'field' },
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
    ];

    validArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'maxLength',
        error,
        params: [5]
      },true);
    });
  })

  test('boolean validation rule',() => {
    const error = new ValidationError(`The field must be a boolean`);

    const invalidArrange: Values[] = [
      { value: 'aaaaaa', property: 'field' },
      { value: 4, property: 'field' },
      { value: new Date(), property: 'field' },
    ];

    invalidArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'boolean',
        error
      },false);
    });

    const validArrange: Values[] = [
      { value: true, property: 'field' },
      { value: false, property: 'field' },
      { value: null, property: 'field' },
      { value: undefined, property: 'field' }
    ];

    validArrange.forEach(item => {
      checkAssert({
        value: item.value,
        property: item.property,
        rule: 'boolean',
        error
      },true);
    });
  })

  it('should throw a validation error when combine two or more validation rules',() => {
    let validator = ValidatorRules.values(null,'field');
    expect(() => validator.required().string().maxLength(5))
      .toThrow(new ValidationError("The field is required"));

    validator = ValidatorRules.values(5,'field');
    expect(() => validator.required().string().maxLength(5))
      .toThrow(new ValidationError("The field must be string"));

    validator = ValidatorRules.values('abcdef','field');
    expect(() => validator.required().string().maxLength(5))
      .toThrow(new ValidationError("The field must be less or equal than 5 characters"));

    validator = ValidatorRules.values(null,'field');
    expect(() => validator.required().boolean())
      .toThrow(new ValidationError("The field is required"));

    validator = ValidatorRules.values('a','field');
    expect(() => validator.required().boolean())
      .toThrow(new ValidationError("The field must be a boolean"));
  });

  it('should valid when combine two or more validation rules',() => {
    expect.assertions(0); // Estamos dizendo que esse teste não vai gerar nenhuma excessão
    ValidatorRules.values('test','field').required().string();
    ValidatorRules.values('aaaaa','field').required().string().maxLength(5);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
})
