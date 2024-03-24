/*   BotForge © 2024, all rights reserved.   */

const prefixes = [];
let debouncePrefixes;

document.addEventListener('DOMContentLoaded', function() {
	setSpinner('start');
	const prefixInput = document.getElementById('bot-prefix');
	const prefixTagsContainer = document.getElementById('prefix-tags');

	prefixInput.addEventListener('input', function(event) {
		clearTimeout(debouncePrefixes);
		debouncePrefixes = setTimeout(() => {
			let prefixedValue = event.target.value.replace(/\{comma\}/g, '__comma__');
			const inputPrefixes = prefixedValue.split(',').map(prefix => prefix.trim().replace(/__comma__/g, ','));

			prefixes.length = 0;
			prefixes.push(...inputPrefixes);

			prefixTagsContainer.innerHTML = '';

			inputPrefixes.forEach(prefix => {
				if (prefix) {
					const escapedPrefix = prefix.replace(/["'()]/g, '\\$&');

					const tag = document.createElement('div');
					tag.textContent = prefix;
					tag.classList.add('rounded-full', 'bg-alt-primary', 'border-secondary', 'px-2', 'py-1', 'text-xs', 'text-primary', 'mr-2', 'mb-2');

					const groupedWordChecks = [{
							words: ['<@', '>'],
							icon: 'ri-at-line'
						},
						{
							words: ['$'],
							icon: 'ri-code-s-slash-line'
						},
						{
							words: ['$get', 'var[', ']'],
							icon: 'ri-database-2-line'
						}
					];

					const addedIcons = new Set();

					groupedWordChecks.forEach(check => {
						if (check.words.every(word => escapedPrefix.toLowerCase().includes(word.toLowerCase()))) {
							if (!addedIcons.has(check.icon)) {
								const icon = document.createElement('i');
								icon.classList.add(check.icon, 'text-colored', 'mr-1');
								tag.prepend(icon);
								addedIcons.add(check.icon);
							}
						}
					});

					prefixTagsContainer.appendChild(tag);
				}
			});
		}, 300);
	});
	setSpinner('stop');
});

// reveal token
const revealTokenBtn = document.getElementById('reveal-token-btn');
const botTokenInput = document.getElementById('client-token');

revealTokenBtn.addEventListener('click', function() {
	const inputType = botTokenInput.type;
	if (inputType === 'password') {
		botTokenInput.type = 'text';
		revealTokenBtn.innerHTML = '<i class="ri-eye-off-line"></i>';
	} else {
		botTokenInput.type = 'password';
		revealTokenBtn.innerHTML = '<i class="ri-eye-line"></i>';
	}
});

// Get Checked Events
function getCheckedEvents() {
	const checkedEvents = [];
	const checkboxes = document.querySelectorAll('.event-checkbox');

	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			const eventName = checkbox.id.replace('events-', '');
			checkedEvents.push(eventName);
		}
	});

	return checkedEvents;
}

// Get Checked Intents
function getCheckedIntents() {
	const checkboxes = document.querySelectorAll('#intents-list [data-group="intents"] input[type="checkbox"]:checked');
	const intentArray = ['Guilds', ...Array.from(checkboxes).map(checkbox => checkbox.id.replace('intents-', ''))];

	return intentArray;
}

function toggleEventsDropdown(element) {
	const eventsList = element.nextElementSibling;
	const icon = element.querySelector('i[data-icon="arrow"]');

	eventsList.classList.toggle('hidden');
	icon.classList.toggle('ri-arrow-drop-right-line');
	icon.classList.toggle('ri-arrow-drop-down-line');
}

// Events toggles

function toggleEvents(eventNames) {
	eventNames.forEach(eventName => {
		const eventToggle = document.getElementById(`events-${eventName}`);
		if (eventToggle && !eventToggle.checked) {
			eventToggle.click();
		}
	});
}

async function createEventToggles(jsonUrl) {
	setSpinner('start');
	const eventsList = document.getElementById('events-list');

	try {
		const response = await fetch(jsonUrl);
		const eventData = await response.json();
		const totalEvents = eventData.length;

		eventData.forEach((event, index) => {
			const {
				name,
				version,
				description,
				intents
			} = event;

			const eventToggle = document.createElement('div');
			eventToggle.classList.add('flex', 'items-center', 'justify-between', 'individual-setting', 'pb-4');
			eventToggle.setAttribute('data-group', 'events');

			if (index !== totalEvents - 1) {
				eventToggle.classList.add('border-b-primary');
			}

			let requiredIntents = '';
			if (intents && intents.length > 0) {
				requiredIntents = intents.map(intent => `'${intent}'`).join(', ');
			}

			eventToggle.innerHTML = `
                <div>
                    <label for="events-${name}" class="text-primary font-normal text-xs cursor-pointer select-none">
                        ${name} <span class="text-xxs px-2 rounded-full accent-color bg-purple-500 text-tertiary font-normal" style="padding-top: 1px;padding-bottom: 1px;" data-tippy-content="In order to use the <b>${name}</b> event, you must have ForgeScript <b>v${version}</b> or newer.">v${version}</span>
                    </label>

                    <div>
                        <p class="text-xs text-secondary mt-1">${description}</p>
                       
                        <div class="mt-2 md:mt-1 text-xxs block space-y-1 md:space-y-0 md:flex items-center">
                            <a class="text-colored" href="https://docs.botforge.org/?branch=dev#event-list-${name}" target="_blank"><i class="ri-external-link-line"></i> Documentation</a>
                            ${requiredIntents ? `<span class="opacity-30 mx-3 text-secondary text-xs hidden md:block">|</span> <p class="text-colored cursor-help" data-tippy-content="These intents are necessary for this event to function properly and will be activated automatically upon enabling the event."><i class="ri-toggle-fill"></i> ${requiredIntents.replace(/'/g, '')}</p>` : ''}
                        </div>
                    </div>
                </div>

                <label for="events-${name}" class="mb-auto md:mb-0">
                    <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable or Disable!">
                        <input type="checkbox" id="events-${name}" class="sr-only event-checkbox">
                        <div class="block toggle-bg w-10 h-6 rounded-full transition duration-300">
                            <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                        </div>
                    </div>
                </label>
            `;

			eventsList.appendChild(eventToggle);
		});

		const checkboxes = document.querySelectorAll('.event-checkbox');

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener('change', function() {
				const eventName = this.id.replace('events-', '');
				const checked = this.checked;
				toggleAssociatedIntents(eventName, checked, eventData);
			});
		});

		const masterEventsToggle = document.getElementById("toggle-all-events");
		const eventToggles = document.querySelectorAll('[data-group="events"] input[type="checkbox"]');

		masterEventsToggle.addEventListener("change", function() {
			const isChecked = masterEventsToggle.checked;

			eventToggles.forEach(function(toggle) {
				if (toggle.checked != isChecked) {
					toggle.click();
				}
				toggle.checked = isChecked;
				toggle.closest('.individual-setting').classList.toggle('disabled-check', isChecked);
			});
		});

		/*eventToggles.forEach(function(toggle) {
		    toggle.addEventListener("change", function() {
		        toggle.closest('.individual-setting').classList.remove('disabled-check');
		    });
		});*/

		// Initialize tooltips
		tippy('[data-tippy-content]', {
			inertia: true,
			theme: 'forge',
			allowHTML: true
		});
	} catch (error) {
		console.error('Error fetching or parsing JSON data:', error);
	}
	setSpinner('stop');
}

function toggleAssociatedIntents(eventName, checked, eventData) {
	const event = eventData.find(event => event.name === eventName);
	const requiredIntents = event.intents || [];

	requiredIntents.forEach(intentName => {
		const intentToggle = document.getElementById(`intents-${intentName}`);
		if (intentToggle) {
			intentToggle.checked = checked;
		}
	});
}