'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import storage from 'store';
import { mapState, mapActions } from 'vuex';

import * as _ from '../../utils/_';

let store;
let app;

const KEY_TAB   = 9;
const KEY_ENTER = 13;

const STORAGE_KEY = 'state';

const $app = $('.js-br-app');

Vue.component('br-file-list-item', {

	template: $('.js-template-br-file-list-item').innerHTML,

	props: ['file'],

	data() {
		return {

			isEditingPath: false,

			path: this.file.path

		};
	},

	computed: {

		filePath() {
			return this.file.path;
		}

	},

	methods: {

		deleteFile() {
			this.$emit('file:delete', this.file);
		},

		enableEditingPath() {
			this.isEditingPath = true;

			Vue.nextTick(() => {
				this.$refs.input.focus();
			});
		},

		updateActiveFile() {
			this.$emit('file:set-current', this.file.id);
			this.$emit('pane:update', 'code');
		},

		updateFilePath() {
			console.log(this.file.path, this.path);

			if (this.file.path !== this.path) {
				this.$emit('file:update-path', this.file.id, this.path);
			}

			this.$refs.input.blur();
		}

	}

});

function App({ store, el }) {

	return {

		el,

		store,

		data: {

			paneMessages: [
				`Hi, these are files you can include into your template`,
				`or you can extend them using @extend`,
				`who am I to tell you what to do?`
			],

			paneMessageIndex: 0,

			newFileName: '',

			// FIXME: transition is weird on multiple clicks and input
			//        shadow shows under on mobile
			isInputNewFileFocused: false

		},

		created() {
			const time = 5000;

			const loop = () => {
				this.paneMessageIndex =
					this.paneMessageIndex < this.paneMessages.length - 1
						? this.paneMessageIndex + 1
						: 0;

				setTimeout(loop, time)
			}

			// setTimeout(loop, time);
		},

		computed: {

			...mapState([
				'files',
				'activeFile',
				'activePane',
				'jsonHeader',
				'contents',
				'output',
				'error'
			]),

			paneMessage() {
				return this.paneMessages[this.paneMessageIndex];
			}

		},

		watch: {

			activeFile(file) {
				this.updateJsonHeader(file.id, file.header);
				this.updateContents(file.contents);
				this.updateOutput(file.id);
			}

		},

		methods: {

			...mapActions([
				'removeFile',
				'updateActivePane',
				'updateActiveFile'
			]),

			updateFilePath(id, value) {
				this.$store.dispatch('updateFilePath', { id, value });
			},

			updateOutput(id) {
				this.$store.dispatch('updateOutput', { id });
			},

			updateContents(newContents) {
				this.$store.dispatch('updateContents', {

					id: this.activeFile.id,

					contents: newContents

				});
			},

			updateJsonHeader(id, value) {
				this.$store.dispatch('updateJsonHeader', { id, value });
			},

			onInputleftKeydown(e) {
				// FIXME: I don't know if this is necessary
				if (e.target.value.length > 5000) {
					e.preventDefault();
				}
			},

			onJsonHeaderKeyup(e) {
				this.updateJsonHeader(this.activeFile.id, e.target.value);
			},

			onInputLeftKeyup: _.debounce(function () {
				this.updateContents(this.$refs.inputLeft.value);
			}, 150),

			addFile() {
				const value = this.newFileName;

				if (value.trim() === '') {
					return;
				}

				this.newFileName = '';
				this.isInputNewFileFocused = false;

				Vue.nextTick(() => this.$refs.inputNewFile.blur());
				this.$store.dispatch('addFile', { value });
			}

		}
	};
}

new Waypoint({

	element: $app,

	offset: '120%',

	handler() {
		// TODO: Load in individual icons
		document.head.appendChild(
				$.create('link', {
					rel: 'stylesheet',
					href: 'http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
				})
			);

		// TODO: Lazy load Vue and Vuex
		require.ensure(['../../vendor/blade', './store'], function (require) {
			console.log('Boot');

			Vue.use(Vuex);

			window.store = store = new Vuex.Store(
					{ ...require('./store').default }
				);

			store.subscribe(function onStoreChange(mutation, state) {
				const { payload, type } = mutation;

				console.time('storage');
				storage.set(STORAGE_KEY, state);
				console.timeEnd('storage');

				console.log('Mutation:', mutation, state);
			});

			// IMPORTANT: Init app AFTER assigning blade
			window.app = app = new Vue(
					App({ store, el: $app })
				);

			app.updateOutput(app.activeFile.id);
		});

		this.destroy();
	},

});
