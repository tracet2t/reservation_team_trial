const shoppingList = [
    'food',
    'trash bags',
    'towels',
    'milk',
  ];
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });

  test('shopping list has food on it', () =>{
    expect(shoppingList).toContain('food');
    expect(new Set(shoppingList)).toContain('food');
  });