'use strict';

import localStore from 'store';
import Store      from './store';

let Blade;

const KEY_TAB   = 9;
const KEY_ENTER = 13;

const BR_PAGE = 'blade:page';
const BR_FILES = 'blade:files';
const BR_CURRENT_FILE_ID = 'blade:files:current';

const $appRoot              = $('.js-br-app');
const $inputLeft            = $('.js-br-input-left');
const $inputRight           = $('.js-br-input-right');
const $errorInfo            = $('.js-br-error-message');
const $inputNewFile         = $('.js-br-input-new-file');
const $filesPane            = $('.js-br-files-pane');
const $filesPaneList        = $('.js-br-files-list');
const $buttonViewFiles      = $('.js-br-view-files');
const $buttonViewCode       = $('.js-br-view-code');

const classes = {
	filesListItem:  'br-FilesList-item',

	isErrorShowing:     'br-ErrorMessage--is-showing',
	isFilesPaneShowing: 'br-FilesPane--is-showing',
};

const jsHooks = {
	textFileName:   '.js-br-file-name-text',
	buttonDelete:   '.js-br-file-icon-delete',
	buttonEditName: '.js-br-file-icon-edit'
};

const master = {
	id: Store.uniqueId(),
	path: '/layouts/master.blade',
	contents:
`{
	"file": "/layouts/master.blade",
	"user": {
		"name": "Michael Weston"
	}
}
---
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
	id: Store.uniqueId(),
	path: '/home.blade',
	contents:
`{
	"file": "/pages/home.blade",
	"user": {
		"name": "Michael Weston"
	}
}
---

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

const defaultFiles = [master, home];

function createTemplates(_templates) {
	const templates = {};

	for (let name in _templates) {
		const html = $(_templates[name]).innerHTML;
		const element = document.createElement('div');

		element.innerHTML = html;
		templates[name] = element.children[0];
	}

	return templates;
};

const templates = createTemplates({
	fileListItem: '[data-template="br-file-list-item"]'
});

const deepAssign = require('deep-assign');

function render(state, changes) {
	console.log();
	console.time('render');
	const { page,
			editId,
			files,
			currentFileId } = state;

	if ( ! files.length) {
		return Store.update({ files: defaultFiles })
	}

	if (changes.files || changes.currentFileId || changes.editId) {
		console.time('updatelist');
		const treeItems = files.map(({ id, path: filePath }) => {

		return FileListItem.create({
					id,
					name: filePath,
					isEditing: editId === id
				});
		});

		const fileItems = updateList($filesPaneList, treeItems, (item, comparator) => {
			const $text           = $(jsHooks.textFileName, item);
			const $comparatorText = $(jsHooks.textFileName, comparator);

			if (comparator === null) {
				FileListItem.removeEventListeners(item);
			}

			if (+editId !== +item.dataset.id) {
				$text.setAttribute('contentEditable', false);
			} else {
				$text.setAttribute('contentEditable', true);
				const length = $text.textContent.length;

				setTimeout(() => {
					$text.focus();

					const range = document.createRange();
					const selection = window.getSelection();

					range.selectNode($text.firstChild);
					// range.collapse(false);
					selection.removeAllRanges();
					selection.addRange(range);
				}, 0);
			}

			if ($text.textContent !== $comparatorText.textContent) {
				$text.textContent = $comparatorText.textContent;
			}
		});

		console.timeEnd('updatelist');
	}

	const currentFile = Store.getFileById(currentFileId);

	if (changes.currentFileId || changes.files) {
		console.time('blade');
		const bladeOptions = { files };
		const {
				error,
				contents
			} = getRenderedBlade(currentFile.contents, bladeOptions);

		if (error) {
			$errorInfo.textContent = error.message;
			$errorInfo.classList.add(classes.isErrorShowing);
		} else {
			$inputRight.value = contents;
			$errorInfo.classList.remove(classes.isErrorShowing);
		}

		console.timeEnd('blade');
	}

	if (page.startsWith('/files')) {
		$filesPane.classList.add(classes.isFilesPaneShowing);
	} else if (page.startsWith('/edit')) {
		$filesPane.classList.remove(classes.isFilesPaneShowing);
		$inputLeft.focus();
	}

	if ($inputLeft.value !== currentFile.contents) {
		$inputLeft.value = currentFile.contents;
	}

	console.timeEnd('render');
}

/**
 * This is some ghetto pseudo react list diff thing.
 *
 * Updates the direct child elements of an element according to the tree
 * passed and the callback result. The callback is called with the real
 * element and the comparing element from the synthetic tree.
 *
 * If the comparing element can not be found in the synthetic tree, the
 * real element is removed. If callback returns a new element, the real
 * element is replaced with the element returned from the callback. If
 * the callback returns null, the real element is removed.
 *
 * @param {Element}        parent - The element to update
 * @param {Array<Element>} tree - The synthetic tree to compare to
 * @param {Function}       callback
 */

function updateList(parent, tree, callback) {
	const list = Array.from(parent.children);
	const ids = [];

	for (let i = list.length - 1; i >= 0; i--) {
		const item = list[i];
		let comparator = null;

		for (let i = 0; i < tree.length; i++) {
			if (tree[i].dataset.id === item.dataset.id) {
				comparator = tree[i];
			}
		}

		const element = callback(item, comparator);

		if (comparator === null || element === null) {
			parent.removeChild(item);
		} else if (element && element.nodeType === document.ELEMENT_NODE) {
			ids.push(element.dataset.id);
			parent.replaceChild(element, item);
		} else {
			ids.push(item.dataset.id);
		}
	}

	for (let i = 0; i < tree.length; i++) {
		if ( ! ids.includes(tree[i].dataset.id)) {
			parent.appendChild(tree[i]);
		}
	}
}

const FileListItem = {

	create({ name, id, isEditing }) {
		const fileListItem = templates.fileListItem.cloneNode(true);

		const textFileName   = $(jsHooks.textFileName,   fileListItem);
		const buttonDelete   = $(jsHooks.buttonDelete,   fileListItem);
		const buttonEditName = $(jsHooks.buttonEditName, fileListItem);

		textFileName.textContent  = name;
		textFileName.dataset.id   = id;
		fileListItem.dataset.id   = id;
		buttonDelete.dataset.id   = id;
		buttonEditName.dataset.id = id;

		textFileName.setAttribute('contentEditable', !! isEditing);

		textFileName.addEventListener('focusout', onFileTextFocusOut);
		textFileName.addEventListener('keyup',    onFileTextKeyUp);
		textFileName.addEventListener('click',    onViewFile);
		buttonDelete.addEventListener('click',    onFileDelete);
		buttonEditName.addEventListener('click',  onFileEnableEdit);

		return fileListItem;
	},

	removeEventListeners(node) {
		const textFileName   = $(jsHooks.textFileName,   node);
		const buttonDelete   = $(jsHooks.buttonDelete,   node);
		const buttonEditName = $(jsHooks.buttonEditName, node);

		textFileName.removeEventListener('focusout', onFileTextFocusOut);
		textFileName.removeEventListener('keyup',    onFileTextKeyUp);
		textFileName.removeEventListener('click',    onViewFile);
		buttonDelete.removeEventListener('click',    onFileDelete);
		buttonEditName.removeEventListener('click',  onFileEnableEdit);
	}

};


function onFileTextKeyUp(e) {
	const isEditable = this.getAttribute('contentEditable');

	if (isEditable === 'true' && e.keyCode === KEY_ENTER) {
		Store.updateFileName(this.dataset.id, this.textContent);
		Store.removeEditable();
	}
}

function onFileTextFocusOut() {
	Store.removeEditable();
}

function onFileDelete() {
	Store.removeFile(this.dataset.id);
}

function onFileEnableEdit() {
	Store.setEditable(this.dataset.id);
}

function onNewFileKeyUp(e) {
	if (e.keyCode !== KEY_ENTER) {
		return;
	}

	if (this.value.trim() === '') {
		return;
	}

	Store.addNewFile('/' + this.value);

	this.value = '';
}

function onViewFile() {
	const value = this.getAttribute('contentEditable');

	if (value === 'false') {
		Store.setCurrentFile(this.dataset.id);
	}
}

function onViewFilesPaneClick() {
	Store.setPage('/files');
}

function onViewEditorClick() {
	Store.setPage('/edit');
}

/**
 * Prevents from tab unfocusing the input. Why not just insert a tab character?
 * Inserting a tab character for every <tab> key press is a rabbit hole that
 * I do not want to go down.
 */

function onInputLeftKeyDown(e) {
	if (e.keyCode === KEY_TAB) {
		e.preventDefault();
	}
}

function onInputLeftKeyUp() {
	Store.setCurrentFileContents(this.value);
}

/**
 * Renders a blade file. Also checks for a JSON header, and strips it from
 * the file.
 *
 * @return {Object}
 */

function getRenderedBlade(value, { files: _files }) {
	const regex = /^(?:([\s\S]*?)\-\-\-(?:\r\n|[\r\n]))/u;
	const match = value.match(regex);
	let contents = null;
	let err = null;
	let json = {};

	const files = _files.map(file => {
		const contents = file.contents;
		const match = contents.match(regex);
		const newContents = contents.substring(match[0].length, contents.length);

		return Object.assign({}, file, {
			contents: newContents
		});
	});

	if (match) {
		value = value.substring(match[0].length, value.length);

		try {
			json = JSON.parse(match[1]);
		} catch (error) {
			err = err;
			console.log(error);
		}
	}

	try {
		contents = Blade.render(value, json, { files, debug: true });
	} catch (error) {
		err = error;
		console.log(err);
	}

	return {
		contents,
		error: err
	}
}

function escape(_html){
  var html = '' + _html;
  var regexResult = /["&<>]/.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
}



new Waypoint({
	element: $appRoot,
	offset: '120%',
	handler() {
		// TODO: Load in individual icons
		const link = $.create('link', {
			rel: 'stylesheet',
			href: 'http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
		});

		document.head.appendChild(link);

		require.ensure(['../../vendor/blade'], function (require) {
			$inputLeft.addEventListener('keyup', onInputLeftKeyUp);
			$inputLeft.addEventListener('keydown', onInputLeftKeyDown);
			$inputNewFile.addEventListener('keyup', onNewFileKeyUp);
			$buttonViewFiles.addEventListener('click', onViewFilesPaneClick);
			$buttonViewCode.addEventListener('click', onViewEditorClick);

			console.log('Boot');

			Blade = require('../../vendor/blade');

			Store.on('change', render);
			Store.mapToLocalStore({
				files: BR_FILES,
				page: BR_PAGE,
				currentFileId: BR_CURRENT_FILE_ID
			});

			Store.update({
				page: localStore.get(BR_PAGE, '/edit'),
				files: localStore.get(BR_FILES, defaultFiles),
				currentFileId: localStore.get(BR_CURRENT_FILE_ID, home.id),
			});
		});

		this.destroy();
	},
});
