# Want to Hack?

Thanks for your interest to tinker this project. Let's make it great!! 🙂

## Basic Overview

This project use rollup to bundle the final result while maintain the code format and it's comments block. Overall, the technology stack that this project uses are (you don't need to install this tools beforehand because it's already in dependecy list):

- static-type checker: [flow][]
- code-style checker (linter): [eslint][] + [prettier][]
- bundler: [rollup][] + [babel][]
- git hooks: [husky][] + [commitlint][] + [lint-staged][] + [standard-version][]
- test framework: [jest][]

## Start Hacking

### Setup
First, install all dependencies by running
```console
npm install
```
and if you got message about security vulnurability, you can use this command to fix it
```console
npm audit fix
```

### Test
This project has 2 kind of tests, unit-tests and smoke-tests. The unit-tests will use [jest][] which basically will run in `node.js` environment. Run this command to start the unit-tests (choose which one):
```console
npm run test
npm run test:watch
npm run test:coverage
```

The smoke-tests is basically just an example how to use plugin in real simple project. To run the smoke-tests, you need to [build/bundle](#Build) it first, change directory to the example you want to run, then try to build that example. Summary if you want to build `stencil` example, this is what you need to do:
```console
npm run build
cd examples/stencil
npm run build
```
and if you want to manually test the example, you can execute:
```console
npm start
```

### Build
To compile/bundle this project, you can choose between this 2 command
```console
npm run build
npm run dev
```

## Project Structure

In general, the folder structure of this project follow:

```sh
.
├── examples
│   ├────────────────────
│   │ Bunch of smoke-tests
│   └────────────────────
│
├── flow-typed            # flow types definition
│   ├── npm
│   └── rollupPluginRustDef.js
│
├── src               # scripts that will be build/bundled
│   ├── ...bunch_of_helper_scripts
│   └── main.js   # main scripts
│
├── test
│   ├── fixtures
│   │   ├──────────────────────────────
│   │   │ Bunch of sample to be tested
│   │   ├──────────────────────────────
│   │   └── empty.js    # just an empty file to do negative test
│   │
│   ├── util
│   │   ├── ...bunch_of_helper_scripts
│   │   └── index.js
│   │
│   ├────────────────────────────────────────────────
│   │ Bunch of test-cases with file-extension *.spec.js
│   └────────────────────────────────────────────────
│
├─────────────────────
│ Bunch of config files
└─────────────────────
```

-----
[lint-staged]: https://github.com/okonet/lint-staged
[rollup-plugin]: https://github.com/rollup/rollup/wiki/Plugins#creating-plugins
[rollup]: https://rollupjs.org/guide/en
[flow]: https://flow.org/en/docs/getting-started/
[eslint]: https://eslint.org/docs/user-guide/getting-started
[prettier]: https://prettier.io/docs/en/install.html
[babel]: https://babeljs.io/docs/en
[husky]: https://github.com/typicode/husky
[commitlint]: https://github.com/marionebl/commitlint
[standard-version]: https://github.com/conventional-changelog/standard-version
[conventionalcommits]: https://conventionalcommits.org/
[jest]: https://jestjs.io/docs/en/getting-started.html