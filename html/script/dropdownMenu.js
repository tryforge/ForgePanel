/*   BotForge © 2024, all rights reserved.   */

function createDropdownMenu(optionsData, targetIdentifier, showMobileNav, mobileNavLabel) {
	let targetElements;

	// Attempt to select elements by ID
	const targetElementById = document.getElementById(targetIdentifier);
	if (targetElementById) {
		targetElements = [targetElementById];
	} else {
		// If ID not found, select elements by class
		targetElements = document.querySelectorAll('.' + targetIdentifier);
		if (targetElements.length === 0) {
			console.log("Couldn't find any elements with ID or class:", targetIdentifier);
			return;
		}
	}

	targetElements.forEach(targetElement => {
		// Generate unique ID for each dropdown menu
		const dropdownMenuId = 'dropdown-menu-' + Math.floor(Math.random() * 1000000);

let optionsClasses = '';
let menuLabel = '';

if(isMobile) {
optionsClasses = "bg-alt-primary py-3 rounded-xl my-3"
if(mobileNavLabel) { menuLabel = `<p class="text-center text-sm pt-3 font-semibold">${mobileNavLabel}</p>`; } 
}

		// Dropdown menu HTML, below had right-0
		let dropdownMenuHTML = `
		<div id="main-${dropdownMenuId}" class="hidden ${isMobile ? '' : 'absolute'}">
		${isMobile ? '<div class="relative"> <div class="fixed inset-0 bg-black opacity-70 w-screen h-screen z-20"></div>' : ''}
                              <div class="${isMobile ? 'fixed w-full h-fit bottom-0 right-0' : 'absolute'} dropdown-options ${showMobileNav ? 'z-30' : 'z-99'} mt-1">
                                  <div class="${isMobile ? 'pb-40 border-primary rounded-2xl' : 'right-0 w-fit border-secondary rounded-md'} px-1 py-1 bg-secondary origin-bottom-left whitespace-nowrap hidden" id="${dropdownMenuId}">
                    ${menuLabel}
                                      <div class="py-1 ${isMobile ? 'mx-2 text-sm' : 'text-xs'}" role="menu" aria-orientation="vertical" aria-labelledby="${dropdownMenuId}">
                          `;

		// Options for the dropdown menu from the JSON
		optionsData.forEach(option => {
			let optionHTML = '';
			let textColor = 'text-primary';
			let disableExt;
			
			if(option.label.startsWith('Sign Out')) {
			textColor = 'text-red-500';
			disableExt = true;
			}
			
			if (option.type === 'link') {
				const targetAttribute = option.openInNewTab ? '_blank' : '';
const disabledClass = option.disabled ? 'disabled-check' : '';
const externalLinkIcon = disableExt ? '' : '<i class="ri-external-link-line ml-auto text-secondary"></i>';
optionHTML = `<a href="${option.value}" target="${targetAttribute}" class="${optionsClasses ? optionsClasses : 'py-2'} block px-4 ${textColor} hover:text-colored flex items-center select-none ${disabledClass}" role="menuitem" ${option.disabled ? 'disabled' : ''} ${option.id ? `id="${option.id}"` : ''}>${option.icon ? `<i class="${option.icon} mr-2"></i>` : ''}${option.label} ${isMobile ? externalLinkIcon : ''}</a>`;

			} else if (option.type === 'function') {
			    const disabledClass = option.disabled ? 'disabled-check' : '';
				optionHTML = `<button onclick="${option.value}" class="${optionsClasses ? optionsClasses : 'py-2'} block px-4 ${textColor} hover:text-colored flex items-center w-full ${disabledClass}" role="menuitem" ${option.disabled ? 'disabled' : ''} ${option.id ? `id="${option.id}"` : ''}>${option.icon ? `<i class="${option.icon} mr-2"></i>` : ''}${option.label}</button>`;
			}
			dropdownMenuHTML += optionHTML;
		});

		// Close dropdown menu divs
		dropdownMenuHTML += `
                                      </div>
                                  </div>
                              </div>
                             ${isMobile ? '</div>' : ''}
                             </div>
                          `;

		// Append dropdown menu
		if(targetElement.classList.contains('mobile-tab')) {
		document.getElementById('mobile-navigation-menus').insertAdjacentHTML('beforeend', dropdownMenuHTML);
		} else {
		targetElement.insertAdjacentHTML('beforeend', dropdownMenuHTML);
        }
		// Toggle dropdown menu visibility
		targetElement.addEventListener('click', () => {
			const dropdownMenu = document.getElementById(dropdownMenuId);
			console.log(dropdownMenuId)
			const dropdownMain = document.getElementById(`main-${dropdownMenuId}`);
			const dropdownMenuParent = dropdownMenu.parentNode;
			const sidebar = document.getElementById('right-sidebar');
			const windowWidth = window.innerWidth - 200;
	

			if(dropdownMenu.classList.contains('hidden') || dropdownMain.classList.contains('hidden')) {
            dropdownMain.classList.remove('hidden');
			dropdownMenu.classList.remove('hidden');   
			} else {
            dropdownMain.classList.add('hidden');
			dropdownMenu.classList.add('hidden');
			}
			
const dropdownMenuRightOffset = dropdownMain.getBoundingClientRect().right;

        if(!isMobile) {
			if (!dropdownMenu.classList.contains('hidden')) {
				if (dropdownMenuRightOffset > windowWidth) {
					dropdownMain.classList.add('right-0');
					dropdownMenuParent.classList.add('right-3');
				} else {
					dropdownMain.classList.remove('right-0');
					dropdownMenuParent.classList.remove('right-3');  
				}
			} else {
					dropdownMain.classList.remove('right-0');
					dropdownMenuParent.classList.remove('right-3');  
			}
        }
		});

		let dropdownOpenTime;
		// Close dropdown menu when clicking outside after 1 second
		document.addEventListener('click', (event) => {
			if (!targetElement.contains(event.target)) {
				const dropdownMenu = document.getElementById(dropdownMenuId);
				const dropdownMain = document.getElementById(`main-${dropdownMenuId}`);
				if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
					const currentTime = new Date().getTime();
					if (currentTime - dropdownOpenTime >= 100) {
						dropdownMenu.classList.add('hidden');
						dropdownMain.classList.add('hidden');
					}
				}
			}
		});

		// Track dropdown open time
		targetElement.addEventListener('click', () => {
			dropdownOpenTime = new Date().getTime();
		});
	});
}