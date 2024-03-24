/*   BotForge © 2024, all rights reserved.   */

function createExtension(name, description, version, icon = "", bgColor = "", disabled = false) {
	const extensionsList = document.getElementById('extensions-list');

	// Default icon
	if (!icon) {
		icon = "ri-puzzle-2-line";
	}

	const iconElement = icon.startsWith('http') ?
		`<img src="${icon}" width="23px" height="23px">` :
		`<i class="${icon} text-tertiary"></i>`;

	const iconBackground = bgColor ? `style="background-color: ${bgColor};"` : `style="background-color: var(--tertiary-background);"`;

	const disabledClass = disabled ? 'disabled-check' : '';

    const elementType = disabled ? 'a' : `label`;
    const labelFor = disabled ? '' : `for="extension-${name}"`;
	const toggleSwitchAndLink = disabled ? '' : `
            <${elementType} ${labelFor} class="absolute top-4 right-4">
                <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable or Disable ${name}">
                    <input type="checkbox" id="extension-${name}" class="sr-only">
                    <div class="block toggle-bg w-10 h-6 rounded-full transition duration-300">
                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                    </div>
                </div>
            </${elementType}>
            <a class="text-colored text-xs" href="https://docs.botforge.org/p/${name}/" target="_blank">Documentation <i class="ri-arrow-right-line"></i></a>
        `;

	const card = `
            <div class="individual-extension ${isMobile ? 'w-full' : 'w-64 mr-4'} h-50 bg-secondary rounded-lg p-4 flex flex-col justify-between relative border-primary mb-4 ${disabledClass}">
                <div class="ml-2">
                    <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-md top-4 left-4" ${iconBackground}>
                        ${iconElement}
                    </div>
                    <${elementType} ${labelFor} class="cursor-pointer">
                        <div class="flex items-center mt-4">
                            <h3 class="text-lg font-semibold text-primary">${name}</h3>
                            <span class="text-xxs font-normal px-2 rounded-full accent-color bg-purple-500 ml-2 text-tertiary" style="padding-top: 1px; padding-bottom: 1px;" data-tippy-content="This is the version of the extension.">v${version}</span>
                        </div>
                    </${elementType}>
                    <div class="h-20 overflow-y-auto">
                        <p class="text-xs text-secondary">${description}</p>
                    </div>
                    ${toggleSwitchAndLink}
                </div>
            </div>
        `;

	extensionsList.innerHTML += card;
}

const extensionsList = [{
		name: "ForgeScript",
		version: "1.4.0",
		description: "ForgeScript provides powerful easy-to-learn scripting to build Discord bots. It has an extense coverage of Discord's API.",
		icon: "ri-code-s-slash-line",
		iconBg: "#8e43e0",
		disabled: true,
	},
	{
		name: "ForgeAPI",
		version: "1.0.0",
		description: "ForgeAPI is an API toolkit, and the core of ForgePanel's backend. It offers a wide range of endpoints and utilities for your ForgeScript bot.",
		icon: "ri-code-line",
		iconBg: "#123456",
		disabled: true,
	},
	{
		name: "ForgePanel",
		version: "1.0.0",
		description: "ForgePanel provides you with an user-friendly UI to build your Discord Bot using ForgeScript easier.",
		icon: "ri-dashboard-line",
		iconBg: "#7e45e2",
		disabled: true,
	},
	{
		name: "ForgeDB",
		version: "1.0.0",
		description: "ForgeDB introduces an intuitive database solution. It seamlessly integrates with ForgeScript, offering efficient database management functions.",
		icon: "ri-database-2-line",
		iconBg: "#1774ff",
		disabled: false,
	},
	{
		name: "ForgeTopGG",
		version: "1.0.0",
		description: "ForgeTopGG gives you a set of commands and events to connect your bot with the popular top.gg platform.",
		icon: "ri-robot-3-line",
		iconBg: "#FF3366",
		disabled: false,
	},

];

extensionsList.forEach(extension => {
	createExtension(extension.name, extension.description, extension.version, extension.icon, extension.iconBg, extension.disabled);
});