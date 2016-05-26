'use strict';

/**
 * Allows images to be lazy loaded
 *
 * Progressive media images are loaded in after the have been scrolled
 * into view.
 */

import utils from '../lib/utils';
import Stackblur from '../lib/stackblur';

const { loadImage, loadBackgroundImage, dom: { isVisible, closest } } = utils;

const classes = {
	component:  '.js-ProgressiveMedia',
	image:      '.js-ProgressiveMedia__image',
	background: '.js-ProgressiveMedia__background',
	thumbnail: '.js-ProgressiveMedia__thumb',
	canvas: '.js-ProgressiveMedia__canvas',

	isBackgroundLoaded: '.is-background-loaded',
	isImageLoaded: '.is-image-loaded'
};

const attributes = {
	/**
	 * The attribute for lazy loaded images that tells where
	 * to retrieve the url for the image.
	 * @type {String}
	 */
	src: 'data-src',
	blur: 'data-blur'
};

const CANVAS_BLUR_RADIUS = 8;

/**
 * Elements to have their background image set.
 * @type {Array.<Element>}
 */
const lazyBackgrounds = $$(classes.background);

/**
 * Draws an image into the canvas. The image can be optionally blurred
 * @param  {Element} canvas     The canvas to draw the image onto
 * @param  {Element} thumbnail  The image used to draw onto the canvas
 * @param  {Number}  blurRadius The amount to blur the canvas
 * @return {void}
 */
function drawCanvasWithBlur(canvas, thumbnail, blurRadius) {
	var context = canvas.getContext('2d');

	// Draw the thumbnail onto the canvas
	context.drawImage(thumbnail, 0, 0,

		// These two arguments allow the canvas image to scale
		thumbnail.naturalWidth, thumbnail.naturalHeight,

		0, 0, canvas.width, canvas.height);
	// Blur the canvas
	Stackblur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, blurRadius);
}

$$('.js-ProgressiveMedia').forEach(function (element) {
	const thumbnail     = element.querySelector(classes.thumbnail);
	const canvas        = element.querySelector(classes.canvas);
	const intrinsicFill = element.parentNode;
	const blurAttr      = canvas.getAttribute(attributes.blur);
	const blur          = parseInt(blurAttr, 10);
	const percentage    = (thumbnail.naturalHeight / thumbnail.naturalWidth) * 100;

	// If it's already set, we don't want to possibly make elements reflow
	if ( ! intrinsicFill.style.paddingBottom) {
		intrinsicFill.style.paddingBottom = percentage + '%';
	}

	// Wait for the thumbnail to load if it hasn't
	if (thumbnail.naturalWidth === 0 || ! thumbnail.complete) {
		thumbnail.addEventListener('load', function onImageLoaded() {
			// It's good practice to remove unecessary listeners
			thumbnail.removeEventListener('load', onThumbnailLoad);

			// Draw the canvas
			drawCanvasWithBlur(canvas, thumbnail, blur || CANVAS_BLUR_RADIUS);
		});
	} else {
		// The thumbnail is already loaded, draw it onto the canvas
		drawCanvasWithBlur(canvas, thumbnail, blur || CANVAS_BLUR_RADIUS);
	}

	new Waypoint({
		element,
		handler: handleWaypoint,
		offset: '80%'
	})
});

function handleWaypoint() {
	const { element } = this;
	const image       = element.querySelector(classes.image);
	const src         = element.getAttribute(attributes.src);

	image.src = src;
	image.addEventListener('load', function onImageLoaded() {
		image.classList.add('is-image-loaded');
		image.removeEventListener('load', onImageLoaded);
	});
}