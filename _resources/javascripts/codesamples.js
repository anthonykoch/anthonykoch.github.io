'use strict';

/**
 * Handles text selection of PRE and CODE elements when "ctrl + a" after a PRE or CODE element has been clicked.
 */

const A_KEY = 65;
let lastActivePre = null;

window.addEventListener('click', function (event) {
	const { target, target: { firstElementChild } } = event;

	if (target.nodeName === 'CODE' && target.parentNode.nodeName === 'PRE') {
		lastActivePre = target.parentNode;
	}
	else if (target.nodeName === 'PRE' && firstElementChild && firstElementChild.nodeName === 'CODE') {
		lastActivePre = target;
	}
	else {
		lastActivePre = null;
	}
});

window.addEventListener('keydown', function (event) {
	if (event.ctrlKey && event.which === A_KEY && lastActivePre !== null) {
		event.preventDefault();
		setTimeout(selectElementText.bind(null, lastActivePre), 1);
	}
});

function selectElementText(element, context=document) {
	const selection = window.getSelection();
	const range = context.createRange();

	range.selectNodeContents(element);
	selection.removeAllRanges();
	selection.addRange(range);
}