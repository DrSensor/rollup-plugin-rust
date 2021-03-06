interface Options {
  target: string; // use by rust-native-wasm-loader
  release: boolean; // use by rust-native-wasm-loader
  export:
    | "buffer"
    | "instance"
    | "module"
    | "async"
    | "async-instance"
    | "async-module";
  include: string[] | string; // rollup recommend to add this
  exclude: string[] | string; // rollup recommend to add this
}

declare function rust(params?: Partial<Options>);

export default rust;
