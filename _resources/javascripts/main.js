'use strict';

import './polyfills';
import './vendor/waypoints';

import { Overlay } from './components/overlay';
import './components/ripple';

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
