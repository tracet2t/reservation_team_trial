// sum.test.js
const sum = require('./sum');

test('adds 1 + 6 to equal 7', () => {
  expect(sum(1, 6)).toBe(7);
});
