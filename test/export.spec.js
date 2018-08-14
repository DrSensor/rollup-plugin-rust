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

    expect(wasmCode).toBeInstanceOf(Buffer);
    expect(instance.exports).toMatchObject({});
  });

  test('export as WebAssembly.Module', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'module' })]
    });

    const wasmModule = await require(bundle);

    // Usage
    const instance = new WebAssembly.Instance(wasmModule);

    expect(wasmModule).toBeInstanceOf(WebAssembly.Module);
    expect(instance.exports).toMatchObject({});
  });

  test('export as WebAssembly.Instance', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'instance' })]
    });

    const wasmInstance = await require(bundle);

    expect(wasmInstance).toBeInstanceOf(WebAssembly.Instance);
    expect(wasmInstance.exports).toMatchObject({}); // can be used directly, not suitable for big size wasm
  });

  test('export of WebAssembly.instantiate', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'promise' })]
    });

    const compileWasm = await require(bundle);

    // Usage
    const { module, instance } = await compileWasm;

    expect(module).toBeInstanceOf(WebAssembly.Module);
    expect(instance).toBeInstanceOf(WebAssembly.Instance);
    expect(instance.exports).toMatchObject({});
  });
});
