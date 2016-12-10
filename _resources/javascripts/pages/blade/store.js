'use strict';

import path from 'path';

import storage from 'store';

import Blade from '../../vendor/blade';

const STORAGE_KEY = 'state';

{
	let id = 0;
	var uniqueId = () => id++;
}

const isSameId = (a, b) => +a === +b;

const isSamePath = (a, b) => {
	return normalizePath(a.toLowerCase()) === normalizePath(b.toLowerCase());
};

const master = {

	id: uniqueId(),

	path: '/layouts/master.blade',

	range: {
		start: 0,
		end: 0
	},

	header:
`{
	"file": "/layouts/master.blade",
	"user": {
		"name": "Michael Weston"
	}
}`,

	contents:
`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8"/>
	<title>@yield('title')</title>
</head>
<body>

	@yield('content')

</body>
</html>
`
};

const home = {

	id: uniqueId(),

	path: '/pages/home.blade',

	range: {
		start: 87,
		end: 87
	},

	header:
`{
  "file": "/pages/home.blade",
  "user": {
    "name": "Michael Weston"
  }
}`,

	contents:
`
@extends('layouts.master')

@section('content')

  @if(user)
    Hello {{ user.name }}
  @else
    Sign in?
  @endif

@stop
`

};

const user = {

	id: uniqueId(),

	path: '/includes/user.blade',

	range: {
		start: 87,
		end: 87
	},

	header:
`{
  "file": "/includes/user.blade"
}`,

	contents: `Have a great day!`

};

const defaultFiles = [master, home, user];
const defaultId    = defaultFiles.findIndex(file => file === home);
const defaultFile  = home;

// NOTE: An attempt to make the browser optimize Blade code
Array(2).fill(Number).forEach(function () {
	setTimeout(() => {
		console.time('hot');
		Blade.render(
				defaultFile.contents,
				{ user: '' },
				{
					files: defaultFiles,
					debug: true
				}
			)
		console.timeEnd('hot');
	});
});

const initialState = {

	files: defaultFiles.slice(0),

	activeFile: { ...defaultFile },

	contents: defaultFile.contents,

	activePane: 'code',

	jsonHeader: defaultFile.header,

	output: '',

	error: ''

};

const state =
	storage.has(STORAGE_KEY)
		? storage.get(STORAGE_KEY)
		: initialState;

const mutations = {

	REMOVE_FILE(state, { id }) {
		const index = state.files
			.findIndex(file => isSameId(file.id, id));

		if (state.files.length === 1) {
			state.files = defaultFiles.slice(0);
		} else {
			state.files.splice(index, 1);
		}

		// Switch to a different current file if it's being removed
		if (isSameId(state.activeFile.id, id)) {
			state.activeFile = { ...state.files[0] };
		}
	},

	UPDATE_FILE_PATH(state, { id, value }) {
		const file = methods.getFileById(state, id);

		if (file == null || value.trim() === '') {
			return;
		}

		file.path = normalizePath(value)
	},

	UPDATE_ACTIVE_FILE(state, { id }) {
		const file = methods.getFileById(state, id);

		state.activeFile = file;
		state.contents   = file.contents;
	},

	UPDATE_CONTENTS(state, { id, contents }) {
		const file = methods.getFileById(state, id);

		state.contents = contents;
		file.contents = contents;
	},

	UPDATE_OUTPUT(state, { id }) {
		const file  = methods.getFileById(state, id);
		const files = state.files;

		console.log('Rendering:', file.id, file);

		const options = {
			files,
			debug: true
		};

		const { error, data } = renderFile(file, options);

		state.error = error == null ? '' : error.message;

		if (error == null) {
			state.output = data == null ? '' : data;
		}
	},

	UPDATE_ACTIVE_PANE(state, { value }) {
		console.log('Updating pane:', value);
		state.activePane = value;
	},

	UPDATE_JSON_HEADER(state, { id, value }) {
		const file = methods.getFileById(state, id);
		file.header = value;
		state.jsonHeader = value;
	},

	ADD_FILE(state, { value }) {
		const { files } = state;

		const newFilePath = normalizePath('/' + value);
		const hasFile = files.some(file => isSamePath(file.path, newFilePath));

		if (hasFile) {
			return;
		}

		const id = uniqueId();

		const newFile = {

			id,

			path: newFilePath,

			header: `{\n  "name": "${newFilePath.replace(/"/g, '\\"')}"\n}`,

			contents: `<div>\n  New file: '{{ name }}'\n</div>`,

		};

		state.activeFile = newFile;
		state.files.push(newFile);
	},

};

const actions = {

	removeFile({ commit }, payload) {
		commit('REMOVE_FILE', payload);
	},

	updateFilePath({ commit }, payload) {
		commit('UPDATE_FILE_PATH', payload);
	},

	updateActiveFile({ commit }, payload) {
		commit('UPDATE_ACTIVE_FILE', payload);
		commit('UPDATE_OUTPUT', { id: payload.id });
	},

	updateActivePane({ commit }, payload) {
		commit('UPDATE_ACTIVE_PANE', payload);
	},

	updateContents({ commit, state }, payload) {
		commit('UPDATE_CONTENTS', payload);
		const id = state.activeFile.id;

		if (id === payload.id) {
			commit('UPDATE_OUTPUT', { id });
		}
	},

	updateJsonHeader({ commit }, payload) {
		commit('UPDATE_JSON_HEADER', payload);
		commit('UPDATE_OUTPUT', { id: payload.id });
	},

	updateOutput({ commit, state }, payload) {
		commit('UPDATE_OUTPUT', payload);
	},

	addFile({ commit }, payload) {
		commit('ADD_FILE', payload);
	}

};

const methods = {

	getFileById(state, id) {
		return state.files.find(file => isSameId(file.id, id)) || null;
	}

};

const getters = {

	//

};

function normalizePath(filePath) {
	return path.normalize(
			filePath.toString()
				.trim()
				.replace(/\.blade$/, '')
				.replace(/\\/g, '/') + '.blade'
		);
}

/**
 * Renders a blade file. Also checks for a JSON header, and strips it from
 * the file.
 *
 * @return {Object}
 */

function renderFile(file, { files: _files }) {
	let data = null;
	let err = null;
	let locals = {};
	let header = file.header;

	try {
		if (file.header.trim() !== '') {
			locals = JSON.parse(file.header);
		}
	} catch (error) {
		// TODO: createSourceError for JSON error
		err = error;
		console.log(error);
	}

	try {
		if (err === null) {
			console.time('render');
			data = Blade.render(
					file.contents,
					locals,
					{
						files: _files,
						debug: true
					}
				);
			console.timeEnd('render');
		}
	} catch (error) {
		err = error;
		console.log(error);
	}

	return {
		header,
		data,
		locals,
		error: err
	}
}

export default {

	strict: process.env.NODE_ENV !== 'production',

	state,

	getters,

	actions,

	mutations

};
