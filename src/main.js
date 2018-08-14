// @flow
import { createFilter } from 'rollup-pluginutils';
import predef from './options';

const extension = /\.rs$/; // rust file extension

export default function(options: Options = predef) {
  options = Object.assign(options, predef); // diff and merge with predefined options
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'rust',
    async transform(code: string, id: string) {
      if (!extension.test(id)) return;
      if (!filter(id)) return;

      const wasmCode = Buffer.from([
        0x00,
        0x61,
        0x73,
        0x6d,
        0x01,
        0,
        0,
        0
      ]).toJSON().data;
      return `export default Buffer.from([${wasmCode.toString()}])`;
    }
  };
}
