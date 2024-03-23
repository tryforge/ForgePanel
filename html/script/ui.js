/*   BotForge © 2024, all rights reserved.   */

function setTabLabel(category, title, icon) {
	const tabLabels = document.querySelectorAll('.tab-label');

	// Path
	const pathTab = document.getElementById('path-tab');
	const pathCategory = document.getElementById('path-category');
	const pathIcon = document.getElementById('path-icon');

	if (pathTab && pathCategory && pathIcon) {
		tabLabels.forEach(tabLabel => {
			if (icon) {
				tabLabel.innerHTML = `<i class="${icon} hidden"></i> ${title}`;
			} else {
				tabLabel.textContent = title;
			}
		});

		if (category) {
			pathTab.textContent = title;
			pathCategory.textContent = category;
			pathIcon.className = icon;
		}
	} else {
		console.info('One or more elements not found!');
	}
}

function sweetHome() {
	document.getElementById('go-overview').click();
	toggleSidebar('tabContainer', true);
	setMainIcon('ri-home-6-line');
}

function setMainIcon(icon) {
	document.getElementById('path-main-icon').className = icon;
}

// Mobile Slider Sidebar
const sidebar = document.getElementById('right-sidebar');
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let lastTranslateX = 0;
const minSwipeDistance = 100;
const maxVelocity = 5;

document.addEventListener('DOMContentLoaded', function() {
    if(isMobile) { sidebar.style.transform = 'translateX(100%)'; }
});

function hasOverflowX(element) {
    return element.scrollWidth > element.clientWidth;
}

function shouldIgnoreClick(element) {
    if (touchEndX === 0) return true;
    let target = element;
    while (target !== document.body && target !== sidebar) {
        if (hasOverflowX(target)) {
            return true;
        }
        if (target.tagName.toLowerCase() === 'input' && target.type.toLowerCase() === 'range') {
            return true;
        }
        if (target.classList.contains('slide-ignore')) {
            return true;
        }
        target = target.parentElement;
    }
    return false;
}

function handleTouchStart(event) {
    if (shouldIgnoreClick(event.target)) {
        return;
    }
    touchStartX = event.touches[0].clientX;
    isDragging = true;
    sidebar.style.transition = 'none';
}

function handleTouchMove(event) {
    if (!isDragging) return;

    if (shouldIgnoreClick(event.target)) {
        return;
    }

    const touchCurrentX = event.touches[0].clientX;
    const touchDeltaX = touchCurrentX - touchStartX;
    const newTranslateX = lastTranslateX + touchDeltaX;

    const sidebarWidth = sidebar.offsetWidth;
    const maxTranslateX = sidebarWidth;

    if (newTranslateX >= 0 && newTranslateX <= maxTranslateX) {
        sidebar.style.transform = `translateX(${newTranslateX}px)`;
    }
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    isDragging = false;
    
    if (shouldIgnoreClick(event.target)) {
        return;
    }

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) >= minSwipeDistance) {
        const direction = swipeDistance > 0 ? 'right' : 'left';

        if (direction === 'left') {
            // Swipe from right to left
            sidebar.style.transform = 'translateX(0)';
        } else {
            // Swipe from left to right
            sidebar.style.transform = `translateX(${sidebar.offsetWidth}px)`;
        }
    } else {
        sidebar.style.transform = `translateX(${lastTranslateX}px)`;
    }

    sidebar.style.transition = 'transform 0.3s ease-in-out';
    lastTranslateX = parseInt(sidebar.style.transform.split('(')[1]) || 0;
}

// ...

  function toggleMobile() {
  if(!isMobile) { return; }
  document.getElementById('left-sidebar').classList.toggle('hidden');
  document.getElementById('mobile-navigation').classList.toggle('hidden');
  }
  
  function toggleLeftSidebar() {
  document.getElementById('left-sidebar').classList.toggle('hidden');
  }
  
    window.addEventListener('load', toggleMobile);
    
    
function displayMobileNav(id) {
    const mobileBars = document.querySelectorAll('.mobile-bar');
    
    mobileBars.forEach(bar => {
        if (bar.id === id) {
            bar.classList.remove('hidden');
            bar.classList.add('contents');
        } else {
            bar.classList.add('hidden');
            bar.classList.remove('contents');
        }
    });
}

// ...

let tabs = document.querySelectorAll('.mobile-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if(tab.classList.contains('deny-active')) { return; }
            tabs.forEach(t => {
                t.classList.remove('mobile-active-tab');
                t.classList.add('opacity-50');
                t.querySelector('span').classList.add('hidden');
            });

            tab.classList.remove('opacity-50');
            tab.classList.add('mobile-active-tab');
            tab.querySelector('span').classList.remove('hidden');
        });
    });
    
const currentYear = new Date().getFullYear();
document.getElementById('copyright-brand-year').textContent = currentYear;