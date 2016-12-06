'use strict';

import Vue from 'vue';

const template = `
<div
	class="Overlay"
	style="display: none"
	:style="{ display: display }">
</div>
`;

Vue.component('overlay', {

	template: ``,

	props: ['isOverlayVisible'],

	computed: {

		display() {
			return !! this.isOverlayVisible;
		}

	}

});
