import utils from '../lib/utils';

/**
 * Adapted from http://codepen.io/KrisOlszewski/pen/Dnktj
 */
$$('.js-ripple')
	.forEach(component => component.addEventListener('click', onRippleClick));

function onRippleClick({ target, pageX, pageY }) {
	const ripples = Array.from(this.querySelectorAll('.js-ripple-inner'));
	ripples.forEach(function (ripple, index) {
		const parentRect = target.getBoundingClientRect();
		const delay = (index === 0) ? 0 : index * 50 * 1.1;
		const { top: offsettop, left: offsetleft } = utils.dom.getOffset(target.parentNode);
		const top  = pageY - offsettop;
		const left = pageX - offsetleft;
		ripple.classList.remove('is-expanding');

		setTimeout(function () {
			ripple.style.top  = `${top}px`;
			ripple.style.left = `${left}px`;
			ripple.classList.add('is-expanding');
		}, delay);
	});
}