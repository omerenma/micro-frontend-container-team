const { merge } = require("webpack-merge");
const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require('../package.json').dependencies
const devConfig = {
	mode: "development",
	devServer: {
		port: 8000,
		historyApiFallback: {
			index: "index.html",
		},
	},
	plugins: [
		new ModuleFederation({
			name: "container",
			remotes: {
				marketing: "marketing@http://localhost:8081/remoteEntry.js",
			},
			shared: packageJson,
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
