'use strict';

/**
 * Returns a simple unique id
 * @return {Number}
 */

export const uniqueId = (function () {
	let id = 0;

	return function uniqueId() {
		return id++;
	}
}());

/**
 * from http://davidwalsh.name/essential-javascript-functions
 */

export function debounce(func, wait, immediate) {
	var timeout;

	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * Wraps the function passed and only allows it to be called
 * every few milliseconds.
 * @param  {Function} fn          The function that will be called when the time has passed
 * @param  {Number}   time        The number of milliseconds to throttle
 * @param  {*}        thisBinding The value to be used as "this" in the function called
 * @return {Function}
 */

export function throttle(fn, threshold=200, thisBinding) {
	var last, timeoutID;

	return function () {
		var now = Date.now();
		var timeSinceLastCall = now - last + threshold;
		// If no thisBinding was passed, use the value of "this" here
		var context = thisBinding === null || thisBinding === undefined ? this : thisBinding;

		if (last && now < last + threshold) {
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function call() {
				fn.call(context, arguments);
				last = now;
			}, threshold);
		} else {
			last = now;
			fn.apply(context, arguments);
		}
	};
}
