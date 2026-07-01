document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggler Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark'; // Defaulting to dark as it looks premium
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update toggle button aria-label if needed
      themeToggleBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // --- Sticky Header on Scroll ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  }

  // --- Active Nav Highlight ---
  const activePath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    // Matches the filename in the path (e.g. index.html)
    const href = item.getAttribute('href');
    if (activePath.includes(href) || (activePath.endsWith('/') && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // --- FAQ Accordion Logic ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.faq-content');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // --- Testimonial Carousel ---
  const track = document.getElementById('carousel-track');
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  
  if (track) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoPlayInterval;

    const updateSlidePosition = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
    };

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    // Auto Play testimonials every 6 seconds
    const startAutoplay = () => {
      autoPlayInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoplay = () => {
      clearInterval(autoPlayInterval);
      startAutoplay();
    };

    startAutoplay();
  }

  // --- Photo Gallery Lightbox ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').getAttribute('src');
        lightboxImg.setAttribute('src', imgSrc);
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Stop background scrolling
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.setAttribute('src', '');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox on click outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  }

  // --- Simple Contact Form Submission Feedback ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic check
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Successful simulated submit
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        alert(`Thank you, ${name}! Your inquiry has been sent to Deep Studio. We will contact you shortly.`);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }
});
