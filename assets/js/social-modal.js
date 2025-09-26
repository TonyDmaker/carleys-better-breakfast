<script src="assets/js/social-modal.js?v=3"></script>
(() => {
  const IMAGE_MAP = {
    'Instagram': 'assets/img/social_profile_instagram.png',
    'Facebook' : 'assets/img/social_profile_facebook.png',
    'TikTok'   : 'assets/img/social_profile_tiktok.png'
  };

  document.addEventListener('DOMContentLoaded', () => {
    const labels = Object.keys(IMAGE_MAP);

    // 1) Find the three social buttons
    const buttons = Array.from(document.querySelectorAll('.btn'))
      .filter(b => labels.includes(b.textContent.trim()));

    buttons.forEach((btn) => {
      const label = btn.textContent.trim();
      const src   = IMAGE_MAP[label];

      // 2) Remove any existing event listeners by cloning
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);

      // 3) Add our modal handler
      clone.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // extra safety
        if (src) openImageModal(src, `${label} — Carley’s Better Breakfast`);
      });
    });
  });

  // 4) Simple image modal
  function openImageModal(src, title) {
    // remove old modal if present
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

</script>

