
/*   BotForge © 2024, all rights reserved.   */

function validateBotToken(clientToken) {
	const tokenValue = clientToken.trim();
	const tokenParts = tokenValue.split('.');

	if (tokenParts.length === 3) {
		try {
			const decodedBotID = atob(tokenParts[0]);

			if (/^\d{16,21}$/.test(decodedBotID)) {
				console.log("[BotForge] All checks passed! Possible valid Bot Token given, input allowed.");
				return true;
			} else {
				console.log("[BotForge] User Input Problem › Invalid Token, invalid Bot ID as first component, given:", tokenParts[0]);
				return false;
			}
		} catch (error) {
			console.log("[BotForge] Invalid decoding.");
			return false;
		}
	} else {
		console.log("[BotForge] User Input Problem › Invalid Token, missing components.");
		return false;
	}
}

function getCookieValue(cookieName) {
	const cookieString = document.cookie;
	const cookies = cookieString.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(`${cookieName}=`)) {
			return cookie.substring(cookieName.length + 1);
		}
	}
	return null;
}

function goTo(id, activateThis) {
    if(activateThis) { activateTab(activateThis);displayMobileNav('mobileNavbar-main'); }
const element = document.getElementById(id);
    if (isMobile) {
        setTimeout(() => {
            element.click();
            if(element.parentNode.id) { displayMobileNav(element.parentNode.id); }
        }, 0);
    } else {
        element.click();
    }
}

function activateTab(id) {
    tabs.forEach(tab => {
        if (tab.id === id) {
            tab.classList.remove('opacity-50');
            tab.classList.add('mobile-active-tab');
            tab.querySelector('span').classList.remove('hidden');
        } else {
            tab.classList.remove('mobile-active-tab');
            tab.classList.add('opacity-50');
            tab.querySelector('span').classList.add('hidden');
        }
    });
}


let currentTab = 'mobile-tab-home';
let previousTab;
function backRegister(id) {
previousTab = currentTab;
currentTab = id;
if(previousTab) { document.getElementById('mobile-back-btn').classList.remove('disabled-check'); }
if(previousTab === currentTab) { document.getElementById('mobile-back-btn').classList.add('disabled-check'); }
}


function genIframe() {
const textColorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary');

const iframe = document.createElement('iframe');
const url = `https://botforge.org/permissions?bg_color=transparent&text_color=${encodeURIComponent(textColorPrimary)}&footer=false&client_id=${clientID}`;
iframe.src = url;
iframe.width = "100%";
iframe.height = "100%";
const inviteBotIframe = document.getElementById('inviteBot-iframe');
inviteBotIframe.innerHTML = '';
inviteBotIframe.appendChild(iframe);
}


// requests

async function sendRequest(method, path, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data !== null) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(path, options);

    if (!response.ok) {
        throw new Error(`[Request] HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

// get enabled extensions
function getEnabledExtensions() {
    const enabledExtensions = [];
    const extensionElements = document.querySelectorAll('#extensions-list .individual-extension');

    extensionElements.forEach(extensionElement => {
        const checkbox = extensionElement.querySelector('input[type="checkbox"]');
        const extensionName = extensionElement.querySelector('.text-primary').textContent.trim();

        // Add a check to ensure checkbox is not null
        if (checkbox && checkbox.checked) {
            enabledExtensions.push(extensionName);
        }
    });

    return enabledExtensions;
}

// enable specific extensions
function enableExtensions(extensionNames) {
    const extensionElements = document.querySelectorAll('#extensions-list .individual-extension');

    extensionElements.forEach(extensionElement => {
        const extensionNameElement = extensionElement.querySelector('.text-primary');
        const extensionName = extensionNameElement ? extensionNameElement.textContent.trim() : '';

        if (extensionNames.includes(extensionName)) {
            const checkbox = extensionElement.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    });
}
