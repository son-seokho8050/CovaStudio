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

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const percentage = document.querySelector('.loading-percentage');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 3; // Slower progress
    if (progress > 100) progress = 100;
    
    percentage.textContent = Math.floor(progress) + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 1200); // Longer fade out
      }, 1000); // Longer wait time after 100%
    }
  }, 200); // Slower interval
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
        
        // Manually trigger animation if CSS transition doesn't work
        lines.forEach((line, index) => {
          console.log(`Animating line ${index + 1}:`, line.textContent);
          line.style.transform = 'translateX(0)';
          line.style.opacity = '1';
          line.style.transition = 'all 1.4s cubic-bezier(0.215, 0.61, 0.355, 1)';
          line.style.transitionDelay = `${0.2 + index * 0.4}s`;
          
          // Add scale effect
          setTimeout(() => {
            line.style.transform += ' scale(1.02)';
            setTimeout(() => {
              line.style.transform = line.style.transform.replace(' scale(1.02)', '');
            }, 150);
          }, (0.2 + index * 0.4) * 1000 + 400);
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
  // Initialize loading screen first
  initLoadingScreen();
  
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

// Program Modal Controller
class ProgramModalController {
  constructor() {
    this.modal = document.getElementById('programModal');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalContent = document.getElementById('modalContent');
    this.modalClose = this.modal.querySelector('.modal-close');
    this.modalOverlay = this.modal.querySelector('.modal-overlay');
    
    this.init();
  }
  
  init() {
    // Add click event listeners to program cards
    document.querySelectorAll('.program-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const program = card.dataset.program;
        this.openModal(program);
      });
    });
    
    // Close modal events
    this.modalClose.addEventListener('click', () => this.closeModal());
    this.modalOverlay.addEventListener('click', () => this.closeModal());
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
  
  openModal(program) {
    const programData = this.getProgramData(program);
    
    this.modalTitle.textContent = programData.title;
    this.modalContent.innerHTML = programData.content;
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Start modal background video
    const modalVideo = this.modal.querySelector('.modal-bg-video');
    if (modalVideo) {
      modalVideo.currentTime = 0;
      modalVideo.play().catch(e => console.log('Modal video autoplay failed:', e));
    }
  }
  
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Pause modal background video
    const modalVideo = this.modal.querySelector('.modal-bg-video');
    if (modalVideo) {
      modalVideo.pause();
    }
  }
  
  getProgramData(program) {
    const programData = {
      grade1: {
        title: 'GRADE-1 (조형원리)',
        content: `
          <h3>프로그램 개요</h3>
          <p>고1 학생들을 위한 기초 과정으로, 비주얼 저널, 입체적 비교, 언어화 훈련을 통해 탐구에서 완성으로 나아가는 단계입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>기초 조형 원리 이해와 적용</li>
            <li>시각적 사고력 개발</li>
            <li>창의적 문제 해결 능력 향상</li>
            <li>체계적 관찰과 분석 능력 배양</li>
          </ul>
          
          <h3>주요 커리큘럼</h3>
          <ol>
            <li><strong>비주얼 저널링</strong> - 일상 관찰과 기록을 통한 시각적 사고 훈련</li>
            <li><strong>기초 드로잉</strong> - 형태, 명암, 질감 표현의 기본기 습득</li>
            <li><strong>조형 요소</strong> - 점, 선, 면의 특성과 활용법</li>
            <li><strong>구성 원리</strong> - 균형, 리듬, 강조, 통일의 이해</li>
            <li><strong>색채 이론</strong> - 색의 속성과 조화 원리</li>
            <li><strong>입체 표현</strong> - 3차원 공간 이해와 표현</li>
          </ol>
          
          <h3>평가 방식</h3>
          <p>과정 중심 평가로 학생의 성장 과정을 체계적으로 관리하며, 개인별 맞춤 피드백을 제공합니다.</p>
          
          <h3>기간 및 일정</h3>
          <p>12개월 과정으로 주 2회 수업을 기본으로 하며, 개인 역량에 따른 맞춤형 일정 조정이 가능합니다.</p>
        `
      },
      grade2: {
        title: 'GRADE-2 (전공학별 핵심원리)',
        content: `
          <h3>프로그램 개요</h3>
          <p>고2 학생들을 위한 심화 과정으로, 사고와 실기의 균형을 유지하며 보완과 실전 경험을 통해 탐구를 완성으로 확장하는 전환 단계입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>전공별 특화된 표현 기법 습득</li>
            <li>개인 포트폴리오 완성</li>
            <li>대학 입시 준비와 실전 대응력 향상</li>
            <li>창작 과정에서의 비판적 사고 개발</li>
          </ul>
          
          <h3>전공별 커리큘럼</h3>
          <ol>
            <li><strong>회화 전공</strong> - 유화, 수채화, 아크릴 등 다양한 매체 경험</li>
            <li><strong>조소 전공</strong> - 점토, 석고, 금속 등을 활용한 3차원 작품 제작</li>
            <li><strong>디자인 전공</strong> - 시각 디자인, 제품 디자인 기초 이론과 실습</li>
            <li><strong>건축 전공</strong> - 공간 설계와 구조 이해, 모형 제작</li>
            <li><strong>공예 전공</strong> - 전통과 현대 공예 기법의 융합</li>
          </ol>
          
          <h3>포트폴리오 관리</h3>
          <p>개인별 작품 포트폴리오를 체계적으로 관리하며, 대학별 입시 요구사항에 맞춘 맞춤형 지도를 제공합니다.</p>
          
          <h3>실전 대비</h3>
          <ul>
            <li>모의 실기 시험을 통한 시간 관리 훈련</li>
            <li>대학별 출제 경향 분석과 대비</li>
            <li>면접 및 구술 시험 준비</li>
          </ul>
          
          <h3>기간 및 일정</h3>
          <p>12개월 과정으로 주 3회 수업을 기본으로 하며, 입시 일정에 맞춘 집중 과정도 운영합니다.</p>
        `
      },
      kickoff: {
        title: 'KICK-OFF (창의적 질문)',
        content: `
          <h3>프로그램 개요</h3>
          <p>주차별 창의적 질문으로 자아와 환경 탐구의 시작점을 제공하는 12주 특별 프로그램입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>창의적 사고의 출발점 마련</li>
            <li>자기 탐구와 환경 인식 능력 개발</li>
            <li>질문을 통한 문제 발견 능력 향상</li>
            <li>시각적 표현을 통한 아이디어 구체화</li>
          </ul>
          
          <h3>주차별 주제</h3>
          <ol>
            <li><strong>1주차:</strong> "나는 누구인가?" - 자아 정체성 탐구</li>
            <li><strong>2주차:</strong> "내 주변은 어떤 모습인가?" - 환경 관찰과 기록</li>
            <li><strong>3주차:</strong> "변화하는 것들" - 시간과 변화의 인식</li>
            <li><strong>4주차:</strong> "소통의 방법들" - 의사소통과 표현</li>
            <li><strong>5주차:</strong> "감정의 색깔" - 감정 표현과 색채</li>
            <li><strong>6주차:</strong> "상상과 현실" - 창의적 사고와 현실 인식</li>
            <li><strong>7주차:</strong> "문제와 해결" - 문제 인식과 해결 과정</li>
            <li><strong>8주차:</strong> "과거, 현재, 미래" - 시간의 연속성</li>
            <li><strong>9주차:</strong> "관계의 의미" - 인간관계와 사회</li>
            <li><strong>10주차:</strong> "아름다움이란?" - 미적 감각과 가치</li>
            <li><strong>11주차:</strong> "나만의 언어" - 개성적 표현 개발</li>
            <li><strong>12주차:</strong> "새로운 시작" - 성장과 발전</li>
          </ol>
          
          <h3>활동 방식</h3>
          <p>매주 제시되는 창의적 질문을 바탕으로 토론, 스케치, 콜라주, 글쓰기 등 다양한 방법으로 자신의 생각을 표현합니다.</p>
          
          <h3>성과 관리</h3>
          <p>매주 개인별 성찰 일지를 작성하며, 12주 과정 완료 후 개인 전시회를 통해 성장 과정을 공유합니다.</p>
        `
      },
      stepzero: {
        title: 'STEP-ZERO (사고·기록·시각화)',
        content: `
          <h3>프로그램 개요</h3>
          <p>사고발달 루틴으로 루브릭 피드백 습관을 구축하는 일일 훈련 프로그램입니다.</p>
          
          <h3>교육 목표</h3>
          <ul>
            <li>체계적 사고 습관 형성</li>
            <li>효과적인 기록과 정리 능력 개발</li>
            <li>시각적 사고와 표현 능력 향상</li>
            <li>자기 성찰과 개선 능력 배양</li>
          </ul>
          
          <h3>일일 루틴 (15-20분)</h3>
          <ol>
            <li><strong>질문 생성</strong> (3분) - 하루의 핵심 질문 설정</li>
            <li><strong>관찰과 기록</strong> (5분) - 주변 환경과 상황 관찰 및 메모</li>
            <li><strong>시각화</strong> (7분) - 스케치, 다이어그램, 마인드맵 등으로 표현</li>
            <li><strong>성찰과 정리</strong> (3분) - 배운 점과 개선점 정리</li>
            <li><strong>다음 연결</strong> (2분) - 내일로의 연결고리 설정</li>
          </ol>
          
          <h3>루브릭 평가 항목</h3>
          <ul>
            <li><strong>창의성:</strong> 독창적이고 창의적인 접근</li>
            <li><strong>논리성:</strong> 체계적이고 논리적인 사고</li>
            <li><strong>표현력:</strong> 명확하고 효과적인 표현</li>
            <li><strong>성찰력:</strong> 깊이 있는 자기 성찰과 개선</li>
          </ul>
          
          <h3>12주 발전 과정</h3>
          <ol>
            <li><strong>1-3주:</strong> 기본 습관 형성 - 루틴 정착과 기초 훈련</li>
            <li><strong>4-6주:</strong> 깊이 개발 - 관찰력과 표현력 향상</li>
            <li><strong>7-9주:</strong> 연결 확장 - 다양한 영역과의 연결</li>
            <li><strong>10-12주:</strong> 개인화 완성 - 개인만의 스타일 확립</li>
          </ol>
          
          <h3>포트폴리오 관리</h3>
          <p>주간 포트폴리오 시트를 통해 일주일간의 성장 과정을 정리하고, 월간 리뷰를 통해 장기 발전 방향을 설정합니다.</p>
          
          <h3>피드백 시스템</h3>
          <p>개인별 맞춤 피드백과 동료 간 상호 피드백을 통해 지속적인 성장을 지원합니다.</p>
        `
      }
    };
    
    return programData[program] || { title: '프로그램 정보', content: '<p>프로그램 정보를 준비 중입니다.</p>' };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.programModalController = new ProgramModalController();
});