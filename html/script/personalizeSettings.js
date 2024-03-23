/*   BotForge © 2024, all rights reserved.   */

let botAvatar = "https://docs.botforge.org/media/karl_sm.webp";

// Function to set the bot avatar from URL or base64 data
function setBotAvatar(urlOrB64) {
	const preview1 = document.getElementById("bot-avatar-1");
	const preview2 = document.getElementById("bot-avatar-2");
	preview1.src = urlOrB64;
	preview2.src = urlOrB64;
	botAvatar = urlOrB64;
}

// Event listener for the input change
document.getElementById("customize-avatarInput").addEventListener("change", function(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			setBotAvatar(e.target.result);
		}
		reader.readAsDataURL(file);
	}
});

const bannerUpload = document.getElementById('banner-upload');
const bannerImage = document.getElementById('banner-image');
const uploadText = document.getElementById('upload-text');
const removeButton = document.getElementById('remove-button');
let botBanner;

bannerUpload.addEventListener('change', handleUpload);

function handleUpload(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			bannerImage.style.backgroundImage = `url('${e.target.result}')`;
			botBanner = e.target.result;
			showUploadText();
			removeButton.classList.remove('hidden');
		}
		reader.readAsDataURL(file);
	}
}

removeButton.addEventListener('click', () => {
	bannerImage.style.backgroundImage = '';
	bannerUpload.value = '';
	showUploadText();
	removeButton.classList.add('hidden');
});

function showUploadText() {
	bannerImage.addEventListener('mouseenter', () => {
		uploadText.classList.remove('hidden');
	});

	bannerImage.addEventListener('mouseleave', () => {
		if (bannerImage.style.backgroundImage) {
			uploadText.classList.add('hidden');
		}
	});
}

function uploadBanner(url) {
	bannerImage.style.backgroundImage = `url('${url}')`;
	botBanner = url;
	showUploadText();
	removeButton.classList.remove('hidden');
}

// Activities

let activityType;
let activityText;
let debounceActivity;

function setActivityType(type, menuCall, id) {
	activityType = type;
	setActivityPreview(activityType, activityText, true);
}

function setActivityText(text) {
	clearTimeout(debounceActivity);
	debounceActivity = setTimeout(() => {
		activityText = text;
		setActivityPreview(activityType, activityText, true);
	}, 300);
}

function setActivityPreview(type, text, inputCall) {
	const typeContainer = document.getElementById('activity-type');
	const textContainer = document.getElementById('activity-text');
	const ogType = (activityType || type || '').split(' ')[0].toLowerCase();

	if (!inputCall) {
		if (activityType || type) document.getElementById('activityType-' + ogType).click();
		if (activityText || text) document.getElementById('activity-text-input').value = activityText || text;

		setActivityText(text);
		return;
	}

	console.log(`[Activity] Type set to ${ogType}`);

	if (activityType !== 'Custom') {
		if (!activityType || !activityText) {
			console.log(`[Activity] Couldn't set, no type given, for custom text use the 'custom' type.`);
			return;
		}
		typeContainer.textContent = type;
		textContainer.textContent = text;
		textContainer.classList.add('font-semibold');
		console.log(`[Activity] Activity ${ogType} set to "${type} ${text}"`);
	} else {
		typeContainer.textContent = '';
		textContainer.textContent = text;
		textContainer.classList.remove('font-semibold');
		console.log(`[Activity] Activity ${ogType} set to "${text}"`);
	}

	const streamingStatus = document.getElementById('streaming-status');
	const normalStatus = document.getElementById('normal-status');

	if (activityType === 'Streaming' && activityText) {
		streamingStatus.classList.remove('hidden');
		normalStatus.classList.add('hidden');
	} else {
		streamingStatus.classList.add('hidden');
		normalStatus.classList.remove('hidden');
	}
}

// bot name input
let botName;
document.addEventListener('DOMContentLoaded', function() {
	const botNameInput = document.getElementById('bot-name-input');
	const botNamePreview = document.getElementById('bot-name-preview');

	botNameInput.addEventListener('input', function() {
		const inputValue = this.value.trim();
		if (inputValue.length >= 2 && inputValue.length <= 32) {
			botNamePreview.textContent = inputValue;
			botName = inputValue;
		}
	});
});

// Statuses
let botStatus;
let mobileStatus;

function setBotStatus(status, menuCall, mobile) {
	const firstIcon = document.getElementById('status-icon-1');
	const secondIcon = document.getElementById('status-icon-2');
	const clientMenu = document.getElementById('client-type-input');

	if (status === 'online') {
		clientMenu.classList.remove('disabled-check');
	} else {
		if (mobileStatus) {
			setStatusType('desktop', false);
			setBotStatus(status, false, false);
			botStatus = status;
			mobileStatus = false;
			clientMenu.classList.add('disabled-check');
			return;
		} else {
			clientMenu.classList.add('disabled-check');
		}
	}

	if (!menuCall) {
		document.getElementById('botStatus-' + status).click();
	}

	setBotInvisible(status === 'offline' || status === 'invisible');

	switch (status) {
		case 'online':
			firstIcon.innerHTML = '<i class="ri-checkbox-blank-circle-fill"></i>';
			firstIcon.style.color = '#43b581';
			botStatus = 'online';
			break;
		case 'idle':
			firstIcon.innerHTML = '<i class="ri-moon-fill"></i>';
			firstIcon.style.color = '#FAA61A';
			firstIcon.style.transform = 'scaleX(-1)';
			botStatus = 'idle';
			break;
		case 'dnd':
			firstIcon.innerHTML = '<i class="ri-indeterminate-circle-fill"></i>';
			firstIcon.style.color = '#f04747';
			botStatus = 'dnd';
			break;
		case 'offline':
		case 'invisible':
			firstIcon.innerHTML = '<i class="ri-checkbox-blank-circle-line"></i>';
			firstIcon.style.color = '#747e8c';
			botStatus = 'invisible';
			break;
	}

	setStatusType(mobile || mobileStatus ? 'mobile' : 'desktop', true);
	console.log('[Bot Customization Preview] Changed bot presence status to', status);
}

function setStatusType(type, menuCall) {
	const firstIcon = document.getElementById('status-icon-1');
	const secondIcon = document.getElementById('status-icon-2');

	if (!menuCall) {
		document.getElementById('statusType-' + type).click();
	}

	mobileStatus = type === 'mobile';

	if (type === 'mobile') {
		firstIcon.innerHTML = '<i class="ri-smartphone-line"></i>';
		secondIcon.classList.remove('ri-checkbox-blank-circle-fill');
		secondIcon.classList.add('ri-smartphone-fill');
	} else {
		secondIcon.classList.add('ri-checkbox-blank-circle-fill');
		secondIcon.classList.remove('ri-smartphone-fill');
	}

	console.log('[Bot Customization Preview] Changed bot device status to', type);
}

function setBotInvisible(state) {
	const botCard = document.getElementById('bot-preview');
	const statusDot = document.getElementById('bot-status');
	const botRole = document.getElementById('bot-role-preview');
	const botActivity = document.getElementById('bot-activity-preview');

	if (state) {
		botCard.classList.add('opacity-50');
		statusDot.classList.add('hidden');
		botActivity.classList.add('hidden');
		botRole.textContent = "Offline";
	} else {
		botCard.classList.remove('opacity-50');
		statusDot.classList.remove('hidden');
		botActivity.classList.remove('hidden');
		botRole.textContent = "Bot Preview";
	}
}

// set bot name

function setBotName(name) {
	if (!name) {
		console.log('No bot name given.');
		return;
	}
	const nameInput = document.getElementById('bot-name-input');
	nameInput.value = name;
	botName = name;

	const inputEvent = new InputEvent('input', {
		bubbles: false,
		cancelable: true
	});

	nameInput.dispatchEvent(inputEvent);

}

// set as verified
function isBotVerified(state) {
const tick = document.getElementById('verified-bot');
 if(state === true) {
 tick.classList.remove('hidden');   
 } else {
 tick.classList.add('hidden');
 }
}