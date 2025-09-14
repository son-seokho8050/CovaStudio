const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function renderPhilosophy(){
  const p = COVA_DATA.philosophy;
  $("#philosophyContent").innerHTML = `
    <div class="card">
      <h3>핵심 3축</h3>
      <ul class="check">${p.pillars.map(x=>`<li>${x}</li>`).join("")}</ul>
      <p class="muted">${p.loop}</p>
      <p class="muted">${p.mode}</p>
      <p class="muted">${p.iep}</p>
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

    // Step-Zero
    renderOrdered("#szDaily", COVA_DATA.stepZero.daily);
    renderList("#szRubric", COVA_DATA.stepZero.rubric);
    renderList("#sz12w", COVA_DATA.stepZero.twelveWeeks);

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