// Coordinates corroborated by the public address listing; no guessed location.
(() => {
  const element = document.querySelector('#clinic-map');
  const status = document.querySelector('#map-status');
  const button = document.querySelector('#map-interact');
  const route = 'https://www.google.com/maps/dir/?api=1&destination=Rua+Manoel+de+Freitas+102+Jardim+Alamo+Guarulhos+SP+07176-620';
  let map;
  function initMap() {
    if (map) return;
    if (!window.L) { status.textContent = 'Abra a rota no Google Maps.'; button.hidden = true; return; }
    const center = [-23.4116544, -46.3770165];
    map = L.map(element, { scrollWheelZoom: false, dragging: false, tap: false, keyboard: false }).setView(center, 16);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(map);
    let loaded = 0;
    tiles.on('tileload', () => { loaded++; element.dataset.tilesLoaded = String(loaded); status.textContent = 'Rua Manoel de Freitas, 102 · Guarulhos'; });
    tiles.on('tileerror', () => { if (!loaded) status.textContent = 'Mapa indisponível. Use o botão Como chegar.'; });
    const icon = L.divIcon({ className: 'clerian-pin', html: '<div class="pin-body"><span>C</span></div>', iconSize: [42,42], iconAnchor: [21,42], popupAnchor: [0,-40] });
    const marker = L.marker(center, { icon, title: 'Clerian Odontologia — Rua Manoel de Freitas, 102', alt: 'Clerian Odontologia' }).addTo(map);
    marker.bindPopup(`<strong>Clerian Odontologia</strong><br>Rua Manoel de Freitas, 102<br>Jardim Álamo · Guarulhos — SP<br><a href="${route}" target="_blank" rel="noopener">Como chegar ↗</a>`);
    button.addEventListener('click', () => {
      const enabled = !map.dragging.enabled();
      if (enabled) { map.dragging.enable(); map.keyboard.enable(); marker.openPopup(); element.focus({ preventScroll: true }); }
      else { map.dragging.disable(); map.keyboard.disable(); marker.closePopup(); }
      button.setAttribute('aria-pressed', String(enabled));
      button.textContent = enabled ? 'Concluir exploração' : 'Explorar mapa ↗';
      status.textContent = enabled ? 'Use os controles + e − para aproximar.' : 'Rua Manoel de Freitas, 102 · Guarulhos';
    });
    new ResizeObserver(() => map.invalidateSize({ pan: false })).observe(element);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { initMap(); observer.disconnect(); } }, { rootMargin: '350px' });
    observer.observe(element);
  } else initMap();
})();
