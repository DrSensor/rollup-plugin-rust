import { rollup } from 'rollup';
import { require } from './util';
import rust from '../src/main.js';

describe('negative test', () => {
  test('wrong input', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/empty.js',
      plugins: [rust({ export: 'buffer' })]
    });

    global.console.warn = jest.fn(); // probably rollup give warning when generate bundle
    const wasmCode = await require(bundle);

    expect(wasmCode).not.toBeInstanceOf(Buffer);
    expect(console.warn).toHaveBeenCalled();
  });

  test('wrong export option', async () => {
    const tryToRollup = rollup({
      input: 'test/fixtures/single_function/index.js',
      plugins: [rust({ export: 'neon' })]
    });

    await expect(tryToRollup).rejects.toBeInstanceOf(Error);
  });

  test('wrong target compilation', async () => {
    const tryToRollup = rollup({
      input: 'test/fixtures/single_function/index.js',
      plugins: [rust({ target: 'x86_64-pc-windows-msvc' })]
    });

    await expect(tryToRollup).rejects.toBeInstanceOf(Error);
  });
});
