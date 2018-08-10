module.exports = {
	projects: [
		{
			displayName: "test",
			testEnvironment: "node",
			setupTestFrameworkScriptFile: "./jest.setup.js"
		},
		{
			displayName: "lint",
			runner: "jest-runner-eslint",
			testMatch: ["<rootDir>/src/**/*.js"]
		}
	]
}
