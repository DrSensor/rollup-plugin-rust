module.exports = {
	presets: [
		[
			"@babel/env",
			{
				targets: {node: 8},
				modules: false
			}
		],
		"@babel/flow"
	],
	plugins: ["@babel/proposal-export-namespace-from"],
	env: {
		test: {
			presets: ["@babel/env", "@babel/flow"]
		}
	}
}
