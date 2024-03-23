/*   BotForge © 2024, all rights reserved.   */

function showToast(label, message) {
	const toast = document.getElementById('toast-popup');
	if (toast) {
		toast.classList.remove('hidden');
		document.getElementById('toast-label').innerHTML = label || '<i class="ri-notification-line"></i> Notification';
		document.getElementById('toast-message').innerHTML = message || 'Your action was successfully executed!';

		toast.style.transition = 'none';
		toast.style.transform = 'translateX(150%)';

		toast.offsetHeight;
		toast.style.transition = 'transform 0.5s ease-out 0s';
		toast.style.transform = 'translateX(0%)';
		setTimeout(() => {
			hideToast();
		}, 5000);
	} else {
		console.error("Toast popup not found! :c");
	}
}

function hideToast() {
	const toast = document.getElementById('toast-popup');
	if (toast) {
		toast.style.transition = 'transform 0.5s ease-out 0s';
		toast.style.transform = 'translateX(150%)';

		setTimeout(() => {
			toast.classList.add('hidden');
		}, 500);
	} else {
		console.error("Toast popup not found.");
	}
}