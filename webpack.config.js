const path = require("path");
const HtmlWebpackPlugin = new require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
	return {
		entry: path.join(__dirname, "src/main.js"),
		optimization: {
			minimize: false
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, "src/index.html"),
				filename: "./index.html"
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css"
			})
		],
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader"
					]
				}
			]
		},
		devServer: {
			compress: true,
			port: 9000,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			}
		}
	};
};
