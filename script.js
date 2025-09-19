// Modal v2 System Flag - Disable inline style issues in legacy modal
window.USE_MODAL_V2 = true;

const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function renderPhilosophy(){
  $("#philosophyContent").innerHTML = `
    <div class="card">
      <p class="text-reveal">
        COVA의 철학은<br>
        과정 중심의 사고, 개념을 언어화하는 능력, 비교와 연결을 통한 탐구을 바탕으로<br>
        고1,2 입시미술 학습의 '과정을 기록하고, 생각을 언어와 그림으로 증명하며, 탐구에서 실전까지' 이어지는 '성장'입니다.
      </p>
    </div>`;
}

function renderList(id, arr){ $(id).innerHTML = arr.map(x=>`<li>${x}</li>`).join(""); }
function renderOrdered(id, arr){ $(id).innerHTML = arr.map(x=>`<li>${x}</li>`).join(""); }

function renderTable(targetId, rows){
  const thead = `<thead><tr><th>주차</th><th>질문</th></tr></thead>`;
  const tbody = `<tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody>`;
  $(targetId).innerHTML = thead + tbody;
}

function renderFAQ(){
  const wrap = $("#faqList");
  wrap.innerHTML = COVA_DATA.faq.map(([q,a])=>`
    <details><summary>${q}</summary><div class="muted" style="margin-top:8px">${a}</div></details>
  `).join("");
}

function initNav(){
  const btn = $(".nav-toggle");
  const list = $(".nav-list");
  btn.addEventListener("click", ()=> list.classList.toggle("open"));
  $$(".nav-list a").forEach(a=>a.addEventListener("click", ()=> list.classList.remove("open")));
}

function initTheme(){
  const btn = $("#themeToggle");
  btn.addEventListener("click", ()=>{
    document.documentElement.classList.toggle("light");
    btn.textContent = document.documentElement.classList.contains("light") ? "☀️" : "🌙";
  });
}

// 새로운 단순 COVA 로딩 스크린
function initSimpleCovaLoader() {
  const loader = document.getElementById('simpleCovaLoader');
  const percentage = document.getElementById('simplePercentage');
  
  if (!loader || !percentage) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 10; // 빠른 진행
    if (progress > 100) progress = 100;
    
    percentage.textContent = Math.floor(progress) + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 500);
    }
  }, 150);
}

// 기존 복잡한 COVA Loading Screen (사용 안함)
function initCovaLoadingScreen() {
  console.log('Initializing COVA loading screen...');
  
  // Enable JS class immediately for loading screen visibility
  document.documentElement.classList.add('js-enabled');
  
  const loadingScreen = document.getElementById('covaLoadingScreen');
  const percentage = document.querySelector('.cova-percentage');
  
  console.log('Loading screen element found:', !!loadingScreen);
  console.log('Percentage element found:', !!percentage);
  
  if (!loadingScreen || !percentage) {
    console.error('COVA loading screen elements not found');
    return;
  }
  
  // Block body scroll during loading
  document.body.style.overflow = 'hidden';
  
  // Failsafe timeout - 최대 7초 후 강제 숨김
  const failsafeTimeout = setTimeout(() => {
    console.warn('COVA loading screen failsafe timeout triggered after 7 seconds');
    hideLoadingScreen();
  }, 7000);
  
  function hideLoadingScreen() {
    clearTimeout(failsafeTimeout);
    loadingScreen.classList.add('hidden');
    // Restore body scroll
    document.body.style.overflow = '';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      console.log('COVA loading screen hidden and body scroll restored');
    }, 1000);
  }
  
  console.log('COVA loading screen initialized with failsafe');
  
  // Wait a moment before starting progress
  setTimeout(() => {
    console.log('Starting COVA loading progress...');
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 8 + 4; // 2-3초 완료를 위한 빠른 증가
      if (progress > 100) progress = 100;
      
      percentage.textContent = Math.floor(progress) + '%';
      console.log(`COVA loading progress: ${Math.floor(progress)}%`);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        console.log('COVA loading complete, hiding...');
        
        // Hide loading screen after completion
        setTimeout(hideLoadingScreen, 500); // 100%에서 짧은 표시 시간
      }
    }, 120); // 2-3초 총 시간을 위한 빠른 간격
  }, 500); // 가시성 확보를 위한 초기 지연
}

// Section Progress Tracking
function initSectionProgress() {
  const sections = document.querySelectorAll('.section');
  const progressBars = document.querySelectorAll('.progress-bar');
  
  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const progressBar = progressBars[index];
      
      if (!progressBar) return;
      
      const startProgress = sectionTop - windowHeight;
      const endProgress = sectionTop + sectionHeight;
      
      if (scrollTop >= startProgress && scrollTop <= endProgress) {
        const progress = ((scrollTop - startProgress) / (endProgress - startProgress)) * 100;
        progressBar.style.width = Math.max(0, Math.min(100, progress)) + '%';
      }
    });
  }
  
  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Initial call
}

// Active Navigation Tracking
function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.nav-list a');
  const sections = document.querySelectorAll('.section');
  
  function updateActiveNav() {
    const scrollTop = window.pageYOffset + 100;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const navLink = navLinks[index + 1]; // +1 because first link is home
      
      if (!navLink) return;
      
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
    
    // Handle home section
    if (scrollTop < sections[0]?.offsetTop) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[0]?.classList.add('active');
    }
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Card Hover Effects
function initCardEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Dynamic Text Movement Effects (inspired by ehyundai.com)
function initDynamicTextEffects() {
  // Mark document as JS enabled
  document.documentElement.classList.add('js-enabled');
  
  // Intersection Observer for text animations
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        console.log('Animation triggered for:', entry.target.className);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Split text into words for stagger effect FIRST
  const staggerTexts = document.querySelectorAll('.text-stagger');
  staggerTexts.forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
  });

  // Handle hero title - enhanced with dramatic effects
  const heroTitle = document.querySelector('.hero-title-dynamic');
  if (heroTitle) {
    console.log('Hero title found, initializing animation');
    heroTitle.classList.add('js-enabled');
    
    // Check if lines are already created
    if (!heroTitle.querySelector('.line')) {
      const text = heroTitle.innerHTML;
      const lines = text.split('<br>');
      heroTitle.innerHTML = lines.map(line => 
        `<span class="line"><span>${line}</span></span>`
      ).join('');
      console.log('Hero title lines created');
    }
    
    // Create dramatic entrance with staggered timing
    setTimeout(() => {
      heroTitle.classList.add('visible');
      console.log('Hero title animation triggered - adding visible class');
      console.log('Hero title classes:', heroTitle.className);
      
      // Force trigger animation by checking if visible class is applied
      setTimeout(() => {
        const lines = heroTitle.querySelectorAll('.line span');
        console.log('Found hero lines for animation:', lines.length);
        
        // Use CSS timing - align with CSS delays (0.1s, 0.25s, 0.4s)
        const cssDelays = [0.1, 0.25, 0.4];
        lines.forEach((line, index) => {
          console.log(`Animating line ${index + 1}:`, line.textContent);
          const delay = cssDelays[index] || 0.4; // fallback for extra lines
          
          // Remove manual transform control - let CSS handle it
          line.style.transitionDelay = `${delay}s`;
          console.log(`Applied CSS-aligned delay: ${delay}s for line ${index + 1}`);
        });
      }, 100);
    }, 2000); // Increased delay to ensure loading screen is done
  } else {
    console.log('Hero title not found');
  }

  // Observe all animated text elements
  const animatedTexts = document.querySelectorAll(
    '.text-reveal, .text-slide-left, .text-slide-right, .text-stagger, ' +
    '.text-highlight, .section-title-dynamic, .text-scale-in, .text-rotate-in'
  );
  
  animatedTexts.forEach(el => {
    textObserver.observe(el);
    el.classList.add('js-enabled');
  });

  console.log('Dynamic text effects initialized for', animatedTexts.length, 'elements');
}

// Parallax text movement on scroll
function initParallaxText() {
  const parallaxElements = document.querySelectorAll('.text-parallax');
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rate = scrolled * -0.3;
      element.style.transform = `translateY(${rate}px)`;
    });
  }
  
  window.addEventListener('scroll', updateParallax);
  updateParallax(); // Initial call
}

// Counter animation
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50; // Animation duration control
        let current = 0;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// Text typing effect
function initTypingEffect() {
  const typingElements = document.querySelectorAll('.text-typing');
  
  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            element.style.width = `${(i + 1) * 0.6}em`;
            i++;
            setTimeout(typeWriter, 100);
          } else {
            element.style.borderRight = 'none';
          }
        };
        
        setTimeout(typeWriter, 500);
        typingObserver.unobserve(element);
      }
    });
  });
  
  typingElements.forEach(el => typingObserver.observe(el));
}

// Enhanced scroll-based animations with momentum
function initMomentumAnimations() {
  let scrollTimeout;
  let isScrolling = false;
  
  function onScroll() {
    if (!isScrolling) {
      document.body.classList.add('scrolling');
      isScrolling = true;
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
      isScrolling = false;
    }, 150);
  }
  
  window.addEventListener('scroll', onScroll);
}

// Production-Level Tile Mosaic Controller - nagi-style coordinated movements
class TileMosaicController {
  constructor() {
    this.tiles = [];
    this.animations = [];
    this.isVisible = false;
    this.isPaused = false;
    this.isPageHidden = false;
    this.isReducedMotion = false;
    this.isPerformanceMode = false;
    this.observer = null;
    this.container = null;
    this.memoryThreshold = 100 * 1024 * 1024; // 100MB threshold
    
    // Performance monitoring
    this.performanceObserver = null;
    this.memoryUsage = { used: 0, total: 0 };
    
    // nagi animation patterns configuration
    this.animationConfigs = [
      {
        id: 'tile-1',
        duration: 12000,
        delay: 0,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(1.3) translateX(-20px) translateY(-15px) rotate(-1deg)', opacity: 0.95, offset: 0.25 },
          { transform: 'scale(0.9) translateX(15px) translateY(10px) rotate(1.5deg)', opacity: 0.75, offset: 0.5 },
          { transform: 'scale(1.2) translateX(-10px) translateY(-8px) rotate(-0.5deg)', opacity: 0.9, offset: 0.75 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      {
        id: 'tile-2',
        duration: 15000,
        delay: 2000,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(0.8) translateX(25px) translateY(-20px) rotate(2deg)', opacity: 0.7, offset: 0.3 },
          { transform: 'scale(1.4) translateX(-18px) translateY(12px) rotate(-2.5deg)', opacity: 1.0, offset: 0.6 },
          { transform: 'scale(1.1) translateX(8px) translateY(-5px) rotate(0.8deg)', opacity: 0.9, offset: 0.85 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
      },
      {
        id: 'tile-3',
        duration: 10000,
        delay: 1000,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(1.25) translateX(-12px) translateY(18px) rotate(-1.8deg)', opacity: 0.95, offset: 0.2 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0.4 },
          { transform: 'scale(0.85) translateX(22px) translateY(-15px) rotate(2.2deg)', opacity: 0.75, offset: 0.7 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      },
      {
        id: 'tile-4',
        duration: 18000,
        delay: 3500,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(1.35) translateX(30px) translateY(-25px) rotate(3deg)', opacity: 1.0, offset: 0.15 },
          { transform: 'scale(0.9) translateX(-25px) translateY(20px) rotate(-2.8deg)', opacity: 0.8, offset: 0.45 },
          { transform: 'scale(1.15) translateX(12px) translateY(-8px) rotate(1.2deg)', opacity: 0.9, offset: 0.75 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      {
        id: 'tile-5',
        duration: 14000,
        delay: 1500,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(0.82) translateX(-15px) translateY(-18px) rotate(-1.5deg)', opacity: 0.7, offset: 0.35 },
          { transform: 'scale(1.28) translateX(20px) translateY(15px) rotate(2.5deg)', opacity: 0.95, offset: 0.65 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)'
      },
      {
        id: 'tile-6',
        duration: 16000,
        delay: 4000,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(1.22) translateX(-28px) translateY(22px) rotate(-2.2deg)', opacity: 0.9, offset: 0.28 },
          { transform: 'scale(0.88) translateX(18px) translateY(-12px) rotate(1.8deg)', opacity: 0.75, offset: 0.55 },
          { transform: 'scale(1.4) translateX(-8px) translateY(5px) rotate(-0.8deg)', opacity: 1.0, offset: 0.82 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      {
        id: 'tile-7',
        duration: 11000,
        delay: 800,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(1.18) translateX(35px) translateY(-30px) rotate(2.8deg)', opacity: 0.95, offset: 0.22 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0.44 },
          { transform: 'scale(0.85) translateX(-22px) translateY(18px) rotate(-2.5deg)', opacity: 0.7, offset: 0.66 },
          { transform: 'scale(1.32) translateX(8px) translateY(-10px) rotate(1.2deg)', opacity: 1.0, offset: 0.88 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
      },
      {
        id: 'tile-8',
        duration: 13000,
        delay: 2800,
        patterns: [
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 0 },
          { transform: 'scale(0.8) translateX(-32px) translateY(-25px) rotate(-3deg)', opacity: 0.7, offset: 0.25 },
          { transform: 'scale(1.38) translateX(28px) translateY(20px) rotate(2.5deg)', opacity: 1.0, offset: 0.5 },
          { transform: 'scale(1.05) translateX(-12px) translateY(-8px) rotate(-1deg)', opacity: 0.9, offset: 0.75 },
          { transform: 'scale(1.0) translateX(0px) translateY(0px) rotate(0deg)', opacity: 0.85, offset: 1 }
        ],
        easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }
    ];
  }

  init() {
    this.container = document.querySelector('.video-mosaic-container');
    if (!this.container) {
      console.warn('Tile mosaic container not found');
      return;
    }

    this.tiles = Array.from(this.container.querySelectorAll('.video-tile'));
    
    if (this.tiles.length === 0) {
      console.warn('No tiles found');
      return;
    }

    console.log(`TileMosaicController initialized with ${this.tiles.length} tiles`);
    
    // Initialize all subsystems
    this.checkReducedMotionPreference();
    this.checkPerformanceMode();
    this.setupIntersectionObserver();
    this.setupPageVisibilityAPI();
    this.setupPerformanceMonitoring();
    this.setupErrorHandling();
    this.setupMobileOptimizations();
    this.resetTilesToInitialState();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isVisible) {
          console.log('Tile mosaic became visible - starting animations');
          this.isVisible = true;
          this.startAnimations();
        } else if (!entry.isIntersecting && this.isVisible) {
          console.log('Tile mosaic became hidden - pausing animations');
          this.isVisible = false;
          this.pauseAnimations();
        }
      });
    }, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });

    if (this.container) {
      this.observer.observe(this.container);
    }
  }

  setupPageVisibilityAPI() {
    document.addEventListener('visibilitychange', () => {
      this.isPageHidden = document.hidden;
      
      if (document.hidden) {
        console.log('Page hidden - pausing animations');
        this.pauseAnimations();
      } else if (this.isVisible && !this.isReducedMotion && !this.isPerformanceMode) {
        console.log('Page visible - resuming animations');
        this.resumeAnimations();
      }
    });
  }

  checkReducedMotionPreference() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = mediaQuery.matches;
    
    mediaQuery.addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      
      if (this.isReducedMotion) {
        console.log('Reduced motion detected - stopping animations');
        this.stopAnimations();
        document.documentElement.classList.add('reduced-motion');
      } else if (!this.isPerformanceMode && this.isVisible && !this.isPageHidden) {
        console.log('Reduced motion disabled - starting animations');
        document.documentElement.classList.remove('reduced-motion');
        this.startAnimations();
      }
    });
    
    if (this.isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  checkPerformanceMode() {
    // Check localStorage for user preference
    this.isPerformanceMode = localStorage.getItem('cova-performance-mode') === 'true';
    
    // Auto-detect low-end devices
    if (!this.isPerformanceMode) {
      const isLowEnd = this.detectLowEndDevice();
      if (isLowEnd) {
        this.isPerformanceMode = true;
        localStorage.setItem('cova-performance-mode', 'true');
        console.log('Low-end device detected - enabling performance mode');
      }
    }
    
    if (this.isPerformanceMode) {
      document.documentElement.classList.add('performance-mode');
      this.adjustPerformanceSettings();
    }
  }

  detectLowEndDevice() {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 0;
    
    // Check memory (if available)
    const memory = navigator.deviceMemory || 0;
    
    // Check connection type
    const connection = navigator.connection;
    const isSlowConnection = connection && 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' || 
       connection.effectiveType === '3g');
    
    return cores <= 2 || memory <= 2 || isSlowConnection;
  }

  adjustPerformanceSettings() {
    // Increase animation durations for smoother performance
    this.animationConfigs.forEach(config => {
      config.duration *= 1.5;
    });
  }








  setupPerformanceMonitoring() {
    // Monitor memory usage if available
    if ('memory' in performance) {
      this.performanceMonitoringInterval = setInterval(() => {
        const memory = performance.memory;
        this.memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize
        };
        
        // If memory usage is too high, enable performance mode
        if (memory.usedJSHeapSize > this.memoryThreshold && !this.isPerformanceMode) {
          console.log('High memory usage detected - enabling performance mode');
          this.enablePerformanceMode();
        }
      }, 5000); // Check every 5 seconds
    }
  }

  setupErrorHandling() {
    // Store bound function for later removal
    this.handleUnhandledRejection = (event) => {
      if (event.reason && event.reason.message && 
          event.reason.message.includes('Animation')) {
        console.warn('WAAPI error caught:', event.reason);
        event.preventDefault();
        
        // Try to recover by restarting animations
        this.restartAnimationsWithDelay();
      }
    };
    
    // Global error handler for WAAPI
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    if (isMobile || isTouch) {
      console.log('Mobile device detected - applying optimizations');
      
      // Adjust CSS custom properties for mobile
      document.documentElement.style.setProperty('--tile-opacity-mobile', '0.6');
      document.documentElement.style.setProperty('--grain-opacity-mobile', '0.08');
      document.documentElement.style.setProperty('--vignette-opacity-mobile', '0.55');
      
      // Reduce animation complexity on mobile
      this.animationConfigs.forEach(config => {
        config.patterns = config.patterns.filter((_, index) => index % 2 === 0); // Keep every other keyframe
        config.duration *= 1.2; // Slower animations
      });
    }
  }

  restartAnimationsWithDelay() {
    this.stopAnimations();
    setTimeout(() => {
      if (this.isVisible && !this.isPageHidden && !this.isReducedMotion) {
        this.startAnimations();
      }
    }, 2000);
  }

  enablePerformanceMode() {
    this.isPerformanceMode = true;
    localStorage.setItem('cova-performance-mode', 'true');
    document.documentElement.classList.add('performance-mode');
    this.adjustPerformanceSettings();
    
    if (this.animations.length > 0) {
      this.stopAnimations();
      this.startAnimations(); // Restart with new settings
    }
  }

  disablePerformanceMode() {
    this.isPerformanceMode = false;
    localStorage.setItem('cova-performance-mode', 'false');
    document.documentElement.classList.remove('performance-mode');
    
    // Reset animation durations
    this.animationConfigs.forEach(config => {
      config.duration = config.originalDuration || config.duration / 1.5;
    });
    
    if (this.isVisible && !this.isPageHidden && !this.isReducedMotion) {
      this.restart();
    }
  }

  resetTilesToInitialState() {
    this.tiles.forEach((tile, index) => {
      const config = this.animationConfigs[index];
      if (config) {
        const initialState = config.patterns[0];
        tile.style.transform = initialState.transform;
        tile.style.opacity = initialState.opacity;
        tile.style.transformOrigin = 'center center';
        tile.style.willChange = 'transform, opacity';
      }
    });
  }

  createTileAnimation(tile, config) {
    const keyframes = config.patterns.map(pattern => ({
      transform: pattern.transform,
      opacity: pattern.opacity,
      offset: pattern.offset
    }));

    const animationOptions = {
      duration: config.duration,
      delay: config.delay,
      easing: config.easing,
      iterations: Infinity,
      fill: 'both'
    };

    return tile.animate(keyframes, animationOptions);
  }

  startAnimations() {
    if (this.isPaused) return;

    this.stopAnimations(); // Clear any existing animations

    this.animations = this.tiles.map((tile, index) => {
      const config = this.animationConfigs[index];
      if (config) {
        console.log(`Starting animation for ${config.id} with duration ${config.duration}ms`);
        return this.createTileAnimation(tile, config);
      }
      return null;
    }).filter(Boolean);

    console.log(`Started ${this.animations.length} coordinated tile animations`);
  }

  stopAnimations() {
    this.animations.forEach(animation => {
      if (animation) {
        animation.cancel();
      }
    });
    this.animations = [];
  }

  pauseAnimations() {
    this.isPaused = true;
    this.animations.forEach(animation => {
      if (animation && animation.playState === 'running') {
        animation.pause();
      }
    });
  }

  resumeAnimations() {
    if (!this.isVisible) return;
    
    this.isPaused = false;
    this.animations.forEach(animation => {
      if (animation && animation.playState === 'paused') {
        animation.play();
      }
    });
  }

  // Public control methods
  pause() {
    this.pauseAnimations();
  }

  resume() {
    this.resumeAnimations();
  }

  restart() {
    this.stopAnimations();
    this.resetTilesToInitialState();
    if (this.isVisible && !this.isPaused) {
      setTimeout(() => this.startAnimations(), 100);
    }
  }

  // Enhanced cleanup with complete memory management
  destroy() {
    console.log('TileMosaicController: Starting complete cleanup');
    
    // Stop all animations first
    this.stopAnimations();
    
    // Disconnect all observers
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    // Clean up performance monitoring
    if (this.performanceMonitoringInterval) {
      clearInterval(this.performanceMonitoringInterval);
      this.performanceMonitoringInterval = null;
    }
    
    // Remove global error handler
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    
    // Clear CSS classes
    document.documentElement.classList.remove(
      'reduced-motion', 
      'performance-mode'
    );
    
    // Reset arrays and state
    this.tiles = [];
    this.animations = [];
    this.isVisible = false;
    this.isPaused = false;
    this.isPageHidden = false;
    this.container = null;
    
    console.log('TileMosaicController: Complete cleanup finished');
  }

  // Public API methods for external control
  getStatus() {
    return {
      isVisible: this.isVisible,
      isPaused: this.isPaused,
      isPageHidden: this.isPageHidden,
      isReducedMotion: this.isReducedMotion,
      isPerformanceMode: this.isPerformanceMode,
      tileCount: this.tiles.length,
      activeAnimations: this.animations.length,
      memoryUsage: this.memoryUsage
    };
  }

  // Toggle performance mode externally
  togglePerformanceMode() {
    if (this.isPerformanceMode) {
      this.disablePerformanceMode();
    } else {
      this.enablePerformanceMode();
    }
    
    // Update UI toggle button if exists
    this.updatePerformanceToggleUI();
  }

  updatePerformanceToggleUI() {
    const toggleBtn = document.getElementById('performance-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('.toggle-icon');
      const text = toggleBtn.querySelector('.toggle-text');
      
      if (this.isPerformanceMode) {
        toggleBtn.classList.add('active');
        if (icon) icon.textContent = '⚡';
        if (text) text.textContent = '고성능 모드';
        toggleBtn.setAttribute('aria-label', '고성능 모드 비활성화');
      } else {
        toggleBtn.classList.remove('active');
        if (icon) icon.textContent = '🎬';
        if (text) text.textContent = '영상 효과';
        toggleBtn.setAttribute('aria-label', '고성능 모드 활성화');
      }
    }
  }
}

// Mount all
document.addEventListener("DOMContentLoaded", ()=>{
  // Initialize COVA loading screen first
  initSimpleCovaLoader(); // 새로운 단순 로딩 스크린
  
  // Initialize dynamic text effects after a short delay
  setTimeout(() => {
    initDynamicTextEffects();
  }, 300);
  
  // Initialize other features after loading
  setTimeout(() => {
    renderPhilosophy();

    // G1 and G2 sections replaced with horizontal portfolio
    // Portfolio content is now displayed in HTML with static structure

    // Kick-Off tables
    renderTable("#kickG1", COVA_DATA.kickoff.g1);
    renderTable("#kickG2", COVA_DATA.kickoff.g2);

    // Step-Zero section removed

    // KPI
    renderList("#kpiCommon", COVA_DATA.kpi.common);
    renderList("#kpiG2", COVA_DATA.kpi.g2);

    // FAQ
    renderFAQ();

    initNav();
    initTheme();
    initSectionProgress();
    initActiveNavigation();
    initSmoothScrolling();
    initCardEffects();
    initParallaxText();
    initCounterAnimation();
    initTypingEffect();
    initMomentumAnimations();
    initCarousel();
    
    // Initialize WAAPI Tile Mosaic Controller
    window.tileMosaicController = new TileMosaicController();
    window.tileMosaicController.init();
    console.log('TileMosaicController initialized and ready');
    
    // Set up performance toggle event listener
    const performanceToggle = document.getElementById('performance-toggle');
    if (performanceToggle) {
      performanceToggle.addEventListener('click', () => {
        if (window.tileMosaicController) {
          window.tileMosaicController.togglePerformanceMode();
          
          // Provide user feedback
          const status = window.tileMosaicController.getStatus();
          console.log('Performance mode toggled:', status.isPerformanceMode ? 'ON' : 'OFF');
        }
      });
      
      // Initial UI update
      if (window.tileMosaicController) {
        window.tileMosaicController.updatePerformanceToggleUI();
      }
    }
    
  }, 100);
  
  // Cleanup on page unload for memory management
  window.addEventListener('beforeunload', () => {
    if (window.tileMosaicController) {
      console.log('Page unloading - cleaning up TileMosaicController');
      window.tileMosaicController.destroy();
    }
  });
  
  // Handle page visibility changes globally
  document.addEventListener('visibilitychange', () => {
    if (window.tileMosaicController) {
      const status = window.tileMosaicController.getStatus();
      console.log('Page visibility changed:', document.hidden ? 'HIDDEN' : 'VISIBLE', 
                  '- Performance mode:', status.isPerformanceMode, 
                  '- Reduced motion:', status.isReducedMotion);
    }
  });
});

// Carousel functionality for program cards
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = 4; // 4 program cards
  
  // Update carousel position
  function updateCarousel() {
    const cardWidth = 460; // Card width in pixels
    const gap = 16; // Space between cards (var(--space-4) = 16px)
    const slideDistance = cardWidth + gap;
    const translateX = -(currentSlide * slideDistance);
    track.style.transform = `translateX(${translateX}px)`;
    
    // Update navigation buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Go to specific slide
  function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      currentSlide = slideIndex;
      updateCarousel();
    }
  }
  
  // Previous slide
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  }
  
  // Next slide
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Touch/swipe support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });
  
  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    
    const deltaX = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        nextSlide(); // Swipe left (next)
      } else {
        prevSlide(); // Swipe right (previous)
      }
    }
  }, { passive: true });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Initialize carousel
  updateCarousel();
  
  console.log('Program carousel initialized with', totalSlides, 'slides');
}

// ===================================
// Modal v2 System - CSS-only Layout
// ===================================
class CovaModal2 {
  constructor() {
    this.modal = document.getElementById('covaModal2');
    this.overlay = this.modal.querySelector('.cova-modal2-overlay');
    this.closeBtn = this.modal.querySelector('.modal2-close');
    this.title = document.getElementById('modal2Title');
    this.description = document.getElementById('modal2Description');
    this.video = document.getElementById('modal2Video');
    this.videoSource = document.getElementById('modal2VideoSource');
    this.keyMomentsContainer = document.getElementById('modal2KeyMoments');
    
    this.currentProgram = null;
    this.init();
  }
  
  init() {
    // Close modal events
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
        this.close();
      }
    });
    
    // Connect to program cards
    document.querySelectorAll('.program-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const program = card.dataset.program;
        this.open(program);
      });
    });
    
    console.log('CovaModal2 initialized');
  }
  
  open(programId) {
    console.log('Opening Modal v2 for program:', programId);
    
    // Get program data
    const programData = this.getProgramData(programId);
    this.currentProgram = programId;
    
    // Apply special layout for all programs (Modal v2)
    const useSpecialLayout = true;
    
    if (useSpecialLayout) {
      // Apply special layout for all programs
      this.modal.classList.add('kickoff-layout');
      console.log('Applied special layout for program:', programId);
    } else {
      // Remove special layout (fallback)
      this.modal.classList.remove('kickoff-layout');
    }
    
    // Update basic content
    this.title.textContent = programData.title;
    // Skip description for special layout (all programs)
    if (!useSpecialLayout) {
      this.description.textContent = programData.description;
    }
    
    // Set video source
    const videoSrc = programData.videoSrc || window.COVA_DATA?.kickoff?.videoSrc || 'attached_assets/남성_강사의_스케치_수업_1758107827768.mp4';
    this.videoSource.src = videoSrc;
    this.video.load();
    
    // Handle program-specific content setup
    if (useSpecialLayout) {
      this.setupProgramContent(programId);
    } else {
      this.hideSpecialContent();
    }
    
    // Load key moments
    this.loadKeyMoments(programData.keyMoments || window.COVA_DATA?.kickoff?.keyMoments || []);
    
    // Show modal
    this.modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    
    // Connect KeyMomentsController to new modal
    if (window.keyMomentsController) {
      window.keyMomentsController.connectToModal2(this.video, programData.keyMoments || []);
    }
    
    console.log('Modal v2 opened successfully for:', programId);
  }
  
  close() {
    console.log('Closing Modal v2');
    
    this.modal.classList.remove('is-open');
    this.modal.classList.remove('kickoff-layout'); // Remove special layout
    document.body.classList.remove('modal-open');
    
    // Pause video
    this.video.pause();
    
    // Hide special content
    this.hideSpecialContent();
    
    // Disconnect KeyMomentsController
    if (window.keyMomentsController) {
      window.keyMomentsController.disconnectFromModal2();
    }
    
    this.currentProgram = null;
  }
  
  setupProgramContent(programId) {
    console.log('Setting up program content for:', programId);
    
    switch(programId) {
      case 'kickoff':
        this.setupKickoffContent();
        break;
      case 'stepzero':
        this.setupStepZeroContent();
        break;
      case 'grade1':
        this.setupGrade1Content();
        break;
      case 'grade2':
        this.setupGrade2Content();
        break;
      default:
        // Fallback to kickoff setup for unknown programs
        this.setupKickoffContent();
    }
  }

  setupKickoffContent() {
    console.log('Setting up kickoff-specific content v2');
    
    const kickoffData = window.COVA_DATA?.kickoff;
    if (!kickoffData) {
      console.warn('Kickoff data not found');
      return;
    }
    
    // 0. Setup video autoplay (inline)
    if (this.video) {
      try {
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.loop = true;
        this.video.controls = false;
        this.video.disablePictureInPicture = true;
        
        // Apply ambient effects for background feel
        this.applyCinematicEffects('ambient');
        
        const playPromise = this.video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Kickoff video autoplay started successfully');
            })
            .catch(error => {
              console.warn('Kickoff video autoplay failed:', error);
            });
        }
      } catch (error) {
        console.warn('Kickoff video autoplay setup failed:', error);
      }
    }
    
    // Video header removed for kickoff layout
    // this.setupVideoHeader(kickoffData);
    
    // 2. Setup Key Moment Markers
    this.setupKeyMomentMarkers(kickoffData);
    
    // 3. Setup Image Section with Info
    this.setupImageSection(kickoffData);
    
    // 4. Core Concept Visualization removed (3 icons eliminated)
    
    // 5. Setup Tabbed Content
    this.setupTabbedContent(kickoffData);
    
    // 6. Initialize Tab Navigation
    this.initializeTabNavigation();
    
    console.log('Kickoff content setup completed');
  }

  setupStepZeroContent() {
    console.log('Setting up Grade-Junior content v2');
    
    const stepZeroData = this.getProgramData('stepzero');
    if (!stepZeroData) {
      console.warn('Grade-Junior data not found');
      return;
    }
    
    // Setup video with ambient effects
    this.setupVideoForProgram(stepZeroData, 'Grade-Junior');
    
    // Setup Key Moment Markers (using kickoff keyMoments as fallback)
    this.setupKeyMomentMarkers(stepZeroData);
    
    // Setup Image Section with shared thumbnails
    this.setupImageSection(stepZeroData);
    
    // Setup Tabbed Content
    this.setupTabbedContent(stepZeroData);
    
    // Initialize Tab Navigation
    this.initializeTabNavigation();
    
    console.log('Grade-Junior content setup completed');
  }

  setupGrade1Content() {
    console.log('Setting up grade1 content v2');
    
    const grade1Data = this.getProgramData('grade1');
    if (!grade1Data) {
      console.warn('Grade1 data not found');
      return;
    }
    
    // Setup video with ambient effects
    this.setupVideoForProgram(grade1Data, 'Grade1');
    
    // Setup Key Moment Markers (using kickoff keyMoments as fallback)
    this.setupKeyMomentMarkers(grade1Data);
    
    // Setup Image Section with shared thumbnails
    this.setupImageSection(grade1Data);
    
    // Setup Tabbed Content
    this.setupTabbedContent(grade1Data);
    
    // Initialize Tab Navigation
    this.initializeTabNavigation();
    
    console.log('Grade1 content setup completed');
  }

  setupGrade2Content() {
    console.log('Setting up grade2 content v2');
    
    const grade2Data = this.getProgramData('grade2');
    if (!grade2Data) {
      console.warn('Grade2 data not found');
      return;
    }
    
    // Setup video with ambient effects
    this.setupVideoForProgram(grade2Data, 'Grade2');
    
    // Setup Key Moment Markers (using kickoff keyMoments as fallback)
    this.setupKeyMomentMarkers(grade2Data);
    
    // Setup Image Section with shared thumbnails
    this.setupImageSection(grade2Data);
    
    // Setup Tabbed Content
    this.setupTabbedContent(grade2Data);
    
    // Initialize Tab Navigation
    this.initializeTabNavigation();
    
    console.log('Grade2 content setup completed');
  }

  setupVideoForProgram(programData, programName) {
    if (this.video) {
      try {
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.loop = true;
        this.video.controls = false;
        this.video.disablePictureInPicture = true;
        
        // Apply ambient effects for background feel
        this.applyCinematicEffects('ambient');
        
        const playPromise = this.video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`${programName} video autoplay started successfully`);
            })
            .catch(error => {
              console.warn(`${programName} video autoplay failed:`, error);
            });
        }
      } catch (error) {
        console.warn(`${programName} video autoplay setup failed:`, error);
      }
    }
  }

  applyCinematicEffects(mode = 'cinematic') {
    if (!this.video || !this.video.parentElement) return;
    
    // Add appropriate class to video
    if (mode === 'ambient') {
      this.video.classList.add('ambient');
      this.video.playbackRate = 0.92; // Slightly slower for ambient feel
    } else {
      this.video.classList.add('cinematic');
    }
    
    // Check if already wrapped
    if (this.video.parentElement.classList.contains('cinematic-wrap')) {
      return;
    }
    
    // Create cinematic wrapper
    const cinematicWrap = document.createElement('div');
    cinematicWrap.className = `cinematic-wrap ${mode === 'ambient' ? 'ambient' : ''}`;
    
    // Insert wrapper before video and move video inside
    this.video.parentElement.insertBefore(cinematicWrap, this.video);
    cinematicWrap.appendChild(this.video);
    
    // Create grain overlay
    const grainOverlay = document.createElement('div');
    grainOverlay.className = 'grain';
    cinematicWrap.appendChild(grainOverlay);
    
    // Create bloom overlay
    const bloomOverlay = document.createElement('div');
    bloomOverlay.className = 'bloom';
    cinematicWrap.appendChild(bloomOverlay);
    
    // Add ambient overlay for background feel
    if (mode === 'ambient') {
      const ambientOverlay = document.createElement('div');
      ambientOverlay.className = 'ambient-overlay';
      cinematicWrap.appendChild(ambientOverlay);
    }
    
    console.log(`${mode} effects applied to video`);
  }

  setupVideoHeader(kickoffData) {
    const videoHeader = document.getElementById('modal2VideoHeader');
    const videoTitle = document.getElementById('modal2VideoTitle');
    const videoDesc = document.getElementById('modal2VideoDesc');
    const videoDuration = document.getElementById('modal2VideoDuration');
    
    if (videoHeader && videoTitle && videoDesc && videoDuration) {
      videoHeader.style.display = 'block';
      videoHeader.setAttribute('data-testid', 'video-header');
      
      videoTitle.textContent = kickoffData.videoTitle || '킥오프 수업 영상';
      videoTitle.setAttribute('data-testid', 'video-title');
      
      videoDesc.textContent = kickoffData.videoDescription || '킥오프 수업의 실제 진행 모습을 확인하세요';
      videoDesc.setAttribute('data-testid', 'video-description');
      
      videoDuration.textContent = kickoffData.videoDuration || '4:08';
      videoDuration.setAttribute('data-testid', 'video-duration');
    }
  }
  
  setupKeyMomentMarkers(kickoffData) {
    const markersContainer = document.getElementById('modal2KeymomentMarkers');
    if (!markersContainer || !kickoffData.keyMoments) return;
    
    markersContainer.style.display = 'block';
    markersContainer.innerHTML = '';
    
    // Wait for video metadata to be loaded for accurate duration
    const setupMarkers = (videoDuration) => {
      kickoffData.keyMoments.forEach((km, index) => {
        const marker = document.createElement('div');
        marker.className = 'keymoment-marker';
        marker.style.left = `${(km.t / videoDuration) * 100}%`;
        marker.title = `${km.title} (${this.formatTime(km.t)})`;
        marker.setAttribute('data-time', km.t);
        marker.setAttribute('data-title', km.title);
        marker.setAttribute('data-testid', `marker-${km.id || index}`);
        
        marker.addEventListener('click', () => {
          if (this.video) {
            this.video.currentTime = km.t;
            this.video.play();
          }
        });
        
        markersContainer.appendChild(marker);
      });
    };
    
    // Check if video metadata is already loaded
    if (this.video && this.video.duration && !isNaN(this.video.duration)) {
      setupMarkers(this.video.duration);
    } else if (this.video) {
      // Wait for loadedmetadata event
      const handleLoadedMetadata = () => {
        if (this.video.duration && !isNaN(this.video.duration)) {
          setupMarkers(this.video.duration);
        } else {
          // Fallback to estimated duration if video duration is unavailable
          const estimatedDuration = Math.max(...kickoffData.keyMoments.map(km => km.t)) + 10;
          setupMarkers(estimatedDuration);
        }
        this.video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
      
      this.video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Fallback timeout in case metadata doesn't load
      setTimeout(() => {
        if (markersContainer.children.length === 0) {
          const estimatedDuration = Math.max(...kickoffData.keyMoments.map(km => km.t)) + 10;
          setupMarkers(estimatedDuration);
        }
      }, 2000);
    } else {
      // Fallback to estimated duration if video is not available
      const estimatedDuration = Math.max(...kickoffData.keyMoments.map(km => km.t)) + 10;
      setupMarkers(estimatedDuration);
    }
  }
  
  setupImageSection(kickoffData) {
    const imageSection = document.getElementById('modal2ImageSection');
    
    if (imageSection) {
      imageSection.style.display = 'flex';
      imageSection.setAttribute('data-testid', 'image-section');
      
      // Find the thumbnails grid and ensure all 6 thumbnails are visible
      const thumbnailsGrid = imageSection.querySelector('.modal2-thumbnails-grid');
      const thumbnailItems = thumbnailsGrid ? thumbnailsGrid.querySelectorAll('.thumbnail-item') : [];
      
      console.log(`Found ${thumbnailItems.length} thumbnail items`);
      
      // Make sure all thumbnails are displayed
      thumbnailItems.forEach((item, index) => {
        item.style.display = 'block';
        item.setAttribute('data-testid', `thumbnail-${index + 1}`);
      });
      
      if (thumbnailsGrid) {
        thumbnailsGrid.style.display = 'grid';
        console.log('Thumbnails grid activated with', thumbnailItems.length, 'items');
      }
    }
  }
  
  setupConceptVisualization() {
    const conceptVisual = document.getElementById('modal2ConceptVisual');
    if (conceptVisual) {
      conceptVisual.style.display = 'block';
      conceptVisual.setAttribute('data-testid', 'concept-visualization');
      
      // Add click interactions for concept icons
      const conceptIcons = conceptVisual.querySelectorAll('.concept-icon');
      conceptIcons.forEach((icon, index) => {
        icon.setAttribute('data-testid', `concept-icon-${icon.getAttribute('data-concept') || index}`);
        icon.addEventListener('click', () => {
          const concept = icon.getAttribute('data-concept');
          this.showConceptTooltip(icon, concept);
        });
      });
    }
  }
  
  showConceptTooltip(element, concept) {
    const tooltips = {
      'process': '결과보다 과정을 중시하며, 실패조차 학습 데이터로 활용합니다.',
      'language': '생각을 명확한 언어로 표현하여 개념을 구체화합니다.',
      'explore': '비교와 연결을 통해 새로운 관점과 통찰을 얻습니다.'
    };
    
    // Simple tooltip implementation
    const tooltip = document.createElement('div');
    tooltip.className = 'concept-tooltip';
    tooltip.textContent = tooltips[concept] || '';
    tooltip.style.cssText = `
      position: absolute;
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 8px;
      border-radius: 4px;
      font-size: var(--text-xs);
      max-width: 200px;
      z-index: 1000;
      box-shadow: var(--shadow);
    `;
    
    element.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 3000);
  }
  
  setupTabbedContent(kickoffData) {
    // Setup Overview Tab
    this.setupOverviewTab(kickoffData);
    
    // Setup Curriculum Tab
    this.setupCurriculumTab(kickoffData);
    
    // Setup Philosophy Tab
    this.setupPhilosophyTab(kickoffData);
    
    // Setup FAQ Tab
    this.setupFAQTab(kickoffData);
    
    // Show tabbed content
    const kickoffDetails = document.getElementById('modal2KickoffDetails');
    if (kickoffDetails) {
      kickoffDetails.style.display = 'block';
    }
  }
  
  setupOverviewTab(kickoffData) {
    // Goals
    const goalsElement = document.getElementById('kickoffGoals');
    if (goalsElement && kickoffData.goals) {
      const getIconSVG = (iconName) => {
        const icons = {
          'pencil': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
          'eye': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
          'target': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
          'lightbulb': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21h6"/><path d="M12 17v4"/><path d="M12 3a6 6 0 0 1 6 6c0 1.657-.672 3.157-1.757 4.243L15 15H9l-1.243-1.757A6 6 0 0 1 12 3Z"/></svg>'
        };
        return icons[iconName] || icons['lightbulb'];
      };

      const goalsHTML = `
        <div class="modal2-goals-grid">
          ${kickoffData.goals.map((goal, index) => `
            <div class="modal2-goal-card" data-testid="goal-card-${index}">
              <div class="modal2-goal-icon" data-testid="goal-icon-${goal.icon}">${getIconSVG(goal.icon)}</div>
              <div class="modal2-goal-content">
                <div class="modal2-goal-title" data-testid="goal-title-${index}">${goal.title}</div>
                <div class="modal2-goal-desc" data-testid="goal-desc-${index}">${goal.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      goalsElement.innerHTML = goalsHTML;
    }
    
    // Methodology
    const methodologyElement = document.getElementById('kickoffMethodology');
    if (methodologyElement && kickoffData.methodology) {
      const methodologyHTML = `
        <div class="modal2-methodology-timeline">
          ${kickoffData.methodology.map(method => `
            <div class="modal2-methodology-item">
              <div class="modal2-methodology-phase">${method.phase}</div>
              <div class="modal2-methodology-content">${method.content}</div>
              <div class="modal2-methodology-time">${method.time}</div>
              <div class="modal2-methodology-details">
                ${method.details.map(detail => `<span class="modal2-methodology-detail">${detail}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      methodologyElement.innerHTML = methodologyHTML;
    }
    
    // Expected Outcomes
    const outcomesElement = document.getElementById('kickoffOutcomes');
    if (outcomesElement && kickoffData.expectedOutcomes) {
      const outcomesHTML = `
        <div class="modal2-outcomes-list">
          ${kickoffData.expectedOutcomes.map(outcome => `
            <div class="modal2-outcome-item">
              <div class="modal2-outcome-text">${outcome}</div>
            </div>
          `).join('')}
        </div>
      `;
      outcomesElement.innerHTML = outcomesHTML;
    }
  }
  
  setupCurriculumTab(kickoffData) {
    // Main Curriculum
    const curriculumElement = document.getElementById('kickoffCurriculum');
    if (curriculumElement && kickoffData.curriculum) {
      const curriculumHTML = `
        <div class="modal2-curriculum-steps" data-testid="curriculum-steps">
          ${kickoffData.curriculum.map((item, index) => `
            <div class="modal2-curriculum-step" data-testid="curriculum-step-${index}">
              <div class="modal2-step-number" data-testid="step-number-${index}">${index + 1}</div>
              <div class="modal2-step-content" data-testid="step-content-${index}">${item.content}</div>
              <div class="modal2-step-time" data-testid="step-time-${index}">${item.time}</div>
            </div>
          `).join('')}
        </div>
      `;
      curriculumElement.innerHTML = curriculumHTML;
    }
    
    // G1 Preview
    const g1Preview = document.getElementById('kickoffG1Preview');
    if (g1Preview && kickoffData.g1) {
      const g1HTML = `
        <div class="modal2-curriculum-preview">
          ${kickoffData.g1.slice(0, 6).map(([week, question]) => `
            <div class="modal2-curriculum-item">
              <div class="modal2-curriculum-week">${week}</div>
              <div class="modal2-curriculum-question">${question}</div>
            </div>
          `).join('')}
        </div>
      `;
      g1Preview.innerHTML = g1HTML;
    }
    
    // G2 Preview
    const g2Preview = document.getElementById('kickoffG2Preview');
    if (g2Preview && kickoffData.g2) {
      const g2HTML = `
        <div class="modal2-curriculum-preview">
          ${kickoffData.g2.slice(0, 6).map(([week, question]) => `
            <div class="modal2-curriculum-item">
              <div class="modal2-curriculum-week">${week}</div>
              <div class="modal2-curriculum-question">${question}</div>
            </div>
          `).join('')}
        </div>
      `;
      g2Preview.innerHTML = g2HTML;
    }
  }
  
  setupPhilosophyTab(kickoffData) {
    // Core Philosophy
    const philosophyCore = document.getElementById('kickoffPhilosophyCore');
    if (philosophyCore && kickoffData.philosophy) {
      philosophyCore.textContent = kickoffData.philosophy.core;
    }
    
    // Philosophy Principles
    const philosophyPrinciples = document.getElementById('kickoffPhilosophyPrinciples');
    if (philosophyPrinciples && kickoffData.philosophy) {
      const principlesHTML = `
        <div class="modal2-outcomes-list">
          ${kickoffData.philosophy.principles.map(principle => `
            <div class="modal2-outcome-item">
              <div class="modal2-outcome-text">${principle}</div>
            </div>
          `).join('')}
        </div>
      `;
      philosophyPrinciples.innerHTML = principlesHTML;
    }
    
    // Philosophy Motto
    const philosophyMotto = document.getElementById('kickoffPhilosophyMotto');
    if (philosophyMotto && kickoffData.philosophy) {
      philosophyMotto.textContent = kickoffData.philosophy.motto;
    }
  }
  
  setupFAQTab(kickoffData) {
    const faqElement = document.getElementById('kickoffFAQ');
    if (faqElement && kickoffData.faq) {
      const faqHTML = `
        <div class="modal2-faq-list" data-testid="faq-list">
          ${kickoffData.faq.map((faq, index) => `
            <div class="modal2-faq-item" data-testid="faq-item-${index}">
              <div class="modal2-faq-question" data-testid="faq-question-${index}">${faq.q}</div>
              <div class="modal2-faq-answer" data-testid="faq-answer-${index}">${faq.a}</div>
            </div>
          `).join('')}
        </div>
      `;
      faqElement.innerHTML = faqHTML;
    }
  }
  
  initializeTabNavigation() {
    const tabNav = document.getElementById('modal2TabNav');
    if (!tabNav) return;
    
    tabNav.setAttribute('data-testid', 'tab-navigation');
    const tabButtons = tabNav.querySelectorAll('.modal2-tab-btn');
    const tabContents = document.querySelectorAll('.modal2-tab-content');
    
    tabButtons.forEach((button, index) => {
      const targetTab = button.getAttribute('data-tab') || `tab-${index}`;
      button.setAttribute('data-testid', `tab-button-${targetTab}`);
      
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(`tab-${targetTab}`);
        if (targetContent) {
          targetContent.classList.add('active');
          targetContent.setAttribute('data-testid', `tab-content-${targetTab}`);
        }
      });
    });
  }
  
  hideSpecialContent() {
    console.log('Hiding special content and resetting modal state');
    
    // Hide image section
    const imageSection = document.getElementById('modal2ImageSection');
    if (imageSection) {
      imageSection.style.display = 'none';
    }
    
    // Hide special details
    const specialDetails = document.getElementById('modal2KickoffDetails');
    if (specialDetails) {
      specialDetails.style.display = 'none';
    }
    
    // Hide video header section
    const videoHeader = document.getElementById('modal2VideoHeader');
    if (videoHeader) {
      videoHeader.style.display = 'none';
    }
    
    // Hide thumbnails grid
    const thumbnailsGrid = document.getElementById('modal2ThumbnailsGrid');
    if (thumbnailsGrid) {
      thumbnailsGrid.style.display = 'none';
      // Clear thumbnails content to prevent memory leaks
      thumbnailsGrid.innerHTML = '';
    }
    
    // Reset tab navigation to default state
    const tabNav = document.getElementById('modal2TabNavigation');
    if (tabNav) {
      const tabButtons = tabNav.querySelectorAll('.modal2-tab-btn');
      const tabContents = document.querySelectorAll('.modal2-tab-content');
      
      // Remove active states from all tabs
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        // Remove event listeners to prevent memory leaks
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
      });
      
      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      
      // Reset to default tab (first one) if exists
      const firstTab = tabNav.querySelector('.modal2-tab-btn');
      const firstContent = document.querySelector('.modal2-tab-content');
      if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
        firstContent.style.display = 'block';
      }
    }
    
    // Pause and reset video if exists
    if (this.video) {
      this.video.pause();
      this.video.currentTime = 0;
    }
    
    // Reset ambient video elements
    const ambientVideo = document.querySelector('.modal2-ambient-video');
    if (ambientVideo) {
      ambientVideo.pause();
      ambientVideo.currentTime = 0;
      ambientVideo.style.opacity = '0';
    }
    
    // Clear key moments container
    if (this.keyMomentsContainer) {
      this.keyMomentsContainer.innerHTML = '';
    }
    
    // Remove special layout classes from modal
    if (this.modal) {
      this.modal.classList.remove('kickoff-layout', 'grade1-layout', 'grade2-layout', 'stepzero-layout');
    }
    
    // Clear program-specific data
    this.currentProgramId = null;
    
    // Reset modal title and description to default
    const modalTitle = document.getElementById('modal2Title');
    const modalDescription = document.getElementById('modal2Description');
    if (modalTitle) modalTitle.textContent = '';
    if (modalDescription) modalDescription.textContent = '';
    
    // Hide goals, curriculum, philosophy, and FAQ sections
    const sectionsToHide = [
      'modal2Goals',
      'modal2Curriculum', 
      'modal2Philosophy',
      'modal2FAQ',
      'modal2Methodology'
    ];
    
    sectionsToHide.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.style.display = 'none';
        section.innerHTML = '';
      }
    });
    
    console.log('Special content hidden and modal state reset completely');
  }
  
  loadKeyMoments(keyMoments) {
    if (!keyMoments || keyMoments.length === 0) {
      this.keyMomentsContainer.innerHTML = '<p class="modal2-no-keymoments">이 프로그램에는 키 모먼트가 없습니다.</p>';
      return;
    }
    
    const keyMomentsHTML = keyMoments.map(km => `
      <div class="modal2-keymoment" data-time="${km.t}">
        <div class="modal2-keymoment-time">${this.formatTime(km.t)}</div>
        <div class="modal2-keymoment-title">${km.title}</div>
        <div class="modal2-keymoment-summary">${km.summary}</div>
      </div>
    `).join('');
    
    this.keyMomentsContainer.innerHTML = keyMomentsHTML;
    
    // Add click events for key moments
    this.keyMomentsContainer.querySelectorAll('.modal2-keymoment').forEach(item => {
      item.addEventListener('click', () => {
        const time = parseFloat(item.dataset.time);
        this.video.currentTime = time;
        this.video.play();
      });
    });
  }
  
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  getProgramData(program) {
    const programsMap = {
      'stepzero': {
        title: window.COVA_DATA?.stepZero?.title || 'GRADE-JUNIOR',
        description: window.COVA_DATA?.stepZero?.description || 'COVA 기초 준비 과정으로 미술 학습의 기본기를 탄탄히 다져줍니다.',
        videoSrc: window.COVA_DATA?.stepZero?.videoSrc || 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4',
        imageSrc: window.COVA_DATA?.stepZero?.imageSrc || window.COVA_DATA?.kickoff?.imageSrc || 'attached_assets/cocodio_Minimalist_abstract_sculptural_image_centered_on_the__caa1e2f2-e518-44ea-89d1-a98ba77a4b50_2_1757919225708.png',
        keyMoments: window.COVA_DATA?.stepZero?.keyMoments || [],
        goals: window.COVA_DATA?.stepZero?.goals || [],
        curriculum: window.COVA_DATA?.stepZero?.curriculum || [],
        philosophy: window.COVA_DATA?.stepZero?.philosophy || '',
        methodology: window.COVA_DATA?.stepZero?.methodology || [],
        faq: window.COVA_DATA?.stepZero?.faq || []
      },
      'grade1': {
        title: 'GRADE 1 기초소양',
        description: 'COVA 기초소양을 통한 탐구 중심 학습으로 고1 학생들의 미술적 사고력을 키워줍니다.',
        videoSrc: window.COVA_DATA?.kickoff?.videoSrc || 'attached_assets/남성_강사의_스케치_수업_1758107827768.mp4',
        imageSrc: window.COVA_DATA?.kickoff?.imageSrc || 'attached_assets/cocodio_Minimalist_abstract_sculptural_image_centered_on_the__caa1e2f2-e518-44ea-89d1-a98ba77a4b50_2_1757919225708.png',
        keyMoments: window.COVA_DATA?.kickoff?.keyMoments || [],
        goals: [
          { icon: "book", title: "기초 이론 학습", desc: "미술의 기본 개념과 원리 이해" },
          { icon: "palette", title: "표현 기법 습득", desc: "다양한 재료와 기법 실습" },
          { icon: "compass", title: "탐구 능력 개발", desc: "작품 분석과 비교 연구" },
          { icon: "target", title: "체계적 학습법", desc: "COVA 방법론 적용 연습" }
        ],
        curriculum: [
          { step: "기초", content: "드로잉과 색채의 기본 원리", time: "4주" },
          { step: "탐구", content: "작품 분석과 비교 연구", time: "4주" },
          { step: "실습", content: "개인 프로젝트 진행", time: "4주" },
          { step: "발표", content: "포트폴리오 제작과 발표", time: "2주" }
        ],
        philosophy: {
          core: "체계적인 기초 학습을 통해 미술적 사고력을 기르고 창의적 표현 능력을 개발합니다.",
          motto: "'기초가 탄탄한 학생'이 되는 것이 Grade 1의 목표입니다.",
          principles: [
            "체계적 학습: 단계별 커리큘럼으로 기초 실력 향상",
            "탐구 중심: 작품 분석을 통한 심화 학습",
            "개별 맞춤: 학생별 수준에 맞는 개별 지도"
          ]
        },
        methodology: [
          { phase: "Pre(준비)", time: "20분", content: "학습 목표 설정과 자료 준비", details: ["목표 설정", "자료 수집", "도구 준비"] },
          { phase: "Core(실습)", time: "100분", content: "체계적인 기법 학습과 실습", details: ["이론 학습", "기법 실습", "작품 제작"] },
          { phase: "Post(정리)", time: "20분", content: "결과 정리와 성찰", details: ["작품 정리", "학습 성찰", "다음 계획"] }
        ],
        faq: [
          { q: "Grade 1 과정의 난이도는 어떤가요?", a: "미술을 처음 시작하는 학생도 쉽게 따라올 수 있도록 기초부터 차근차근 진행합니다." },
          { q: "어떤 재료를 준비해야 하나요?", a: "기본적인 드로잉 도구(연필, 지우개, 스케치북)부터 시작하며, 필요한 재료는 단계별로 안내해 드립니다." }
        ]
      },
      'grade2': {
        title: 'GRADE 2 실기력 강화',
        description: 'COVA 방법론을 실전에 적용하여 고2 학생들의 실기 능력을 체계적으로 향상시킵니다.',
        videoSrc: window.COVA_DATA?.kickoff?.videoSrc || 'attached_assets/남성_강사의_스케치_수업_1758107827768.mp4',
        imageSrc: window.COVA_DATA?.kickoff?.imageSrc || 'attached_assets/cocodio_Minimalist_abstract_sculptural_image_centered_on_the__caa1e2f2-e518-44ea-89d1-a98ba77a4b50_2_1757919225708.png',
        keyMoments: window.COVA_DATA?.kickoff?.keyMoments || [],
        goals: [
          { icon: "trophy", title: "실기 능력 완성", desc: "입시 수준의 실기 실력 완성" },
          { icon: "clock", title: "시간 관리 능력", desc: "제한된 시간 내 작품 완성" },
          { icon: "eye", title: "작품 분석력", desc: "고급 작품 분석과 해석 능력" },
          { icon: "star", title: "개성 있는 표현", desc: "자신만의 독창적 표현 방식 개발" }
        ],
        curriculum: [
          { step: "심화", content: "고급 기법과 표현 방법", time: "3주" },
          { step: "응용", content: "다양한 주제와 재료 활용", time: "4주" },
          { step: "완성", content: "포트폴리오 제작", time: "4주" },
          { step: "마무리", content: "최종 점검과 보완", time: "3주" }
        ],
        philosophy: {
          core: "실전 경험을 통해 완성도 높은 작품을 제작하고 입시에 대비한 실기 능력을 완성합니다.",
          motto: "'실력 있는 예술가'로 성장하는 것이 Grade 2의 목표입니다.",
          principles: [
            "실전 중심: 입시와 실무에 직접 활용 가능한 실습",
            "완성도 추구: 작품의 질적 완성도 극대화",
            "개성 개발: 자신만의 독창적 스타일 확립"
          ]
        },
        methodology: [
          { phase: "Pre(기획)", time: "30분", content: "작품 기획과 전략 수립", details: ["주제 분석", "작품 기획", "전략 수립"] },
          { phase: "Core(제작)", time: "120분", content: "고급 기법을 활용한 작품 제작", details: ["기법 적용", "작품 제작", "완성도 관리"] },
          { phase: "Post(평가)", time: "30분", content: "작품 평가와 개선 방안 도출", details: ["작품 평가", "피드백", "개선 계획"] }
        ],
        faq: [
          { q: "Grade 2는 어떤 학생에게 적합한가요?", a: "기초 실력을 갖추고 본격적인 입시 준비를 하는 고2 학생들에게 적합합니다." },
          { q: "포트폴리오 제작도 도움받을 수 있나요?", a: "네, 개별 맞춤형 포트폴리오 제작 지도와 입시 전략 수립을 도와드립니다." }
        ]
      },
      'g1-foundation': {
        title: 'G1 기초소양 탐구',
        description: 'COVA 기초소양을 통한 탐구 중심 학습으로 고1 학생들의 미술적 사고력을 키워줍니다.',
        videoSrc: window.COVA_DATA?.kickoff?.videoSrc || 'attached_assets/남성_강사의_스케치_수업_1758107827768.mp4',
        keyMoments: window.COVA_DATA?.kickoff?.keyMoments || []
      },
      'g2-application': {
        title: 'G2 실기력 강화',
        description: 'COVA 방법론을 실전에 적용하여 고2 학생들의 실기 능력을 체계적으로 향상시킵니다.',
        videoSrc: window.COVA_DATA?.kickoff?.videoSrc || 'attached_assets/남성_강사의_스케치_수업_1758107827768.mp4',
        keyMoments: window.COVA_DATA?.kickoff?.keyMoments || []
      },
      'kickoff': {
        title: window.COVA_DATA?.kickoff?.title || 'COVA 킥오프 수업',
        description: window.COVA_DATA?.kickoff?.description || 'COVA 교육 시스템의 핵심 방법론을 소개하고 체험해보는 시작 수업입니다.',
        videoSrc: window.COVA_DATA?.kickoff?.videoSrc || 'attached_assets/남성_강사의_스케치_수업_1758107827768.mp4',
        imageSrc: window.COVA_DATA?.kickoff?.imageSrc || 'attached_assets/cocodio_Minimalist_abstract_sculptural_image_centered_on_the__caa1e2f2-e518-44ea-89d1-a98ba77a4b50_2_1757919225708.png',
        keyMoments: window.COVA_DATA?.kickoff?.keyMoments || [],
        goals: window.COVA_DATA?.kickoff?.goals || [],
        curriculum: window.COVA_DATA?.kickoff?.curriculum || [],
        philosophy: window.COVA_DATA?.kickoff?.philosophy || '',
        methodology: window.COVA_DATA?.kickoff?.methodology || [],
        faq: window.COVA_DATA?.kickoff?.faq || []
      }
    };
    
    return programsMap[program] || programsMap['kickoff'];
  }
}

// Global openModal2 function for external use
function openModal2({ programId, src, keyMoments }) {
  if (window.covaModal2) {
    // Override video source and key moments if provided
    if (src) {
      document.getElementById('modal2VideoSource').src = src;
      document.getElementById('modal2Video').load();
    }
    
    window.covaModal2.open(programId);
    
    if (keyMoments) {
      window.covaModal2.loadKeyMoments(keyMoments);
    }
  }
}

// Enhanced COVA Program Modal Controller - nagi Inspired
class ProgramModalController {
  constructor() {
    this.modal = document.getElementById('programModal');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalDescription = document.getElementById('modalDescription');
    this.modalDuration = document.getElementById('modalDuration');
    this.modalLevel = document.getElementById('modalLevel');
    this.modalClose = this.modal.querySelector('.modal-close-enhanced');
    this.modalOverlay = this.modal.querySelector('.modal-overlay-enhanced');
    
    // Debug: Check if close button is found
    console.log('Close button element found:', this.modalClose);
    if (this.modalClose) {
      console.log('Close button display style:', getComputedStyle(this.modalClose).display);
      console.log('Close button visibility:', getComputedStyle(this.modalClose).visibility);
      console.log('Close button position:', getComputedStyle(this.modalClose).position);
      console.log('Close button z-index:', getComputedStyle(this.modalClose).zIndex);
    } else {
      console.error('Close button not found! Available elements in modal:', this.modal.innerHTML);
    }
    
    // Tab elements
    this.tabs = this.modal.querySelectorAll('.modal-tab');
    this.tabIndicator = this.modal.querySelector('.modal-tab-indicator');
    this.panels = this.modal.querySelectorAll('.modal-panel');
    
    // Content containers
    this.overviewContent = document.getElementById('overviewContent');
    this.curriculumContent = document.getElementById('curriculumContent');
    this.processContent = document.getElementById('processContent');
    this.outcomesContent = document.getElementById('outcomesContent');
    
    // Stats elements
    this.statWeeks = document.getElementById('statWeeks');
    this.statSessions = document.getElementById('statSessions');
    this.statProjects = document.getElementById('statProjects');
    
    this.currentProgram = null;
    this.activeTab = 'overview';
    
    this.init();
  }
  
  init() {
    // Disable Enhanced modal controller if Modal v2 is enabled
    if (!window.USE_MODAL_V2) {
      // Add click event listeners to program cards
      document.querySelectorAll('.program-card').forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          const program = card.dataset.program;
          this.openModal(program);
        });
      });
    }
    
    // Close modal events
    this.modalClose.addEventListener('click', () => this.closeModal());
    this.modalOverlay.addEventListener('click', () => this.closeModal());
    
    // Emergency close button
    const emergencyClose = this.modal.querySelector('.modal-emergency-close');
    if (emergencyClose) {
      emergencyClose.addEventListener('click', () => this.closeModal());
      console.log('Emergency close button connected');
    } else {
      console.error('Emergency close button not found');
    }
    
    // Tab navigation
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = tab.dataset.tab;
        this.switchTab(tabName);
      });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
    
    // Initialize tab indicator position
    this.updateTabIndicator();
    
    console.log('Enhanced COVA Modal Controller initialized');
  }
  
  openModal(program) {
    console.log('Opening modal for program:', program);
    
    const programData = this.getProgramData(program);
    this.currentProgram = program;
    
    // Update hero content
    this.modalTitle.textContent = programData.title;
    this.modalDescription.textContent = programData.description;
    this.modalDuration.textContent = programData.duration;
    this.modalLevel.textContent = programData.level;
    
    // Update stats
    this.statWeeks.textContent = programData.stats.weeks;
    this.statSessions.textContent = programData.stats.sessions;
    this.statProjects.textContent = programData.stats.projects;
    
    // Load content for all tabs
    this.loadTabContent(programData);
    
    // Reset to overview tab
    this.switchTab('overview', false);
    
    // Special handling for ambient video per program
    this.setupAmbientVideoForProgram(program);
    
    // Show modal
    this.modal.classList.add('active');
    // Disable inline style for Modal v2
    if (!window.USE_MODAL_V2) {
      document.body.style.overflow = 'hidden';
    }
    
    // Start ambient video
    this.startAmbientVideo();
    
    // Activate KeyMomentsController
    if (window.keyMomentsController) {
      window.keyMomentsController.onModalShow();
    }
    
    console.log('Modal opened successfully');
  }
  
  closeModal() {
    console.log('Closing modal');
    
    this.modal.classList.remove('active');
    // Disable inline style for Modal v2
    if (!window.USE_MODAL_V2) {
      document.body.style.overflow = '';
    }
    
    // Pause ambient video
    this.pauseAmbientVideo();
    
    // Reset ambient video to default state
    this.resetAmbientVideo();
    
    // Deactivate KeyMomentsController
    if (window.keyMomentsController) {
      window.keyMomentsController.onModalHide();
    }
    
    // Reset current program
    this.currentProgram = null;
  }
  
  setupAmbientVideoForProgram(program) {
    const ambientVideo = this.modal.querySelector('.ambient-video');
    
    if (!ambientVideo || !ambientVideo.isConnected) {
      console.warn('Ambient video element not found or not connected');
      return;
    }

    // Ensure all required attributes are set correctly
    ambientVideo.muted = true;
    ambientVideo.playsInline = true;
    ambientVideo.autoplay = true;
    ambientVideo.loop = true;
    ambientVideo.preload = 'metadata';
    
    // Use COVA_DATA videoSrc instead of hardcoded paths
    const programData = window.COVA_DATA && window.COVA_DATA[program];
    const videoSrc = programData && programData.videoSrc 
      ? programData.videoSrc
      : 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4'; // fallback
    
    console.log(`Setting video source for ${program}:`, videoSrc);
    
    const sources = ambientVideo.querySelectorAll('source');
    if (sources.length > 0) {
      sources[0].src = videoSrc;
    } else {
      ambientVideo.src = videoSrc;
    }
    
    // Set up loadedmetadata event to pass key moments data to KeyMomentsController
    const onLoadedMetadata = () => {
      console.log('Video metadata loaded, passing key moments data');
      if (window.keyMomentsController && programData && programData.keyMoments) {
        window.keyMomentsController.setCurrentProgram(program, programData.keyMoments);
      }
      ambientVideo.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
    
    ambientVideo.addEventListener('loadedmetadata', onLoadedMetadata);
    
    // Force reload with new source
    ambientVideo.load();
  }
  
  resetAmbientVideo() {
    const ambientVideo = this.modal.querySelector('.ambient-video');
    if (ambientVideo) {
      // Reset to default video
      const sources = ambientVideo.querySelectorAll('source');
      if (sources.length > 0) {
        sources[0].src = 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4';
      } else {
        ambientVideo.src = 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4';
      }
      ambientVideo.load();
    }
  }
  
  switchTab(tabName, animate = true) {
    console.log('Switching to tab:', tabName);
    
    if (this.activeTab === tabName) return;
    
    // Update tab states
    this.tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      }
    });
    
    // Update panel states with animation
    this.panels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.dataset.panel === tabName) {
        if (animate) {
          // Small delay for smooth transition
          setTimeout(() => {
            panel.classList.add('active');
          }, 100);
        } else {
          panel.classList.add('active');
        }
      }
    });
    
    this.activeTab = tabName;
    this.updateTabIndicator();
  }
  
  updateTabIndicator() {
    if (!this.tabIndicator) return;
    
    const activeTab = this.modal.querySelector(`.modal-tab[data-tab="${this.activeTab}"]`);
    if (!activeTab) return;
    
    const tabsContainer = activeTab.parentElement;
    const tabRect = activeTab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();
    
    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;
    
    // Disable inline style for Modal v2
    if (!window.USE_MODAL_V2) {
      this.tabIndicator.style.left = left + 'px';
      this.tabIndicator.style.width = width + 'px';
    }
  }
  
  loadTabContent(programData) {
    // Load overview content
    this.overviewContent.innerHTML = programData.overview;
    
    // Load curriculum content
    this.curriculumContent.innerHTML = this.buildCurriculumTimeline(programData.curriculum);
    
    // Load process content  
    this.processContent.innerHTML = this.buildProcessVisualization(programData.process);
    
    // Load outcomes content
    this.outcomesContent.innerHTML = this.buildOutcomesGallery(programData.outcomes);
  }
  
  buildCurriculumTimeline(curriculum) {
    if (!curriculum || !curriculum.length) {
      return '<p class="text-secondary">커리큘럼 정보를 준비 중입니다.</p>';
    }
    
    return curriculum.map((item, index) => `
      <div class="curriculum-item" style="opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s forwards;">
        <div class="curriculum-week">
          <span class="week-number">${item.week}</span>
          <span class="week-label">주차</span>
        </div>
        <div class="curriculum-details">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          ${item.activities ? `<ul>${item.activities.map(activity => `<li>${activity}</li>`).join('')}</ul>` : ''}
        </div>
      </div>
    `).join('');
  }
  
  buildProcessVisualization(process) {
    if (!process || !process.length) {
      return '<p class="text-secondary">과정 정보를 준비 중입니다.</p>';
    }
    
    return process.map((step, index) => `
      <div class="process-card" style="opacity: 0; animation: fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s forwards;">
        <div class="process-icon">
          <span class="step-number">${index + 1}</span>
        </div>
        <div class="process-content">
          <h4>${step.title}</h4>
          <p>${step.description}</p>
          ${step.tools ? `<div class="process-tools">${step.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    `).join('');
  }
  
  buildOutcomesGallery(outcomes) {
    if (!outcomes || !outcomes.length) {
      return '<p class="text-secondary">성과 정보를 준비 중입니다.</p>';
    }
    
    return outcomes.map((outcome, index) => `
      <div class="outcome-card" style="opacity: 0; animation: fadeInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.12}s forwards;">
        <div class="outcome-image">
          <img src="${outcome.image}" alt="${outcome.title}" loading="lazy" />
        </div>
        <div class="outcome-info">
          <h4>${outcome.title}</h4>
          <p class="outcome-student">${outcome.student}</p>
          <p class="outcome-description">${outcome.description}</p>
        </div>
      </div>
    `).join('');
  }
  
  startAmbientVideo() {
    const ambientVideo = this.modal.querySelector('.ambient-video');
    
    if (!ambientVideo || !ambientVideo.isConnected || document.hidden) {
      return;
    }
    
    // Ensure all autoplay requirements are met
    ambientVideo.muted = true;
    ambientVideo.playsInline = true;
    
    // Start at random time for variety
    ambientVideo.currentTime = Math.random() * 5;
    
    // Attempt to play with proper error handling
    ambientVideo.play().catch(e => {
      // Silent fallback - show poster or static background
      console.warn('Ambient video autoplay blocked by browser policy');
      // Disable inline style for Modal v2
      if (!window.USE_MODAL_V2) {
        ambientVideo.style.opacity = '0.3';
      }
    });
  }
  
  pauseAmbientVideo() {
    const ambientVideo = this.modal.querySelector('.ambient-video');
    if (ambientVideo && ambientVideo.isConnected) {
      ambientVideo.pause();
    }
  }
  
  getProgramData(program) {
    const programData = {
      grade1: {
        title: 'GRADE-1 (조형원리)',
        description: '고1 학생들을 위한 기초 과정으로, 비주얼 저널, 입체적 비교, 언어화 훈련을 통해 탐구에서 완성으로 나아가는 단계입니다.',
        duration: '12개월',
        level: '기초',
        stats: {
          weeks: 48,
          sessions: 96,
          projects: 12
        },
        overview: `
          <h3>프로그램 개요</h3>
          <p>고1 학생들을 위한 기초 과정으로, 비주얼 저널, 입체적 비교, 언어화 훈련을 통해 탐구에서 완성으로 나아가는 단계입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>기초 조형 원리 이해와 적용</li>
            <li>시각적 사고력 개발</li>
            <li>창의적 문제 해결 능력 향상</li>
            <li>체계적 관찰과 분석 능력 배양</li>
          </ul>
          
          <h3>교육 특징</h3>
          <p>개인별 맞춤 교육으로 학생의 창의성과 기초 실력을 동시에 개발하며, 체계적인 포트폴리오 관리를 통해 성장 과정을 가시화합니다.</p>
        `,
        curriculum: [
          {
            week: 1,
            title: '기초 조형 요소',
            description: '점, 선, 면의 특성과 활용법을 학습하여 조형의 기본 원리를 이해합니다.',
            activities: ['기본 드로잉 연습', '조형 요소 실습', '관찰 일지 작성']
          },
          {
            week: 2,
            title: '비주얼 저널링',
            description: '일상 관찰과 기록을 통한 시각적 사고 훈련을 진행합니다.',
            activities: ['저널 제작', '관찰 기록법', '시각적 표현 연습']
          },
          {
            week: 3,
            title: '형태와 명암',
            description: '형태의 기본 구조와 명암을 통한 입체감 표현을 학습합니다.',
            activities: ['형태 분석', '명암 스케치', '질감 표현']
          },
          {
            week: 4,
            title: '구성 원리',
            description: '균형, 리듬, 강조, 통일의 구성 원리를 이해하고 적용합니다.',
            activities: ['구성 연습', '레이아웃 디자인', '작품 분석']
          }
        ],
        process: [
          {
            title: '관찰과 기록',
            description: '주변 환경을 세심하게 관찰하고 시각적으로 기록하는 능력을 개발합니다.',
            tools: ['스케치북', '연필', '색연필']
          },
          {
            title: '분석과 해석',
            description: '관찰한 내용을 분석하고 자신만의 관점으로 해석하는 과정을 학습합니다.',
            tools: ['비주얼 저널', '마인드맵', '분석 차트']
          },
          {
            title: '표현과 완성',
            description: '분석한 내용을 다양한 매체를 통해 창의적으로 표현하고 완성합니다.',
            tools: ['드로잉 도구', '페인트', '콜라주 재료']
          }
        ],
        outcomes: [
          {
            title: '기초 드로잉 포트폴리오',
            student: '김○○ 학생',
            description: '12개월간의 기초 드로잉 성장 과정',
            image: 'attached_assets/그림_그리는_여자_초_동영상_1757853306736.mp4'
          },
          {
            title: '창의적 표현 작품집',
            student: '이○○ 학생',
            description: '개인적 해석이 돋보이는 창작 작품들',
            image: 'attached_assets/집중해서_그림_그리는_사람_초_영상_1757853306735.mp4'
          }
        ]
      },
      grade2: {
        title: 'GRADE-2 (전공학별 핵심원리)',
        description: '고2 학생들을 위한 심화 과정으로, 사고와 실기의 균형을 유지하며 보완과 실전 경험을 통해 탐구를 완성으로 확장하는 전환 단계입니다.',
        duration: '12개월',
        level: '심화',
        stats: {
          weeks: 48,
          sessions: 144,
          projects: 18
        },
        overview: `
          <h3>프로그램 개요</h3>
          <p>고2 학생들을 위한 심화 과정으로, 전공별 특화된 표현 기법과 포트폴리오 완성에 중점을 둔 입시 준비 과정입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>전공별 특화된 표현 기법 습득</li>
            <li>개인 포트폴리오 완성</li>
            <li>대학 입시 준비와 실전 대응력 향상</li>
            <li>창작 과정에서의 비판적 사고 개발</li>
          </ul>
          
          <h3>특화 교육</h3>
          <p>각 전공별 맞춤 커리큘럼과 대학별 입시 전략을 통해 체계적인 실기 실력 향상과 포트폴리오 완성을 지원합니다.</p>
        `,
        curriculum: [
          {
            week: 1,
            title: '전공 선택과 분석',
            description: '개인 성향과 목표 대학에 맞는 전공을 선택하고 심층 분석합니다.',
            activities: ['적성 검사', '전공별 특성 분석', '대학 정보 수집']
          },
          {
            week: 8,
            title: '회화 전공 심화',
            description: '유화, 수채화, 아크릴 등 다양한 매체를 통한 회화 기법을 마스터합니다.',
            activities: ['매체별 기법 연습', '작품 제작', '크리틱 세션']
          },
          {
            week: 16,
            title: '포트폴리오 기획',
            description: '개인 작품집의 전체적인 구성과 방향성을 설정합니다.',
            activities: ['작품 선별', '구성 계획', '테마 설정']
          },
          {
            week: 24,
            title: '실전 모의고사',
            description: '실제 입시와 동일한 조건에서 모의 실기 시험을 진행합니다.',
            activities: ['시간 제한 실습', '결과 분석', '개선 방안 도출']
          }
        ],
        process: [
          {
            title: '기초 실력 진단',
            description: '현재 실력을 정확히 파악하고 개선 방향을 설정합니다.',
            tools: ['실력 평가지', '분석 차트', '개선 계획서']
          },
          {
            title: '전공별 특화 훈련',
            description: '선택한 전공에 맞는 특화된 기법과 표현 방법을 집중 훈련합니다.',
            tools: ['전공별 도구', '기법 매뉴얼', '참고 작품집']
          },
          {
            title: '포트폴리오 완성',
            description: '개인의 창작 철학과 기법이 담긴 완성도 높은 포트폴리오를 제작합니다.',
            tools: ['작품집', '프레젠테이션', '디지털 포트폴리오']
          }
        ],
        outcomes: [
          {
            title: '입시 포트폴리오',
            student: '박○○ 학생',
            description: '서울대 회화과 합격 포트폴리오',
            image: 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4'
          },
          {
            title: '전공별 작품집',
            student: '최○○ 학생',
            description: '홍익대 시각디자인과 합격 작품',
            image: 'attached_assets/그림_그리는_여자_초_동영상_1757853306736.mp4'
          }
        ]
      },
      kickoff: {
        title: 'KICK-OFF (창의적 질문)',
        description: '주차별 창의적 질문으로 자아와 환경 탐구의 시작점을 제공하는 12주 특별 프로그램입니다.',
        duration: '12주',
        level: '입문',
        stats: {
          weeks: 12,
          sessions: 24,
          projects: 12
        },
        overview: `
          <h3>프로그램 개요</h3>
          <p>창의적 질문을 통해 사고의 확장과 자아 탐구를 시작하는 특별한 12주 프로그램입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>창의적 사고의 출발점 마련</li>
            <li>자기 탐구와 환경 인식 능력 개발</li>
            <li>질문을 통한 문제 발견 능력 향상</li>
            <li>시각적 표현을 통한 아이디어 구체화</li>
          </ul>
          
          <h3>프로그램 특징</h3>
          <p>매주 새로운 질문과 함께 다양한 표현 방법을 통해 자신만의 관점을 발견하고 표현하는 능력을 개발합니다.</p>
        `,
        curriculum: [
          { week: 1, title: '나는 누구인가?', description: '자아 정체성 탐구와 시각적 표현', activities: ['자화상 그리기', '정체성 맵 작성', '개인 스토리 시각화'] },
          { week: 4, title: '소통의 방법들', description: '다양한 의사소통 방식 탐구', activities: ['비언어적 표현', '상징과 기호', '감정 전달법'] },
          { week: 8, title: '과거, 현재, 미래', description: '시간의 연속성과 변화 인식', activities: ['타임라인 제작', '미래 상상하기', '변화 기록'] },
          { week: 12, title: '새로운 시작', description: '성장 과정 정리와 미래 계획', activities: ['성장 포트폴리오', '미래 비전', '개인 전시 준비'] }
        ],
        process: [
          { title: '질문 생성', description: '창의적 사고를 자극하는 핵심 질문을 만들어냅니다.', tools: ['질문 생성기', '브레인스토밍', '마인드맵'] },
          { title: '탐구와 관찰', description: '질문을 바탕으로 주변을 관찰하고 탐구합니다.', tools: ['관찰 일지', '스케치북', '카메라'] },
          { title: '표현과 공유', description: '다양한 방법으로 아이디어를 표현하고 공유합니다.', tools: ['그리기 도구', '콜라주', '프레젠테이션'] }
        ],
        outcomes: [
          { title: '창의적 질문 포트폴리오', student: '김○○ 학생', description: '12주간의 질문과 답변 여정', image: 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4' },
          { title: '개인 성장 스토리', student: '이○○ 학생', description: '시각적으로 표현한 자아 탐구 결과', image: 'attached_assets/그림_그리는_여자_초_동영상_1757853306736.mp4' }
        ]
      },
      stepzero: {
        title: 'GRADE-JUNIOR (사고·기록·시각화)',
        description: '사고발달 루틴으로 루브릭 피드백 습관을 구축하는 일일 훈련 프로그램입니다.',
        duration: '지속형',
        level: '기본',
        stats: {
          weeks: '∞',
          sessions: '매일',
          projects: '누적'
        },
        overview: `
          <h3>프로그램 개요</h3>
          <p>매일 15-20분의 짧은 루틴을 통해 체계적인 사고 습관과 기록 능력을 개발하는 지속형 프로그램입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>체계적 사고 습관 형성</li>
            <li>효과적인 기록과 정리 능력 개발</li>
            <li>시각적 사고와 표현 능력 향상</li>
            <li>자기 성찰과 개선 능력 배양</li>
          </ul>
          
          <h3>일일 루틴 구조</h3>
          <p>질문 생성(3분) → 관찰과 기록(5분) → 시각화(7분) → 성찰과 정리(5분)의 체계적인 15-20분 루틴입니다.</p>
        `,
        curriculum: [
          { week: '1일차', title: '루틴 설정', description: '개인 맞춤형 사고 루틴 설정 및 도구 준비', activities: ['루틴 계획', '도구 준비', '목표 설정'] },
          { week: '1주차', title: '습관 형성', description: '매일 루틴 실행과 습관화 과정', activities: ['일일 실행', '피드백 수집', '조정 과정'] },
          { week: '1개월', title: '루틴 안정화', description: '개인에게 최적화된 루틴으로 조정', activities: ['루틴 최적화', '효과 분석', '개선 방안'] },
          { week: '지속', title: '성장과 발전', description: '지속적인 성장과 자기 개발', activities: ['성과 누적', '목표 재설정', '심화 학습'] }
        ],
        process: [
          { title: '질문과 목표', description: '하루의 핵심 질문과 학습 목표를 설정합니다.', tools: ['목표 설정지', '질문 카드', '우선순위 매트릭스'] },
          { title: '관찰과 기록', description: '주변 환경과 상황을 체계적으로 관찰하고 기록합니다.', tools: ['관찰 노트', '체크리스트', '메모 앱'] },
          { title: '시각화와 정리', description: '수집한 정보를 시각적으로 정리하고 체계화합니다.', tools: ['다이어그램', '차트', '인포그래픽'] }
        ],
        outcomes: [
          { title: '사고 발달 포트폴리오', student: '박○○ 학생', description: '6개월간의 사고 발달 과정 기록', image: 'attached_assets/집중해서_그림_그리는_사람_초_영상_1757853306735.mp4' },
          { title: '루브릭 기반 자기평가', student: '최○○ 학생', description: '체계적인 자기 평가와 개선 과정', image: 'attached_assets/진지한_설명_경청하는_여성들_영상_1757923529915.mp4' }
        ]
      }
    };
    
    return programData[program] || { title: '프로그램 정보', content: '<p>프로그램 정보를 준비 중입니다.</p>' };
  }
}

// ============================================
// Key Moments Controller - Video Synchronization System
// ============================================

class KeyMomentsController {
  constructor() {
    this.modal = null;
    this.video = null;
    this.keyMoments = [];
    this.currentProgram = null;
    this.currentMomentIndex = -1;
    this.lastUpdateTime = 0;
    this.throttleDelay = 250; // 250ms throttle
    this.isActive = false;
    this.animationFrame = null;
    
    // DOM elements
    this.keyMomentsList = null;
    this.timelineTrack = null;
    this.timelineProgress = null;
    this.timelineMarkers = null;
    this.timelineHandle = null;
    this.currentTimeDisplay = null;
    this.totalTimeDisplay = null;
    this.speedButtons = null;
    
    // Accessibility
    this.focusedMomentIndex = -1;
    this.ariaLiveRegion = null;
    
    // Touch and interaction
    this.isDragging = false;
    this.lastTouchY = 0;
    
    // Event handler references for proper cleanup
    this.boundHandlers = {
      keydown: null,
      mutationObserver: null
    };
    
    this.init();
  }
  
  init() {
    // Initialize when modal is available
    this.modal = document.getElementById('programModal');
    if (this.modal) {
      this.setupEventListeners();
    }
  }
  
  setupEventListeners() {
    // Modal events
    this.modal.addEventListener('show', () => this.onModalShow());
    this.modal.addEventListener('hide', () => this.onModalHide());
    
    // Watch for modal active state changes
    this.boundHandlers.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (this.modal.classList.contains('active')) {
            this.onModalShow();
          } else {
            this.onModalHide();
          }
        }
      });
    });
    this.boundHandlers.mutationObserver.observe(this.modal, { attributes: true });
    
    // Bind keyboard handler for proper removal
    this.boundHandlers.keydown = (e) => this.handleKeyboard(e);
    document.addEventListener('keydown', this.boundHandlers.keydown);
  }
  
  onModalShow() {
    if (this.isActive) return;
    
    console.log('KeyMomentsController: Modal shown, activating');
    this.isActive = true;
    
    // Find video and UI elements
    this.video = this.modal.querySelector('.ambient-video');
    this.keyMomentsList = document.getElementById('keyMomentsList');
    this.timelineTrack = document.getElementById('timelineTrack');
    this.timelineProgress = document.getElementById('timelineProgress');
    this.timelineMarkers = document.getElementById('timelineMarkers');
    this.timelineHandle = document.getElementById('timelineHandle');
    this.currentTimeDisplay = document.getElementById('currentTimeDisplay');
    this.totalTimeDisplay = document.getElementById('totalTimeDisplay');
    this.speedButtons = document.querySelectorAll('.speed-btn');
    
    // Setup aria-live region
    this.setupAriaLive();
    
    if (this.video) {
      this.setupVideoListeners();
      this.loadKeyMoments();
    }
  }
  
  // Modal v2 connection methods
  connectToModal2(video, keyMoments) {
    console.log('KeyMomentsController: Connecting to Modal v2');
    this.video = video;
    this.keyMoments = keyMoments || [];
    this.isActive = true;
    
    // Ensure updateKeyMomentsUI method exists before calling
    if (typeof this.updateKeyMomentsUI === 'function') {
      this.updateKeyMomentsUI();
    } else {
      console.warn('updateKeyMomentsUI method not found, implementing it now');
      this.updateKeyMomentsUIImplementation();
    }
    
    this.bindVideoEvents();
    this.bindKeyboardEvents();
  }

  updateKeyMomentsUIImplementation() {
    const keyMomentsContainer = document.getElementById('modal2KeyMoments');
    if (!keyMomentsContainer) {
      console.warn('Modal v2 key moments container not found');
      return;
    }

    if (!this.keyMoments || this.keyMoments.length === 0) {
      keyMomentsContainer.innerHTML = '<p class="modal2-no-keymoments">이 프로그램에는 키 모먼트가 없습니다.</p>';
      return;
    }

    const keyMomentsHTML = this.keyMoments.map(km => `
      <div class="modal2-keymoment" data-time="${km.t}">
        <div class="modal2-keymoment-time">${this.formatTime ? this.formatTime(km.t) : '00:00'}</div>
        <div class="modal2-keymoment-title">${km.title}</div>
        <div class="modal2-keymoment-summary">${km.summary}</div>
      </div>
    `).join('');
    
    keyMomentsContainer.innerHTML = keyMomentsHTML;
    
    // Add click events for key moments
    keyMomentsContainer.querySelectorAll('.modal2-keymoment').forEach(item => {
      item.addEventListener('click', () => {
        const time = parseFloat(item.dataset.time);
        if (this.video) {
          this.video.currentTime = time;
          this.video.play();
        }
      });
    });
    
    console.log(`Modal v2: Loaded ${this.keyMoments.length} key moments`);
  }
  
  disconnectFromModal2() {
    console.log('KeyMomentsController: Disconnecting from Modal v2');
    this.isActive = false;
    this.video = null;
    this.keyMoments = [];
    this.unbindVideoEvents();
    this.unbindKeyboardEvents();
  }

  // Update key moments UI for Modal v2
  updateKeyMomentsUI() {
    const keyMomentsContainer = document.getElementById('modal2KeyMoments');
    if (!keyMomentsContainer) {
      console.warn('Modal v2 key moments container not found');
      return;
    }

    if (!this.keyMoments || this.keyMoments.length === 0) {
      keyMomentsContainer.innerHTML = '<p class="modal2-no-keymoments">이 프로그램에는 키 모먼트가 없습니다.</p>';
      return;
    }

    const keyMomentsHTML = this.keyMoments.map(km => `
      <div class="modal2-keymoment" data-time="${km.t}">
        <div class="modal2-keymoment-time">${this.formatTime(km.t)}</div>
        <div class="modal2-keymoment-title">${km.title}</div>
        <div class="modal2-keymoment-summary">${km.summary}</div>
      </div>
    `).join('');
    
    keyMomentsContainer.innerHTML = keyMomentsHTML;
    
    // Add click events for key moments
    keyMomentsContainer.querySelectorAll('.modal2-keymoment').forEach(item => {
      item.addEventListener('click', () => {
        const time = parseFloat(item.dataset.time);
        if (this.video) {
          this.video.currentTime = time;
          this.video.play();
        }
      });
    });
    
    console.log(`Modal v2: Loaded ${this.keyMoments.length} key moments`);
  }

  // Handle video time update for Modal v2
  onTimeUpdate() {
    if (!this.video || !this.isActive) return;
    
    const currentTime = this.video.currentTime;
    const duration = this.video.duration;
    
    if (duration && !isNaN(duration)) {
      // Find and highlight active key moment
      this.updateActiveKeyMomentV2(currentTime);
    }
  }

  // Update active key moment for Modal v2
  updateActiveKeyMomentV2(currentTime) {
    const keyMomentsContainer = document.getElementById('modal2KeyMoments');
    if (!keyMomentsContainer || !this.keyMoments.length) return;
    
    // Find active key moment using binary search
    const index = this.findActiveKeyMoment(currentTime);
    
    // Remove previous highlights
    keyMomentsContainer.querySelectorAll('.modal2-keymoment').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add new highlight
    if (index >= 0) {
      const activeItem = keyMomentsContainer.children[index];
      if (activeItem) {
        activeItem.classList.add('active');
        
        // Auto-scroll to active moment
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }
  
  bindVideoEvents() {
    if (!this.video) return;
    
    // Remove existing listeners to prevent duplicates
    this.unbindVideoEvents();
    
    // Add video event listeners for Modal v2
    this.boundHandlers.timeupdate = () => this.onTimeUpdate();
    this.video.addEventListener('timeupdate', this.boundHandlers.timeupdate);
    
    console.log('Video events bound for Modal v2');
  }
  
  unbindVideoEvents() {
    if (this.video && this.boundHandlers.timeupdate) {
      this.video.removeEventListener('timeupdate', this.boundHandlers.timeupdate);
    }
    
    if (this.boundHandlers.timeupdate) {
      this.boundHandlers.timeupdate = null;
    }
  }
  
  bindKeyboardEvents() {
    if (!this.boundHandlers.keydown) {
      this.boundHandlers.keydown = (e) => this.onKeyDown(e);
      document.addEventListener('keydown', this.boundHandlers.keydown);
    }
  }
  
  unbindKeyboardEvents() {
    if (this.boundHandlers.keydown) {
      document.removeEventListener('keydown', this.boundHandlers.keydown);
      this.boundHandlers.keydown = null;
    }
  }

  onModalHide() {
    if (!this.isActive) return;
    
    console.log('KeyMomentsController: Modal hidden, deactivating');
    this.isActive = false;
    this.cleanup();
  }
  
  cleanup() {
    console.log('KeyMomentsController: Performing cleanup');
    
    // Remove global event listeners with proper references
    if (this.boundHandlers.keydown) {
      document.removeEventListener('keydown', this.boundHandlers.keydown);
      this.boundHandlers.keydown = null;
    }
    
    // Disconnect MutationObserver
    if (this.boundHandlers.mutationObserver) {
      this.boundHandlers.mutationObserver.disconnect();
      this.boundHandlers.mutationObserver = null;
    }
    
    // Remove video listeners
    if (this.video) {
      this.video.removeEventListener('timeupdate', this.throttledTimeUpdate);
      this.video.removeEventListener('loadedmetadata', this.onVideoLoaded);
      this.video.removeEventListener('durationchange', this.onVideoLoaded);
    }
    
    // Cancel animation frame
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Reset state
    this.currentMomentIndex = -1;
    this.focusedMomentIndex = -1;
    this.keyMoments = [];
    this.lastUpdateTime = 0;
    this.currentProgram = null;
  }
  
  setupVideoListeners() {
    // Throttled time update for performance
    this.throttledTimeUpdate = this.throttle(() => {
      this.updateProgress();
    }, this.throttleDelay);
    
    this.onVideoLoaded = () => {
      this.updateTimeDisplay();
      this.renderTimeline();
    };
    
    this.video.addEventListener('timeupdate', this.throttledTimeUpdate);
    this.video.addEventListener('loadedmetadata', this.onVideoLoaded);
    this.video.addEventListener('durationchange', this.onVideoLoaded);
  }
  
  setupAriaLive() {
    if (!this.ariaLiveRegion) {
      this.ariaLiveRegion = document.createElement('div');
      this.ariaLiveRegion.setAttribute('aria-live', 'polite');
      this.ariaLiveRegion.setAttribute('aria-atomic', 'true');
      this.ariaLiveRegion.style.position = 'absolute';
      this.ariaLiveRegion.style.left = '-10000px';
      this.ariaLiveRegion.style.width = '1px';
      this.ariaLiveRegion.style.height = '1px';
      this.ariaLiveRegion.style.overflow = 'hidden';
      document.body.appendChild(this.ariaLiveRegion);
    }
  }
  
  loadKeyMoments() {
    // Get current program from modal
    const programName = this.getCurrentProgram();
    console.log('Loading key moments for program:', programName);
    
    if (programName && window.COVA_DATA && window.COVA_DATA[programName]) {
      const programData = window.COVA_DATA[programName];
      this.keyMoments = programData.keyMoments || [];
      this.currentProgram = programName;
      
      // Update video source if available
      if (programData.videoSrc && this.video) {
        const currentSrc = this.video.querySelector('source');
        if (currentSrc && currentSrc.src !== programData.videoSrc) {
          currentSrc.src = programData.videoSrc;
          this.video.load();
        }
      }
      
      this.renderKeyMoments();
      this.renderTimeline();
      this.setupInteractions();
      
      console.log(`Loaded ${this.keyMoments.length} key moments`);
    }
  }
  
  getCurrentProgram() {
    // Try to get from modal title or data attribute
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
      const titleText = modalTitle.textContent.toLowerCase();
      if (titleText.includes('kick-off')) return 'kickoff';
      if (titleText.includes('step-zero')) return 'stepZero';
    }
    
    // Fallback to checking active program card
    const activeCard = document.querySelector('.program-card.active');
    if (activeCard) {
      return activeCard.dataset.program;
    }
    
    return 'kickoff'; // Default fallback
  }
  
  renderKeyMoments() {
    if (!this.keyMomentsList || !this.keyMoments.length) return;
    
    this.keyMomentsList.innerHTML = this.keyMoments.map((moment, index) => `
      <div class="keymoment-item" 
           data-moment-id="${moment.id}" 
           data-time="${moment.t}"
           data-index="${index}"
           role="listitem"
           tabindex="0"
           aria-describedby="moment-${moment.id}-desc">
        <div class="moment-time">${this.formatTime(moment.t)}</div>
        <div class="moment-content">
          <div class="moment-title">${moment.title}</div>
          <div class="moment-summary" id="moment-${moment.id}-desc">${moment.summary}</div>
        </div>
        <div class="moment-indicator" aria-hidden="true"></div>
      </div>
    `).join('');
  }
  
  renderTimeline() {
    if (!this.timelineMarkers || !this.keyMoments.length || !this.video) return;
    
    const duration = this.video.duration;
    if (!duration || isNaN(duration)) return;
    
    this.timelineMarkers.innerHTML = this.keyMoments.map(moment => {
      const position = (moment.t / duration) * 100;
      return `
        <div class="timeline-marker" 
             style="left: ${position}%"
             data-time="${moment.t}"
             title="${moment.title}"
             role="button"
             tabindex="0"
             aria-label="${moment.title} - ${this.formatTime(moment.t)}">
        </div>
      `;
    }).join('');
    
    // Setup timeline interactions
    this.setupTimelineInteractions();
  }
  
  setupInteractions() {
    // Key moment click/tap handlers
    this.keyMomentsList.addEventListener('click', (e) => {
      const momentItem = e.target.closest('.keymoment-item');
      if (momentItem) {
        const time = parseFloat(momentItem.dataset.time);
        this.seekTo(time);
        this.announceSeek(momentItem.querySelector('.moment-title').textContent, time);
      }
    });
    
    // Key moment keyboard navigation
    this.keyMomentsList.addEventListener('keydown', (e) => {
      this.handleMomentListKeyboard(e);
    });
    
    // Speed control buttons
    this.speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = parseFloat(btn.dataset.speed);
        this.setPlaybackSpeed(speed);
        
        // Update button states
        this.speedButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    
    // Touch/swipe support for mobile
    this.setupTouchSupport();
  }
  
  setupTimelineInteractions() {
    if (!this.timelineTrack) return;
    
    const handleTimelineClick = (e) => {
      const rect = this.timelineTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const time = percentage * this.video.duration;
      this.seekTo(time);
    };
    
    this.timelineTrack.addEventListener('click', handleTimelineClick);
    
    // Timeline markers click
    this.timelineMarkers.addEventListener('click', (e) => {
      const marker = e.target.closest('.timeline-marker');
      if (marker) {
        const time = parseFloat(marker.dataset.time);
        this.seekTo(time);
        e.stopPropagation();
      }
    });
    
    // Timeline keyboard navigation
    if (this.timelineHandle) {
      this.timelineHandle.addEventListener('keydown', (e) => {
        this.handleTimelineKeyboard(e);
      });
    }
  }
  
  setupTouchSupport() {
    let touchStartY = 0;
    let touchStartX = 0;
    
    this.keyMomentsList.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    this.keyMomentsList.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const deltaY = Math.abs(touchY - touchStartY);
      const deltaX = Math.abs(touchX - touchStartX);
      
      // Horizontal swipe detection for seeking
      if (deltaX > deltaY && deltaX > 50) {
        const direction = touchX > touchStartX ? 1 : -1;
        this.seekRelative(direction * 5); // ±5 seconds
        e.preventDefault();
      }
    }, { passive: false });
  }
  
  updateProgress() {
    if (!this.video || !this.isActive) return;
    
    // Use requestAnimationFrame for smooth 60fps updates
    this.animationFrame = requestAnimationFrame(() => {
      const currentTime = this.video.currentTime;
      const duration = this.video.duration;
      
      if (duration && !isNaN(duration)) {
        // Update timeline progress
        const percentage = (currentTime / duration) * 100;
        if (this.timelineProgress) {
          this.timelineProgress.style.width = `${percentage}%`;
        }
        
        if (this.timelineHandle) {
          this.timelineHandle.style.left = `${percentage}%`;
          this.timelineHandle.setAttribute('aria-valuenow', Math.round(percentage));
        }
        
        // Update time display
        this.updateTimeDisplay();
        
        // Find and highlight active key moment using binary search
        this.updateActiveKeyMoment(currentTime);
      }
    });
  }
  
  updateActiveKeyMoment(currentTime) {
    if (!this.keyMoments.length) return;
    
    // Binary search for active key moment (O(log n) performance)
    const index = this.findActiveKeyMoment(currentTime);
    
    if (index !== this.currentMomentIndex) {
      // Remove previous highlight
      if (this.currentMomentIndex >= 0) {
        const prevItem = this.keyMomentsList.querySelector(`[data-index="${this.currentMomentIndex}"]`);
        if (prevItem) {
          prevItem.classList.remove('active');
          prevItem.removeAttribute('aria-current');
        }
      }
      
      // Add new highlight
      if (index >= 0) {
        const currentItem = this.keyMomentsList.querySelector(`[data-index="${index}"]`);
        if (currentItem) {
          currentItem.classList.add('active');
          currentItem.setAttribute('aria-current', 'true');
          
          // Auto-scroll to active moment
          this.scrollToMoment(currentItem);
        }
      }
      
      this.currentMomentIndex = index;
    }
  }
  
  findActiveKeyMoment(currentTime) {
    // Binary search with tolerance for precise matching
    let left = 0;
    let right = this.keyMoments.length - 1;
    let result = -1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const momentTime = this.keyMoments[mid].t;
      
      // Check if we're within a reasonable range (±2 seconds)
      if (Math.abs(currentTime - momentTime) <= 2) {
        result = mid;
        break;
      }
      
      if (momentTime <= currentTime) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return result;
  }
  
  scrollToMoment(momentElement) {
    if (!momentElement || !this.keyMomentsList) return;
    
    // Smooth scroll to center the element
    momentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }
  
  seekTo(time) {
    if (!this.video) return;
    
    this.video.currentTime = Math.max(0, Math.min(time, this.video.duration));
  }
  
  seekRelative(deltaSeconds) {
    if (!this.video) return;
    
    const newTime = this.video.currentTime + deltaSeconds;
    this.seekTo(newTime);
  }
  
  setPlaybackSpeed(speed) {
    if (!this.video) return;
    
    this.video.playbackRate = speed;
  }
  
  updateTimeDisplay() {
    if (!this.video || !this.currentTimeDisplay || !this.totalTimeDisplay) return;
    
    const current = this.video.currentTime;
    const total = this.video.duration;
    
    this.currentTimeDisplay.textContent = this.formatTime(current);
    if (total && !isNaN(total)) {
      this.totalTimeDisplay.textContent = this.formatTime(total);
    }
  }
  
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  announceSeek(momentTitle, time) {
    if (this.ariaLiveRegion) {
      this.ariaLiveRegion.textContent = `이동: ${momentTitle}, ${this.formatTime(time)}`;
    }
  }
  
  handleKeyboard(e) {
    // Only handle keys when modal is active and key moments are accessible
    if (!this.isActive || !this.video) return;
    if (!this.modal || !this.modal.classList.contains('active')) return;
    
    // Check if key moments tab is active (if tabs exist)
    const activeTab = this.modal.querySelector('.modal-tab.active');
    if (activeTab && activeTab.dataset.tab && activeTab.dataset.tab !== 'keymoments') return;
    
    // Only handle if modal is focused or no other input is focused
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      return;
    }
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.seekRelative(-5);
        this.announceSeek('5초 뒤로', this.video.currentTime);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.seekRelative(5);
        this.announceSeek('5초 앞으로', this.video.currentTime);
        break;
      case ' ':
        e.preventDefault();
        if (this.video.paused) {
          this.video.play();
        } else {
          this.video.pause();
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        e.preventDefault();
        const momentIndex = parseInt(e.key) - 1;
        if (momentIndex < this.keyMoments.length) {
          const moment = this.keyMoments[momentIndex];
          this.seekTo(moment.t);
          this.announceSeek(moment.title, moment.t);
        }
        break;
    }
  }
  
  handleMomentListKeyboard(e) {
    const items = this.keyMomentsList.querySelectorAll('.keymoment-item');
    if (!items.length) return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.focusedMomentIndex = Math.max(0, this.focusedMomentIndex - 1);
        items[this.focusedMomentIndex].focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.focusedMomentIndex = Math.min(items.length - 1, this.focusedMomentIndex + 1);
        items[this.focusedMomentIndex].focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const focusedItem = items[this.focusedMomentIndex];
        if (focusedItem) {
          const time = parseFloat(focusedItem.dataset.time);
          this.seekTo(time);
          this.announceSeek(focusedItem.querySelector('.moment-title').textContent, time);
        }
        break;
    }
  }
  
  handleTimelineKeyboard(e) {
    if (!this.video) return;
    
    const duration = this.video.duration;
    if (!duration) return;
    
    const stepSize = duration / 100; // 1% steps
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.seekRelative(-stepSize);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.seekRelative(stepSize);
        break;
      case 'Home':
        e.preventDefault();
        this.seekTo(0);
        break;
      case 'End':
        e.preventDefault();
        this.seekTo(duration);
        break;
    }
  }
  
  // Method to set current program and key moments (called from ProgramModalController)
  setCurrentProgram(program, keyMoments) {
    console.log(`KeyMomentsController: Setting current program to ${program} with ${keyMoments ? keyMoments.length : 0} key moments`);
    this.currentProgram = program;
    this.keyMoments = keyMoments || [];
    
    // If already active, refresh the display
    if (this.isActive) {
      this.renderKeyMoments();
      this.renderTimeline();
    }
  }
  
  // Utility: Throttle function for performance optimization
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modal Controllers
  if (window.USE_MODAL_V2) {
    window.covaModal2 = new CovaModal2();
  } else {
    window.programModalController = new ProgramModalController();
  }
  window.keyMomentsController = new KeyMomentsController();
});