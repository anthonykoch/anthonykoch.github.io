'use strict';

import { EventEmitter } from 'events';

/**
 * Removes and references to the element so it may be garbage collected.
 * @return {void}
 */
function destroy() {
	this.element.removeEventListener('click', this.listener);
	this.element = null;
	this.removeAllListeners();
}

/**
 * Fades in the overlay
 * @return {void}
 */
function show() {
	this.element.classList.add('is-showing');
	this.emit('show');
}

/**
 * Fades the overlay out
 * @return {void}
 */
function hide() {
	this.element.classList.remove('is-showing');
	this.emit('hide');
}

function createElement(element=document.createElement('div')) {
	return element;
}

function initElement(element, styles) {
	// Automatically insert a newly created overlay element into the body

	if ( ! element.parentNode ) {
		document.body.insertBefore(element, document.body.firstElementChild);
	}

	element.classList.add('js-overlay');
	element.classList.add('Overlay');
	$.style(element, styles);
}

function bindEvents(overlay, events) {
	const { element } = overlay;

	// Memory leak city if you don't remove the listeners afterward
	overlay._events = Object.keys(events)
		.reduce(function (_events, key) {
			_events[key] = function () {
				overlay.emit.call(overlay, key);
			};
			return _events;
		}, {});
}

export const Overlay = {
	create({ events, style, element: el }) {
		const overlayElement = createElement(el);
		const overlay = Object.assign({
			element: overlayElement,
			destroy,
			show,
			hide
		}, EventEmitter.prototype);

		initElement(overlayElement, style);
		bindEvents(overlay, Object.assign({}, events));

		return overlay;
	},
	adapt(options) {
		return this.create(options);
	}
};