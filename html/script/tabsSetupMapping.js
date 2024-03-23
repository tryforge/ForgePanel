/*   BotForge © 2024, all rights reserved.   */

document.addEventListener('DOMContentLoaded', function() {
	setupTab('go-client', 'client', loadClientTab);
	setupTab('go-extensions', 'extensions', loadExtensionsTab);
	setupTab('go-themes', 'themes', loadThemesTab);
	setupTab('openSidebar-settings', 'personalize', loadPersonalizeTab);
	setupTab('go-invite', 'invite', loadInviteTab);


    // invite tab loader
    function loadInviteTab(tabName) {
        genIframe();
    }
    
	// extensions tab loader
	function loadExtensionsTab(tabName) {
		addPopup({
			tabName: tabName,
			message: 'Hey — You have unsaved extensions changes.',
			saveAction: () => saveExtensionsData(),
			parentElementId: 'extensions-savepopup'
		});
		checkChanges(tabName);
		setDefaultExtensions();
	}

    // themes tab loader
	function loadThemesTab(tabName) {
		addPopup({
			tabName: tabName,
			message: 'Hey — You have unsaved theme changes.',
			saveAction: () => saveThemesData(),
			parentElementId: 'themes-savepopup'
		});
		checkChanges(tabName);
	}

	// client tab loader
	async function loadClientTab(tabName) {
		await createEventToggles("https://raw.githubusercontent.com/tryforge/ForgeScript/main/metadata/events.json");
		createIntentToggles();
		addPopup({
			tabName: tabName,
			message: 'Hey — You have unsaved client changes.',
			saveAction: () => saveClientData(),
			parentElementId: 'client-savepopup'
		});
		checkChanges(tabName);
		setDefaultClient();
	}

	// personalize tab loader
	function loadPersonalizeTab(tabName) {
		addPopup({
			tabName: tabName,
			message: 'Hey — You have unsaved customization changes.',
			saveAction: () => saveCustomizationData(),
			parentElementId: 'personalize-savepopup'
		});
		checkChanges(tabName);
	}
});