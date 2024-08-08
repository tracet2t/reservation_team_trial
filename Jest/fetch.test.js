const fetchData = require('./fetch');
//const kingdoms = require('./fetch');

test('the data is Jest testing', async () => {
    const data = await fetchData();
    expect(data).toBe('Jest testing');
});
  
test('the data is Jest testing', async () => {
    await expect(fetchData()).resolves.toBe('Jest testing');
});
