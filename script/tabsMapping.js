/*   BotForge © 2024, all rights reserved.   */

// tabs mapping
createTab('Dashboard', 'Overview', 'ri-dashboard-line', true);
createTab('Dashboard', 'Commands', 'ri-code-s-slash-line');
createTab('Dashboard', 'Events', 'ri-terminal-line');
createTab('Dashboard', 'Extensions', 'ri-puzzle-2-line');
createTab('Dashboard', 'Settings', 'ri-settings-3-line', false, null, 'settings');
createTab('Dashboard', 'Invite', 'ri-rocket-2-line');

createTab('Management', 'Servers', 'ri-home-6-line');
createTab('Management', 'Team', 'ri-user-3-line');

// Settings Sidebar
createTab('Bot', 'Personalize', 'ri-emotion-laugh-line', false, 'settings');
createTab('Bot', 'Client', 'ri-puzzle-line', false, 'settings');
createTab('User', 'General', 'ri-user-settings-line', false, 'settings');
createTab('User', 'Themes', 'ri-brush-line', false, 'settings');

createTab('Bot', 'Developer Portal', 'ri-discord-line', false, 'settings', null, `https://discord.com/developers/applications/${clientID}/information`);