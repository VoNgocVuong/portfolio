/**
 * main.js — logic dùng chung cho toàn bộ site portfolio
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* ---------- Active nav link theo trang hiện tại ---------- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  /* ---------- Reveal animation khi cuộn tới ---------- */
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Lightbox cho ảnh gallery / dự án ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    let currentGroup = [];
    let currentIndex = 0;

    const openLightbox = (group, index) => {
      currentGroup = group;
      currentIndex = index;
      renderLightbox();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const renderLightbox = () => {
      const item = currentGroup[currentIndex];
      lbImg.src = item.src;
      lbImg.alt = item.caption || '';
      if (lbCaption) lbCaption.textContent = item.caption || '';
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-lightbox-group]').forEach((groupEl) => {
      const items = [...groupEl.querySelectorAll('[data-full]')];
      const group = items.map((el) => ({ src: el.dataset.full, caption: el.dataset.caption || '' }));
      items.forEach((el, idx) => {
        el.addEventListener('click', () => openLightbox(group, idx));
      });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
      renderLightbox();
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % currentGroup.length;
      renderLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length; renderLightbox(); }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % currentGroup.length; renderLightbox(); }
    });
  }

  /* ---------- Form liên hệ: mở sẵn email với nội dung đã điền ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      const subject = encodeURIComponent(`Liên hệ từ portfolio - ${name || 'Ẩn danh'}`);
      const body = encodeURIComponent(`${message}\n\n— Từ: ${name} (${email})`);
      window.location.href = `mailto:vngocvuongha@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Năm hiện tại trong footer ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
