/*   BotForge © 2024, all rights reserved.   */

function handleTabClick(tabElement) {
	let mainSidebar = true;
	let sidebarId;

	if (tabElement.id.includes("openSidebar")) {
		sidebarId = tabElement.id.split("-")[1];
		mainSidebar = false;

		toggleSidebar('tabContainer-' + sidebarId, false);

		const tabContainer = document.getElementById(`tabContainer-${sidebarId}`);
		const tabLink = tabContainer?.querySelector('a.nav-link');

		if (tabLink) {
			handleTabClick(tabLink);
		}
	}

	if (mainSidebar === false) {
		return;
	}

	const allTabs = document.querySelectorAll('.nav-tab');
	allTabs.forEach(tab => tab.classList.remove('tab-active'));
	tabElement.classList.add('tab-active');

	const tabName = tabElement.querySelector('.text-xxs').innerText;
	const tabIcon = tabElement.querySelector('.nav-icon i').className;

	const categoryElement = tabElement.closest('[data-category]');
	const categoryName = categoryElement?.getAttribute('data-category') || null;

	// Hide all tab content elements
	const allTabContents = document.querySelectorAll('.tab-content');
	allTabContents.forEach(content => content.classList.add('hidden'));

	// Show the selected tab content
	const selectedTabContent = document.getElementById(`${tabName.toLowerCase()}-content`);
	if (selectedTabContent) {
		selectedTabContent.classList.remove('hidden');
	}

	console.log(`[Moving] Home › ${categoryName} › ${tabName}`);
	setTabLabel(categoryName, tabName, tabIcon);
}

document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.nav-tab');
	tabs.forEach(tab => {
		tab.addEventListener('click', () => handleTabClick(tab));
	});
});

function createTab(categoryName, tabLabel, tabIcon, defaultTab, sidebarId, openSidebar, linkUrl) {
	const idCategory = categoryName.replace(/\s+/g, '-');
	let sidebar;

	if (sidebarId) {
		sidebar = `tabContainer-${sidebarId}`;
	} else {
		sidebar = 'tabContainer';
	}

	let category = document.querySelector(`#${sidebar} [data-category="${idCategory}"]`);

	if (!category) {
		category = document.createElement('ul');
		category.classList.add('flex', 'flex-col', 'pt-4', 'space-y-1');
		category.setAttribute('data-category', idCategory);
		document.getElementById(sidebar).appendChild(category);

		const categoryHeader = document.createElement('li');
		categoryHeader.classList.add('px-5');
		categoryHeader.innerHTML = `
            <div class="flex flex-row items-center justify-between h-8 cursor-pointer select-none category-label" onclick="toggleCategory('${idCategory}', '${sidebar}')">
                <div class="flex items-center">
                    <div class="menu-text">${categoryName}</div>
                </div>
                <i id="${idCategory}ArrowIcon-${sidebar}" class="ri-arrow-right-s-line"></i>
            </div>
        `;
		category.appendChild(categoryHeader);
	}

	// Create dat new tab
	const newTab = document.createElement('li');
	newTab.classList.add(`${idCategory}Tab`);

	const tabId = tabLabel.toLowerCase().replace(/\s+/g, '-');

	let clickIcon = '';
	let goTo;
	if (!openSidebar) {
		goTo = `go-${tabId}`;
	} else {
		goTo = `openSidebar-${openSidebar}`;
		clickIcon = `onclick="setMainIcon('${tabIcon}');"`;
	}

	let tabContent;
	if (linkUrl) {
		tabContent = `<a href="${linkUrl}" class="nav-link relative flex flex-row items-center h-9 focus:outline-none pr-6 select-none" target="_blank" ${clickIcon}>
            <span class="inline-flex justify-center items-center nav-icon">
                <i class="${tabIcon}"></i>
            </span>
            <span class="ml-2 text-xxs tracking-wide truncate">${tabLabel}</span>
            <i class="ri-external-link-line ml-auto text-xs"></i>
        </a>`;
	} else {
		tabContent = `<a href="#tab-${tabId}" id="${goTo}" class="nav-link nav-tab relative flex flex-row items-center h-9 focus:outline-none pr-6 select-none" ${clickIcon}>
            <span class="inline-flex justify-center items-center nav-icon">
                <i class="${tabIcon}"></i>
            </span>
            <span class="ml-2 text-xxs tracking-wide truncate">${tabLabel}</span>
            ${openSidebar ? `<i class="ri-arrow-right-line ml-auto text-xs"></i>` : ''}
        </a>`;
	}

	newTab.innerHTML = tabContent;

	category.appendChild(newTab);

	// Click the newly created tab if defaultTab is true
	if (defaultTab) {
		setTimeout(() => {
			handleTabClick(newTab.querySelector('.nav-tab'));
		}, 0);
	}
}

// Toggle categories

function toggleCategory(categoryName, sidebar) {
	const tabs = document.querySelectorAll(`#${sidebar} [data-category="${categoryName}"] > li:not(.px-5)`);
	const arrowIcon = document.getElementById(`${categoryName}ArrowIcon-${sidebar}`);

	if (tabs.length > 0) {
		tabs.forEach(tab => {
			tab.classList.toggle('hidden');
		});
		arrowIcon.classList.toggle('ri-arrow-down-s-line');
		arrowIcon.classList.toggle('ri-arrow-right-s-line');
	}
}

// Tabs setup
function setupTab(tabId, tabName, loadTabFunction) {
	const tab = document.getElementById(tabId);
	let tabClicked = false;
	tab.addEventListener('click', () => {
		if (!tabClicked) {
			tabClicked = true;
			loadTabFunction(tabName);
		}
	});
}