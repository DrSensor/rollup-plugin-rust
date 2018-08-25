// @flow
import { rollup } from 'rollup';
import { require } from './util';
import rust from '../src/main.js';

describe('test export option', () => {
  const input = 'test/fixtures/single_function/index.js';

  test('export as Buffer class', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'buffer' })]
    });

    const wasmCode = await require(bundle);

    // Usage
    const module = new WebAssembly.Module(wasmCode);
    const instance = new WebAssembly.Instance(module);
    const { add } = instance.exports;

    expect(wasmCode).toBeInstanceOf(Buffer);
    // $FlowFixMe: false alarm
    expect(add(1, 2)).toBe(3);
  });

  test('export as WebAssembly.Module', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'module' })]
    });

    const wasmModule = await require(bundle);

    // Usage
    const instance = new WebAssembly.Instance(wasmModule);
    const { add } = instance.exports;

    expect(wasmModule).toBeInstanceOf(WebAssembly.Module);
    // $FlowFixMe: false alarm
    expect(add(1, 2)).toBe(3);
  });

  test('export as WebAssembly.Instance', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'instance' })]
    });

    const wasmInstance = await require(bundle);

    expect(wasmInstance).toBeInstanceOf(WebAssembly.Instance);
    expect(wasmInstance.exports.add(1, 2)).toBe(3); // can be used directly, not suitable for big size wasm
  });
});
