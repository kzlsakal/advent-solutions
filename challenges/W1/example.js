const example = () => 'test';

test('example()', () => {
  const result = example();
  expect(result).toEqual('test');
});
