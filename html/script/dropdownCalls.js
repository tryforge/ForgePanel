/*   BotForge © 2024, all rights reserved.   */

// Dropdown for commands "create" button
createDropdownMenu([{
		type: 'link',
		label: 'Traditional Scripting',
		value: '/create?with=scripting&type=command',
		openInNewTab: false,
		icon: 'ri-code-s-slash-line'
	},
	{
		type: 'link',
		label: 'Command Builder',
		value: '/create?with=builder&type=command',
		openInNewTab: false,
		icon: 'ri-code-block',
		disabled: true
	},
	{
		type: 'link',
		label: 'AI Command Creator',
		value: '/create?with=AI&type=command',
		openInNewTab: false,
		icon: 'ri-sparkling-line',
		disabled: true
	}
], 'commands-create-button', false, "Create with...");

// Create the "commands" dropdown menu (three dots)
createDropdownMenu([{
		type: 'link',
		label: 'Template Store',
		value: 'https://store.botforge.org',
		openInNewTab: true,
		icon: 'ri-store-2-line'
	},
	{
		type: 'function',
		label: 'Manage Events',
		value: "goTo('go-events');",
		icon: 'ri-flashlight-line'
	},
	{
		type: 'link',
		label: 'Get Support',
		value: 'https://botforge.org/discord',
		openInNewTab: true,
		icon: 'ri-discord-line'
	}
], 'commands-create-dropdown', false, "More");



// Dropdown for events "create" button
createDropdownMenu([{
		type: 'link',
		label: 'Traditional Scripting',
		value: '/create?with=scripting&type=event',
		openInNewTab: false,
		icon: 'ri-code-s-slash-line'
	},
	{
		type: 'link',
		label: 'Command Builder',
		value: '/create?with=builder&type=event',
		openInNewTab: false,
		icon: 'ri-code-block',
		disabled: true
	},
	{
		type: 'link',
		label: 'AI Command Creator',
		value: '/create?with=AI&type=event',
		openInNewTab: false,
		icon: 'ri-sparkling-line',
		disabled: true
	}
], 'events-create-button', false, "Create with...");

// Create the "events" dropdown menu (three dots)
createDropdownMenu([{
		type: 'link',
		label: 'Template Store',
		value: 'https://store.botforge.org',
		openInNewTab: true,
		icon: 'ri-store-2-line'
	},
	{
		type: 'function',
		label: 'Manage Commands',
		value: "goTo('go-commands');",
		icon: 'ri-code-line'
	},
	{
		type: 'link',
		label: 'Get Support',
		value: 'https://botforge.org/discord',
		openInNewTab: true,
		icon: 'ri-discord-line'
	}
], 'events-create-dropdown', false, "More");



// Dropdown for "more" on TEAM tab
createDropdownMenu([{
		type: 'function',
		label: 'Remove Member',
		value: 'callRemoveMember(event)',
		openInNewTab: false,
		icon: 'ri-close-circle-line'
	},
	{
		type: 'function',
		label: 'Edit Permissions',
		value: 'addTeamMember(true, event)',
		openInNewTab: false,
		icon: 'ri-shield-user-line'
	}
], 'team-more-actions', false, "Team Member Actions");

// Dropdown for "more" on SERVERS tab
createDropdownMenu([{
		type: 'function',
		label: 'Remove Bot From Server',
		value: 'callRemoveBot(event)',
		openInNewTab: false,
		icon: 'ri-close-circle-line'
	}, {
		type: 'function',
		label: 'Blacklist Server',
		value: 'console.log(`soon`)',
		openInNewTab: false,
		icon: 'ri-prohibited-line',
		disabled: true
	}, {
		type: 'function',
		label: 'Server Information',
		value: 'console.log(`soon`)',
		openInNewTab: false,
		icon: 'ri-information-line',
		disabled: true
	}
], 'servers-more-actions', false, "Server Actions");






// MOBILE

// Create the "more" tab option
createDropdownMenu([
    {
		type: 'function',
		label: 'Settings',
		value: "goTo('mobileSettings-tab-personalize');",
		icon: 'ri-settings-3-line',
		id: "submenu-settings"
	},
    {
		type: 'function',
		label: 'Invite',
		value: "goTo('go-invite', 'mobile-tab-more'); backRegister(this.id);",
		icon: 'ri-rocket-2-line',
		id: "submenu-invite"
	},
	{
		type: 'link',
		label: 'Template Store',
		value: 'https://store.botforge.org',
		openInNewTab: true,
		icon: 'ri-store-2-line'
	},
	{
		type: 'link',
		label: 'Get Support',
		value: 'https://botforge.org/discord',
		openInNewTab: true,
		icon: 'ri-discord-line'
	},
	{
		type: 'link',
		label: 'Sign Out',
		value: '/signout',
		openInNewTab: true,
		icon: 'ri-logout-box-line'
	}
], 'mobile-tab-more', true, "More Options");

// Create the "manage" mobile option
createDropdownMenu([
    {
		type: 'function',
		label: 'Servers',
		value: "goTo('go-servers', 'mobile-tab-manage'); backRegister(this.id);",
		icon: 'ri-user-3-line',
		id: "submenu-manage-servers"
	},
    {
		type: 'function',
		label: 'Team',
		value: "goTo('go-team', 'mobile-tab-manage'); backRegister(this.id);",
		icon: 'ri-home-6-line',
		id: "submenu-manage-team"
	}
], 'mobile-tab-manage', true, "Manage");

// Create the "code" mobile option
createDropdownMenu([
    {
		type: 'function',
		label: 'Commands',
		value: "goTo('go-commands', 'mobile-tab-code'); backRegister(this.id);",
		icon: 'ri-code-s-slash-line',
		id: "submenu-code-commands"
	},
    {
		type: 'function',
		label: 'Events',
		value: "goTo('go-events', 'mobile-tab-code'); backRegister(this.id);",
		icon: 'ri-terminal-line',
		id: "submenu-code-events"
	}
], 'mobile-tab-code', true, "Start Coding!");