/*
|-------------------------------------------------------------------------------
| Custom 'module resolver' for Jest
|-------------------------------------------------------------------------------
|
| Forked from Jest, this is the default 'resolver' with the added benefit of
| remapping the "main" field to the value of the "module" field, when present.
|
*/

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const browserResolve = require('browser-resolve');

function defaultResolver(path, options) {
  const resv = options.browser ? browserResolve : resolve;

  return resv.sync(path, {
    basedir: options.basedir,
    extensions: options.extensions,
    moduleDirectory: options.moduleDirectory,
    paths: options.paths,
    packageFilter: mapModuleFieldToMain
  });
}

module.exports = defaultResolver;

/*
|-------------------------------------------------------------------------------
| Utils
*/

function mapModuleFieldToMain(pkg, pkgDir) {
  const moduleSrcPath = pkg['module'];
  const isModuleFieldAvailable =
    moduleSrcPath && fs.existsSync(path.resolve(pkgDir, moduleSrcPath));

  if (isModuleFieldAvailable) {
    return Object.assign({}, pkg, { main: moduleSrcPath });
  } else {
    return pkg;
  }
}
