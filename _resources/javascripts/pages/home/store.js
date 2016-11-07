'use strict';

import path             from 'path';
import { EventEmitter } from 'events';

import localStore from 'store';

{
	let i = 1;
	var uniqueId = () => i++;
}

let state          = {};
let changes        = {};
let oldState       = {};
let localStoreKeys = {};

function normalizePath(filePath) {
	return path.normalize(
			filePath.toString()
				.replace(/\.blade$/, '')
				.replace(/\\/g, '/') + '.blade'
		)
}

const Store = {

	removeFile(id) {
		const newFiles = state.files.filter(file => +file.id !== +id);
		let currentFileId = state.currentFileId;

		if (+state.currentFileId === +id && newFiles.length) {
			currentFileId = +newFiles[0].id;
		}

		this.__update({
			currentFileId,
			files: newFiles
		});
	},

	removeEditable() {
		this.__update({
			editId: NaN
		});
	},

	updateFileName(id, newFilePath) {
		const file = this.getFileById(id);

		if (file == null || newFilePath.trim() === '') {
			return;
		}

		const filePath = normalizePath(newFilePath);

		const newFiles = state.files.map(file => {
			if (+file.id === +id) {
				return Object.assign({}, file, { path: filePath });
			}

			return file;
		});

		this.__update({
			files: newFiles
		});
	},

	setEditable(id) {
		this.__update({
			editId: +id
		});
	},

	setCurrentFile(id) {
		const file = this.getFileById(id);

		if (file == null) {
			return;
		}

		this.__update({
			page: '/edit',
			currentFileId: +id
		});
	},

	setCurrentFileContents(contents) {
		const newFiles = state.files.map(file => {
			if (file.id === state.currentFileId) {
				return Object.assign({}, file, {
					contents: contents
				});
			}

			return file;
		});

		this.__update({
			files: newFiles,
		});
	},

	addNewFile(_newFilePath, defaultContents) {
		const { files } = state;

		const newFilePath = normalizePath(_newFilePath)

		const hasFile =
			files.some((file) => {
				const comparator = normalizePath(file.path.toLowerCase());
				const filePath = newFilePath.toLowerCase();

				return comparator === filePath;
			});

		if (hasFile) {
			return;
		}

		const newFile = {
			id: uniqueId(),
			path: newFilePath,
			contents:
`{
    "name": "${newFilePath.replace(/"/g, '\\"')}"
}
---

`
		};

		this.update({
			page: `/edit`,
			currentFileId: newFile.id,
			files: files.concat(newFile)
		});
	},

	setPage(newPage) {
		this.__update({ page: newPage });
	},

	getFileById(id) {
		return state.files.reduce((result, file) => {
			return +file.id === +id ? file : result;
		}, null);
	},

	update(newState) {
		this.__update(newState);
	},

	getChanges() {
		return Object.assign({}, changes);
	},

	getState() {
		return Object.assign({}, state);
	},

	getOldState() {
		return Object.assign({}, oldState);
	},

	mapToLocalStore(keys) {
		localStoreKeys = Object.assign({}, keys);
	},

	emitChange() {
		this.emit('change', this.getState(), this.getChanges(), 123, 546);
	},

	uniqueId,

	__update(newState) {
		changes = Object.keys(newState)
			.reduce((changes, key) => {
				changes[key] = true;
				return changes;
			}, {});

		oldState = state;
		state = Object.assign({}, state,  newState);

		for (let key in localStoreKeys) {
			localStore.set(localStoreKeys[key], state[key]);
		}

		this.emitChange();
	}
};

Object.assign(Store, EventEmitter.prototype);

module.exports = Store;
