<div align="center">
  <a href="https://github.com/rust-lang/rust">
    <img width="200" height="200" alt="binaryen logo" src="https://www.rust-lang.org/logos/rust-logo-blk.svg">
  </a>
  <a href="https://github.com/rollup/rollup">
    <img width="200" height="200" alt="webpack logo" src="https://rollupjs.org/logo.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![npm][npm-download]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![size][size]][size-url]

# rollup-plugin-rust
<sup><sup>tl;dr -- see [examples](#examples)</sup></sup>

This is a rollup plugin that loads Rust code so it can be interop with Javascript base project. Currently, the Rust code will be compiled as:
- [x] WebAssembly module/instance
- [ ] Node.js addon/ffi

## Requirements

This module requires a minimum of Node v8.9.0, Rollup v0.64.0, and Rust in [nightly channel][].

## Getting Started

To begin, you'll need to install `rollup-plugin-rust`:

```console
npm install rollup-plugin-rust --save-dev
```

Then add the plugin to your `rollup` config. For example:

<b>rollup.config.js</b>
```js
import rust from "rollup-plugin-rust"

export default [{
    input: "src/main.js",
    output: {
        file: "dist.index.js",
        format: "esm"
    },
    plugins: [rust()]
}]
```

<details>
<summary>quick usage</summary>

<b>lib.rs</b>
```rust
#[no_mangle]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

<b>index.js</b>
```js
import wasm from 'lib.rs';

export async function increment(a) {
    const { instance } = await wasm;
    return instance.exports.add(1, a);
}
```
</details>

And run `rollup` via your preferred method.

## Options

<details>
<summary><b><code>export</code></b></summary>

- Type: `string`
- Default: `promise`
- Expected value:
  - `buffer` will export wasm code as [Buffer][]
  - `module` will export wasm code as [WebAssembly.Module][]
  - `instance` will export wasm code as [WebAssembly.Instance][]
  - `promise` will [instantiate][WebAssembly.instantiate] wasm code asynchronously

How wasm code would be exported. (see [examples](#examples))

```js
// in your rollup.config.js
{
  plugins: [rust({export: 'instance'})]
}
```
</details>

<details>
<summary><b><code>target</code></b></summary>

- Type: `String`
- Default: `wasm32-unknown-unknown`
- Expected value: see [supported platform](https://forge.rust-lang.org/platform-support.html)

The Rust target to use. Currently it **only support [wasm related target](https://kripken.github.io/blog/binaryen/2018/04/18/rust-emscripten.html)**

```js
// in your rollup.config.js
{
  plugins: [rust({target: 'wasm32-unknown-emscripten'})]
}
```
</details>

<details>
<summary><b><code>release</code></b></summary>

- Type: `Boolean`
- Default: `true`

Whether to compile the Rust code in debug or release mode.

```js
// in your rollup.config.js
{
  plugins:[rust({release: false})] // preserve debug symbol
}
```
</details>

<details>
<summary><b><code>include</code></b></summary>

- Type: `Array<string>` or `string`  
- Default: `['**/*.rs']`

A single file, or array of files, to include when compiling.

```js
// in your rollup.config.js
{
  plugins:[rust({
    include: [
      'src/**/*.rs',
      'test/**/*.rs',
    ]
  })]
}
```
</details>

<details>
<summary><b><code>exclude</code></b></summary>

- Type: `Array<string>` or `string`  
- Default: `['node_modules/**', 'target/**']`

A single file, or array of files, to exclude when linting.

```js
// in your rollup.config.js
{
  plugins:[rust({
    exclude: [
      '**/node_modules/**',
      '**/target/**',
      '**/__caches__/**'
    ]
  })]
}
```
</details>

## Examples

See the test cases and example projects in [fixtures](./test/fixtures) and [examples](./examples/) for more insight.

<details>
<summary>TL;DR</summary>

### Given this Rust code

<b>lib.rs</b>
```rust
#[no_mangle]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

<b>Cargo.toml</b>
```toml
[package]
name = "adder"
version = "0.1.0"
authors = ["Full Name <email@site.domain>"]

[lib]
crate-type = ["cdylib"]
path = "lib.rs"
```

### With options

#### `{export: 'buffer'}`
```js
import wasmCode from './lib.rs'

WebAssembly.compile(wasmCode).then(module => {
  const instance = new WebAssembly.Instance(module);
  console(instance.exports.add(1, 2)); // 3
})
```
---
#### `{export: 'module'}`
```js
import wasmModule from './lib.rs'

const instance = new WebAssembly.Instance(wasmModule);
console(instance.exports.add(1, 2)); // 3
```
---
#### `{export: 'instance'}`
```js
import wasm from './lib.rs'

console(wasm.exports.add(1, 2)); // 3
```
---
#### `{export: 'promise'}`
```js
import wasmInstantiate from './lib.rs'

wasmInstantiate.then(({ instance, module }) => {
  console(instance.exports.add(1, 2)); // 3
  // create different instance
  const differentInstance = new WebAssembly.Instance(module);
  console(differentInstance.exports.add(1, 2)); // 3
})
```
---
</details>

## Who use this?
- [example-stencil-rust](https://github.com/DrSensor/example-stencil-rust)
- [add yours 😉]

## Contributing
- [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for how you can make contribution
- [HACKING.md](./.github/HACKING.md) for technical details

## Credits
- [rust-native-wasm-loader](https://github.com/dflemstr/rust-native-wasm-loader)
- [webpack-defaults](https://github.com/webpack-contrib/webpack-defaults)

---
## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDrSensor%2Frollup-plugin-rust.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDrSensor%2Frollup-plugin-rust?ref=badge_large)

[nightly channel]: https://rustwasm.github.io/book/game-of-life/setup.html#the-wasm32-unknown-unknown-target
[Buffer]: https://nodejs.org/api/buffer.html
[WebAssembly.Module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module
[WebAssembly.Instance]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance
[WebAssembly.instantiate]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate

[npm]: https://img.shields.io/npm/v/rollup-plugin-rust.svg
[npm-url]: https://npmjs.com/package/rollup-plugin-rust
[npm-download]: https://img.shields.io/npm/dm/rollup-plugin-rust.svg

[node]: https://img.shields.io/node/v/rollup-plugin-rust.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/DrSensor/rollup-plugin-rust.svg
[deps-url]: https://david-dm.org/DrSensor/rollup-plugin-rust

[tests]: https://img.shields.io/circleci/project/github/DrSensor/rollup-plugin-rust.svg
[tests-url]: https://circleci.com/gh/DrSensor/rollup-plugin-rust

[cover]: https://codecov.io/gh/DrSensor/rollup-plugin-rust/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/DrSensor/rollup-plugin-rust

[size]: https://packagephobia.now.sh/badge?p=rollup-plugin-rust
[size-url]: https://packagephobia.now.sh/result?p=rollup-plugin-rust
