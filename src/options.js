// @flow
/** Default options */
export default ({
  target: 'wasm32-unknown-unknown',
  release: true,
  export: 'async',
  include: ['**/*.rs'],
  exclude: ['node_modules/**', 'target/**']
}: Options);
