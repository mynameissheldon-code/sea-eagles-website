/* ============================================================
   Sea Eagles Group — fleet.js
   Fleet data extracted from /vessels/*.pdf spec sheets.
   Renders the fleet grid on fleet.html and powers type filtering.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Vessel data (all specs from PDF forms in /vessels/) ---------- */
  const FLEET = [
    {
      slug: 'sea-eagle',
      name: 'SES Sea Eagle',
      type: 'ASD Tug',
      category: 'tug',
      loa: '30.26 m',
      breadth: '11.70 m',
      hull: 'Steel',
      year: 2011,
      engine: '4,200 kW',
      speed: '12.5 knots',
      gt: '463 GT',
      classification: 'Bureau Veritas',
      registry: 'Basseterre',
      available: true,
      image: 'images/DJI_0053.JPG',
      blurb: 'Twin Z-drive ASD harbour tug with high bollard pull, full firefighting kit and offshore terminal experience.'
    },
    {
      slug: 'sea-falcon',
      name: 'SES Sea Falcon',
      type: 'ASD Tug',
      category: 'tug',
      loa: '30.26 m',
      breadth: '11.70 m',
      hull: 'Steel',
      year: 2011,
      engine: '4,200 kW',
      speed: '12.5 knots',
      gt: '463 GT',
      classification: 'Bureau Veritas',
      registry: 'Basseterre',
      available: true,
      image: 'images/DJI_0035.JPG',
      blurb: 'Sister-built ASD tug for port assist, escort and terminal mooring operations across the Arabian Gulf.'
    },
    {
      slug: 'blue-star',
      name: 'SES Blue Star',
      type: 'Tug Boat',
      category: 'tug',
      loa: '18.00 m',
      breadth: '5.82 m',
      hull: 'Steel',
      year: 1976,
      engine: 'Detroit · 703 kW',
      speed: '8 knots',
      gt: '57 GT',
      classification: 'Global Maritim Bureau',
      registry: 'Bamako',
      available: false,
      image: 'images/DJI_0019.JPG',
      blurb: 'Compact workhorse tug for shallow-draft assist and short-haul towage where manoeuvrability matters more than speed.'
    },
    {
      slug: 'hunter',
      name: 'SES Hunter',
      type: 'Crew Boat',
      category: 'crew',
      loa: '42.00 m',
      breadth: '7.37 m',
      hull: 'Aluminum',
      year: 2014,
      engine: '3,243 kW',
      speed: '21 knots',
      gt: '245 GT',
      classification: 'Bureau Veritas',
      registry: 'Bahrain',
      available: true,
      image: 'images/DJI_0024.JPG',
      blurb: 'Fast aluminium-hull crew transfer vessel with offshore-rated security fendering, ideal for personnel and light cargo runs.'
    },
    {
      slug: 'tiger',
      name: 'SES Tiger',
      type: 'Crew Boat',
      category: 'crew',
      loa: '42.00 m',
      breadth: '7.30 m',
      hull: 'Aluminum',
      year: 2014,
      engine: '3,243 kW',
      speed: '21 knots',
      gt: '245 GT',
      classification: 'Bureau Veritas',
      registry: 'Bahrain',
      available: true,
      image: 'images/DJI_0023.JPG',
      blurb: 'High-speed crew boat configured for rotation transfers between shore base and offshore production fields.'
    },
    {
      slug: 'shooter',
      name: 'SES Shooter',
      type: 'Crew Boat',
      category: 'crew',
      loa: '42.00 m',
      breadth: '7.30 m',
      hull: 'Aluminum',
      year: 2015,
      engine: '3,243 kW',
      speed: '21 knots',
      gt: '245 GT',
      classification: 'Bureau Veritas',
      registry: 'Kingstown',
      available: true,
      image: 'images/DJI_0033.JPG',
      blurb: 'Fast crew transfer vessel built for sustained 21-knot cruises with security-grade fendering and dual-zone seating.'
    },
    {
      slug: 'dolphin',
      name: 'SES Dolphin',
      type: 'Utility / Supply',
      category: 'supply',
      loa: '25.80 m',
      breadth: '9.80 m',
      hull: 'Steel',
      year: 2013,
      engine: '2 × 1,865 BHP',
      speed: '12 knots',
      gt: '294 GT',
      classification: 'Bureau Veritas',
      registry: 'Kingstown',
      available: true,
      image: 'images/DJI_0070.JPG',
      blurb: 'Utility / supply vessel for platform support, cargo runs and offshore logistics with twin-engine reliability.'
    },
    {
      slug: 'skipper',
      name: 'SES Skipper',
      type: 'Pilot Boat',
      category: 'pilot',
      loa: '16.50 m',
      breadth: '4.90 m',
      hull: 'Steel',
      year: 2015,
      engine: '2 × 552 kW',
      speed: '16 knots',
      gt: '46 GT',
      classification: 'Bureau Veritas',
      registry: 'Kingstown',
      available: true,
      image: 'images/DJI_0010.JPG',
      blurb: 'Dedicated pilot transfer boat for harbour pilotage, fast deployment and crew change at anchorage.'
    },
    {
      slug: 'zaki-dream',
      name: 'Zaki Dream',
      type: 'Oil Tanker',
      category: 'other',
      loa: '96.70 m',
      breadth: '18.00 m',
      hull: 'Steel',
      year: 2025,
      engine: '2 × 1,620 kW',
      speed: '11 knots',
      gt: '4,557 GT',
      classification: 'Bureau Veritas',
      registry: 'Basseterre',
      available: true,
      image: 'images/DJI_0046.JPG',
      blurb: 'Newest addition to the fleet — a 96-metre oil tanker for regional bunkering and product transport, delivered 2025.'
    }
  ];

  /* ---------- Render fleet cards into a target container ---------- */
  function renderFleet(targetEl, vessels) {
    if (!targetEl) return;
    const html = vessels
      .map(
        (v) => `
        <article class="fleet-card" data-category="${v.category}">
          <div class="fleet-card-media" style="background-image: url('${v.image}');">
            <span class="fleet-card-type">${v.type}</span>
          </div>
          <div class="fleet-card-body">
            ${v.available
              ? '<span class="vessel-available">Available for Charter</span>'
              : '<span class="vessel-unavailable">Currently Engaged</span>'}
            <h3>${v.name}</h3>
            <p>${v.blurb}</p>
            <div class="fleet-specs">
              <div class="fleet-spec">
                <span class="fleet-spec-label">Length (LOA)</span>
                <span class="fleet-spec-value">${v.loa}</span>
              </div>
              <div class="fleet-spec">
                <span class="fleet-spec-label">Gross Tonnage</span>
                <span class="fleet-spec-value">${v.gt}</span>
              </div>
              <div class="fleet-spec">
                <span class="fleet-spec-label">Max Speed</span>
                <span class="fleet-spec-value">${v.speed}</span>
              </div>
              <div class="fleet-spec">
                <span class="fleet-spec-label">Year / Class</span>
                <span class="fleet-spec-value">${v.year} <small>· ${v.classification}</small></span>
              </div>
            </div>
            <div class="fleet-card-footer">
              <a class="link-arrow" href="contact.html?vessel=${encodeURIComponent(v.name)}">Request Charter</a>
            </div>
          </div>
        </article>`
      )
      .join('');
    targetEl.innerHTML = html;
  }

  /* ---------- Filter logic ---------- */
  function initFilter(tabsEl, gridEl) {
    if (!tabsEl || !gridEl) return;
    tabsEl.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;
      const category = tab.dataset.category;
      tabsEl.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      gridEl.querySelectorAll('.fleet-card').forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  }

  /* ---------- Public API ---------- */
  window.SES_FLEET = FLEET;
  window.SES_renderFleet = renderFleet;
  window.SES_initFleetFilter = initFilter;

  /* ---------- Auto-init on pages that include hooks ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Full fleet grid (fleet.html)
    const fullGrid = document.querySelector('[data-fleet-grid]');
    if (fullGrid) {
      renderFleet(fullGrid, FLEET);
      const tabs = document.querySelector('[data-fleet-filter]');
      initFilter(tabs, fullGrid);
    }

    // Fleet preview (index.html)
    const preview = document.querySelector('[data-fleet-preview]');
    if (preview) {
      const previewSlugs = ['sea-eagle', 'hunter', 'dolphin'];
      const previewVessels = previewSlugs
        .map((slug) => FLEET.find((v) => v.slug === slug))
        .filter(Boolean);
      renderFleet(preview, previewVessels);
    }
  });
})();
