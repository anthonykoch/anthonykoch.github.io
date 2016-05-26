'use strict';

/**
 * Limits selection of text when pressing ctrl+a to any element with
 * the [limit-selection] attribute.
 */

const A_KEY = 65;
let lastElementClicked = null;

const els = document.querySelectorAll('[limit-selection]');

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