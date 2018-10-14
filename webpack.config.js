const path = require("path");
//const webpack = require("webpack");
const HtmlWebpackPlugin = new require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
	let config = {
		entry: [path.join(__dirname, "src/main.js")],
		//mode: "production",
		//devtool : "hidden-source-map",
		optimization: {
			minimize: false,
			splitChunks: {
				cacheGroups: {
					styles: {
						name: "styles",
						test: /\.css$/,
						chunks: "all",
						enforce: true
					}
				}
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, "src/index.html"),
				filename: "./index.html"
			}),
			new MiniCssExtractPlugin({
				filename: "../out/fastflex.css",//"[name].css",
				chunkFilename: "[id].css"
			})
		],
		module: {
			rules: [
				{
					test: /\.(scss|css)$/,
					use: [
						MiniCssExtractPlugin.loader,
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

	/*function isProduction() {
		return argv.mode === "production";
	}

	if (!isProduction()) {
		config.devtool = "source-map";
	}
	else if (isProduction()) {
	}*/

	return config;
};
