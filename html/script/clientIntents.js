/*   BotForge © 2024, all rights reserved.   */

// Toggle Intents By Default
function toggleIntents(intentsToToggle) {
	intentsToToggle.forEach(intentName => {
		const intentToggle = document.getElementById(`intents-${intentName}`);
		if (intentToggle) {
			intentToggle.checked = !intentToggle.checked;
		}
	});
}

// Add intent Toggles
function addIntentToggle(intentTitle, intentName, events, latest) {
	const intentsList = document.getElementById('intents-list');

	// Create intent toggle element
	const intentToggle = document.createElement('div');
	intentToggle.classList.add('flex', 'items-center', 'justify-between', 'individual-setting', 'pb-4');
	intentToggle.setAttribute('data-group', 'intents');

	if (!latest) {
		intentToggle.classList.add('border-b-primary')
	}

	let noEvents = '';
	if (events.length === 0) {
		noEvents = "<i class='ri-information-line'></i> This intent does not represent individual events.";
	}

	let privilegedIntent = '';
	if (intentName === "GuildPresences" || intentName === "MessageContent" || intentName === "GuildMembers") {
		privilegedIntent = `
    <span class="font-normal text-xxs pl-1 pr-2 rounded-full accent-color bg-purple-500 text-tertiary" style="padding-top: 1px;padding-bottom: 1px;" data-tippy-interactive="true" data-tippy-content="<span class='font-normal'>
<b>${intentName}</b> is a privileged intent. If your bot is in fewer than 100 guilds, you need to enable it on <a href='https://discord.com/developers/applications' target='_blank' class='text-colored'><i class='ri-external-link-line'></i> Discord's Developer Portal</a>. However, if your bot is verified, you need to apply for the ${intentTitle} intent. Learn how to verify your bot in this <a href='https://support.discord.com/hc/es/articles/360040720412-Bot-Verification-and-Data-Whitelisting' target='_blank' class='text-colored'><i class='ri-external-link-line'></i> Discord Article</a>.</span>
    "><i class="ri-spam-line"></i> Privileged</span>
    `;
	}

	intentToggle.innerHTML = `
                      <div>
                          <label for="intents-${intentName}" class="text-primary font-normal text-xs cursor-pointer select-none">
                              ${intentTitle} ${privilegedIntent}
                          </label>
      
                          <div>
                              <a class="text-xs text-colored mt-2" href="#" onclick="toggleEventsDropdown(this)">
                                  Show Events <i class="ri-arrow-drop-right-line" data-icon="arrow"></i>
                              </a>
                              <div class="events-list mt-2 border-primary py-3 px-4 rounded-lg text-colored hidden"> <!-- colored lighter -->
                                  <ul class="text-xs">
                                      ${events.map(event => `<li>${event}</li>`).join('')}
                                      ${noEvents}
                                  </ul>
                              </div>
                          </div>
                      </div>
      
                      <label for="intents-${intentName}">
                          <div class="relative flex items-center cursor-pointer select-none" data-tippy-content="Enable or Disable!">
                              <input type="checkbox" id="intents-${intentName}" class="sr-only">
                              <div class="block toggle-bg w-10 h-6 rounded-full transition duration-300">
                                  <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-200"></div>
                              </div>
                          </div>
                      </label>
                  `;

	// Append the intent toggle to the container
	intentsList.appendChild(intentToggle);

	if (latest) {
		tippy('#intents-list [data-tippy-content]', {
			inertia: true,
			theme: 'forge',
			allowHTML: true
		});
		loadAllIntentsToggle();
	}
}

function createIntentToggles() {
	setSpinner('start');
	// GUILD_MEMBERS (1 << 1) **
	addIntentToggle(
		"Guild Members",
		"GuildMembers",
		["guildMemberAdd", "guildMemberUpdate", "guildMemberRemove", "threadMembersUpdate"]
	);

	// GUILD_MODERATION (1 << 2)
	addIntentToggle(
		"Guild Moderation",
		"GuildModeration",
		["guildAuditLogEntryCreate", "guildBanAdd", "guildBanRemove"]
	);

	// GUILD_EMOJIS_AND_STICKERS (1 << 3)
	addIntentToggle(
		"Guild Emojis and Stickers",
		"GuildEmojisAndStickers",
		["guildEmojisUpdate", "guildStickersUpdate"]
	);

	// GUILD_INTEGRATIONS (1 << 4)
	addIntentToggle(
		"Guild Integrations",
		"GuildIntegrations",
		["guildIntegrationsUpdate", "integrationCreate", "integrationUpdate", "integrationDelete"]
	);

	// GUILD_WEBHOOKS (1 << 5)
	addIntentToggle(
		"Guild Webhooks",
		"GuildWebhooks",
		["webhooksUpdate"]
	);

	// GUILD_INVITES (1 << 6)
	addIntentToggle(
		"Guild Invites",
		"GuildInvites",
		["inviteCreate", "inviteDelete"]
	);

	// GUILD_VOICE_STATES (1 << 7)
	addIntentToggle(
		"Guild Voice States",
		"GuildVoiceStates",
		["voiceStateUpdate"]
	);

	// GUILD_PRESENCES (1 << 8)
	addIntentToggle(
		"Guild Presences",
		"GuildPresences",
		["presenceUpdate"]
	);

	// GUILD_MESSAGES (1 << 9)
	addIntentToggle(
		"Guild Messages",
		"GuildMessages",
		["messageCreate", "messageUpdate", "messageDelete", "messageDeleteBulk"]
	);

	// GUILD_MESSAGE_REACTIONS (1 << 10)
	addIntentToggle(
		"Guild Message Reactions",
		"GuildMessageReactions",
		["messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageReactionRemoveEmoji"]
	);

	// GUILD_MESSAGE_TYPING (1 << 11)
	addIntentToggle(
		"Guild Message Typing",
		"GuildMessageTyping",
		["typingStart"]
	);

	// DIRECT_MESSAGES (1 << 12)
	addIntentToggle(
		"Direct Messages",
		"DirectMessages",
		["messageCreate", "messageUpdate", "messageDelete", "channelPinsUpdate"]
	);

	// DIRECT_MESSAGE_REACTIONS (1 << 13)
	addIntentToggle(
		"Direct Message Reactions",
		"DirectMessageReactions",
		["messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageReactionRemoveEmoji"]
	);

	// DIRECT_MESSAGE_TYPING (1 << 14)
	addIntentToggle(
		"Direct Message Typing",
		"DirectMessageTyping",
		["typingStart"]
	);

	// MESSAGE_CONTENT (1 << 15)
	addIntentToggle(
		"Message Content",
		"MessageContent",
		[]
	);

	// GUILD_SCHEDULED_EVENTS (1 << 16)
	addIntentToggle(
		"Guild Scheduled Events",
		"GuildScheduledEvents",
		["guildScheduledEventCreate", "guildScheduledEventUpdate", "guildScheduledEventDelete", "guildScheduledEventUserAdd", "guildScheduledEventUserRemove"]
	);

	// AUTO_MODERATION_CONFIGURATION (1 << 20)
	addIntentToggle(
		"Auto Moderation Configuration",
		"AutoModerationConfiguration",
		["autoModerationRuleCreate", "autoModerationRuleUpdate", "autoModerationRuleDelete"]
	);

	// AUTO_MODERATION_EXECUTION (1 << 21)
	addIntentToggle(
		"Auto Moderation Execution",
		"AutoModerationExecution",
		["autoModerationActionExecution"],
		true
	);
}

function loadAllIntentsToggle() {
	const masterToggle = document.getElementById("toggle-all-intents");
	const guildsToggle = document.getElementById('guilds-showEvents');

	const intentToggles = document.querySelectorAll('[data-group="intents"] input[type="checkbox"]');

	masterToggle.addEventListener("click", function() {
		const isChecked = masterToggle.checked;

		intentToggles.forEach(function(toggle) {
			toggle.checked = isChecked;
			guildsToggle.classList.toggle('disabled-check', isChecked);
			toggle.closest('.individual-setting').classList.toggle('disabled-check', isChecked);
		});
	});

	/*intentToggles.forEach(function(toggle) {
	    toggle.addEventListener("click", function() {
	        guildsToggle.classList.toggle('disabled-check', isChecked);
	        toggle.closest('.individual-setting').classList.remove('disabled-check');
	    });
	});*/
	setSpinner('stop');
}