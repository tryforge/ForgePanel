/*   BotForge © 2024, all rights reserved.   */

function applyCookieHue(onLoad) {
	const hue = getCookieValue('panelAccentColor');
	if (hue) {
		accentFilter(hue, false);
	}
	if (onLoad) {
		setHueSlider(hue);
	}
}

function setHueSlider(value) {
	const hue = value || 0;
	const slider = document.getElementById('hue-slider');
	const sliderValue = document.getElementById('slider-value')
	const colorImage = document.getElementById('color-image');

	slider.value = hue;
	slider.style.filter = `hue-rotate(${hue}deg)`;
	sliderValue.textContent = `${hue}°`;
	colorImage.style.filter = `hue-rotate(${hue}deg)`;
}

// apply filter func
function accentFilter(hue, clearFilter = false, parentElementId = null) {
	document.documentElement.style.setProperty('--filter-accent-hue', `${hue}deg`);
	document.cookie = `panelAccentColor=${hue}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
}

window.addEventListener('DOMContentLoaded', () => {
	applyCookieHue(true);
});