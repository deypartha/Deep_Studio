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

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  }

  // --- Active Nav Highlight on Scroll ---
  const sections = document.querySelectorAll('section, header');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
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

  // --- Portfolio filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all') {
          item.style.display = 'block';
        } else if (filterValue === 'videos') {
          if (item.classList.contains('video-item')) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        } else if (filterValue === 'pre-wedding') {
          if (itemCategory === 'pre-wedding') {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        } else {
          // Normal filter matching
          if (itemCategory === filterValue && !item.classList.contains('video-item')) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });

  // --- Photo Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // --- Video Lightbox ---
  const videoLightbox = document.getElementById('video-lightbox');
  const lightboxVideo = document.getElementById('lightbox-video');
  const videoLightboxClose = document.getElementById('video-lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('video-item')) {
        // Video overlay opening
        const videoUrl = item.getAttribute('data-video-url');
        if (videoLightbox && lightboxVideo) {
          lightboxVideo.setAttribute('src', videoUrl);
          videoLightbox.style.display = 'flex';
          lightboxVideo.play();
          document.body.style.overflow = 'hidden'; // Stop background scrolling
        }
      } else {
        // Photo overlay opening
        const imgSrc = item.querySelector('img').getAttribute('src');
        if (lightbox && lightboxImg) {
          lightboxImg.setAttribute('src', imgSrc);
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  const closePhotoLightbox = () => {
    if (lightbox) {
      lightbox.style.display = 'none';
      lightboxImg.setAttribute('src', '');
      document.body.style.overflow = '';
    }
  };

  const closeVideoLightbox = () => {
    if (videoLightbox && lightboxVideo) {
      lightboxVideo.pause();
      videoLightbox.style.display = 'none';
      lightboxVideo.setAttribute('src', '');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closePhotoLightbox);
  if (videoLightboxClose) videoLightboxClose.addEventListener('click', closeVideoLightbox);

  // Close lightboxes on click outside the image/video
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closePhotoLightbox();
    });
  }
  if (videoLightbox) {
    videoLightbox.addEventListener('click', (e) => {
      if (e.target === videoLightbox) closeVideoLightbox();
    });
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.style.display === 'flex') closePhotoLightbox();
      if (videoLightbox && videoLightbox.style.display === 'flex') closeVideoLightbox();
    }
  });


  // --- Dynamic Translation Engine (i18n) ---
  const langToggleEn = document.getElementById('lang-toggle-en');
  const langToggleBn = document.getElementById('lang-toggle-bn');
  
  const translations = {
    en: {
      nav_home: "Home",
      nav_services: "Services",
      nav_gallery: "Portfolio",
      nav_packages: "Packages",
      nav_about: "About Us",
      nav_contact: "Contact",
      hero_tag: "Creative Storytellers",
      hero_title: "Capture Your <span>Golden Moments</span>",
      hero_desc: "Deep Studio is Deriapur's premium photography studio. We blend artistic vision with cutting-edge gear to freeze your weddings, birthdays, rice ceremonies, and special celebrations in timeless frames.",
      hero_btn_explore: "Explore Work",
      hero_btn_book: "Book a Shoot",
      hero_badge_title: "Premium Quality",
      hero_badge_sub: "Trusted by 1000+ local families",
      services_tag: "Our Expertise",
      services_title: "Photography Services",
      services_desc: "We specialize in various creative photography niches. Explore our features and book your session today.",
      service_wedding_title: "Wedding & Pre/Post Wedding",
      service_wedding_desc: "Make your grand wedding unforgettable. We cover everything from the exciting preparation to the final reception with cinematic styling.",
      sub_features_title: "Key Services Included:",
      feat_pre_wedding_title: "Pre-Wedding Shoot",
      feat_pre_wedding_desc: "Romantic outdoor sessions at scenic locations in West Bengal with custom theme concepts.",
      btn_book_this: "Book Shoot &rarr;",
      feat_wedding_day_title: "Wedding Day Coverage",
      feat_wedding_day_desc: "Traditional rituals, emotional candid moments, drone photography, and live screening.",
      feat_post_wedding_title: "Post-Wedding Shoot",
      feat_post_wedding_desc: "Beautiful couple portraits captured relaxed after the ceremony, preserving the initial wedding glow.",
      feat_bridal_portrait_title: "Bridal Portraiture",
      feat_bridal_portrait_desc: "Dedicated high-fashion close-up shots of the bride, capturing intricate makeup and jewelry details.",
      service_birthday_title: "Birthday & Kids Shoots",
      service_birthday_desc: "From magical first birthdays to creative baby photography. We capture your child's pure, adorable smiles.",
      feat_baby_portrait: "Baby Portraiture",
      feat_birthday_event: "Birthday Event Coverage",
      feat_cake_smash: "Smash the Cake Sessions",
      btn_book_short: "Book",
      service_rice_title: "Rice Ceremony (Annaprashan)",
      service_rice_desc: "A baby's first solid food intake is a sacred milestone. We cover the puja, rituals, and guest interactions.",
      feat_rice_rituals: "Puja & Ritual Coverage",
      feat_rice_portraits: "Family Portrait Session",
      service_portraits_title: "Maternity & Portraits",
      service_portraits_desc: "Cherish the pregnancy journey or get polished professional headshots and family pictures.",
      feat_maternity: "Maternity Photoshoot",
      feat_headshots: "Professional Headshots",
      feat_family_portraits: "Family Portraiture",
      gallery_tag: "Our Portfolio",
      gallery_title: "Past Event Highlights",
      gallery_desc: "Browse through some of our actual photoshoots and cinematic video clips captured across West Bengal.",
      filter_all: "All",
      filter_wedding: "Wedding",
      filter_pre_wedding: "Pre-Wedding",
      filter_birthday: "Birthday",
      filter_rice: "Rice Ceremony",
      filter_videos: "Videos",
      gal_item_1_title: "Rituparna & Sourav",
      gal_item_1_sub: "Wedding Day",
      gal_item_2_title: "Aarav's 1st Birthday",
      gal_item_2_sub: "Birthday Shoot",
      gal_item_3_title: "Sayantani & Rahul",
      gal_item_3_sub: "Pre-Wedding Outdoor",
      gal_item_4_title: "Baby Anish's Rice Ceremony",
      gal_item_4_sub: "Rice Ceremony Puja",
      gal_item_5_title: "Cinematic Wedding Highlight",
      gal_item_5_sub: "Teaser Film",
      gal_item_6_title: "Pre-Wedding Love Teaser",
      gal_item_6_sub: "Outdoor Story",
      packages_tag: "Investment Plans",
      packages_title: "Photography Packages",
      packages_desc: "Find a structured package that fits your celebration. Custom requests are always welcome.",
      pack_pre_title: "Pre-Wedding Shoot Pack",
      pack_pre_f1: "1 Lead Photographer",
      pack_pre_f2: "4 Hours Outdoor Shoot",
      pack_pre_f3: "80+ High-Res Edited Images",
      pack_pre_f4: "1 Min Cinematic Reel Teaser",
      pack_pre_f5: "Hardcover Photo Book",
      btn_choose_pack: "Choose Package & Book",
      badge_featured: "BEST SELLER",
      pack_wedding_title: "Premium Wedding Pack",
      pack_wedding_f1: "2 Photographers (Candid + Trad)",
      pack_wedding_f2: "Pre-Wedding Session Included",
      pack_wedding_f3: "Full Event Day Coverage",
      pack_wedding_f4: "250+ Edited Photos + All Raws",
      pack_wedding_f5: "5 Min Cinematic Highlight Film",
      pack_wedding_f6: "40-Page Premium Leather Album",
      pack_bday_title: "Birthday Bash Package",
      pack_bday_f1: "1 Professional Photographer",
      pack_bday_f2: "3 Hours Birthday Event Coverage",
      pack_bday_f3: "80+ Edited Digital Photos",
      pack_bday_f4: "Custom Theme Backdrop Setup",
      pack_bday_f5: "Cinematic Teaser Film",
      pack_rice_title: "Rice Ceremony Special",
      pack_rice_f1: "1 Professional Photographer",
      pack_rice_f2: "4 Hours Puja & Ceremony coverage",
      pack_rice_f3: "100+ Edited Digital Photos",
      pack_rice_f4: "A4 Size Mini Photo Book",
      pack_rice_f5: "Drone Videography",
      pack_complete_title: "Complete Ceremony Pack",
      pack_complete_f1: "3 Crew Members (Photo + Video)",
      pack_complete_f2: "Multi-day (Haldi + Wedding + Rec)",
      pack_complete_f3: "Drone Videography + Custom Lights",
      pack_complete_f4: "400+ Edited Photos + All Raws",
      pack_complete_f5: "30 Min Full cinematic Wedding Film",
      pack_complete_f6: "2 Hardcover Premium Photo Albums",
      booking_tag: "Schedule Shoot",
      booking_title: "Book Your Shoot Session",
      booking_desc: "Pre-fill the packages above or fill out the form manually. We will confirm date availability within 2 hours.",
      form_label_name: "Full Name",
      form_label_phone: "Phone Number",
      form_label_email: "Email Address",
      form_label_service: "Photography Service",
      form_label_shoot: "Specific Shoot Type",
      form_label_package: "Preferred Package",
      form_label_date: "Event Date",
      form_label_message: "Shoot Details / Special Notes",
      form_label_message_query: "Your Message Details",
      btn_submit_booking: "Send Booking Request",
      opt_choose_service: "-- Choose Service --",
      opt_wedding: "Wedding & Pre/Post Wedding",
      opt_birthday: "Birthday & Kids Shoot",
      opt_rice: "Rice Ceremony (Annaprashan)",
      opt_portraits: "Maternity & Portrait Session",
      opt_choose_shoot: "-- Select Specific Shoot --",
      opt_pre_wedding: "Pre-Wedding Shoot",
      opt_wedding_day: "Wedding Day Coverage",
      opt_post_wedding: "Post-Wedding Shoot",
      opt_bridal_portrait: "Bridal Portraiture",
      opt_baby_portrait: "Baby Portraiture",
      opt_birthday_event: "Birthday Event Coverage",
      opt_cake_smash: "Smash the Cake",
      opt_rice_rituals: "Puja & Rituals Coverage",
      opt_rice_portraits: "Ceremony Family Portrait",
      opt_maternity_shoot: "Maternity Photoshoot",
      opt_headshots_shoot: "Professional Headshots",
      opt_family_shoot: "Family Portraiture",
      opt_pack_pre_wed: "Pre-Wedding Shoot Pack (₹15,000)",
      opt_pack_prem_wed: "Premium Wedding Pack (₹35,000)",
      opt_pack_comp_cer: "Complete Ceremony Pack (₹55,000)",
      opt_pack_bday: "Birthday Bash Package (₹8,000)",
      opt_pack_rice: "Rice Ceremony Special (₹12,000)",
      opt_pack_custom: "Custom Shoot / Other Budget",
      about_tag: "Meet the Team",
      about_title: "Crafting Memories Behind the Lens",
      about_p1: "Deep Studio is Deriapur’s premier photography center. Founded with a vision to capture raw, authentic emotions of local families in West Bengal, we combine art with high-tech execution.",
      about_p2: "Over the years, we have grown into a dedicated crew of photographers, videographers, and editors, covering grand scale weddings, intimate rice ceremonies, birthday themes, and creative portrait sessions.",
      about_p3: "Our goal is simple: capture your precious moments in their natural beauty so you can relive them for generations to come.",
      stats_years: "Years Experience",
      stats_shoots: "Happy Shoots",
      stats_satisfaction: "Satisfaction",
      stats_awards: "Local Awards",
      crew_title: "The Photography Crew",
      crew_member_1_role: "Founder & Lead Photographer",
      crew_member_1_bio: "An artistic visionary with a lens, specializing in wedding candid frames and cinematic outdoor lighting.",
      crew_member_2_role: "Kids & Portrait Specialist",
      crew_member_2_bio: "Talented in baby portraits and themed birthday shoots, bringing out natural, happy children smiles.",
      crew_member_3_role: "Senior Editor & Videographer",
      crew_member_3_bio: "Master of cinematic storytelling, crafting beautiful teaser clips and full wedding reels.",
      reviews_tag: "Reviews",
      reviews_title: "Loved by the Community",
      reviews_desc: "Read what local families in Deriapur say about their experience booking shoots with us.",
      rev_1_text: "\"We booked Deep Studio for my sister's marriage. The pre-wedding shoot was absolutely beautiful, and the wedding day candid photographs were magical. Their behavior was extremely polite and professional. Highly recommended!\"",
      rev_1_client: "Wedding Client",
      rev_2_text: "\"Deep Studio captured my son's Rice Ceremony (Annaprashan) ritual. The photographers were patient with the baby, and the mini leather album we received is of top premium quality. Cheapest rates in Deriapur!\"",
      rev_2_client: "Rice Ceremony Client",
      rev_3_text: "\"Excellent birthday party photoshoot. The themed balloons setup was beautiful and the baby pictures turned out very colorful. We also got passport prints instantly. Thanks to Riya and Deep Ghosh!\"",
      rev_3_client: "Birthday Shoot Client",
      contact_tag: "Contact Details",
      contact_title: "Our Studio Office",
      contact_desc: "Drop by our physical studio in Deriapur to look through our hardcopy album options, frames, or chat about custom packages.",
      cont_address_title: "Studio Address",
      cont_address_text: "Main Road (Near Bazar), Deriapur,<br>West Bengal 713101, India",
      cont_phone_title: "Phone Numbers",
      cont_email_title: "Email Inquiries",
      cont_social_title: "Connect Digitally",
      cont_form_tag: "Send Message",
      cont_form_title: "General Inquiry",
      btn_send_msg: "Send Message",
      map_tag: "Location Map",
      map_title: "Find Us in Deriapur",
      map_desc: "Visit our location situated near Main Bazar, Deriapur, West Bengal.",
      faq_tag: "FAQ",
      faq_title: "Frequently Asked Questions",
      faq_desc: "Got questions about scheduling, delivery timelines, and albums? Find answers here.",
      faq_q1: "What geographical areas does Deep Studio cover?",
      faq_a1: "We are based in Deriapur, West Bengal, but we regularly travel to surrounding districts including Bardhaman, Guskara, Bolpur, and Santiniketan for weddings and pre-wedding shoots.",
      faq_q2: "How long after the photoshoot do we receive our edited photos?",
      faq_a2: "We deliver digital previews of the highlights within 7 days. The complete set of edited high-resolution photos and final video films are delivered within 4 to 6 weeks, depending on album curation.",
      faq_q3: "Can we customize the photography package features?",
      faq_a3: "Yes, absolutely! Every event is unique. We can add drone shots, increase crew size, print extra copies of photo books, or extend session hours. Contact us for a customized estimate.",
      faq_q4: "What camera equipment does Deep Studio use?",
      faq_a4: "We use high-end professional mirrorless cameras (Sony and Canon series) along with prime portrait lenses and advanced drone rigs to ensure sharp, vibrant, and cinematic outputs.",
      foot_about_title: "About Deep Studio",
      foot_about_desc: "Deep Studio is Deriapur’s leading creative photography center. We are dedicated to capturing your life's greatest milestones in vivid frames.",
      foot_links_title: "Quick Navigation",
      foot_services_title: "Photography Niches",
      foot_seo_title: "SEO Keywords",
      foot_seo_text: "Looking for a professional <strong>wedding photographer in Deriapur</strong>? Or looking for affordable <strong>pre-wedding, birthday, or rice ceremony photo shoots</strong> in Bardhaman, Guskara, West Bengal? Deep Studio provides high-quality candid photography, videography, and albums.",
      foot_address: "Address: Main Road, Deriapur, West Bengal, India"
    },
    bn: {
      nav_home: "হোম",
      nav_services: "পরিষেবা",
      nav_gallery: "পোর্টফোলিও",
      nav_packages: "প্যাকেজ",
      nav_about: "আমাদের সম্পর্কে",
      nav_contact: "যোগাযোগ",
      hero_tag: "সৃজনশীল গল্পকার",
      hero_title: "আপনার <span>সোনালী মুহূর্তগুলো</span> ক্যামেরাবন্দী করুন",
      hero_desc: "ডিপ স্টুডিও দরিয়াপুরের একটি প্রিমিয়াম ফটোগ্রাফি স্টুডিও। আমরা আধুনিক যন্ত্রপাতির সাথে শিল্পসম্মত দৃষ্টিভঙ্গির মেলবন্ধন ঘটিয়ে আপনার বিয়ে, জন্মদিন, অন্নপ্রাশন এবং অন্যান্য বিশেষ অনুষ্ঠানগুলোকে চিরস্মরণীয় ফ্রেমে ধরে রাখি।",
      hero_btn_explore: "পোর্টফোলিও দেখুন",
      hero_btn_book: "বুকিং করুন",
      hero_badge_title: "উন্নত মান",
      hero_badge_sub: "১০০০+ স্থানীয় পরিবারের বিশ্বস্ত",
      services_tag: "আমাদের দক্ষতা",
      services_title: "ফটোগ্রাফি পরিষেবা",
      services_desc: "আমরা বিভিন্ন ধরণের সৃজনশীল ফটোগ্রাফি করে থাকি। আমাদের বৈশিষ্ট্যগুলো দেখুন এবং আজই আপনার সেশন বুক করুন।",
      service_wedding_title: "বিয়ে এবং প্রি/পোস্ট ওয়েডিং শুট",
      service_wedding_desc: "আপনার বিয়ের অনুষ্ঠানকে অবিস্মরণীয় করে তুলুন। আমরা বিয়ের প্রস্তুতি থেকে শুরু করে রিসেপশন পর্যন্ত সবকিছুই সিনেমাটিক স্টাইলে কভার করি।",
      sub_features_title: "অন্তর্ভুক্ত মূল পরিষেবাগুলি:",
      feat_pre_wedding_title: "প্রি-ওয়েডিং ফটোশুট",
      feat_pre_wedding_desc: "পশ্চিমবঙ্গের সুন্দর লোকেশনে কাস্টম থিম ভাবনাসহ রোমান্টিক আউটডোর ফটোশুট সেশন।",
      btn_book_this: "বুক করুন &rarr;",
      feat_wedding_day_title: "বিয়ের দিনের কভারেজ",
      feat_wedding_day_desc: "ঐতিহ্যবাহী আচার-অনুষ্ঠান, আবেগঘন মুহূর্ত, ড্রোন ফটোগ্রাফি এবং সরাসরি স্ক্রিনিং সুবিধা।",
      feat_post_wedding_title: "পোস্ট-ওয়েডিং ফটোশুট",
      feat_post_wedding_desc: "বিয়ের পর খোশমেজাজে নবদম্পতির সুন্দর পোর্ট্রেট সেশন, যা বিয়ের শুরুর নতুন অনুভূতিকে ধরে রাখে।",
      feat_bridal_portrait_title: "ব্রাইডাল পোর্ট্রেট",
      feat_bridal_portrait_desc: "কনের বিশেষ রূপসজ্জা ও গহনার সূক্ষ্ম বিবরণ ফুটিয়ে তোলার জন্য একটি ডেডিকেটেড হাই-ফ্যাশন ক্লোজ-আপ শুট।",
      service_birthday_title: "জন্মদিন এবং বাচ্চাদের শুট",
      service_birthday_desc: "শিশুর প্রথম জন্মদিন থেকে শুরু করে সৃজনশীল বেবি পোর্ট্রেট। আমরা আপনার বাচ্চার মুখের পবিত্র ও সুন্দর হাসিগুলো ফ্রেমে বন্দী করি।",
      feat_baby_portrait: "বেবি পোর্ট্রেট",
      feat_birthday_event: "জন্মদিনের অনুষ্ঠান কভারেজ",
      feat_cake_smash: "কেক স্ম্যাশ সেশন",
      btn_book_short: "বুকিং",
      service_rice_title: "অন্নপ্রাশন (ভাত মুখে দেওয়া)",
      service_rice_desc: "শিশুর প্রথম শক্ত খাবার খাওয়ার এই পবিত্র মুহূর্তটি একটি গুরুত্বপূর্ণ মাইলফলক। আমরা পুজো, আচার এবং অতিথিদের কভারেজ করি।",
      feat_rice_rituals: "পুজো ও আচার কভারেজ",
      feat_rice_portraits: "পারিবারিক পোর্ট্রেট সেশন",
      service_portraits_title: "মাতৃত্বকালীন ও পোর্ট্রেট শুট",
      service_portraits_desc: "গর্ভধারণের সুন্দর দিনগুলোর ছবি তুলুন অথবা পেশাদার হেডশট ও সুন্দর পারিবারিক ছবি সংগ্রহ করুন।",
      feat_maternity: "মাতৃত্বকালীন শুট",
      feat_headshots: "পেশাদার হেডশট",
      feat_family_portraits: "পারিবারিক পোর্ট্রেট",
      gallery_tag: "আমাদের পোর্টফোলিও",
      gallery_title: "বিগত অনুষ্ঠানের হাইলাইটস",
      gallery_desc: "পশ্চিমবঙ্গজুড়ে করা আমাদের আসল ফটোশুট এবং সিনেমাটিক ভিডিও ক্লিপগুলোর গ্যালারিতে চোখ বুলিয়ে নিন।",
      filter_all: "সব",
      filter_wedding: "বিবাহ",
      filter_pre_wedding: "প্রি-ওয়েডিং",
      filter_birthday: "জন্মদিন",
      filter_rice: "অন্নপ্রাশন",
      filter_videos: "ভিডিও",
      gal_item_1_title: "ঋতুপর্ণা এবং সৌরভ",
      gal_item_1_sub: "বিয়ের দিন",
      gal_item_2_title: "আরাভের ১ম জন্মদিন",
      gal_item_2_sub: "জন্মদিনের শুট",
      gal_item_3_title: "সায়ন্তনী এবং রাহুল",
      gal_item_3_sub: "প্রি-ওয়েডিং আউটডোর",
      gal_item_4_title: "বেবি অনিশের অন্নপ্রাশন",
      gal_item_4_sub: "অন্নপ্রাশনের পুজো",
      gal_item_5_title: "সিনেমাটিক বিয়ের হাইলাইট",
      gal_item_5_sub: "টিজার ফিল্ম",
      gal_item_6_title: "প্রি-ওয়েডিং প্রেমের টিজার",
      gal_item_6_sub: "আউটডোর স্টোরি",
      packages_tag: "বিনিয়োগ প্ল্যান",
      packages_title: "ফটোগ্রাফি প্যাকেজসমূহ",
      packages_desc: "আপনার অনুষ্ঠানের সাথে মানানসই একটি প্যাকেজ বেছে নিন। কাস্টম অনুরোধ সবসময় স্বাগত জানানো হয়।",
      pack_pre_title: "প্রি-ওয়েডিং শুট প্যাক",
      pack_pre_f1: "১ জন প্রধান ফটোগ্রাফার",
      pack_pre_f2: "৪ ঘণ্টা আউটডোর শুট",
      pack_pre_f3: "৮০+ হাই-রেস এডিটেড ছবি",
      pack_pre_f4: "১ মিনিট সিনেমাটিক রিল টিজার",
      pack_pre_f5: "হার্ডকভার ফটো বুক",
      btn_choose_pack: "প্যাকেজ বেছে নিয়ে বুক করুন",
      badge_featured: "সেরা পছন্দ",
      pack_wedding_title: "প্রিমিয়াম ওয়েডিং প্যাক",
      pack_wedding_f1: "২ জন ফটোগ্রাফার (ক্যান্ডিড + ট্র্যাডিশনাল)",
      pack_wedding_f2: "প্রি-ওয়েডিং সেশন অন্তর্ভুক্ত",
      pack_wedding_f3: "অনুষ্ঠানের দিন পুরো কভারেজ",
      pack_wedding_f4: "২৫০+ এডিটেড ছবি ও সমস্ত র ফাইল",
      pack_wedding_f5: "৫ মিনিট সিনেমাটিক বিয়ের ছবি (ফিল্ম)",
      pack_wedding_f6: "৪০ পৃষ্ঠার প্রিমিয়াম লেদার অ্যালবাম",
      pack_bday_title: "বার্থডে ব্যাশ প্যাকেজ",
      pack_bday_f1: "১ জন পেশাদার ফটোগ্রাফার",
      pack_bday_f2: "৩ ঘণ্টা জন্মদিনের অনুষ্ঠান কভারেজ",
      pack_bday_f3: "৮০+ এডিটেড ডিজিটাল ছবি",
      pack_bday_f4: "কাস্টম থিম ব্যাকড্রপ সেটআপ",
      pack_bday_f5: "সিনেমাটিক টিজার ফিল্ম",
      pack_rice_title: "অন্নপ্রাশন স্পেশাল",
      pack_rice_f1: "১ জন পেশাদার ফটোগ্রাফার",
      pack_rice_f2: "৪ ঘণ্টা পুজো ও অনুষ্ঠান কভারেজ",
      pack_rice_f3: "১০০+ এডিটেড ডিজিটাল ছবি",
      pack_rice_f4: "A4 সাইজের মিনি ফটো বুক",
      pack_rice_f5: "ড্রোন ভিডিওগ্রাফি",
      pack_complete_title: "সম্পূর্ণ সেরেমনি প্যাক",
      pack_complete_f1: "৩ জন ক্রু সদস্য (ফটো + ভিডিও)",
      pack_complete_f2: "বহু-দিন কভারেজ (গায়ে হলুদ + বিয়ে + রিসেপশন)",
      pack_complete_f3: "ড্রোন ভিডিওগ্রাফি ও কাস্টম লাইট",
      pack_complete_f4: "৪০০+ এডিটেড ছবি ও সমস্ত র ফাইল",
      pack_complete_f5: "৩০ মিনিট সম্পূর্ণ সিনেমাটিক বিয়ের ফিল্ম",
      pack_complete_f6: "২টি হার্ডকভার প্রিমিয়াম ফটো অ্যালবাম",
      booking_tag: "সময়সূচী বুকিং",
      booking_title: "আপনার শুট বুক করুন",
      booking_desc: "ওপরের প্যাকেজ বেছে নিয়ে ফর্ম পূরণ করুন অথবা সরাসরি তথ্য দিন। ২ ঘণ্টার মধ্যে বুকিং নিশ্চিত করা হবে।",
      form_label_name: "সম্পূর্ণ নাম",
      form_label_phone: "ফোন নম্বর",
      form_label_email: "ইমেল ঠিকানা",
      form_label_service: "ফটোগ্রাফি পরিষেবা",
      form_label_shoot: "নির্দিষ্ট শুটের ধরন",
      form_label_package: "পছন্দের প্যাকেজ",
      form_label_date: "অনুষ্ঠানের তারিখ",
      form_label_message: "শুটের বিবরণ / বিশেষ নোট",
      form_label_message_query: "আপনার বার্তার বিবরণ",
      btn_submit_booking: "বুকিং অনুরোধ পাঠান",
      opt_choose_service: "-- পরিষেবা বেছে নিন --",
      opt_wedding: "বিবাহ ও প্রি/পোস্ট ওয়েডিং",
      opt_birthday: "জন্মদিন ও বাচ্চাদের শুট",
      opt_rice: "অন্নপ্রাশন (ভাত মুখে দেওয়া)",
      opt_portraits: "মাতৃত্বকালীন ও পোর্ট্রেট সেশন",
      opt_choose_shoot: "-- নির্দিষ্ট শুট বেছে নিন --",
      opt_pre_wedding: "প্রি-ওয়েডিং ফটোশুট",
      opt_wedding_day: "বিয়ের দিনের কভারেজ",
      opt_post_wedding: "পোস্ট-ওয়েডিং ফটোশুট",
      opt_bridal_portrait: "ব্রাইডাল পোর্ট্রেট",
      opt_baby_portrait: "শিশুদের পোর্ট্রেট",
      opt_birthday_event: "জন্মদিনের অনুষ্ঠান কভারেজ",
      opt_cake_smash: "কেক স্ম্যাশ",
      opt_rice_rituals: "পুজো ও আচার কভারেজ",
      opt_rice_portraits: "পারিবারিক পোর্ট্রেট সেশন",
      opt_maternity_shoot: "মাতৃত্বকালীন ফটোশুট",
      opt_headshots_shoot: "পেশাদার হেডশট",
      opt_family_shoot: "পারিবারিক পোর্ট্রেট",
      opt_pack_pre_wed: "প্রি-ওয়েডিং শুট প্যাক (₹১৫,০০০)",
      opt_pack_prem_wed: "প্রিমিয়াম ওয়েডিং প্যাক (₹৩৫,০০০)",
      opt_pack_comp_cer: "সম্পূর্ণ সেরেমনি প্যাক (₹৫৫,০০০)",
      opt_pack_bday: "বার্থডে ব্যাশ প্যাকেজ (₹৮,০০০)",
      opt_pack_rice: "অন্নপ্রাশন স্পেশাল (₹১২,০০০)",
      opt_pack_custom: "কাস্টম শুট / অন্যান্য বাজেট",
      about_tag: "টিমের সাথে পরিচিতি",
      about_title: "লেন্সের আড়ালে স্মৃতি সৃষ্টি",
      about_p1: "ডিপ স্টুডিও দরিয়াপুরের শীর্ষস্থানীয় সৃজনশীল ফটোগ্রাফি সেন্টার। পশ্চিমবঙ্গের পরিবারগুলোর খাঁটি অনুভূতি সুন্দর ফ্রেমে বন্দী করার জন্য আমাদের পথচলা শুরু হয়।",
      about_p2: "গত কয়েক বছরে আমরা ফটোগ্রাফার, ভিডিওগ্রাফার এবং এডিটরদের একটি দারুণ দল গড়ে তুলেছি। আমরা রাজকীয় বিয়ে, পারিবারিক অন্নপ্রাশন, জন্মদিনের থিম শুট ও পোর্ট্রেট শুট করে থাকি।",
      about_p3: "আমাদের লক্ষ্য একটাই: আপনার জীবনের অমূল্য মুহূর্তগুলোকে নিখুঁত ফ্রেমে ধরে রাখা, যা প্রজন্ম থেকে প্রজন্মে ফিরে ফিরে দেখা যায়।",
      stats_years: "বছরের অভিজ্ঞতা",
      stats_shoots: "খুশি গ্রাহক",
      stats_satisfaction: "সন্তুষ্টি",
      stats_awards: "স্থানীয় পুরস্কার",
      crew_title: "আমাদের ফটোগ্রাফি টিম",
      crew_member_1_role: "প্রতিষ্ঠাতা এবং প্রধান ফটোগ্রাফার",
      crew_member_1_bio: "ক্যামেরা লেন্সের একজন জাদুকর, যিনি বিয়ের ক্যান্ডিড মুহূর্ত ও আকর্ষণীয় আউটডোর লাইটিং ব্যবহারে বিশেষজ্ঞ।",
      crew_member_2_role: "বাচ্চাদের ও পোর্ট্রেট বিশেষজ্ঞ",
      crew_member_2_bio: "শিশুদের হাস্যোজ্জ্বল মুখমণ্ডল ও কাস্টম থিমভিত্তিক জন্মদিনের শুট করায় দারুন প্রতিভাবান।",
      crew_member_3_role: "সিনিয়র এডিটর ও ভিডিওগ্রাফার",
      crew_member_3_bio: "সিনেমাটিক ভিডিও এডিটিংয়ের মাধ্যমে আপনার বিয়ের টিজার ও পূর্ণাঙ্গ ফিল্ম তৈরিতে পারদর্শী।",
      reviews_tag: "গ্রাহক মতামত",
      reviews_title: "স্থানীয়দের প্রিয় স্টুডিও",
      reviews_desc: "দরিয়াপুরের স্থানীয় পরিবারগুলোর আমাদের ওপর রাখা ভরসা এবং বুকিং করার অভিজ্ঞতার কথা জেনে নিন।",
      rev_1_text: "\"আমরা বোনের বিয়ের জন্য ডিপ স্টুডিওকে বুক করেছিলাম। প্রি-ওয়েডিং শুট যেমন সুন্দর ছিল, বিয়ের দিনের ক্যান্ডিড ছবিগুলোও চমৎকার হয়েছে। তাদের ব্যবহার খুবই নম্র ও পেশাদার ছিল। দারুণ কভারেজ!\"",
      rev_1_client: "বিয়ের ক্লায়েন্ট",
      rev_2_text: "\"ডিপ স্টুডিও আমার ছেলের অন্নপ্রাশনের পুজো ও আচার দারুণভাবে কভার করেছে। তারা বাচ্চার সাথে ধৈর্য ধরে কাজ করেছে। আর অ্যালবামটির কোয়ালিটিও প্রিমিয়াম। দরিয়াপুরের সবচেয়ে সস্তা রেট!\"",
      rev_2_client: "অন্নপ্রাশনের ক্লায়েন্ট",
      rev_3_text: "\"চমৎকার বার্থডে পার্টি ফটোশুট। বেলুন দিয়ে সাজানো ব্যাকগ্রাউন্ড খুব সুন্দর ছিল এবং বাচ্চার ছবিগুলো দারুণ রঙিন এসেছে। আমাদের পাসপোর্ট ছবিও সঙ্গে সঙ্গে দিয়ে দেওয়া হয়। ধন্যবাদ রিয়া এবং দীপ ঘোষকে!\"",
      rev_3_client: "জন্মদিনের শুট ক্লায়েন্ট",
      contact_tag: "যোগাযোগ বিবরণী",
      contact_title: "আমাদের স্টুডিও অফিস",
      contact_desc: "কাস্টম প্যাকেজ নিয়ে আলোচনা করতে অথবা বিয়ের প্রিন্টেড ডেমো অ্যালবাম ও ফ্রেম সরাসরি দেখতে আমাদের দরিয়াপুরের অফিসে স্বাগত।",
      cont_address_title: "স্টুডিওর ঠিকানা",
      cont_address_text: "প্রধান সড়ক (বাজারের পাশে), দরিয়াপুর,<br>পশ্চিমবঙ্গ ৭১৩১০১, ভারত",
      cont_phone_title: "ফোন নম্বর",
      cont_email_title: "ইমেল অনুসন্ধান",
      cont_social_title: "ডিজিটাল যোগাযোগ",
      cont_form_tag: "বার্তা পাঠান",
      cont_form_title: "সাধারণ জিজ্ঞাসা",
      btn_send_msg: "বার্তা পাঠান",
      map_tag: "লোকেশন ম্যাপ",
      map_title: "লোকেশন ম্যাপ দেখুন",
      map_desc: "দরিয়াপুরের মেইন বাজারের কাছে অবস্থিত আমাদের স্টুডিওতে খুব সহজেই চলে আসুন।",
      faq_tag: "জিজ্ঞাসাবাদ",
      faq_title: "সাধারণ কিছু প্রশ্নাবলী",
      faq_desc: "বুকিং প্রসেস, অ্যালবামের ডেলিভারি সময় এবং আমাদের অন্যান্য সুবিধা সম্পর্কে বিস্তারিত জানুন।",
      faq_q1: "ডিপ স্টুডিও কোন কোন এলাকায় কভারেজ করে?",
      faq_a1: "আমরা দরিয়াপুর, পশ্চিমবঙ্গে অবস্থিত হলেও কাজের প্রয়োজনে আমরা বর্ধমান, গুসকরা, বোলপুর এবং শান্তিনিকেতনসহ সমস্ত আশেপাশের জেলায় শুট করতে যাই।",
      faq_q2: "ফটোশুটের কতদিন পর আমরা এডিটেড ছবি পাবো?",
      faq_a2: "আমরা ফটোশুটের ৭ দিনের মধ্যে বাছাই করা ছবির হাইলাইটস ডিজিটাল আকারে পাঠিয়ে দিই। আর সম্পূর্ণ ছবি ও সিনেমাটিক ভিডিও এডিটিং শেষ করে ৪ থেকে ৬ সপ্তাহের মধ্যে অ্যালবামের ডেলিভারি দেওয়া হয়।",
      faq_q3: "আমরা কি আমাদের ইচ্ছেমতো প্যাকেজ কাস্টমাইজ করতে পারবো?",
      faq_a3: "হ্যাঁ, অবশ্যই! প্রতিটি বিয়ের অনুষ্ঠান আলাদা। আপনার প্রয়োজন অনুযায়ী ড্রোন কভারেজ যোগ করা, ক্রু মেম্বার বাড়ানো বা অতিরিক্ত অ্যালবাম প্রিন্ট করানো সম্ভব। আপনার বাজেট আমাদের জানান।",
      faq_q4: "ডিপ স্টুডিও কি ধরণের ক্যামেরা ব্যবহার করে?",
      faq_a4: "আমরা সনি (Sony) এবং ক্যানন (Canon) ব্র্যান্ডের প্রিমিয়াম ফুল-ফ্রেম মিররলেস ক্যামেরা ব্যবহার করি। সাথে ক্যান্ডিড পোর্ট্রেট লেন্স এবং আধুনিক ড্রোন ব্যবহার করা হয়।",
      foot_about_title: "ডিপ স্টুডিও সম্পর্কে",
      foot_about_desc: "ডিপ স্টুডিও দরিয়াপুরের শীর্ষস্থানীয় সৃজনশীল ফটোগ্রাফি সেন্টার। আপনার জীবনের শ্রেষ্ঠ মাইলফলকগুলোকে নিখুঁত ফ্রেমে ধরে রাখাই আমাদের মূল লক্ষ্য।",
      foot_links_title: "দ্রুত নেভিগেশন",
      foot_services_title: "ফটোগ্রাফি ক্যাটাগরি",
      foot_seo_title: "এসইও কিওয়ার্ডসমূহ",
      foot_seo_text: "আপনি কি দরিয়াপুরে পেশাদার <strong>ওয়েডিং ফটোগ্রাফার</strong> খুঁজছেন? অথবা বর্ধমান ও গুসকরা এলাকায় সুলভ মূল্যে <strong>প্রি-ওয়েডিং, জন্মদিন বা অন্নপ্রাশনের ফটোশুট</strong> করতে চান? ডিপ স্টুডিও আপনাকে দেয় ক্যান্ডিড ফটোগ্রাফি ও প্রিমিয়াম অ্যালবামের ওয়ান-স্টপ সলিউশন।",
      foot_address: "ঠিকানা: প্রধান সড়ক, দরিয়াপুর, পশ্চিমবঙ্গ, ভারত"
    }
  };

  const setLanguage = (lang) => {
    // 1. Loop through all translatable texts
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // Preserving inline formatting tags (like <span> in headings)
        if (element.querySelector('span') && translations[lang][key].includes('<span>')) {
          element.innerHTML = translations[lang][key];
        } else {
          // If element has a child icon, keep it and update text node
          const icon = element.querySelector('i');
          if (icon) {
            const iconHTML = icon.outerHTML;
            // Extract translatable text from dictionary and strip arrow symbols if they are already hardcoded
            let translatedText = translations[lang][key];
            element.innerHTML = iconHTML + ' ' + translatedText;
          } else {
            element.innerHTML = translations[lang][key];
          }
        }
      }
    });

    // 2. Loop through translatable placeholders
    const placeholders = {
      en: {
        'booking-name': "Deep Ghosh",
        'booking-phone': "+91 98765 43210",
        'booking-email': "deep@domain.com",
        'booking-message': "Tell us about the location, theme ideas, duration, or timing details...",
        'contact-name': "Your Name",
        'contact-phone': "Mobile Number",
        'contact-email': "name@domain.com",
        'contact-message': "Ask us a general question about timing, camera gear, delivery time..."
      },
      bn: {
        'booking-name': "দীপ ঘোষ",
        'booking-phone': "+91 ৯৮৭৬৫ ৪৩২১০",
        'booking-email': "deep@domain.com",
        'booking-message': "আপনার শুটের লোকেশন, থিম, সময়কাল বা বিশেষ অনুরোধের কথা জানান...",
        'contact-name': "আপনার নাম",
        'contact-phone': "মোবাইল নম্বর",
        'contact-email': "name@domain.com",
        'contact-message': "অ্যালবাম প্রিন্ট, ডেলিভারির সময় বা অন্যান্য ক্যামেরা সংক্রান্ত প্রশ্ন জিজ্ঞাসা করুন..."
      }
    };

    Object.keys(placeholders[lang]).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('placeholder', placeholders[lang][id]);
    });

    // 3. Keep track of active button styles
    if (lang === 'en') {
      langToggleEn.classList.add('active');
      langToggleBn.classList.remove('active');
    } else {
      langToggleBn.classList.add('active');
      langToggleEn.classList.remove('active');
    }

    // Store in localStorage
    localStorage.setItem('language', lang);
  };

  // Attach language toggle event listeners
  if (langToggleEn && langToggleBn) {
    langToggleEn.addEventListener('click', () => setLanguage('en'));
    langToggleBn.addEventListener('click', () => setLanguage('bn'));
  }

  // Load persisted language or default to English
  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);


  // --- Booking Autofill Logic ---
  // Expose function globally so inline HTML onclick handlers can trigger it
  window.triggerBooking = (service, shootType, packageVal) => {
    const bookingFormSection = document.getElementById('booking');
    const serviceSelect = document.getElementById('booking-service');
    const shootTypeSelect = document.getElementById('booking-shoot-type');
    const packageSelect = document.getElementById('booking-package');
    const nameInput = document.getElementById('booking-name');

    if (bookingFormSection) {
      // 1. Smooth scroll to form section
      bookingFormSection.scrollIntoView({ behavior: 'smooth' });

      // 2. Set dropdown select values
      if (serviceSelect) {
        serviceSelect.value = service;
        // Trigger change event to sync sub-options if any
        serviceSelect.dispatchEvent(new Event('change'));
      }
      if (shootTypeSelect) {
        shootTypeSelect.value = shootType;
      }
      if (packageSelect) {
        packageSelect.value = packageVal;
      }

      // 3. Highlight and focus name input to guide the user
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 800); // Wait for smooth scroll to finish
      }
    }
  };


  // --- Booking Form Simulation Submit ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('booking-name').value;
      const phone = document.getElementById('booking-phone').value;
      const service = document.getElementById('booking-service').value;
      const shoot = document.getElementById('booking-shoot-type').value;

      if (!name || !phone || !service || !shoot) {
        const lang = localStorage.getItem('language') || 'en';
        alert(lang === 'en' ? 'Please fill out all required fields.' : 'অনুগ্রহ করে সব প্রয়োজনীয় ঘর পূরণ করুন।');
        return;
      }

      // Simulated submit visual spinner
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      setTimeout(() => {
        const lang = localStorage.getItem('language') || 'en';
        if (lang === 'en') {
          alert(`Thank you, ${name}! Your booking request for the ${shoot.replace('-', ' ')} shoot has been received. Our team will call you at ${phone} within 2 hours to finalize.`);
        } else {
          alert(`ধন্যবাদ, ${name}! আপনার শুট কভারেজের জন্য বুকিংয়ের অনুরোধ আমরা পেয়েছি। আমাদের টিম পরবর্তী ২ ঘণ্টার মধ্যে আপনার ${phone} নম্বরে যোগাযোগ করে বিস্তারিত নিশ্চিত করবে।`);
        }
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // --- General Contact Form Simulation Submit ---
  const generalContactForm = document.getElementById('contact-form');
  if (generalContactForm) {
    generalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !phone || !email || !message) {
        const lang = localStorage.getItem('language') || 'en';
        alert(lang === 'en' ? 'Please fill out all fields.' : 'অনুগ্রহ করে সব ঘর পূরণ করুন।');
        return;
      }

      const submitBtn = generalContactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        const lang = localStorage.getItem('language') || 'en';
        if (lang === 'en') {
          alert(`Thank you, ${name}! Your inquiry has been sent. We will reply to your email ${email} shortly.`);
        } else {
          alert(`ধন্যবাদ, ${name}! আপনার বার্তাটি পাঠানো হয়েছে। আমরা খুব শীঘ্রই আপনার ${email} ঠিকানায় উত্তর দেব।`);
        }
        generalContactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }
});
