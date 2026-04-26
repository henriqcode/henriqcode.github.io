// Navegação suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Carrossel de ilustrações
const carousel = document.getElementById('carousel');
if (carousel) {
  const carouselItems = carousel.querySelectorAll('img');
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
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => updateIndex(currentIndex + 1), 5000);
  };

  document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    updateIndex(currentIndex + 1);
    resetAutoRotate();
  });

  document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    updateIndex(currentIndex - 1);
    resetAutoRotate();
  });

  resetAutoRotate();
}