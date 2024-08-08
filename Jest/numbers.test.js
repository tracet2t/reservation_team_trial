test('two plus two', () => {
    const value = 20 + 30;
    expect(value).toBeGreaterThan(30);
    expect(value).toBeGreaterThanOrEqual(35.5);
    expect(value).toBeLessThan(55);
    expect(value).toBeLessThanOrEqual(60.5);
  
    expect(value).toBe(50);
    expect(value).toEqual(50);
  });