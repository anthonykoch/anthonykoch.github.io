'use strict';

var webpack = require('webpack');

var vendors = {
	'babel-polyfill': require.resolve('babel-polyfill'),
	'store': require.resolve('store/store.min.js'),
};

var webpackConfig = {
	// This function will do the setup of the vendors file
	// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
	addVendors: function () {
		for (var name in vendors) {
			var path = vendors[name];
			this.resolve.alias[name] = path;
			this.module.noParse.push(new RegExp('^' + name + '$'));
			this.entry['vendor.js'].push(name);
		}
	},
	entry:
	{
		app: [
			'./_resources/javascripts/main.js',
		],
		'vendor.js': [],
	},
	resolve:
	{
		alias: {}
	},
	output:
	{
		path: __dirname + '\\assets\\javascripts',
		publicPath: "/assets/javascripts/",
		filename: 'app.js',
	},
	module:
	{
		noParse: [],
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		],
	},
	plugins:
	[
		new webpack.optimize.CommonsChunkPlugin('vendor.js', 'vendor.js'),
	],
}

webpackConfig.addVendors();

module.exports = webpackConfig;