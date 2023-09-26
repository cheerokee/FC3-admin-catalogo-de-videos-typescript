"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const value_object_1 = __importDefault(require("../value-object"));
class StubValueObject extends value_object_1.default {
}
describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('string value');
        expect(vo.value).toBe('string value');
        vo = new StubValueObject({ prop1: 'value1' });
        expect(vo.value).toStrictEqual({ prop1: 'value1' });
    });
    it('should convert to a string', () => {
        const date = new Date();
        let arrange = [
            { received: null, expected: 'null' },
            { received: undefined, expected: 'undefined' },
            { received: "", expected: "" },
            { received: "fake test", expected: "fake test" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            { received: { prop1: 'value1' }, expected: JSON.stringify({ prop1: 'value1' }) }
        ];
        arrange.forEach(value => {
            let vo = new StubValueObject(value.received);
            expect(vo + "").toBe(value.expected);
        });
    });
    it('should must be a immutable object', () => {
        const obj = { prop1: 'value 1', deep: { prop2: 'value2', prop3: new Date(), prop4: null, prop5: undefined } };
        const vo = new StubValueObject(obj);
        expect(() => {
            // @ts-ignore
            vo.value.prop1 = 'test';
        }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
        expect(() => {
            // @ts-ignore
            vo.value.deep.prop2 = 'test';
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(vo.value.deep.prop3).toBeInstanceOf(Date);
    });
});
