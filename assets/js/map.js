if (!window.__CBB_MAP_INIT__) { window.__CBB_MAP_INIT__ = true;

const LAT = 26.6409;   // mock SR-82 near Fort Myers
const LNG = -81.7390;

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('map');
  if (!el) return;

  const map = L.map('map', { scrollWheelZoom: false }).setView([LAT, LNG], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker([LAT, LNG]).addTo(map);
  marker.bindPopup('<b>Carley’s Better Breakfast</b><br>Mock location on SR-82.');

  L.circle([LAT, LNG], {
    radius: 4828,       // ~3 miles
    color: '#FF6FAE',
    weight: 2,
    fillColor: '#FF6FAE',
    fillOpacity: 0.08
  }).addTo(map);

  const g = document.getElementById('gmaps-link');
  const a = document.getElementById('applemaps-link');
  if (g) g.href = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
  if (a) a.href = `https://maps.apple.com/?daddr=${LAT},${LNG}`;

  const centerBtn = document.getElementById('center-me');
  if (centerBtn) {
    centerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!navigator.geolocation) return alert('Geolocation not supported');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const me = L.marker([pos.coords.latitude, pos.coords.longitude], { title: 'You are here' }).addTo(map);
          const group = L.featureGroup([marker, me]);
          map.fitBounds(group.getBounds().pad(0.4));
        },
        () => alert('Couldn’t get your location.')
      );
    });
  }
});

} // end guard
