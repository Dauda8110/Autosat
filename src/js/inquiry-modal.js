export function initInquiryModal() {
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingBtn = document.getElementById('close-booking-modal');
  const bookingTriggers = document.querySelectorAll('.trigger-booking-modal');
  const contactForm = document.getElementById('contact-form');
  const bookingForm = document.getElementById('booking-form');

  // Open booking modal
  bookingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicle = btn.getAttribute('data-vehicle');
      const vehicleInput = document.getElementById('booking-vehicle');
      if (vehicleInput && vehicle) {
        vehicleInput.value = vehicle;
      }
      bookingModal?.classList.add('active');
    });
  });

  // Close booking modal
  closeBookingBtn?.addEventListener('click', () => {
    bookingModal?.classList.remove('active');
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      bookingModal?.classList.remove('active');
    }
  });

  // Handle Contact Form Submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || 'Client';
      const phone = document.getElementById('form-phone')?.value || '';
      const interest = document.getElementById('form-interest')?.value || 'General Inquiry';

      showToast(`Thank you, ${name}. Your confidential inquiry for "${interest}" has been received by our Lagos Atelier concierge team.`);
      contactForm.reset();
    });
  }

  // Handle Booking Form Submit
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name')?.value || 'Client';
      const date = document.getElementById('book-date')?.value || 'Upcoming appointment';
      const vehicle = document.getElementById('booking-vehicle')?.value || 'Curated Collection';

      bookingModal?.classList.remove('active');
      showToast(`Private viewing confirmed for ${name} at our Victoria Island Atelier on ${date}. A concierge director will contact you via WhatsApp / telephone.`);
      bookingForm.reset();
    });
  }

  // WhatsApp Concierge Quick Trigger (Nigerian International format)
  const whatsappButtons = document.querySelectorAll('.trigger-whatsapp');
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicle = btn.getAttribute('data-vehicle') || 'the AUTOSAT collection';
      const message = encodeURIComponent(`Hello AUTOSAT Nigeria Concierge, I am interested in inquiring regarding ${vehicle}. Please share availability and private atelier viewing details in Lagos.`);
      // Nigerian WhatsApp Concierge Number
      const whatsappUrl = `https://wa.me/2348095552886?text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('notification-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'notification-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #161616;
      border: 1px solid var(--accent-coral);
      color: #FFFFFF;
      padding: 1.1rem 1.75rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-elevated);
      z-index: 3000;
      font-size: 0.92rem;
      line-height: 1.45;
      max-width: 420px;
      transform: translateY(30px);
      opacity: 0;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 0.85rem;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-coral); margin-top: 6px; flex-shrink: 0;"></div>
      <div>${message}</div>
    </div>
  `;

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(30px)';
  }, 4800);
}
