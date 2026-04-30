// Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== DARK MODE TOGGLE ====================
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme
  if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    darkModeToggle.textContent = '☀️';
  }
  
  // Toggle dark mode on button click
  darkModeToggle.addEventListener('click', function() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkModeToggle.textContent = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkModeToggle.textContent = '☀️';
    }
  });
  
  // ==================== SMOOTH SCROLL ====================
  // Handle anchor links for smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ==================== SCROLL ANIMATIONS ====================
  // Observer for fade-in animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements with fade-in class
  document.querySelectorAll('.project-card, .testimonial-card, .skill').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // ==================== NAVBAR SCROLL EFFECT ====================
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      // Add scrolled class for navbar styling
      if (navbar) {
        navbar.classList.add('scrolled');
      }
    } else {
      if (navbar) {
        navbar.classList.remove('scrolled');
      }
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
  
  // ==================== PROJECT CARD IMAGE FALLBACK ====================
  // Replace missing project images with placeholder
  document.querySelectorAll('.project-card img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
  
  // ==================== ACTIVE LINK HIGHLIGHTING ====================
  // Highlight current section in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
  
  // ==================== SKILL PROGRESS ANIMATION ====================
  // Animate progress bars when they come into view
  const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress > div');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.getElementById('skills-progress');
  if (skillsSection) {
    progressObserver.observe(skillsSection);
  }
  
  // ==================== CONSOLE MESSAGE ====================
  console.log('%c🎨 Portfolio by Caleb Yegon', 'font-size: 20px; font-weight: bold; color: #667eea;');
  console.log('%cWelcome to my portfolio! Feel free to explore.', 'color: #764ba2;');
});
