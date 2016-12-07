'use strict';

import * as dom from './utils/dom';

setTimeout(() => {
	hljs.initHighlighting();

	setTimeout(() => {
		$$('.hljs')
			.forEach(code => code.setAttribute('limit-selection', true));
	}, 100);
}, 0);

{
	document.createElement('ripple');

	$$('ripple').forEach(ripple => ripple.className = 'Ripple');

	$$('[has-ripple], [data-has-ripple]')
		.forEach($el => {
			$el.addEventListener('click', onRippleClick);
		});

	function onRippleClick({ pageX, pageY }) {
		const $ripples = $$('ripple', this);

		// Show and expand each ripple
		$ripples.forEach((ripple, index) => {
			const parentRect = this.getBoundingClientRect();
			const delay = 50;
			const multipler = 1.1;
			const time = (index === 0) ? 0 : index * delay * multipler;

			const { top: offsettop,
					left: offsetleft } = dom.getOffset(this.parentNode);

			const top  = pageY - offsettop;
			const left = pageX - offsetleft;

			ripple.classList.remove('Ripple--is-expanding');

			setTimeout(function () {
				ripple.style.top  = `${top}px`;
				ripple.style.left = `${left}px`;
				ripple.classList.add('Ripple--is-expanding');
			}, time);
		});
	}
}

{
	/**
	 * Limits selection of text when pressing ctrl+a to any element with
	 * the [limit-selection] attribute.
	 */

	const A_KEY = 65;

	let lastElementClicked = null;

	$$('[limit-selection]').forEach(function(item) {
		item.addEventListener('click', function () {
			lastElementClicked = this;
			console.log('wtf', lastElementClicked);
		});
	});

	window.addEventListener('keydown', function (event) {
		if (event.ctrlKey && event.which === A_KEY && lastElementClicked) {
			event.preventDefault();
			setTimeout(selectElementText.bind(null, lastElementClicked), 1);
			console.log(lastElementClicked)
		}
	});

	function selectElementText(element) {
		const doc = element.ownerDocument;
		const window = doc.defaultView.window;
		const selection = window.getSelection();
		const range = doc.createRange();

		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}
