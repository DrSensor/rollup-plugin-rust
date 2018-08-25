// @flow
import { createFilter } from 'rollup-pluginutils';
import { readFileSync } from 'fs';
import {
  cargoCommand,
  findSrcDir,
  handleCargo
} from 'rust-native-wasm-loader/dist/cargo';
import { rollPack, execPermissive } from './util';
import wrap from './wrapper';
import predef from './options';

const extension = /\.rs$/; // rust file extension

export default function(options: $Shape<Options> = {}) {
  options = (Object.assign(predef, options): Options); // diff and merge with predefined options
  const filter = createFilter(options.include, options.exclude);
  const cmd = cargoCommand(options.target, options.release);

  return {
    name: 'rust',
    options(opts: any) {
      let external: string[] | ((id: string) => boolean);

      if (typeof opts.external === 'function')
        external = id => opts.external(id) || id.includes('buffer');

      if (Array.isArray(opts.external))
        external = Array.from(new Set(opts.external.concat('buffer')));

      return Object.assign({}, opts, { external });
    },
    async transform(code: string, id: string) {
      if (!extension.test(id)) return;
      if (!filter(id)) return;

      const cwd = await findSrcDir(id);
      if (!cwd) this.error('No Cargo.toml file found in any parent directory.');
      const result = await execPermissive(cmd, cwd);

      if (options.target.includes('wasm')) {
        let { wasmFile } = await handleCargo(rollPack(this).toLoader, result);
        if (!wasmFile) this.error('No wasm file produced as build output');
        const wasmCode = readFileSync(wasmFile);

        switch (options.export) {
          case 'buffer':
            return wrap(wasmCode).asBuffer;
          case 'instance':
            return wrap(wasmCode).asWebAssembly.Instance;
          case 'module':
            return wrap(wasmCode).asWebAssembly.Module;
          case 'async':
            return wrap(wasmCode).promiseWebAssembly.Both;
          case 'async-instance':
            return wrap(wasmCode).promiseWebAssembly.Instance;
          case 'async-module':
            return wrap(wasmCode).promiseWebAssembly.Module;
        }
      } else
        this.error(`only support wasm related target compile
        for more info see https://kripken.github.io/blog/binaryen/2018/04/18/rust-emscripten.html
      `);
    }
  };
}
