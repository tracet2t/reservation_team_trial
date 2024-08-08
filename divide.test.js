const divide = require('./divide');

test('divides 21 / 3 equal to 7', () => {
    expect(divide(21, 3)).toBe(7);
});

test('divides by zero makes an error', () => {
    expect(() => divide(1, 0)).toThrow('zero division error');
});
