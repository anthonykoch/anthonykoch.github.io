var fs = require('fs');

module.exports =
{
	browserSync: {
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		injectChanges: true,
		files: ['css'],
		reloadDelay: 600,
		middleware: [require('compression')()]
	},
	sass:
	{
		src: '_resources/sass/**/*.{sass,scss}',
		dest: './_site/css',
		main: '_resources/sass/main.sass',
		preview: './css',
		settings:
		{
			cssnano: {
				autoprefixer: false,
				safe: true,
				mergeRules: false,
			},
			sass:
			{
				indentedSyntax: true,
			},
			autoprefixer: {
				browsers: ['last 2 versions']
			}
		}
	},
	images: {
		src: '_resources/images/**',
		dest: './assets/images',
	},
	fonts: {
		src: '_resources/fonts/**',
		dest: './assets/fonts',
	},
	js:
	{
		src: ['_resources/javascripts/**/*.js'],
		dest: './assets/javascripts',
		siteDest: './_site/assets/javascripts',
		settings:
		{
			babel: JSON.parse(fs.readFileSync('.babelrc')),
			jshint:
			{
				predef: ['console'],
				browser: true,
				browserify: true,
				esnext: true,
			},
		}
	}
};