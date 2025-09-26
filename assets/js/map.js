// assets/js/map.js  (v3)
(function () {
  document.addEventListener('DOMContentLoaded', init);

  let map;

  function init() {
    const el = document.getElementById('map');
    if (!el) return;

    // If CSS didn't set a height for some reason, force a fallback.
    const h = parseInt(getComputedStyle(el).height, 10);
    if (!h || h < 100) el.style.height = '320px';

    // Fort Myers-ish mock location (adjust if you like)
    const center = [26.6407, -81.8723]; // Fort Myers area

    map = L.map('map', {
      scrollWheelZoom: true,
      tap: true
    }).setView(center, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    }).addTo(map);

    L.marker(center)
      .addTo(map)
      .bindPopup(
        "<b>Carley's Better Breakfast</b><br>SR-82 pull-off (mock location)."
      )
      .openPopup();

    // Make sure the map calculates size correctly:
    // - once the page fully loads
    // - on resize/rotation
    // - when the section scrolls into view on mobile
    const fix = () => map && map.invalidateSize(true);

    window.addEventListener('load', () => setTimeout(fix, 0));
    window.addEventListener('resize', debounce(fix, 150));

    // If your map is inside the #findus section, refresh when it becomes visible
    const container = document.getElementById('findus') || el;
    if ('IntersectionObserver' in window && container) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) setTimeout(fix, 0);
      }, { threshold: 0.1 });
      io.observe(container);
    }
  }

  // tiny debounce helper
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }
})();


