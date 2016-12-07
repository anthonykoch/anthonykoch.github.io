'use strict';

import Vue from 'vue';

import * as dom from '../../utils/dom';

/**
 * Adapted from http://codepen.io/KrisOlszewski/pen/Dnktj
 */

const TIME  = 500;
const DELAY = 350;
const RELOCATION_DELAY = 300;

const fadeOptions = {

	codepen: '#1a1c1d',

	light: 'white',

	dark: '#2b292b'

};

const hooks = {

	overlay: '.js-codepen-overlay',

	background:  '.js-codepen-background',

	preview: '.js-codepen-preview',

	ripple: '.js-ripple',

	container: '.js-codepen-container',

	buttonTryBlade: '.js-try-blade'

};

const classes = {

	isCodepenPreviewShowing: 'CodepenPreview--is-showing',

	isRippleExpanding: 'Ripple-inner--is-expanding'

};

const $overlay        = $(hooks.overlay);
const $backgrounds    = $$(hooks.background);
const $previews       = $$(hooks.preview);
const $buttonTryBlade = $(hooks.buttonTryBlade);

$overlay.style.transitionDuration = TIME + 'ms';
$overlay.style.transitionDelay = DELAY + 'ms';

const promises = $backgrounds.map($background => {
	return dom.loadImage($background.dataset.url);
});

Promise.all(promises)
	.then(() => {
		$backgrounds.forEach($background => {
			const url = $background.dataset.url;
			$background.style.backgroundImage = `url('${url}')`;
		});

		$previews.forEach($preview => {
			$preview.classList.add(classes.isCodepenPreviewShowing);
		});
	});

$previews.forEach($preview => {
	const href = $preview.href;


	$.events($preview, {

		click: function onCodepenLinkClick(e) {
			if (e.which === 2) {
				return;
			}

			e.preventDefault();

			if (e.which !== 1) {
				return;
			}

			overlay.show({

				fade: $preview.getAttribute('data-fade')

			}, () => {
				setTimeout(() => {
					window.location = href;
				}, RELOCATION_DELAY);
			});
		}

	});
});

function showOverlay() {

}

const overlay = {

	show({ fade, duration }={}, callback) {
		const backgroundColor =
			typeof fadeOptions[fade] === 'string'
				? fadeOptions[fade]
				: 'white';

		$overlay.style.display = 'block';
		$overlay.style.pointerEvents = 'auto';
		$overlay.style.backgroundColor = backgroundColor;
		$overlay.style.transitionDuration =
			typeof duration === 'number'
				? duration + 'ms'
				: 300 + 'ms';

		setTimeout(() => {
			$overlay.style.opacity = '1';
			callback();
		}, 0)
	}

};
