import rust from "rollup-plugin-rust"

export default {
	input: "src/index.js",
	output: {
		file: "dist/index.js",
		format: "cjs"
	},
	plugins: [rust()]
}
