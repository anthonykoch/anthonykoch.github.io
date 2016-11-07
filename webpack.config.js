'use strict';

const path = require('path');

const webpack = require('webpack');

const vendors = {
	'babel-polyfill': require.resolve('babel-polyfill'),
	'store':          require.resolve('store/store.min.js'),
	'fastclick':      require.resolve('fastclick')
};

const config = {
	entry: {
		'pages/home': './_resources/javascripts/pages/home/index.js',
		app: [
			'./_resources/javascripts/main.js',
		],
		'vendor.js': [],
	},
	libraryTarget: 'commonjs',
	resolve: {
		alias: {}
	},
	output: {
		path: path.join(__dirname, '/assets/javascripts'),
		publicPath: "/assets/javascripts/",
		filename: '[name].js',
	},
	module: {
		noParse: [],
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor.js', 'vendor.js'),
	],
}

for (let vendor in vendors) {
	// This function will do the setup of the vendors file
	// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
	var file = vendors[vendor];
	config.resolve.alias[vendor] = file;
	config.module.noParse.push(new RegExp('^' + vendor + '$'));
	config.entry['vendor.js'].push(vendor);
}

module.exports = config;