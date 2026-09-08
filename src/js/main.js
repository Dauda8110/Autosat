import { initNavigation } from './navigation.js';
import { initInventory } from './inventory.js';
import { initInquiryModal } from './inquiry-modal.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initInventory();
  initInquiryModal();
  initAnimations();
});
