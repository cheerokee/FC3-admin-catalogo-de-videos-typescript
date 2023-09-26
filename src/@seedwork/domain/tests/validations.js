"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
expect.extend({
    containsErrorMessages(expected, received) {
        if (typeof expected === 'function') {
            try {
                expected();
                return isValid();
            }
            catch (e) {
                const error = e;
                return assertContainsErrorsMessages(error.error, received);
            }
        }
        else {
            const { validator, data } = expected;
            const validated = expected.validator.validate(data);
            if (validated) {
                return isValid();
            }
            return assertContainsErrorsMessages(validator.errors, received);
        }
    }
});
function isValid() {
    return {
        pass: true,
        message: () => ""
    };
}
function assertContainsErrorsMessages(expected, received) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    return isMatch ? {
        pass: true,
        message: () => ""
    } : {
        pass: false,
        message: () => `
          The validation errors not contains ${JSON.stringify(received)}. 
          Current: ${JSON.stringify(expected)}
        `
    };
}
