declare type Options = {
  export: 'buffer' | 'instance' | 'module' | 'promise',
  include?: string[] | string, // rollup recommend to add this
  exclude?: string[] | string // rollup recommend to add this
};
