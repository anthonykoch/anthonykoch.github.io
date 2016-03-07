'use strict';

/**
 * Allows images to be lazy loaded
 *
 * Progressive media images are loaded in after the have been scrolled
 * into view.
 */

import Visibility from '../lib/visibility';
import utils from '../lib/utils';

const { loadImage, loadBackgroundImage, dom: { isVisible, closest } } = utils;

const classes = {
	component:  '.js-ProgressiveMedia',
	image:      '.js-ProgressiveMedia__image',
	background: '.js-ProgressiveMedia__background',

	isBackgroundLoaded: '.is-background-loaded',
	isImageLoaded: '.is-image-loaded'
};

const attributes = {
	/**
	 * The attribute for lazy loaded images that tells where
	 * to retrieve the url for the image.
	 * @type {String}
	 */
	src: 'data-src'
};

/**
 * Images to be lazy loaded.
 * @type {Array}
 */
const lazyImages = $$(classes.image);

/**
 * Elements to have their background image set.
 * @type {Array.<Element>}
 */
const lazyBackgrounds = $$(classes.background);

// Do an initial check to see if any images are visible on the screen
setTimeout(function () {
	lazyImages.forEach(function (image) {
		let src;

		if (isVisible(image, true)) {
			src = image.getAttribute(attributes.src);
			loadImage(image, src)
				.then(onImageLoaded, onImageError);
		}
	});

	lazyBackgrounds.forEach(function (background) {
		let src;

		if (isVisible(background, true)) {
			src = background.getAttribute(attributes.src);
			loadBackgroundImage(background, src)
				.then(onBackgroundImageLoaded, onImageError);
		}
	});
}, 200);

function onImageError(err) {
	console.log('error', err);
}

/**
 * Adds the "is-loaded" attributes to the progressive media component
 * @param  {Event} event
 * @return {void}
 */
function onBackgroundImageLoaded(element) {
	element.classList.add(classes.isBackgroundLoaded.replace('.', ''));
}

function onImageLoaded(image) {
	image.classList.add(classes.isImageLoaded.replace('.', ''));
}

Visibility
	.once({
		elements: lazyImages,
		handler({ target }) {
			const src = target.getAttribute(attributes.src);
			loadImage(target, src)
				.then(onImageLoaded, onImageError);
		},
		past: true
	});

Visibility
	.once({
		elements: lazyBackgrounds,
		handler({ target }) {
			const src = target.getAttribute(attributes.src);
			loadBackgroundImage(target, src)
				.then(onBackgroundImageLoaded, onImageError);
		},
		past: true
	});