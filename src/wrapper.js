// @flow

/** Wrap binary data as es6 module so it can be imported by rollup
 * @param buffer raw binary data to be wrapped as es6 module
 * @return chainable object which represent `wrap this data as...`
 * @example return wrap(arrayBuffer).asWebAssembly.Module
 */
export default function(buffer: Buffer) {
  const data = buffer.toJSON().data.toString();
  return {
    asBuffer: `export default Buffer.from([${data}])`,
    asWebAssembly: {
      Module: `export default new WebAssembly.Module(
        Buffer.from([${data}])
      )`,
      Instance: `export default new WebAssembly.Instance(
        new WebAssembly.Module(
          Buffer.from([${data}])
        )
      )`
    },
    promiseWebAssembly: `export default WebAssembly.instantiate(
      Buffer.from([${data}])
    )`
  };
}
