/**
 * file: utils.js
 * Defines various utility functions
 */

const RE_END_FORWARD_SLASH = /\/$/;

/**
 * from http://davidwalsh.name/essential-javascript-functions
 */
function debounce(func, wait, immediate) {
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
function throttle(fn, threshold=200, thisBinding) {
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

/**
 * Gets the scroll top of the window
 * @return {Number}
 */
function getWindowScrollTop() {
	return Math.max(window.pageYOffset, document.body.scrollTop)
}

/**
 * Gets the parent with the specified class name.
 * Only one class name can be passed, and the class
 * name must not contain a dot.
 * @param  {Element} node
 * @param  {string} className
 * @return {Element|null}
 */
function closest(node, className) {
	var parent = node.parentNode;

	for (; parent !== document && parent !== undefined && parent !== null; parent = parent.parentNode) {
		if (parent.classList.contains(className)) {
			return parent;
		}
	}

	return null;
}

/**
 * Returns the elements offset left and top relative to the document
 * @param  {Element} element
 * @return {Object}
 */
function offset(element) {
	var rect = getBoundingClientRect();
	var docElem = document.documentElement;

	return {
		top: rect.top + window.pageYOffset - docElem.clientTop,
		left: rect.left + window.pageXOffset - docElem.clientLeft
	};
}

/**
 * Returns true if the element is in the viewport
 * @param  {Element} element
 * @param  {Boolean} past    Whether or not to return true if the element has been scrolled past
 * @return {Boolean}
 */
function isVisible(element, past) {
	var rect = element.getBoundingClientRect();
	var docElem = document.documentElement;
	var innerHeight = window.innerHeight || docElem.clientHeight;
	var innerWidth = window.innerWidth || docElem.clientWidth;

	if (past) {
		// Not sure if the left part is correct
		return (rect.top - innerHeight) <= 0 && rect.left >= 0;
	}

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= innerHeight &&
		rect.right <= innerWidth
	);
}

/**
 * Returns a simple unique id
 * @return {Number}
 */
var uniqueId = (function () {
	var id = 0;
	return function uniqueId() {
		return id++;
	}
}());

/**
 * Sets the src attribute onto an image. The promise returned will
 * resolve when the image loads and reject when it errors. The resolved
 * value will be the image the src was set on.
 * @param {Element} element
 * @param {Promise}
 */
function loadImage(target, src) {
	return new Promise(function (resolve, reject) {
		if (typeof src !== 'string') {
			return reject(new Error(`The src passed was not of type string, got "${src}"`));
		}

		target.src = src;
		target.addEventListener('load', function onImageLoaded(event) {
			this.removeEventListener('load', onImageLoaded);
			resolve(target);
		});
		target.addEventListener('error', function onImageLoadError(event) {
			this.removeEventListener('error', onImageLoadError)
			reject(target);
		});
	});
}

/**
 * Sets the background image onto an element.
 * A promise will be return that will resolve when the image loads and rejects
 * when there is an error loading the image. The resolved value will be the
 * element the background image was set on.
 * @param {Element} target The element to set the background image on
 * @param {Promise}
 */
function loadBackgroundImage(target, src) {
	return new Promise(function (resolve, reject) {
		var imageElement;

		if (typeof src !== 'string') {
			return reject(new Error(`The src passed was not of type string, got "${src}"`));
		}

		imageElement = document.createElement('img');
		imageElement.src = src;
		imageElement.addEventListener('load', function onImageLoaded(event) {
			target.style.backgroundImage = `url('${src}')`;
			this.removeEventListener('load', onImageLoaded);
			resolve(target);
		});
		imageElement.addEventListener('error', function onImageLoadError(event) {
			this.removeEventListener('error', onImageLoadError)
			reject.call(target);
		});
	});
}

function getNestedProperty(obj, str) {
	const props = str.split('.');
	const length = props.length - 1;
	let i = 0;
	let current = obj;

	while ((current = current[props[i]]) !== undefined && i !== length) {
		i++;
	}

	return current === undefined ? null : current;
}

export default {
	_: {
		throttle,
		debounce,
		uniqueId,
		getNestedProperty
	},
	loadBackgroundImage,
	loadImage,
	dom: {
		getWindowScrollTop,
		closest,
		offset,
		isVisible,
	},
};