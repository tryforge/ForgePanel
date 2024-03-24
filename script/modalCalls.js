/*   BotForge © 2024, all rights reserved.   */

// delete an event
function callDeleteEvent(id) {
	openConfirmationModal({
		title: 'Deleting an event',
		titleIcon: 'ri-spam-line',
		description: `
                      <h1 class="text-lg text-primary text-center">Are you sure?</h1>
                      <p class= "text-xxs text-primary opacity-80 text-center">This action cannot be undone. Deleting this event will permanently remove it from the system, it cannot be recovered, if you confirm this action and you regret it can't be reverted.</p>
                    `,
		cancelLabel: 'Cancel',
		confirmLabel: 'Confirm',
		cancelAction: 'closeConfirmModal()',
		confirmAction: `actionDeleteCommand('${id}', 'event');`
	});
}


// delete a command
function callDeleteCommand(id) {
	openConfirmationModal({
		title: 'Deleting a command',
		titleIcon: 'ri-spam-line',
		description: `
                      <h1 class="text-lg text-primary text-center">Are you sure?</h1>
                      <p class= "text-xxs text-primary opacity-80 text-center">This action cannot be undone. Deleting this command will permanently remove it from the system, it cannot be recovered, if you confirm this action and you regret it can't be reverted.</p>
                    `,
		cancelLabel: 'Cancel',
		confirmLabel: 'Confirm',
		cancelAction: 'closeConfirmModal()',
		confirmAction: `actionDeleteCommand('${id}', 'command');`
	});
}


// remove bot from server
function callRemoveBot(event) {
	const tr = event.target.closest('tr');
	const serverId = tr.getAttribute('data-server-id');
	const serverName = tr.getAttribute('data-server-name');
	console.log('Executed confirmation modal to remove bot from server ID', serverId);
	const id = serverId;

	openConfirmationModal({
		title: 'Removing bot from Server',
		titleIcon: 'ri-spam-line',
		description: `
                <h1 class="text-lg text-primary text-center">Are you sure?</h1>
                <p class= "text-xxs text-primary opacity-80 text-center">Confirming this action will remove the bot from the server <b>${serverName}</b>, the bot can be re-added by the server administrators.</p>
              `,
		cancelLabel: 'Cancel',
		confirmLabel: 'Confirm',
		cancelAction: 'closeConfirmModal()',
		confirmAction: `actionRemoveBot(id);`
	});
}


// remove user from panel
function callRemoveMember(event) {
	const tr = event.target.closest('tr');
	const memberId = tr.getAttribute('data-member-id');
	const memberName = tr.getAttribute('data-member-name');
	console.log('Executed confirmation modal to remove member ID', memberId);
	const id = memberId;

	openConfirmationModal({
		title: 'Removing a Member',
		titleIcon: 'ri-spam-line',
		description: `
                <h1 class="text-lg text-primary text-center">Are you sure?</h1>
                <p class= "text-xxs text-primary opacity-80 text-center">This action will remove the member <b>${memberName}</b> from the panel, revoking their access. They will need to be re-added to regain access.</p>
              `,
		cancelLabel: 'Cancel',
		confirmLabel: 'Confirm',
		cancelAction: 'closeConfirmModal()',
		confirmAction: `actionRemoveMember(id);`
	});
}