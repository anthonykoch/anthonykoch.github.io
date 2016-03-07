'use strict';

import utils from './utils';

const { dom: { isVisible } } = utils;

/**
 * The amount of time to throttle the on scroll event
 * @type {Number}
 */
const THROTTLE_TIME = 200;

/**
 * The object that allows subscribing and unsubscribing to visibility events.
 * Notes: What about rounded borders?
 * @type {Object}
 */
var Visibility = {
	subscribe,
	unsubscribe,
	once
};

/**
 * Holds the subscribers. Each subscriber object will look like
 * The properties of a subscriber object is:
 * handler  // the function that is called when an element is in view
 * elements // the elements to check on scroll
 * options  // holds information about the option that were passed to subscribe
 * @type {Object}
 */
var subscribers = [];

var listener = utils._.throttle(handleScrollAndResize, THROTTLE_TIME);
window.addEventListener('scroll', listener);
window.addEventListener('resize', listener);

/**
 * Checks if the image is in the viewport
 * @return {void}
 */
function handleScrollAndResize() {
	requestAnimationFrame(checkVisibility, 0);
}

/**
 * Checks if the elements are in the viewport.
 * If the options for the subscriber is set to only notify
 * once per element, and there no more elements to notify,
 * the subscriber is removed from the list of subscribers.
 * @return {void}
 */
function checkVisibility() {
	subscribers = subscribers
		.map(function (subscriber) {
			var { handler, elements, options: { once, past }} = subscriber;
			var seenElements = [];
			var length = elements.length;
			var index = 0;
			var sub;

			for (; index < length; index++) {
				let element = elements[index];
				let isInViewport = isVisible(element, past);

				// If the element is or was in the viewport
				if (isInViewport) {
					handler({
						target: element,
					});
				}

				if (isInViewport && once) {
					seenElements.push(element);
				}
			}

			// Remove the elements that have already been seen so we
			// don't notify that the element is in the viewport anymore
			if (once) {
				sub = {
					handler,
					elements: elements
						.filter(function (element) {
							return ! seenElements.includes(element)
						}),
					options: {
						once,
						past
					}
				};
			} else {
				sub = subscriber;
			}

			// Return undefined and filter later to remove the undefined value
			if (! sub.elements.length) {
				return;
			}

			return sub;
		})
		.filter(item => item !== undefined);
}

/**
 * For each element found by the selector passed, the handler will be notified
 * when the element has been scrolled into view.
 * @param  {Array.<Elements>|String} options.elements     The elements to be notified of
 * @param  {Boolean}  options.container    (not yet implemented)
 * @param  {Boolean}  options.offset       (not yet implemented)
 * @param  {Boolean}  options.once         If true, the subscriber is only notified once per element
 * @param  {Boolean}  options.past         Whether or not the element is considered in view when it has been scroll past
 * @param  {Boolean}  options.throttled    Whether or not to throttle the checks on scroll (not yet implemented)
 * @param  {Number}   options.throttleTime The amount of time to throttle the scroll       (not yet implemented)
 * @param  {Function} options.handler      The handler that will be called when an element becomes visible
 * @return {void}
 */
function subscribe({ elements=[], handler, once, past, throttled, throttleTime }) {
	var subscriber;

	if ( ! handler) {
		throw new Error('Handler not specified for subscriber');
	}

	if (Number.isFinite(elements.length) && elements.length >= 0) {
		elements = [...elements]
			.filter(item => item && item.nodeType === document.ELEMENT_NODE);
	} else {
		throw new Error('Argument "elements" is not a collection, instead got ' + elements);
	}

	subscriber = {
		handler,
		elements,
		options: {
			once,
			past
		}
	};

	subscribers.push(subscriber);
}

function unsubscribe(handler) {
	subscribers = subscribers
		.filter(function (item) {
			return item.handler !== handler;
		});
}

/**
 * An alias for subscribe except the optoin "once" is set to true
 */
function once(options) {
	options.once = true;
	Visibility.subscribe(options);
}

export default Visibility;