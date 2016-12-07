'use strict';

const path = require('path');

const webpack = require('webpack');

// NOTE: Order is important!

const vendors = {
	'babel-polyfill': 'babel-polyfill',
	'bliss':          'blissfuljs',
	'fastclick':      'fastclick',
	'waypoints':      'waypoints/lib/noframework.waypoints',
	'store':          'store/store.min.js',
	'vue':            'vue',
	'vuex':           'vuex',
};

const config = {
	entry: {
		'pages/blade': './_resources/javascripts/pages/blade/index.js',
		'pages/home': './_resources/javascripts/pages/home/index.js',
		app: [
			'./_resources/javascripts/main.js',
		],
		'vendor.js': []
	},
	libraryTarget: 'umd',
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	output: {
		path: joinDirname('/assets/javascripts'),
		publicPath: "/assets/javascripts/",
		filename: '[name].js',
	},
	module: {
		noParse: [],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor.js', 'vendor.js')
	],
};

for (let vendor in vendors) {
	var file = vendors[vendor];
	config.resolve.alias[vendor] = file;
	config.module.noParse.push(new RegExp('^' + vendor + '$'));
	config.entry['vendor.js'].push(vendor);
}

function joinDirname(filePath) {
	return path.join(__dirname, filePath);
}

module.exports = config;