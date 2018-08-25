// @flow

const polyfill = "import { Buffer } from 'buffer'\n";

/** Wrap binary data as es6 module so it can be imported by rollup
 * @param buffer raw binary data to be wrapped as es6 module
 * @return chainable object which represent `wrap this data as...`
 * @example return wrap(arrayBuffer).asWebAssembly.Module
 */
export default function(buffer: Buffer) {
  const data = buffer.toJSON().data.toString();
  return {
    asBuffer: polyfill + `export default Buffer.from([${data}])`,
    asWebAssembly: {
      Module:
        polyfill +
        `export default new WebAssembly.Module(
          Buffer.from([${data}])
        )`,
      Instance:
        polyfill +
        `export default new WebAssembly.Instance(
          new WebAssembly.Module(
            Buffer.from([${data}])
          )
        )`
    },
    promiseWebAssembly: {
      Module:
        polyfill +
        `module.exports = () => WebAssembly.compile(
          Buffer.from([${data}])
        )`,
      Instance:
        polyfill +
        `module.exports = importObject => WebAssembly.instantiate(
          new WebAssembly.Module(Buffer.from([${data}])),
          importObject
        )`,
      Both:
        polyfill +
        `module.exports = importObject => WebAssembly.instantiate(
            Buffer.from([${data}]), importObject
        )`
    }
  };
}
