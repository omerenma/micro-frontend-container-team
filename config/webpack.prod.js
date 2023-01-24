const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json").dependencies;

const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`,
                authentication: `authentication@${domain}/authentication/remoteEntry.js`,
                dashboard:`dashboard/@${domain}/dashboard/remoteEntry.js`
            },
            shared:packageJson
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
