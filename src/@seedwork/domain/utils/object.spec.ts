import { deepFreeze } from "./object";

describe('object Unit Tests',() => {

  it('should not freeze a scalar value',() => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string');

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');

    boolean = deepFreeze(false);
    expect(typeof boolean).toBe('boolean');

    const number = deepFreeze(5);
    expect(typeof number).toBe('number');
  })

  it('should must be a immutable object',() => {
    const obj = deepFreeze({ prop1: 'value 1', deep: { prop2: 'value2', prop3: new Date(), prop4: null, prop5: undefined } });

    expect(() => {
      // @ts-ignore
      obj.prop1 = 'mudou';
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => {
      // @ts-ignore
      obj.deep.prop2 = 'mudou';
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  })
})
