/*   BotForge © 2024, all rights reserved.   */

/* Save popups actions */

function saveCustomizationData() {

const botData = {
    activityText, // I.E "Spotify"
    activityType, // I.E "Playing"
    mobileStatus, // true/false
    botStatus, // I.E "idle"
    botAvatar,
    botBanner,
    botName
};

closeSavePopup('personalize');
sendRequest('POST', `/uwu`, botData)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
                `Successfully updated your bot's profile.`);
            console.log(`[Request - personalize] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to update your bot's profile, please let us know about this issue.`);
        console.error(`[Request - personalize] Error:`, error);
    });

}


function saveClientData() {
	const clientEvents = getCheckedEvents();
	const clientIntents = getCheckedIntents();
	const clientToken = document.getElementById('client-token').value;
	const inviteSystem = document.getElementById('client-useInviteSystem').checked;
	const respondOnEdit = document.getElementById('client-respondOnEdit').checked;

	if (!validateBotToken(clientToken)) {

		showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
			"It seems your Bot Token is incorrect. Please ensure that you have provided a valid Bot Token in your client settings.");

		return;
	}

const clientData = {
    clientToken, // string
    inviteSystem, // bool
    respondOnEdit, // bool
    clientEvents, // array
    clientIntents // array
};

closeSavePopup('client');
sendRequest('POST', `/uwu`, clientData)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
                `Successfully updated your bot's client information.`);
            console.log(`[Request - client] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to update your bot's client information, please let us know about this issue.`);
        console.error(`[Request - client] Error:`, error);
    });

}


function saveThemesData() {

	if (currentTheme) {
		saveCurrentTheme(currentTheme);
	}

	const hue = document.getElementById('hue-slider').value;
	accentFilter(hue, false);

	closeSavePopup('themes');

	showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
		"Successfully saved your theme configuration!");

}


function saveMemberChanges(edit) {
	const addMemberId = document.getElementById('add-member-id');
	const memberId = addMemberId.value;

	let errorMsg;
	let successMsg;

	if (edit) {
		errorMsg = "The fetched ID seems invalid, this might be an error, please let us know.";
		successMsg = "Successfully edited the given member's team information.";
	} else {
		errorMsg = "Please provide a valid member ID to add to your Team, the ID you gave seems invalid.";
		successMsg = "Successfully added the given member ID to your team.";
	}

	// Invalid ID check
	if (addMemberId.value.length < 16 || addMemberId.value.length > 22 || isNaN(addMemberId.value)) {
		console.log('[Team] Invalid member ID, couldn\'t add.');
		showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`, errorMsg);
		return;
	}
	
// after checks, request.

const permissionsArray = getMemberPerms();



sendRequest('DELETE', `/uwu/${memberId}`, permissionsArray)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`, successMsg);
            console.log(`[Request - teams] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to do this action, please let us know about this issue.`);
        console.error(`[Request - teams] Error:`, error);
    });
	closeConfirmModal();

}


function saveExtensionsData() {
 closeSavePopup('extensions');
 const enabledExtensions = getEnabledExtensions(); // extensions array
sendRequest('POST', `/uwu`, enabledExtensions)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
                `Successfully updated your extensions.`);
            console.log(`[Request - extensions] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to update your extensions.`);
        console.error(`[Request - extensions] Error:`, error);
    });
}

/* Modal actions */

// "Commands" & "Events" tab.
function actionDeleteCommand(id, type) {
sendRequest('DELETE', `/uwu/${id}`)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
                `Successfully deleted the given ${type}.`);
            console.log(`[Request - ${type} deletion] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to delete this ${type}, consult to our support team.`);
        console.error(`[Request - ${type} deletion] Error:`, error);
    });
closeConfirmModal();
}

// "Servers" tab, "Leave Server" dropdown.
function actionRemoveBot(serverId) {

sendRequest('DELETE', `/uwu/${serverId}`)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
                `Successfully removed this bot from the server.`);
            console.log(`[Request - servers] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to remove your bot from this server, please let us know about this issue.`);
        console.error(`[Request - servers] Error:`, error);
    });
	closeConfirmModal();

}

// "Teams" tab, "Remove Member" dropdown.
function actionRemoveMember(memberId) {

sendRequest('DELETE', `/uwu/${memberId}`)
    .then(data => {
        if (data) {
            showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
                `Successfully removed this member from the team.`);
            console.log(`[Request - teams] Response:`, data);
        }
    })
    .catch(error => {
        showToast(`<span class='text-red-400'><i class="ri-spam-line"></i> Error!</span>`,
            `There's been a problem trying to remove this member from the team, please let us know about this issue.`);
        console.error(`[Request - teams] Error:`, error);
    });
	closeConfirmModal();

}
