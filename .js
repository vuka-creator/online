// Dark mode toggle
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Animate sections on scroll
const sections = document.querySelectorAll('section, .project-card, .testimonial-card, .skills li, .rating-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
sections.forEach(sec => observer.observe(sec));

// Animate client rating
const rating = document.querySelector('.rating-score h3');
const ratingObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      let count = 0;
      const target = 98;
      const interval = setInterval(() => {
        count++;
        rating.textContent = count + '%';
        if(count >= target) clearInterval(interval);
      }, 20);
      ratingObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
ratingObserver.observe(rating);

// Animate skills progress bars
const progresses = document.querySelectorAll('.progress div');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const width = entry