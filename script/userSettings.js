/*   BotForge © 2024, all rights reserved.   */

// Create setting toggle
function createSettingToggle(container, id, label, description, clickFunction) {
	const settingsContainer = document.getElementById(container);

	const settingToggleHTML = `
        <div class="flex items-center justify-between individual-setting pb-5 border-b-primary">
            <div>
                <label for="${id}" class="text-primary font-normal text-xs cursor-pointer select-none">
                    ${label}
                </label>
                <p class="text-xs text-secondary mt-1">${description}</p>
            </div>
            <label for="${id}" data-tippy-content="Enable or Disable!">
                <div class="relative flex items-center cursor-pointer select-none">
                    <input type="checkbox" id="${id}" class="sr-only" data-click-function="${clickFunction}">
                    <div class="block toggle-bg w-10 h-6 rounded-full transition duration-300">
                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                    </div>
                </div>
            </label>
        </div>
    `;
	settingsContainer.insertAdjacentHTML('beforeend', settingToggleHTML);
	const toggleCheckbox = document.getElementById(id);
	toggleCheckbox.addEventListener('change', () => window[clickFunction](toggleCheckbox));
}

// Toggle the panel's loading screen
function toggleDisableLoadScreen(checkbox) {
	const loader = document.getElementById('loader-wrapper');
	if (checkbox.checked) {
		console.log('Loading screen disabled');
		loader.classList.add('hidden');
		// Save user's choice in a cookie
		document.cookie = "isHideLoad=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
	} else {
		console.log('Loading screen enabled');
		// Remove disable loading screen cookie
		document.cookie = "isHideLoad=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
	}
}

// Toggle low saturation mode
function toggleLowSaturation(checkbox) {
	const htmlElement = document.documentElement;
	if (checkbox.checked) {
		console.log('Low saturation mode activated');
		htmlElement.classList.add('low-saturation');
		document.cookie = "lowSaturation=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
	} else {
		console.log('Low saturation mode deactivated');
		htmlElement.classList.remove('low-saturation');
		document.cookie = "lowSaturation=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
	}
}

// Function to load user's choice from cookie
function loadSettingFromCookie(cookieName, checkbox) {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [name, value] = cookie.trim().split('=');
		if (name === cookieName && value === 'true') {
			checkbox.checked = true;
			const clickFunction = checkbox.dataset.clickFunction;
			if (window[clickFunction] && typeof window[clickFunction] === 'function') {
				window[clickFunction](checkbox);
				console.log(`${cookieName} loaded from cookie`);
			} else {
				console.error(`Function "${clickFunction}" not found or is not a function`);
			}
			break;
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	createSettingToggle(
		'generalsettings-container',
		'setting-loadscreen',
		'Disable Loading Screen',
		'Activate this toggle to disable the panel\'s loading screen.',
		'toggleDisableLoadScreen'
	);
	createSettingToggle(
		'generalsettings-container',
		'setting-lowsaturation',
		'Low Saturation',
		'Activate this toggle to activate the low saturation mode, which will desaturate the colors on the website.',
		'toggleLowSaturation'
	);

	loadSettingFromCookie('isHideLoad', document.getElementById('setting-loadscreen'));
	loadSettingFromCookie('lowSaturation', document.getElementById('setting-lowsaturation'));
});