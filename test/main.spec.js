// @flow
import main from '../src/main.js';

test('test main.js', () => {
  const result = main(10);
  expect(result).toBe(16.28);
});
