(() => {
  const IMAGE_MAP = {
    'Instagram': 'assets/img/social_profile_instagram.png',
    'Facebook' : 'assets/img/social_profile_facebook.png',
    'TikTok'   : 'assets/img/social_profile_tiktok.png'
  };

  document.addEventListener('DOMContentLoaded', () => {
    const labels = Object.keys(IMAGE_MAP);

    // Find the three social buttons by visible text
    const buttons = Array.from(document.querySelectorAll('.btn'))
      .filter(b => labels.includes(b.textContent.trim()));

    buttons.forEach((btn) => {
      const label = btn.textContent.trim();
      const src   = IMAGE_MAP[label];

      // 1) Strip any inline onclick that fires alert(...)
      btn.removeAttribute('onclick');

      // 2) Replace node to drop any previously bound listeners
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);

      // 3) Add a capturing listener to stop anything else before it fires
      clone.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (src) openImageModal(src, `${label} — Carley’s Better Breakfast`);
      }, { capture: true });
    });
  });

  function openImageModal(src, title) {
    const old = document.getElementById('cbb-img-modal');
    if (old) old.remove();

    const wrap = document.createElement('div');
    wrap.id = 'cbb-img-modal';
    wrap.innerHTML = `
      <div class="cbb-im-bg" aria-hidden="true"></div>
      <div class="cbb-im-card" role="dialog" aria-label="${title}">
        <button class="cbb-im-close" aria-label="Close">✕</button>
        <img src="${src}" alt="${title}">
      </div>
    `;
    document.body.appendChild(wrap);
    wrap.querySelector('.cbb-im-bg').onclick   = () => wrap.remove();
    wrap.querySelector('.cbb-im-close').onclick = () => wrap.remove();
  }
})();






