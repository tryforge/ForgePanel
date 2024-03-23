/*   BotForge © 2024, all rights reserved.   */

const customSelects = document.querySelectorAll('.custom-select');

customSelects.forEach(select => {
	const selectButton = select.querySelector('button');
	const optionsBlackBg = select.querySelector('.options-background');
	const optionsContainer = select.querySelector('.options-container');
	const options = select.querySelectorAll('.options-container button');
	const selectIcon = select.querySelector('.select-icon');
	const selectText = select.querySelector('.custom-select span');

	selectButton.addEventListener('click', () => {
		optionsContainer.classList.toggle('hidden');
		optionsBlackBg.classList.remove('hidden');
		updateSelectIcon();
	});

	document.addEventListener('click', (event) => {
		if (!select.contains(event.target) || event.target == optionsBlackBg) {
			optionsContainer.classList.add('hidden');
			optionsBlackBg.classList.add('hidden');
			updateSelectIcon();
		}
	});

	options.forEach(option => {
		option.addEventListener('click', () => {
			selectText.innerHTML = option.innerHTML;
			optionsContainer.classList.add('hidden');
			optionsBlackBg.classList.add('hidden');
			updateSelectIcon();
		});
	});

	function updateSelectIcon() {
		if (optionsContainer.classList.contains('hidden')) {
			selectIcon.classList.remove('ri-arrow-down-s-line');
			selectIcon.classList.add('ri-arrow-right-s-line');
		} else {
			selectIcon.classList.remove('ri-arrow-right-s-line');
			selectIcon.classList.add('ri-arrow-down-s-line');
		}
	}
});