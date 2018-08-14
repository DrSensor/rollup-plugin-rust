import { rollup } from 'rollup';
import { require } from './util';
import rust from '../src/main.js';

test('wrong input', async () => {
  const bundle = await rollup({
    input: 'test/fixtures/empty.js',
    plugins: [rust()]
  });

  const wasmCode = await require(bundle);
  expect(wasmCode).not.toBeInstanceOf(Buffer);
});
