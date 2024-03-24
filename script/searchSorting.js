/*   BotForge © 2024, all rights reserved.   */

let commandsTimeoutId;

function searchCommands(query, type) {
	clearTimeout(commandsTimeoutId);

	commandsTimeoutId = setTimeout(() => {
		const commands = document.querySelectorAll('.' + type);
		const image = document.getElementById('not-found-' + type);
		let found = false;

		query = query.toLowerCase();
		commands.forEach(command => {
			const title = command.querySelector('h2').innerText.toLowerCase();
			if (title.includes(query)) {
				command.classList.remove('hidden');
				found = true;
			} else {
				command.classList.add('hidden');
			}
		});

		if (found) {
			image.classList.add('hidden');
		} else {
			image.classList.remove('hidden');
		}
	}, 300); // debounce delay
}

function sortCommands(type) {
	const commands = document.querySelectorAll('.' + type);

	const sortIcon = document.getElementById(type + '-sortIcon');
	if (sortIcon.classList.contains('ri-sort-desc')) {
		sortIcon.classList.remove('ri-sort-desc');
		sortIcon.classList.add('ri-sort-asc');
		commands.forEach(command => command.parentNode.appendChild(command));
	} else {
		sortIcon.classList.remove('ri-sort-asc');
		sortIcon.classList.add('ri-sort-desc');
		const reversedCommands = Array.from(commands).reverse();
		reversedCommands.forEach(command => command.parentNode.appendChild(command));
	}
}

// search and sort tables

let tableTimeoutId;

function searchTable(query, type) {
	clearTimeout(tableTimeoutId);
	tableTimeoutId = setTimeout(() => {
		const rows = document.querySelectorAll(`#${type}-rows tr`);
		const image = document.getElementById(`not-found-${type}`);
		const section = document.getElementById(`table-${type}`);
		const searchString = query.toLowerCase();
		let found = false;

		rows.forEach(row => {
			const displayName = row.querySelector('.font-normal.text-xs.text-primary.leading-none').innerText.toLowerCase();
			if (displayName.includes(searchString)) {
				row.style.display = '';
				found = true;
			} else {
				row.style.display = 'none';
			}
		});

		if (found) {
			image.classList.add('hidden');
			section.classList.remove('hidden');
		} else {
			image.classList.remove('hidden');
			section.classList.add('hidden');
		}
	}, 300);
}

function sortTable(type) {
	const sortIcon = document.getElementById(`${type}-sortIcon`);
	const tableRows = document.getElementById(`${type}-rows`);
	const rows = Array.from(tableRows.children);

	if (sortIcon.classList.contains('ri-sort-desc')) {
		sortIcon.classList.remove('ri-sort-desc');
		sortIcon.classList.add('ri-sort-asc');
		rows.reverse().forEach(row => {
			tableRows.appendChild(row);
		});
	} else {
		sortIcon.classList.remove('ri-sort-asc');
		sortIcon.classList.add('ri-sort-desc');
		rows.reverse().forEach(row => {
			tableRows.appendChild(row);
		});
	}
}