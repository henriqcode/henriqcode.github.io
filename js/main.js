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
  document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    carousel.scrollBy({
      left: carousel.offsetWidth,
      behavior: 'smooth'
    });
  });

  document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    carousel.scrollBy({
      left: -carousel.offsetWidth,
      behavior: 'smooth'
    });
  });
}