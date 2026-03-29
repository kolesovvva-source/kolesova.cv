document.addEventListener('DOMContentLoaded', () => {
  // Fix 100vh on mobile — only on resize/orientation, NOT on scroll (prevents jitter)
  function setViewportHeight() {
    const h = window.visualViewport?.height ?? window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${Math.round(h)}px`);
  }
  setViewportHeight();
  window.visualViewport?.addEventListener('resize', setViewportHeight);
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => setTimeout(setViewportHeight, 100));

  // Project more toggle (A little more about project)
  document.querySelectorAll('.project-more-summary').forEach(btn => {
    const details = btn.closest('.project-more-details');
    const content = details?.querySelector('.project-more-content');
    if (!content) return;

    btn.addEventListener('click', () => {
      const isOpen = content.hidden;
      content.hidden = !isOpen;
      btn.setAttribute('aria-expanded', isOpen);
      details?.classList.toggle('is-open', isOpen);
    });
  });
  const links = document.querySelectorAll('.project-link');
  const contents = document.querySelectorAll('.project-content');
  const rightPanel = document.querySelector('.right-panel');
  const mobileNav = document.querySelector('.mobile-project-nav');
  const layout = document.querySelector('.layout');

  let lastScrollTop = 0;
  const scrollThreshold = 80;
  let ticking = false;

  function handleMobileScroll() {
    if (window.innerWidth > 768 || !mobileNav) return;

    const scrollTop = rightPanel?.scrollTop ?? window.scrollY ?? document.documentElement.scrollTop;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          mobileNav.classList.add('mobile-nav-hidden');
          layout?.classList.add('mobile-nav-hidden');
        } else {
          mobileNav.classList.remove('mobile-nav-hidden');
          layout?.classList.remove('mobile-nav-hidden');
        }
      } else {
        mobileNav.classList.remove('mobile-nav-hidden');
        layout?.classList.remove('mobile-nav-hidden');
      }
      lastScrollTop = scrollTop;
      ticking = false;
    });
  }

  rightPanel?.addEventListener('scroll', handleMobileScroll, { passive: true });

  function showProject(projectId) {
    contents.forEach(c => {
      c.classList.remove('active', 'visible');
    });

    links.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(projectId);
    const link = document.querySelector(`[data-project="${projectId}"]`);
    if (target && link) {
      links.forEach(l => {
        if (l.dataset.project === projectId) l.classList.add('active');
      });
      target.classList.add('active');
      rightPanel.scrollTop = 0;

      link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.classList.add('visible');
          window.dispatchEvent(new Event('resize'));
        });
      });
    }
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.tagName === 'A') e.preventDefault();
      const projectId = link.dataset.project;
      showProject(projectId);
    });
  });

  document.querySelector('.about-back-link')?.addEventListener('click', () => {
    const goPortfolio =
      document.querySelector('.left-panel .project-link[data-project="project-1"]') ||
      document.querySelector('.project-link[data-project="project-1"]');
    goPortfolio?.click();
  });

  const firstActive = document.querySelector('.project-content.active');
  if (firstActive) {
    requestAnimationFrame(() => {
      firstActive.classList.add('visible');
    });
  }

  // Project case carousel scroll arrows (Finance Search - multiple project cards)
  document.querySelectorAll('.project-case-carousel').forEach(carousel => {
    const track = carousel.querySelector('.project-case-carousel-track');
    const prevBtn = carousel.querySelector('.project-case-arrow--prev');
    const nextBtn = carousel.querySelector('.project-case-arrow--next');
    if (!track || !prevBtn || !nextBtn) return;

    function updateCarouselArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll - 1;
    }

    prevBtn.addEventListener('click', () => {
      const cardWidth = track.clientWidth || track.offsetWidth;
      const target = Math.max(0, track.scrollLeft - cardWidth);
      track.scrollTo({ left: target, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      const cardWidth = track.clientWidth || track.offsetWidth;
      const maxScroll = track.scrollWidth - (track.clientWidth || track.offsetWidth);
      const target = Math.min(maxScroll, track.scrollLeft + cardWidth);
      track.scrollTo({ left: target, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateCarouselArrows);
    updateCarouselArrows();
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.project-case-carousel').forEach(carousel => {
      const track = carousel.querySelector('.project-case-carousel-track');
      const prevBtn = carousel.querySelector('.project-case-arrow--prev');
      const nextBtn = carousel.querySelector('.project-case-arrow--next');
      if (track && prevBtn && nextBtn) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.disabled = track.scrollLeft <= 0;
        nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll - 1;
      }
    });
  });

  // Project case block scroll arrows (single block - phones scroll)
  const scrollStep = 240;
  document.querySelectorAll('.project-case-block').forEach(block => {
    const track = block.querySelector('.project-case-phones-track');
    const prevBtn = block.querySelector('.project-case-arrow--prev');
    const nextBtn = block.querySelector('.project-case-arrow--next');
    if (!track || !prevBtn || !nextBtn) return;

    function updateArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll - 1;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateArrows);
    updateArrows();
  });

  // Results gallery arrows (Finance Search)
  document.querySelectorAll('.project-results-gallery').forEach(gallery => {
    const track = gallery.querySelector('.project-results-gallery-track');
    const prevBtn = gallery.querySelector('.project-results-gallery-arrow--prev');
    const nextBtn = gallery.querySelector('.project-results-gallery-arrow--next');
    if (!track || !prevBtn || !nextBtn) return;

    function updateResultsArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = maxScroll <= 0 || track.scrollLeft >= maxScroll - 1;
    }

    prevBtn.addEventListener('click', () => {
      const slideWidth = track.clientWidth || track.offsetWidth;
      const target = Math.max(0, track.scrollLeft - slideWidth);
      track.scrollTo({ left: target, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      const slideWidth = track.clientWidth || track.offsetWidth;
      const maxScroll = track.scrollWidth - (track.clientWidth || track.offsetWidth);
      const target = Math.min(maxScroll, track.scrollLeft + slideWidth);
      track.scrollTo({ left: target, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateResultsArrows);
    updateResultsArrows();
  });
});
