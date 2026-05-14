/* ============================================================
   Sea Eagles Group — main.js
   Nav scroll state, mobile menu toggle, scroll-reveal observer,
   current year stamp, dynamic active nav link.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Active nav link (by current filename) ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href && href === currentPath) {
      link.classList.add('is-active');
    }
  });

  /* ---------- Scroll-reveal via IntersectionObserver ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback — show everything
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Auto-fill current year in footer ---------- */
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();

/* ============================================================
   D3 + TopoJSON world map (projects page only)
   ============================================================ */

(async function initMap() {
  const svgEl = document.getElementById('world-map');
  if (!svgEl) return;

  const container = svgEl.parentElement;
  const W = container.offsetWidth || 800;
  const H = Math.round(W * 0.48);

  const svg = d3.select('#world-map')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('height', H);

  const projection = d3.geoNaturalEarth1()
    .scale(W / 6.2)
    .translate([W / 2, H / 2 + H * 0.04]);

  const path = d3.geoPath().projection(projection);

  svg.append('rect')
    .attr('width', W).attr('height', H)
    .attr('fill', '#0B1A2E');

  const graticule = d3.geoGraticule().step([30, 30]);
  svg.append('path')
    .datum(graticule())
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(255,255,255,0.04)')
    .attr('stroke-width', 0.5);

  let world;
  try {
    world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  } catch (e) {
    console.warn('Map data failed to load');
    return;
  }

  const countries = topojson.feature(world, world.objects.countries);
  const borders   = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

  svg.append('g')
    .selectAll('path')
    .data(countries.features)
    .join('path')
    .attr('d', path)
    .attr('fill', '#1A2D47')
    .attr('stroke', '#0B1A2E')
    .attr('stroke-width', 0.4);

  svg.append('path')
    .datum(borders)
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', '#0B1A2E')
    .attr('stroke-width', 0.3);

  const locations = [
    { lon: 55.3,  lat: 25.2,  label: 'Dubai, UAE',    type: 'hub', dx:  7, dy: -10 },
    { lon: 46.7,  lat: 24.7,  label: 'Saudi Arabia',  type: 'hub', dx: -8, dy:  14 },
    { lon: 50.6,  lat: 26.2,  label: 'Bahrain',       type: 'ops', dx:  7, dy:  -8 },
    { lon: 103.8, lat: 1.35,  label: 'Singapore',     type: 'hub', dx:  7, dy: -10 },
    { lon: 36.8,  lat: -1.3,  label: 'East Africa',   type: 'ops', dx:  7, dy:  13 },
    { lon: 3.4,   lat: 6.5,   label: 'West Africa',   type: 'ops', dx: -8, dy:  13 },
    { lon: 4.9,   lat: 52.4,  label: 'Europe',        type: 'ops', dx:  7, dy: -10 },
  ];

  const hubCoord = [55.3, 25.2];
  locations.slice(1).forEach(({ lon, lat }) => {
    svg.append('path')
      .datum({ type: 'LineString', coordinates: [hubCoord, [lon, lat]] })
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(11,165,172,0.18)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,4');
  });

  locations.forEach(({ lon, lat, label, type, dx, dy }, i) => {
    const [x, y] = projection([lon, lat]);
    if (!x || !y) return;

    const r = type === 'hub' ? 6 : 4;

    const pulse = svg.append('circle')
      .attr('cx', x).attr('cy', y).attr('r', r)
      .attr('fill', 'none')
      .attr('stroke', '#0BA5AC')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.6);

    function animatePulse() {
      pulse.attr('r', r).attr('opacity', 0.6)
        .transition().duration(2000).ease(d3.easeCubicOut)
        .attr('r', r + 11).attr('opacity', 0)
        .on('end', animatePulse);
    }
    setTimeout(animatePulse, i * 280);

    svg.append('circle')
      .attr('cx', x).attr('cy', y)
      .attr('r', type === 'hub' ? 5 : 3.5)
      .attr('fill', type === 'hub' ? '#0BA5AC' : 'rgba(11,165,172,0.45)')
      .attr('stroke', '#0DC5CD')
      .attr('stroke-width', type === 'hub' ? 1.5 : 1);

    svg.append('text')
      .attr('x', x + dx).attr('y', y + dy)
      .attr('text-anchor', dx < 0 ? 'end' : 'start')
      .attr('fill', type === 'hub' ? '#ffffff' : '#8892A0')
      .attr('font-size', type === 'hub' ? 10 : 9)
      .attr('font-weight', type === 'hub' ? '600' : '400')
      .attr('font-family', 'Outfit, Inter, sans-serif')
      .text(label);
  });
})();
