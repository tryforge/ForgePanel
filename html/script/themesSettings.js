/*   BotForge © 2024, all rights reserved.   */

document.addEventListener('DOMContentLoaded', function() {

	const themesSelector = document.getElementById('themes-selector');
	fetch('https://raw.githubusercontent.com/tryforge/Cloud/main/themes.json')
		.then(response => response.json())
		.then(themes => {
			themes.forEach(themeData => {
				const {
					name,
					username,
					description,
					avatarUrl,
					metadata,
					cssUrl
				} = themeData;
				const selectorColor = metadata['color'];
				const themeImage = metadata['image'];

				const themeCardHTML = `
                <div class="flex-shrink-0 w-52 bg-alt-primary shadow-lg rounded-lg overflow-hidden mr-2 cursor-pointer border-primary clickable-input" data-css-url="${cssUrl}">
                    <div class="bg-alt-secondary h-fit w-full flex items-center justify-center relative">
                        <img src="${themeImage}" alt="Theme Image">
                        <div class="absolute opacity-0 right-2 top-2 text-tertiary px-3 bg-purple-500 text-xxs applied-text rounded-full accent-color shadow-lg transition-opacity duration-300" style="padding-top: 2px; padding-bottom: 2px;">Selected</div>
                    </div>
                    <div class="pt-2 px-2 flex justify-between">
                        <h3 class="font-semibold text-base text-primary mb-1 leading-none">${name}</h3>
                        <img src="${avatarUrl}" data-tippy-content="${username}'s avatar" class="w-6 h-6 rounded-full border-primary">
                    </div>
                    <div class="px-2 pb-2">
                        <p class="text-xxs text-primary truncate">By <a href="https://github.com/${username}" data-tippy-content="Theme created by ${username}" target="_blank" class="text-colored">${username}</a></p>
                        <div class="truncate" data-tippy-content="${description}">
                            <a class="text-sm text-secondary">${description}</a>
                        </div>
                    </div>
                </div>
            `;

				themesSelector.insertAdjacentHTML('beforeend', themeCardHTML);

				const themeCard = themesSelector.lastElementChild;
				themeCard.addEventListener('click', () => loadTheme(cssUrl));
			});
			tippy('#themes-selector [data-tippy-content]', {
				inertia: true,
				theme: 'forge'
			});
		})
		.catch(error => console.error('[Theme] Error fetching:', error));

});

let currentTheme = '';

// Save current theme in dat cookie
function saveCurrentTheme(theme) {
	document.cookie = `selectedTheme=${theme}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

// Load the saved theme when the website loads
function loadSavedTheme() {
	const selectedTheme = getCookieValue('selectedTheme');
	if(!selectedTheme) { return; }
	loadTheme(selectedTheme);
	currentTheme = selectedTheme;
}

//getCookieValue(cookieName)

const cachedThemes = {};

function loadTheme(cssUrl) {
	const existingStyle = document.getElementById('theme-style');
	if (existingStyle) {
		existingStyle.remove();
	}

	if (cachedThemes[cssUrl]) {
		applyThemeStyle(cssUrl, cachedThemes[cssUrl]);
		console.log(`[Theme] Loaded "${cssUrl}" from cache.`);
		currentTheme = cssUrl;
	} else {
		fetch(cssUrl)
			.then(response => response.text())
			.then(css => {
				cachedThemes[cssUrl] = css;
				applyThemeStyle(cssUrl, css);
				console.log(`[Theme] Loaded "${cssUrl}".`);
				currentTheme = cssUrl;
			})
			.catch(error => {
				console.error('[Theme] Error:', error);
			});
	}

	// Remove "Selected" text
	const appliedTextElements = document.querySelectorAll('.applied-text');
	appliedTextElements.forEach(textElement => {
		textElement.style.opacity = '0';
	});

	// Show "Selected" text
	const clickedThemeCard = document.querySelector(`[data-css-url="${cssUrl}"]`);
	if (clickedThemeCard) {
		const appliedText = clickedThemeCard.querySelector('.applied-text');
		appliedText.style.opacity = '1';
	}
}

function applyThemeStyle(cssUrl, css) {
	const style = document.createElement('style');
	style.id = 'theme-style';
	style.textContent = css;
	document.head.appendChild(style);
	
	genIframe();
}

document.addEventListener('DOMContentLoaded', loadSavedTheme);