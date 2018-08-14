// @flow
import { createFilter } from 'rollup-pluginutils';
import wrap from './wrapper';
import predef from './options';

const extension = /\.rs$/; // rust file extension

export default function(options: Options = predef) {
  options = Object.assign(predef, options); // diff and merge with predefined options
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'rust',
    async transform(code: string, id: string) {
      if (!extension.test(id)) return;
      if (!filter(id)) return;

      const wasmCode = Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0, 0, 0]);
      switch (options.export) {
        case 'buffer':
          return wrap(wasmCode).asBuffer;
        case 'instance':
          return wrap(wasmCode).asWebAssembly.Instance;
        case 'module':
          return wrap(wasmCode).asWebAssembly.Module;
        case 'promise':
          return wrap(wasmCode).promiseWebAssembly;
      }
    }
  };
}
