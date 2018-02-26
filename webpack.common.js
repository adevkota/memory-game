const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   plugins: [
	   new CleanWebpackPlugin(['dist']),
	   new ExtractTextPlugin("styles.css"),
	   new HtmlWebpackPlugin({
		template: 'src/index.html'
	   })
	],
   output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
   },
   module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['babel-preset-env']
				}
			}
		]
   }
};