declare type Options = {
  target: string, // use by rust-native-wasm-loader
  release: boolean, // use by rust-native-wasm-loader
  export: 'buffer' | 'instance' | 'module' | 'promise',
  include: string[] | string, // rollup recommend to add this
  exclude: string[] | string // rollup recommend to add this
};
