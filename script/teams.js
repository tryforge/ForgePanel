/*   BotForge © 2024, all rights reserved.   */

function viewPermissions() {
	const tr = event.target.closest('tr');
	const memberId = tr.getAttribute("data-member-id");
	const memberName = tr.getAttribute("data-member-name");
	const memberPermissions = JSON.parse(tr.getAttribute("data-member-permissions").replace(/'/g, '"'));

	// Now you can use memberId, memberName, and memberPermissions as needed
	console.log('Member ID:', memberId);
	console.log('Member Name:', memberName);
	console.log('Member Permissions:', memberPermissions.join(', '));

	const permissionDescriptions = {
		"ManageCommands": "This permission allows team members to create, edit, and delete bot commands.",
		"ManageEvents": "With this permission, team members can create, edit, and remove bot events.",
		"ManageMembers": "This permission allows team members to manage other members within the team, they can add or remove team members, and assign permissions.",
		"ManageBot": "The ManageBot permission grants team members access to all bot settings, including the ability to view and modify the bot's token.",
		"ManageGuilds": "Team members with this permission can leave servers where the bot is present and view information about these servers.",
		"ManagePackages": "This permission allows team members to manage bot packages and extensions, including installing, updating, and removing them.",
		"ManageDatabase": "The ManageDatabase permission provides team members with access to the bot's database. ForgeDB is required for this permission to work.",
	};

	openConfirmationModal({
		title: `${memberName}'s Permissions`,
		titleIcon: 'ri-group-line',
		description: `
            <p class="text-secondary text-xxs text-left mb-5">* Team Members with ManageMembers permissions can change these at any time.</p>
                   
            <div class="mt-5 px-5 py-4 border accent-color border-purple-400 rounded-lg w-full h-fit text-left">
                ${memberPermissions.length > 0 ? 
                    memberPermissions.map(permission => {
                        const description = permissionDescriptions[permission];
                        return `
                            <div class="border-b-primary py-2">
                                <h2 class="text-xxs font-semibold text-primary">${permission}</h2>
                                <p class="text-xxs text-secondary">${description ? description : 'No description available'}</p>
                            </div>
                        `;
                    }).join('') :
                    ` <
			div class = "border-b-primary py-2" >
			<
			h2 class = "text-xxs font-semibold text-primary" > None < /h2> <
			p class = "text-xxs text-secondary" > While this member currently has no assigned permissions,
		they will still have access to this panel unless they are removed from the team.This access allows them to view bot statistics and other information. < /p> <
		/div>
		`
                }
            </div>
        `,
		confirmLabel: 'Alright!',
		confirmAction: 'closeConfirmModal();'
	});
}

function copyUserID() {
	const button = event.target;

	const trElement = button.closest('tr');

	const memberId = trElement.getAttribute('data-member-id');

	navigator.clipboard.writeText(memberId)
		.then(() => {
			console.log('Member ID copied successfully: ', memberId);
			showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
				"Successfully copied user ID to your clipboard!");
		})
		.catch(err => console.error('Failed to copy member ID: ', err));
}

// addTeamMember

function addTeamMember(edit, event) {

	let userId;
	if (event) {
		const tr = event.target.closest('tr');
		const memberId = tr.getAttribute('data-member-id');
		const memberName = tr.getAttribute('data-member-name');
		userId = memberId;
	}

	let title;
	if (edit) {
		title = "Editing a Member";
	} else {
		title = "Adding a Member";
	}

	const teamPermissions = [{
			name: 'ManageCommands',
			description: 'This permission allows team members to manage bot commands.'
		},
		{
			name: 'ManageEvents',
			description: 'This permission allows team members to manage bot events.'
		},
		{
			name: 'ManageMembers',
			description: 'This permission allows team members to manage other team members.'
		},
		{
			name: 'ManageBot',
			description: 'This permission allows team members to manage bot settings, including the bot token.'
		},
		{
			name: 'ManageGuilds',
			description: 'This permission allows team members to manage the servers your bot is in.'
		},
		{
			name: 'ManagePackages',
			description: 'This permission allows team members to manage packages/extensions.'
		},
		{
			name: 'ManageDatabase',
			description: 'This permission allows team members to manage the bot\'s database.',
			disable: true
		}
	];

	openConfirmationModal({
		title,
		titleIcon: 'ri-group-line',
		description: `
            <p class="text-secondary text-xxs text-left mb-5">* It's advisable to restrict team members' permissions to only those essential for their tasks.</p>
                   
<label for="add-member-id" class="text-secondary text-2xxs uppercase mb-1 mt-4 font-semibold flex items-center justify-between leading-none">Member ID
    <a href="${edit ? `https://whois.mrrobot.app/${userId}` : 'https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID'}" target="_blank" class="uppercase ml-auto text-2xxs text-colored"><i class="${edit ? 'ri-edit-line' : 'ri-external-link-line'}"></i> ${edit ? 'Editing!' : 'How to get an user\'s ID?'}</a>
</label>
  
            <div class="relative select-none">
                <i class="ri-user-4-line absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary"></i>
                <input type="text" id="add-member-id" class="bg-secondary border-primary w-full pl-10 py-3 rounded-lg text-xs focus:outline-none ${edit ? 'disabled-check' : ''}" placeholder="User's Discord ID here" spellcheck="false" ${edit ? 'value="' + userId + '"' : ''}>
            </div>
            <p class="text-secondary text-2xxs uppercase mb-1 mt-4 font-semibold flex items-center justify-between leading-none">Permissions</p>
            <div id="team-permissions-list" class="bg-primary rounded-md border-primary p-4 mt-3"></div>
        `,
		cancelLabel: 'Cancel',
		confirmLabel: 'Confirm',
		cancelAction: 'closeConfirmModal()',
		confirmAction: `saveMemberChanges(${edit});`
	});

	createPermToggles(teamPermissions);
}

function createPermToggles(permissions) {
	const permissionsList = document.getElementById('team-permissions-list');
	permissionsList.innerHTML = '';

	permissions.forEach((permission, index) => {
		const {
			name,
			description,
			disable = false
		} = permission;
		const disableClass = disable ? 'disable-check' : '';
		const isLastToggle = index === permissions.length - 1;

		const toggleHtml = `
            <div class="flex items-center justify-between individual-setting ${isLastToggle ? '' : 'pb-5 border-b-primary'} ${disableClass}">
                <div>
                    <label for="permission-${name}" class="text-secondary font-semibold text-xs cursor-pointer select-none">
                        ${name}
                    </label>
                    <p class="text-xs text-secondary mt-1">${description}</p>
                </div>
                <label for="permission-${name}" data-tippy-content="Enable or Disable!">
                    <div class="relative flex items-center cursor-pointer select-none">
                        <input type="checkbox" id="permission-${name}" class="sr-only">
                        <div class="block toggle-bg w-10 h-6 rounded-full transition duration-300">
                            <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                        </div>
                    </div>
                </label>
            </div>
        `;

		permissionsList.innerHTML += toggleHtml;
	});
}

function getMemberPerms() {
	const permissions = [];
	const checkboxes = document.querySelectorAll('#team-permissions-list input[type="checkbox"]');

	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			const id = checkbox.id.replace('permission-', '');
			permissions.push(id);
		}
	});

	return permissions;
}