export const VEHICLES = [
  {
    id: 'porsche-gt3-touring',
    title: 'Porsche 911 GT3 Touring',
    year: 2024,
    headline: 'Pure sports car with a manual gearbox and amazing engine sound.',
    image: '/images/porsche-gt3.jpg',
    status: 'In Lagos Showroom',
    price: '₦415,000,000',
    specs: {
      acceleration: '3.2s',
      power: '502 HP',
      speed: '199 MPH',
      engine: '4.0L 6-Cylinder Engine',
      transmission: '6-Speed Manual',
      drivetrain: 'Rear-Wheel Drive',
      exterior: 'Agate Grey Metallic',
      interior: 'Black Leather with Fabric Seats',
      mileage: '1,420 miles',
      papers: 'Full Nigerian Customs Duty Paid, Single Owner'
    },
    narrative: 'A beautiful, clean Porsche 911 in Agate Grey. It drives smoothly, sounds incredible, and has all genuine Nigerian customs duty papers paid.'
  },
  {
    id: 'ferrari-roma',
    title: 'Ferrari Roma',
    year: 2023,
    headline: 'Sleek, stylish, and comfortable Italian sports car for everyday driving.',
    image: '/images/ferrari-roma.jpg',
    status: 'In Lagos Showroom',
    price: '₦380,000,000',
    specs: {
      acceleration: '3.4s',
      power: '612 HP',
      speed: '199 MPH',
      engine: '3.9L Twin-Turbo V8',
      transmission: '8-Speed Automatic',
      drivetrain: 'Rear-Wheel Drive',
      exterior: 'Grigio Silverstone Grey',
      interior: 'Brown Leather & Black Suede',
      mileage: '2,150 miles',
      papers: 'Complete Nigerian Customs Papers Paid'
    },
    narrative: 'A modern Ferrari in metallic grey with bright yellow brake calipers. Easy to drive, fast, and comfortable for Lagos roads.'
  },
  {
    id: 'aston-martin-dbs',
    title: 'Aston Martin DBS Superleggera',
    year: 2023,
    headline: 'Powerful British luxury supercar with unmatched road presence.',
    image: '/images/aston-dbs.jpg',
    status: 'Reserved',
    price: '₦490,000,000',
    specs: {
      acceleration: '3.4s',
      power: '715 HP',
      speed: '211 MPH',
      engine: '5.2L Twin-Turbo V12',
      transmission: '8-Speed Automatic',
      drivetrain: 'Rear-Wheel Drive',
      exterior: 'Deep British Racing Green',
      interior: 'Chocolate & Cream Leather',
      mileage: '3,800 miles',
      papers: 'Full Clean Customs Duty Paid'
    },
    narrative: 'A magnificent Aston Martin in deep green with a handcrafted carbon body. Super fast, luxurious, and in showroom condition.'
  },
  {
    id: 'amg-gt-coupe',
    title: 'Mercedes-AMG GT Coupé',
    year: 2024,
    headline: 'Aggressive styling, strong V8 power, and all-wheel drive stability.',
    image: '/images/amg-gt.jpg',
    status: 'In Lagos Showroom',
    price: '₦295,000,000',
    specs: {
      acceleration: '3.1s',
      power: '577 HP',
      speed: '196 MPH',
      engine: '4.0L AMG V8 Biturbo',
      transmission: '9-Speed Automatic',
      drivetrain: 'All-Wheel Drive (4MATIC+)',
      exterior: 'Matte Obsidian Black',
      interior: 'Black Leather with Gold Stitching',
      mileage: '850 miles',
      papers: 'Brand New Import, Full Duty Cleared'
    },
    narrative: 'Finished in factory matte black with gold brakes. With all-wheel drive, it handles any weather or road condition with ease.'
  }
];

export function initInventory() {
  const container = document.getElementById('inventory-grid');
  if (!container) return;

  renderInventory(container);
  initModalListeners();
}

function renderInventory(container) {
  container.innerHTML = VEHICLES.map(vehicle => `
    <article class="product-card reveal" data-id="${vehicle.id}">
      <div class="product-media">
        <img src="${vehicle.image}" alt="${vehicle.title}" loading="lazy" />
        <span class="product-status-tag">${vehicle.status}</span>
      </div>
      <div class="product-content">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
          <span class="text-meta">${vehicle.year} Model</span>
          <span class="text-meta" style="color: var(--accent-teal);">${vehicle.specs.drivetrain}</span>
        </div>
        <h3 class="text-card-title">${vehicle.title}</h3>
        <p class="text-subhead" style="font-size: 0.92rem; margin-top: 0.4rem; color: var(--text-muted); line-height: 1.45;">
          ${vehicle.headline}
        </p>

        <div class="product-specs-grid">
          <div class="spec-item">
            <span class="spec-value">${vehicle.specs.acceleration}</span>
            <span class="spec-label">0–60 MPH</span>
          </div>
          <div class="spec-item">
            <span class="spec-value">${vehicle.specs.power}</span>
            <span class="spec-label">Horsepower</span>
          </div>
          <div class="spec-item">
            <span class="spec-value">${vehicle.specs.speed}</span>
            <span class="spec-label">Top Speed</span>
          </div>
        </div>

        <div class="product-footer">
          <div>
            <div class="text-meta" style="font-size: 0.72rem;">Price</div>
            <div class="product-price">${vehicle.price}</div>
          </div>
          <button class="btn btn-primary btn-sm view-dossier-btn" data-id="${vehicle.id}" id="btn-view-${vehicle.id}">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function initModalListeners() {
  const modal = document.getElementById('vehicle-modal');
  const closeBtn = document.getElementById('close-vehicle-modal');
  if (!modal) return;

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.view-dossier-btn');
    if (target) {
      const vehicleId = target.getAttribute('data-id');
      const vehicle = VEHICLES.find(v => v.id === vehicleId);
      if (vehicle) {
        openVehicleModal(vehicle);
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

function openVehicleModal(vehicle) {
  const modal = document.getElementById('vehicle-modal');
  const content = document.getElementById('vehicle-modal-body');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="position: relative; aspect-ratio: 16/9; background: #0A0A0A; border-radius: var(--radius-md) var(--radius-md) 0 0; overflow: hidden;">
      <img src="${vehicle.image}" alt="${vehicle.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      <span class="product-status-tag" style="top: 1.25rem; left: 1.25rem;">${vehicle.status}</span>
    </div>
    <div style="padding: clamp(1.5rem, 4vw, 2.5rem);">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <span class="eyebrow-serif" style="margin-bottom: 0.5rem; display: block;">Car Details</span>
          <h2 class="text-section-title" style="font-size: clamp(1.8rem, 3.5vw, 2.6rem);">${vehicle.title}</h2>
        </div>
        <div style="text-align: right;">
          <span class="text-meta" style="display: block;">Price</span>
          <div class="product-price" style="font-size: 1.8rem; color: var(--accent-coral);">${vehicle.price}</div>
        </div>
      </div>

      <p style="font-size: 1.05rem; color: #D4D4D4; margin: 1.2rem 0; line-height: 1.5;">
        ${vehicle.narrative}
      </p>

      <div style="background: #101010; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.5rem; margin: 1.5rem 0;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 1rem;">
          Key Specifications &amp; Papers
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; font-size: 0.9rem;">
          <div>
            <span class="text-meta">Engine</span>
            <div style="font-weight: 600; margin-top: 0.2rem;">${vehicle.specs.engine}</div>
          </div>
          <div>
            <span class="text-meta">Gearbox</span>
            <div style="font-weight: 600; margin-top: 0.2rem;">${vehicle.specs.transmission}</div>
          </div>
          <div>
            <span class="text-meta">Color</span>
            <div style="font-weight: 600; margin-top: 0.2rem;">${vehicle.specs.exterior}</div>
          </div>
          <div>
            <span class="text-meta">Interior</span>
            <div style="font-weight: 600; margin-top: 0.2rem;">${vehicle.specs.interior}</div>
          </div>
          <div>
            <span class="text-meta">Mileage</span>
            <div style="font-weight: 600; margin-top: 0.2rem;">${vehicle.specs.mileage}</div>
          </div>
          <div>
            <span class="text-meta">Customs Papers</span>
            <div style="font-weight: 600; margin-top: 0.2rem; color: var(--accent-teal);">${vehicle.specs.papers}</div>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: flex-end; padding-top: 1rem;">
        <button class="btn btn-secondary trigger-inquiry-prefill" data-vehicle="${vehicle.title}" id="btn-inquire-${vehicle.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.14 12.39 9.72 14.99 12.22 15.96C14.31 16.77 14.73 16.61 15.18 16.57C15.63 16.53 16.63 15.98 16.84 15.4C17.05 14.81 17.05 14.31 16.99 14.21C16.93 14.1 16.76 14.04 16.51 13.92C16.26 13.79 15.03 13.19 14.8 13.11C14.58 13.02 14.41 12.98 14.25 13.23C14.08 13.48 13.61 14.04 13.46 14.21C13.32 14.37 13.17 14.39 12.92 14.27C12.67 14.14 11.87 13.88 10.92 13.03C10.18 12.37 9.68 11.56 9.54 11.31C9.39 11.06 9.52 10.93 9.65 10.8C9.76 10.69 9.9 10.51 10.02 10.36C10.15 10.22 10.19 10.12 10.27 9.95C10.35 9.79 10.31 9.64 10.25 9.52C10.19 9.4 9.72 8.24 9.52 7.77C9.33 7.31 9.14 7.37 8.99 7.36C8.85 7.36 8.69 7.33 8.53 7.33Z"/></svg>
          Ask Question on WhatsApp
        </button>
        <button class="btn btn-primary trigger-booking-prefill" data-vehicle="${vehicle.title}" id="btn-book-${vehicle.id}">
          Book a Visit to See This Car
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const inquireBtn = content.querySelector('.trigger-inquiry-prefill');
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      const message = encodeURIComponent(`Hello AUTOSAT, I want to ask about the ${vehicle.title} priced at ${vehicle.price}. Is it available to see in Lagos?`);
      window.open(`https://wa.me/2348095552886?text=${message}`, '_blank', 'noopener,noreferrer');
    });
  }

  const bookBtn = content.querySelector('.trigger-booking-prefill');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      const bookingModal = document.getElementById('booking-modal');
      if (bookingModal) {
        bookingModal.classList.add('active');
        const vehicleField = document.getElementById('booking-vehicle');
        if (vehicleField) vehicleField.value = vehicle.title;
      }
    });
  }
}
