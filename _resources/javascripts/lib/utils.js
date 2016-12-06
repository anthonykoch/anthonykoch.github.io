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
 * Gets the scroll top of the window
 * @return {Number}
 */
function getWindowScrollLeft() {
	return Math.max(window.pageXOffset, document.body.scrollLeft)
}

/**
 * Returns true if the object passed is a window instance
 * From jQuery
 * @param  {*}       obj
 * @return {Boolean}
 */
function isWindow(obj) {
	return typeof obj === 'object' && obj.window;
}

/**
 * Gets a window from an element
 * From jQuery
 */
function getWindow( elem ) {
	return isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

/**
 * Returns the elements offset left and top relative to the document
 * From jQuery
 * @param  {Element} element
 * @return {Object}
 */
function getOffset(element) {
	let rect;

	// Support: IE <=11 only
	// Running getBoundingClientRect on a
	// disconnected node in IE throws an error
	if ( ! element.getClientRects().length) {
		return { top: 0, left: 0 };
	}

	rect = element.getBoundingClientRect();

	// Make sure element is not hidden (display: none)
	if (rect.width || rect.height) {
		let doc = element.ownerDocument;
		let win = getWindow( doc );
		let docElem = doc.documentElement;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	}

	// Return zeros for disconnected and hidden elements (gh-2310)
	return rect;
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

export default {

	_: {

		throttle,

		debounce,

		uniqueId

	},

	load: {

		loadBackgroundImage,

		loadImage,

	},

	dom: {

		getWindowScrollLeft,

		getWindowScrollTop,

		getOffset

	},
};