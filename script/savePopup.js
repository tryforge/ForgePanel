/*   BotForge © 2024, all rights reserved.   */

function callSavePopup(popupId) {
	const popup = document.getElementById(popupId);
	if (popup) {
		popup.classList.remove('hidden');

		popup.style.transition = 'none';
		popup.style.transform = 'translateY(100%)';

		popup.offsetHeight;

		popup.style.transition = 'transform 0.3s ease-out';
		popup.style.transform = 'translateY(0)';
	} else {
		console.error(`Popup with ID '${popupId}' not found.`);
	}
}

function addPopup({
	tabName,
	message,
	saveAction,
	closeAction,
	parentElementId
}) {
	// html, old z-50
	const popupHtml = `
    <div class="fixed bottom-20 lg:bottom-3 left-1/2 transform -translate-x-1/2 w-full md:w-7/12 z-50 px-3 md:px-0">
        <div class="bg-tertiary border-primary rounded-full px-2 py-2 z-50 flex justify-between items-center w-full shadow-xl hidden" id="${tabName}-savechanges">
            <p class="text-primary text-xs mx-5 truncate md:text-clip">${message}</p>
            
            <div class="flex items-center">
                <a class="text-secondary text-xs mr-3 hover:underline cursor-pointer">Close</a>
                <button class="button-gradient text-xs text-tertiary px-6 py-2 rounded-full text-xxs whitespace-nowrap">Save</button>
            </div>
        </div>
    </div>
    `;

	const parentElement = document.getElementById(parentElementId);
	if (parentElement) {
		parentElement.innerHTML += popupHtml;

		const popup = document.getElementById(`${tabName}-savechanges`);
		if (popup) {
			const closeButton = popup.querySelector('a');
			const saveButton = popup.querySelector('button');

			closeButton.addEventListener('click', () => {
				if (closeAction) {
					closeAction();
				}
				popup.style.transition = 'transform 0.3s ease-out';
				popup.style.transform = 'translateY(100%)';
				setTimeout(() => popup.classList.add('hidden'), 300);
			});

			saveButton.addEventListener('click', () => {
				if (saveAction) {
					saveAction();
				}
			});
		}
	} else {
		console.error(`Parent element with ID '${parentElementId}' not found.`);
	}
}

function callPopup(popupId) {
	const popup = document.getElementById(popupId);
	if (!popup.classList.contains('hidden')) {
		return;
	}
	if (popup) {
		popup.classList.remove('hidden');

		popup.style.transition = 'none';
		popup.style.transform = 'translateY(100%)';

		popup.offsetHeight;
		popup.style.transition = 'transform 0.3s ease-out';
		popup.style.transform = 'translateY(0%)';
	} else {
		console.error(`Popup '${popupId}' not found :,c`);
	}
}

function closeSavePopup(tabName) {
	const popup = document.getElementById(`${tabName}-savechanges`);
	popup.style.transition = 'transform 0.3s ease-out';
	popup.style.transform = 'translateY(100%)';
	setTimeout(() => popup.classList.add('hidden'), 300);
}

// check changes
function checkChanges(tabName) {
	const tabContainer = document.getElementById(`${tabName}-content`);
	const inputs = tabContainer.querySelectorAll('input, select, textarea');
	inputs.forEach(input => {
		if (!input.classList.contains('ignore-changes')) {
			input.addEventListener('input', () => {
				const popup = document.getElementById(`${tabName}-savechanges`);
				if (popup.classList.contains('hidden')) {
					callPopup(`${tabName}-savechanges`);
				}
			});
		}
	});

	const clickableInputs = tabContainer.querySelectorAll('.clickable-input');
	clickableInputs.forEach(clickableInput => {
		if (!clickableInput.classList.contains('ignore-changes')) {
			clickableInput.addEventListener('click', () => {
				const popup = document.getElementById(`${tabName}-savechanges`);
				if (popup.classList.contains('hidden')) {
					callPopup(`${tabName}-savechanges`);
				}
			});
		}
	});
}