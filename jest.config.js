module.exports = {
	testEnvironment: "node",
	resolver: "./script/resolveModule.js",
	setupTestFrameworkScriptFile: "./jest.setup.js",
	transformIgnorePatterns: [
		"node_modules/(?!(rollup.*)|(estree.*)|(webassembly-loader)/)"
	]
}
