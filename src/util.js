// @flow
import { promisify } from 'util';
import { exec } from 'child_process';

/** Execute command in permissive environment
 * @param cmd command to execute
 * @param cwd working directory where the command executed
 */
export async function execPermissive(cmd: string, cwd: string) {
  try {
    return await promisify(exec)(cmd, {
      cwd,
      encoding: 'utf-8',
      maxBuffer: 2 * 1024 * 1024 * 1024
    });
  } catch (error) {
    return error;
  }
}

/** Transform rollup plugin context into webpack specific context
 * @param self rollup plugin context
 * @see https://github.com/rollup/rollup/wiki/Plugins#plugin-context
 */
export function rollPack(self: any) {
  return {
    /** @see https://webpack.js.org/api/loaders/#the-loader-context */
    toLoader: {
      emitWarning: (warning: string | Error) => self.warning(warning),
      emitError: (error: string | Error) => self.error(error),
      addDependency: (file: string) => (file ? undefined : undefined)
    }
  };
}
