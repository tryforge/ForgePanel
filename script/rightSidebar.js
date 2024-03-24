/*   BotForge © 2024, all rights reserved.   */

document.addEventListener('DOMContentLoaded', function() {
	const sidebar = document.getElementById('right-sidebar');
	const toggleIcon = document.getElementById('sidebar-toggle-icon');

	toggleIcon.addEventListener('click', function() {
		sidebar.classList.toggle('folded');
		toggleIcon.classList.toggle('ri-menu-fold-2-line');
		toggleIcon.classList.toggle('ri-menu-unfold-2-line');

		if (sidebar.classList.contains('folded')) {
			setTimeout(() => {
				sidebar.classList.add('hidden');
			}, 450);
		} else {
			sidebar.classList.remove('hidden');
		}
	});
});