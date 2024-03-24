/*   BotForge © 2024, all rights reserved.   */

const tips = [
    "Click or tap to skip the loading screen!",
    "Click or tap to skip the loading screen!",
    "Click or tap to skip the loading screen!",
    "Join our Discord Server for support and community.",
    "Ever wonder if anyone reads tips? Well, you just did! 😉",
    "💥 Did you know? An explosion caused by a charged creeper is twice as powerful as one caused by a normal creeper.",
    "Got unexpected behavior in your code? Try console logging ($log[something...]) and refer to the documentation. 🐛📝",
    "🤔 Not sure what a certain function does? Visit the documentation for clarification. 📚",
    "Feeling stuck with your bot's development? Don't worry, 80% of Discord Bot Developers do. 😅",
    "Keep your Bot Token secure! If leaked, reset it immediately to prevent unauthorized access. 🔒",
    "Want to enhance your bot's functionality? Explore the possibilities with custom functions and extensions. 🔨️",
    "Optimize your bot's performance by minimizing unnecessary commands and optimizing code. ⚙️",
    "Stay up-to-date with Discord API changes and updates to ensure compatibility with your bot. 🔄",
    "BotForge's changes are announced in the documentation site and the #updates channel on our Discord Server. 🎓️",
    "Before updating to a newer version of an extension or ForgeScript, always make sure to check if there's any possible breaking change. ⚠️",
    "Don't like the panel's default color scheme? Change it on the Settings tab! 🎨",
    "Want to invite another Developer to code your bot with you? Use the Team tab! 👥",
    "A person with ManageMembers permission on the Team tab can invite other members with any permissions, only give that permission to very trusted people. 👑",
    "Always make sure to enable only the intents and events your bot actually needs. ⚡",
    "As a developer, server owners trust you to prioritize safety. Always follow appropriate safety practices to maintain their trust and ensure the security of their servers. 🔑️️",
    "Prioritize quality over quantity, if your bot doesn't get the recognition you think it deserves don't lose motivation! 🌟",
    "We aim to provide the best experience for you. If you have any suggestions or feedback for us, please share them in the #suggestions channel on our Discord server! 📣",
    "Wanna share your review? Head over to our #reviews channel! 🌟 While we love those 5 stars, we want you to be honest with your review. Your feedback helps us improve! 🚀",
    "This is not a tip, I just want to wish you a good day! Here, a star for you: 🌟",
    "We try to stay up to date with Discord's API, we will never give you up, we would never let you down and desert you. 🎵",
    "Is this a JOJO REFERENCE?! 🤔",
    "Don't buy pets, adopt! 🐾",
    "Am I supposed to put a TIP here? Yeez, just skip me already.",
    "Enjoying that loading screen huh? Let's wait together. 😉",
    "You can disable the loading screen in the settings tab, but you don't want that, do you? 🤔",
    "Plating a tree should be one of your life goals. 🌳",
    "🌍✨ The Earth is neither round nor flat; it's a Minecraft cube! 🎮🌟",
    "BotForge bots can be verified by Discord, no issue on that end! 😄",
    "Always comply with BotForge's and Discord's Terms of Services and policies, don't be a bad apple!"
];


const loader = document.getElementById('loader-wrapper');
const tipText = document.getElementById('tip-text');
const webContent = document.getElementById('main-web-content');

const isHideLoad = document.cookie.split(';').some((c) => {
	return c.trim().startsWith('isHideLoad=true');
});

if(!isMobile) {webContent.classList.remove('hidden');}

if (isHideLoad) {
	loader.classList.add('hidden');
	if(isMobile) { webContent.classList.remove('hidden'); }
// Add touch event listeners
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

} else {
	// Show loading screen for 5 seconds
	setTimeout(function() {
	loader.classList.add('hidden');
// Add touch event listeners
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
	}, 5000);
	
	if(isMobile) {
	setTimeout(function() {
	    webContent.classList.remove('hidden');
	}, 4000);
	}

	// Show random tip
	const randomIndex = Math.floor(Math.random() * tips.length);
	tipText.textContent = tips[randomIndex];
}