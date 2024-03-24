/*   BotForge © 2024, all rights reserved.   */

// Function to open the confirmation modal
function openConfirmationModal(config) {
	// Get modal elements
	const modal = document.getElementById('confirmation-modal');
	const modalContent = document.getElementById('confirmation-modal-content');
	const modalButtons = document.getElementById('confirmation-modal-buttons');
	const modalHeader = document.getElementById('confirmation-modal-header');

	// Generate modal header
	modalHeader.innerHTML = `
              <div class="bg-alt-primary px-4 py-3 rounded-t-lg">
                <h2 class="text-xs text-primary">${config.titleIcon ? `<i class="${config.titleIcon}"></i>` : ''} ${config.title}</h2>
              </div>
              <!-- Close Button -->
              <button onclick="closeConfirmModal()" class="absolute top-2 right-2 text-primary focus:outline-none">
                <i class="ri-close-line"></i>
              </button>
            `;

	// Generate modal content 
	modalContent.innerHTML = `
              <!-- Description -->
              <section class="text-xs mx-3 md:mx-5">      
                <div class="mt-5 px-0 md:px-5 py-4 rounded-lg w-full h-fit">
                  ${config.description}
                </div>
              </section>
            `;

	// Generate modal buttons
	modalButtons.innerHTML = `
    <!-- Buttons -->
    <div class="mt-3 mx-2 py-3 text-right border-t-primary">
        ${config.cancelAction ? `
            <button class="bg-alt-secondary border-secondary text-primary px-6 py-2 rounded text-xs mr-1" onclick="${config.cancelAction}">
                ${config.cancelLabel}
            </button>
        ` : ''}
        ${config.confirmAction ? `
            <button class="button-gradient text-tertiary px-6 py-2 rounded text-xs" onclick="${config.confirmAction}">
                ${config.confirmLabel}
            </button>
        ` : ''}
    </div>
`;

	// Show the modal
	modal.classList.remove('hidden');
}

// Function to close the modal
function closeConfirmModal() {
	const modal = document.getElementById('confirmation-modal');
	modal.classList.add('hidden');
}

// Function to close the modal
function closeModal(button) {
	const modalContainer = button.closest('.fixed.inset-0');
	if (modalContainer) {
		modalContainer.classList.add('hidden');
	}
}

// To open it
function openModal(modalId) {
	document.getElementById(modalId).classList.remove('hidden');
}