const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
	const isDevelopment = argv.mode === 'development';
	process.env.NODE_ENV = argv.mode;

	return {
		devtool: isDevelopment ? 'eval-source-map' : 'source-map',
		entry: path.resolve(__dirname, 'src/index.js'),
		mode: argv.mode,
		output: {
			path: path.join(__dirname, '/build'),
			filename: '[name].bundle.js',
			clean: true,
		},
		devServer: {
			historyApiFallback: true,
			hot: true,
			port: 3000,
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: { publicPath: '' },
						},
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
					type: 'asset',
				},
			],
		},
		resolve: { extensions: ['*', '.js', '.jsx'] },
		optimization: {
			splitChunks: { chunks: 'all' },
		},
		plugins: [
			new HtmlWebpackPlugin({ template: './public/index.html' }),
			new MiniCssExtractPlugin(),
			isDevelopment && new webpack.HotModuleReplacementPlugin(),
		].filter(Boolean),
	};
};
