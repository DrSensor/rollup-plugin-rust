// @flow
/** Default options */
export default ({
  target: 'wasm32-unknown-uknown',
  release: true,
  export: 'promise',
  include: ['**/*.rs'],
  exclude: ['node_modules/**', 'target/**']
}: Options);
