const multiply = require('./multiply');

test('multiplies 8 * 6 to equal 48', () => {
    expect(multiply(8, 6)).toBe(48);
});
