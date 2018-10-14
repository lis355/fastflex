const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
	return {
		entry: path.join(__dirname, "src/fastflex.scss"),
		output: {
			path: __dirname + "/out"
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "fastflex.css"
			})
		],
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"postcss-loader",
						"sass-loader"
					]
				}
			]
		}
	};
};
