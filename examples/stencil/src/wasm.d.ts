declare module "*.rs" {
  global {
    namespace WebAssembly {
      interface Instance {
        exports: any;
      }
    }
  }

  const wasm: WebAssembly.Instance;
  export default wasm;
}
