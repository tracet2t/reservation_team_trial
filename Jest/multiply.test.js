const multiply = require('./multiply');

test('multiplying 4*4*4 equals to 64 ', () => { 
    expect(multiply(4,4,4)).toBe(64);
 });