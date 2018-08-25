// @flow
import { rollup } from 'rollup';
import { require } from './util';
import rust from '../src/main.js';

describe('test export option for importjs', () => {
  const input = 'test/fixtures/hook_function/index.js';

  test('export of WebAssembly.compile', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'async-module' })]
    });

    const compileWasm = await require(bundle);

    // Usage
    const importObj = {
      hook: {
        before: jest.fn(),
        after: jest.fn()
      }
    };
    const module = await compileWasm();
    const instance = new WebAssembly.Instance(module, importObj);
    const { add } = instance.exports;

    expect(module).toBeInstanceOf(WebAssembly.Module);
    expect(instance).toBeInstanceOf(WebAssembly.Instance);
    // $FlowFixMe: false alarm
    expect(add(1, 2)).toBe(3);
    expect(importObj.hook.before).toHaveBeenCalledWith(1, 2);
    expect(importObj.hook.after).toHaveBeenCalledWith(3);
  });

  test('export of WebAssembly.instantiate(WebAssembly.Module)', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'async-instance' })]
    });

    const compileWasm = await require(bundle);

    // Usage
    const importObj = {
      hook: {
        before: jest.fn(),
        after: jest.fn()
      }
    };
    const instance = await compileWasm(importObj);
    const { add } = instance.exports;

    expect(instance).toBeInstanceOf(WebAssembly.Instance);
    expect(add(1, 2)).toBe(3);
    expect(importObj.hook.before).toHaveBeenCalledWith(1, 2);
    expect(importObj.hook.after).toHaveBeenCalledWith(3);
  });

  test('export of WebAssembly.instantiate(Buffer)', async () => {
    const bundle = await rollup({
      input,
      plugins: [rust({ export: 'async' })]
    });

    const compileWasm = await require(bundle);

    // Usage
    const importObj = {
      hook: {
        before: jest.fn(),
        after: jest.fn()
      }
    };
    const { module, instance } = await compileWasm(importObj);
    const { add } = instance.exports;

    expect(module).toBeInstanceOf(WebAssembly.Module);
    expect(instance).toBeInstanceOf(WebAssembly.Instance);
    expect(add(1, 2)).toBe(3);
    expect(importObj.hook.before).toHaveBeenCalledWith(1, 2);
    expect(importObj.hook.after).toHaveBeenCalledWith(3);
  });
});
