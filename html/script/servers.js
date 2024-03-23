/*   BotForge © 2024, all rights reserved.   */

function copyServerID() {
	const button = event.target;

	const trElement = button.closest('tr');

	const memberId = trElement.getAttribute('data-server-id');

	navigator.clipboard.writeText(memberId)
		.then(() => {
			console.log('Server ID copied successfully: ', memberId);
			showToast(`<span class='text-green-400'><i class="ri-check-line"></i> Success!</span>`,
				"Successfully copied server ID to your clipboard!");
		})
		.catch(err => console.error('Failed to copy server ID: ', err));
}