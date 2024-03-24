/*   BotForge © 2024, all rights reserved.   */

function toggleSidebar(sidebarId, main) {
	const sidebars = document.querySelectorAll('.sidebar');
	const homeButton = document.getElementById('back-home');
	const rightSidebar = document.getElementById('right-sidebar');
	const toggleIcon = document.getElementById('sidebar-toggle-icon');
	if (!rightSidebar.classList.contains('folded')) {
		toggleIcon.click();
	}

	sidebars.forEach(sidebar => {
		sidebar.classList.add('hidden');
	});

	const sidebarToShow = document.getElementById(sidebarId);
	if (sidebarToShow) {
		sidebarToShow.classList.remove('hidden');
	}

	if (!main) {
		homeButton.classList.remove('hidden');
		//rightSidebar.classList.add('hidden');
	} else {
		homeButton.classList.add('hidden');
		//rightSidebar.classList.remove('hidden');
	}
}