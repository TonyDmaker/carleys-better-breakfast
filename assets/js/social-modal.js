<script>
(() => {
  // Map button text -> image to show (adjust paths if your filenames differ)
  const IMAGE_MAP = {
    'Instagram': 'assets/img/social_profile_instagram.png',
    'Facebook' : 'assets/img/social_profile_facebook.png',
    'TikTok'   : 'assets/img/social_profile_tiktok.png'
  };

  // Attach after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Find the three social buttons by their visible labels
    const buttons = Array.from(document.querySelectorAll('.btn'))
      .filter(b => ['Instagram','Facebook','TikTok'].includes(b.textContent.trim()));

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const label = btn.textContent.trim();
        const src = IMAGE_MAP[label];
        if (src) openImageModal(src, `${label} — Carley’s Better Breakfast`);
      });
    });
  });

  // Simple reusable modal
  function openImageModal(src, title) {
    if (!src) return;

    // Remove any existing modal
    const existing = document.getElementById('cbb-img-modal');
    if (existing) existing.remove();

    // Build modal
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

    // Close handlers
    wrap.querySelector('.cbb-im-bg').onclick = () => wrap.remove();
    wrap.querySelector('.cbb-im-close').onclick = () => wrap.remove();
  }
})();
</script>
