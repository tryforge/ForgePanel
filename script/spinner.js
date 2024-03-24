/*   BotForge © 2024, all rights reserved.   */

function setSpinner(state) {
	const spinner = document.getElementById('spinner-container');
	const spinnerContent = spinner.querySelector('.spinner-content');

	if (state === "start") {
		spinnerContent.classList.remove('hide');
		spinnerContent.classList.add('show');
		setTimeout(() => {
			spinnerContent.classList.remove('show');
			spinnerContent.classList.add('hide');
		}, 4000);
	} else if (state === "stop") {
		setTimeout(() => {
			spinnerContent.classList.remove('show');
			spinnerContent.classList.add('hide');
		}, 1000);
	}
}