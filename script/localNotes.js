/*   BotForge © 2024, all rights reserved.   */

// No notes found image
function notesImage(type) {
	const modalImage = document.getElementById('modal-notes-notice');
	const widgetImage = document.getElementById('widget-notes-notice');
	if (type === 'hide') {
		modalImage.classList.add('hidden');
		widgetImage.classList.add('hidden');
	}
	if (type === 'show') {
		modalImage.classList.remove('hidden');
		widgetImage.classList.remove('hidden');
	}
}

// Function to update character count
function updateCharCount(inputElement) {
	const charCountElement = document.getElementById('char-count');
	charCountElement.textContent = inputElement.value.length;
}

// Function to add a note
function addNote() {
	const inputElement = document.getElementById('add-notes');
	const buttonElement = document.getElementById('add-note-button');
	const notesList = document.getElementById('notes-list');
	const localNotesList = document.getElementById('local-notes');
	const charCount = document.getElementById('char-count');

	const noteText = inputElement.value.trim();
	if (noteText === '') {
		return; // Empty notes sucks
	}

	if (notesList.children.length >= 25) {
		// Maximum 25 notes reached
		validateNotesAmount();
		return;
	}

	const noteElement = document.createElement('p');
	noteElement.classList.add('cursor-pointer');
	const deleteIcon = document.createElement('i');
	const checkIcon = document.createElement('i');
	const spanElement = document.createElement('span');

	deleteIcon.classList.add('ri-delete-bin-line', 'text-red-500', 'mr-2');
	checkIcon.classList.add('ri-check-line', 'text-green-500', 'mr-1');
	spanElement.textContent = noteText;

	noteElement.appendChild(deleteIcon);
	noteElement.appendChild(checkIcon);
	noteElement.appendChild(spanElement);

	noteElement.addEventListener('click', function() {
		toggleNoteState(this);
	});

	deleteIcon.addEventListener('click', function(event) {
		deleteNote(event, noteElement);
	});

	notesList.appendChild(noteElement);
	localNotesList.appendChild(createLocalNoteElement(noteText, false));

	if (notesList.children.length > 0) {
		notesImage('hide');
	} else {
		notesImage('show');
	}

	inputElement.value = '';
	inputElement.placeholder = 'Your note';
	inputElement.classList.remove('disabled-check');
	buttonElement.classList.remove('disabled-check');

	// Save notes to user's local cookie
	charCount.textContent = 0;
	saveNotesToCookie();
	validateNotesAmount();
}

// Function to toggle note state (completed or normal)
function toggleNoteState(noteElement) {
	const spanElement = noteElement.querySelector('span');
	if (spanElement.classList.contains('line-through')) {
		spanElement.classList.remove('line-through', 'alt-text');
		toggleLocalNoteState(spanElement.textContent, false);
	} else {
		spanElement.classList.add('line-through', 'alt-text');
		toggleLocalNoteState(spanElement.textContent, true);
	}

	// Save notes to user's local cookie
	saveNotesToCookie();
}

// Function to delete a note
function deleteNote(event, noteElement) {
	event.stopPropagation();
	const spanElement = noteElement.querySelector('span');
	noteElement.remove();
	deleteLocalNoteElement(spanElement.textContent);

	validateNotesAmount();
	// Save notes to user's local cookie
	saveNotesToCookie();
}

// Function to delete note in local notes list
function deleteLocalNoteElement(noteText) {
	const localNotesList = document.getElementById('local-notes');
	const localNoteElements = localNotesList.children;

	for (let i = 0; i < localNoteElements.length; i++) {
		const spanElement = localNoteElements[i].querySelector('span');

		if (spanElement && spanElement.nodeType === 1 && spanElement.textContent === noteText) {
			localNoteElements[i].remove();
		}
	}
}

// Function to create a local note element
function createLocalNoteElement(noteText, completed) {
	const noteElement = document.createElement('p');
	noteElement.classList.add('cursor-pointer');
	const checkIcon = document.createElement('i');
	const spanElement = document.createElement('span');

	checkIcon.classList.add('ri-check-line', 'text-green-500', 'mr-1');
	spanElement.textContent = noteText;

	noteElement.appendChild(checkIcon);
	noteElement.appendChild(spanElement);

	if (completed) {
		spanElement.classList.add('line-through', 'alt-text');
	}

	return noteElement;
}

function validateNotesAmount() {
	const inputElement = document.getElementById('add-notes');
	const buttonElement = document.getElementById('add-note-button');
	const notesList = document.getElementById('notes-list');

	if (notesList.children.length > 0) {
		notesImage('hide');
	} else {
		notesImage('show');
	}

	if (notesList.children.length < 25) {
		inputElement.placeholder = 'Your note';
		inputElement.classList.remove('disabled-check');
		buttonElement.classList.remove('disabled-check');
	} else {
		inputElement.value = '';
		inputElement.placeholder = 'Maximum notes reached (25)';
		inputElement.classList.add('disabled-check');
		buttonElement.classList.add('disabled-check');
	}
}

// Function to save notes to user's local cookie
function saveNotesToCookie() {
	const notesList = document.getElementById('notes-list');
	const notes = [];

	notesList.childNodes.forEach((noteElement) => {
		const spanElement = noteElement.lastChild;

		if (spanElement && spanElement.nodeType === 1) {
			const noteText = spanElement.textContent;
			const isCompleted = spanElement.classList.contains('line-through');

			notes.push({
				text: noteText,
				completed: isCompleted
			});
		}
	});

	// Convert notes array to JSON and save to dat local cookie
	document.cookie = `local-notes=${JSON.stringify(notes)};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
}

// Function to load notes from user's local cookie
function loadNotesFromCookie() {
	setSpinner('start');
	const notesList = document.getElementById('notes-list');
	const localNotesList = document.getElementById('local-notes');
	const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)local-notes\s*=\s*([^;]*).*$)|^.*$/, '$1');

	if (cookieValue) {
		const notes = JSON.parse(cookieValue);
		notes.forEach((note) => {
			const noteElement = document.createElement('p');
			noteElement.classList.add('cursor-pointer');
			const deleteIcon = document.createElement('i');
			const checkIcon = document.createElement('i');
			const spanElement = document.createElement('span');

			deleteIcon.classList.add('ri-delete-bin-line', 'text-red-500', 'mr-2');
			checkIcon.classList.add('ri-check-line', 'text-green-500', 'mr-1');
			spanElement.textContent = note.text;

			noteElement.appendChild(deleteIcon);
			noteElement.appendChild(checkIcon);
			noteElement.appendChild(spanElement);

			if (note.completed) {
				spanElement.classList.add('line-through', 'alt-text');
			}

			noteElement.addEventListener('click', function() {
				toggleNoteState(this);
			});

			deleteIcon.addEventListener('click', function(event) {
				deleteNote(event, noteElement);
			});

			notesList.appendChild(noteElement);
			localNotesList.appendChild(createLocalNoteElement(note.text, note.completed));
			validateNotesAmount();
		});
	}

	setSpinner('stop');
}

// Function to toggle dat note state in local notes list
function toggleLocalNoteState(noteText, completed) {
	const localNotesList = document.getElementById('local-notes');
	const localNoteElements = localNotesList.children;

	for (let i = 0; i < localNoteElements.length; i++) {
		const spanElement = localNoteElements[i].querySelector('span');

		if (spanElement && spanElement.textContent === noteText) {
			if (completed) {
				spanElement.classList.add('line-through', 'alt-text');
			} else {
				spanElement.classList.remove('line-through', 'alt-text');
			}
		}
	}

	// Sync with dat modal div
	toggleNoteStateInModal(noteText, completed);

	// Save notes to user's local cookie
	saveNotesToCookie();
}

// Handle clicking on notes in the new div
document.getElementById('local-notes').addEventListener('click', function(event) {
	const target = event.target;
	if (target.tagName === 'SPAN') {
		const noteText = target.textContent;
		const completed = target.classList.contains('line-through');
		toggleLocalNoteState(noteText, !completed);
	}
});

// Function to toggle note state in the modal div
function toggleNoteStateInModal(noteText, completed) {
	const notesList = document.getElementById('notes-list');
	const noteElements = notesList.children;

	for (let i = 0; i < noteElements.length; i++) {
		const spanElement = noteElements[i].querySelector('span');

		if (spanElement && spanElement.textContent === noteText) {
			if (completed) {
				spanElement.classList.add('line-through', 'alt-text');
			} else {
				spanElement.classList.remove('line-through', 'alt-text');
			}
		}
	}
}

// Load notes from local cookie on page load
window.addEventListener('load', function() {
	loadNotesFromCookie();
	validateNotesAmount();

	// Add event listeners for notes in the local-notes div
	const localNotesList = document.getElementById('local-notes');
	const localNoteElements = localNotesList.children;

	for (let i = 0; i < localNoteElements.length; i++) {
		localNoteElements[i].addEventListener('click', function() {
			const spanElement = this.querySelector('span');
			toggleNoteStateInModal(spanElement.textContent, spanElement.classList.contains('line-through'));
		});
	}
});

// Handle pressing Enter to add a note
document.getElementById('add-notes').addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		addNote();
	}
});