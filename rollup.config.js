import pkg from "./package.json"
import prc from "./.prettierrc.json"

import resolve from "rollup-plugin-node-resolve"
import {eslint} from "rollup-plugin-eslint"
import babel from "rollup-plugin-babel"
import prettier from "rollup-plugin-prettier"

// #region helper
let {overrides, ...options} = prc
options["parser"] = "babylon"
const prettierrc = {
	options: options,
	files: files => {
		const options = overrides.find(p => p.files === files).options
		options["parser"] = "babylon"
		return options
	}
}
// #endregion

// Rollup Configuration
export default [
	{
		input: "src/main.js",
		output: {
			file: pkg.main,
			format: "es"
		},
		plugins: [
			eslint(),
			resolve(),
			babel(),
			prettier(prettierrc.files("*.js"))
		]
	}
]
