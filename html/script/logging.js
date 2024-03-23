/*   BotForge © 2024, all rights reserved.   */

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('change', () => {
		const action = checkbox.checked ? 'enabled' : 'disabled';
		console.log(`[settings] Checkbox ${checkbox.id} ${action}`);
	});
});