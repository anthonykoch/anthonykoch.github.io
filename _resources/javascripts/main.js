'use strict';

import 'babel-polyfill';
import'fastclick';
import './polyfills';
// Waypoints is installed onto window
import'./lib/waypoints';
import './components/ripple';
import { Overlay } from './components/overlay';

setTimeout(function () {
	hljs.initHighlighting();
	setTimeout(function () {
		$$('.hljs')
			.forEach(code => code.setAttribute('limit-selection', true));

		require('./text-selection');
	}, 100);
}, 0);

const bodyFadeOutOverlay = Overlay.create({
	style: {
		background: 'white'
	}
});

$$('.js-codepen-preview')
	._.events({
		click: function (e) {
			// Avoid hyperlink changing window location
			e.preventDefault();
			const href = this.querySelector('.CodepenPreview__link').href;

			// Delay so the ripple effect inside the preview shows
			setTimeout(() => {
				bodyFadeOutOverlay.show();
				setTimeout(function () {
					window.location = href;
				}, 300);
			}, 300);
		}
	});