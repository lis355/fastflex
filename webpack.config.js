const path = require("path");
const HtmlWebpackPlugin = new require("html-webpack-plugin");

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
			})
		],
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: [
						{
							loader: path.join(__dirname, "utils/css-extractor-loader.js"),
							options: {
								extractFiles: true,
							}
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: [
									require("autoprefixer")({
										browsers: ["ie >= 8", "last 4 version"]
									})
								],
								sourceMap: true
							}
						},
						{
							loader: "sass-loader",
							options: {
								precision: 5,
								outputStyle: "compressed"
							}
						}
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
