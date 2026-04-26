const ANCHOR_LINK_SELECTOR = 'a[href^="#"]';
const CAROUSEL_SELECTOR = '#carousel';
const CAROUSEL_NEXT_BUTTON = '.carousel-btn.next';
const CAROUSEL_PREV_BUTTON = '.carousel-btn.prev';
const CAROUSEL_INTERVAL_MS = 5000;

// Navegação suave para âncoras
const smoothScrollTo = selector => {
  const target = document.querySelector(selector);
  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth'
  });
};

const initAnchorNavigation = () => {
  document.querySelectorAll(ANCHOR_LINK_SELECTOR).forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      smoothScrollTo(anchor.getAttribute('href'));
    });
  });
};

const initMenuToggle = () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleButton || !navLinks) {
    return;
  }

  toggleButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleButton.classList.toggle('open', isOpen);
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleButton.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
};

// Carrossel de ilustrações
const initCarousel = () => {
  const carousel = document.querySelector(CAROUSEL_SELECTOR);
  const nextButton = document.querySelector(CAROUSEL_NEXT_BUTTON);
  const prevButton = document.querySelector(CAROUSEL_PREV_BUTTON);

  if (!carousel || !nextButton || !prevButton) {
    return;
  }

  const carouselItems = Array.from(carousel.querySelectorAll('img'));
  if (carouselItems.length === 0) {
    return;
  }

  let currentIndex = 0;
  let autoRotateInterval = null;

  const scrollToIndex = index => {
    const target = carouselItems[index];
    if (!target) return;

    carousel.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth'
    });
  };

  const updateIndex = newIndex => {
    currentIndex = (newIndex + carouselItems.length) % carouselItems.length;
    scrollToIndex(currentIndex);
  };

  const resetAutoRotate = () => {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }

    autoRotateInterval = setInterval(() => {
      updateIndex(currentIndex + 1);
    }, CAROUSEL_INTERVAL_MS);
  };

  nextButton.addEventListener('click', () => {
    updateIndex(currentIndex + 1);
    resetAutoRotate();
  });

  prevButton.addEventListener('click', () => {
    updateIndex(currentIndex - 1);
    resetAutoRotate();
  });

  resetAutoRotate();
};

document.addEventListener('DOMContentLoaded', () => {
  initAnchorNavigation();
  initMenuToggle();
  initCarousel();
});