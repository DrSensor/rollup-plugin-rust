// @flow
import { rollup } from 'rollup';
import { require } from './util';
import rust from '../src/main.js';

test('test export', async () => {
  const bundle = await rollup({
    input: 'test/fixtures/single_function/index.js',
    plugins: [rust()]
  });

  const wasmCode = await require(bundle);

  // Usage
  const module = new WebAssembly.Module(wasmCode);
  const instance = new WebAssembly.Instance(module);

  expect(wasmCode).toBeInstanceOf(Buffer);
  expect(module).toBeInstanceOf(WebAssembly.Module);
  expect(instance).toBeInstanceOf(WebAssembly.Instance);
});
