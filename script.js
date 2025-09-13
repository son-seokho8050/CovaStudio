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
    heroTitle.classList.add('js-enabled');
    
    // Check if lines are already created
    if (!heroTitle.querySelector('.line')) {
      const text = heroTitle.innerHTML;
      const lines = text.split('<br>');
      heroTitle.innerHTML = lines.map(line => 
        `<span class="line"><span>${line}</span></span>`
      ).join('');
    }
    
    // Create dramatic entrance with staggered timing
    setTimeout(() => {
      heroTitle.classList.add('visible');
      console.log('Hero title animation triggered');
      
      // Add sound-like visual effect
      const lines = heroTitle.querySelectorAll('.line span');
      console.log('Found hero lines:', lines.length);
      lines.forEach((line, index) => {
        setTimeout(() => {
          line.style.transform += ' scale(1.02)';
          setTimeout(() => {
            line.style.transform = line.style.transform.replace(' scale(1.02)', '');
          }, 150);
        }, index * 200 + 400);
      });
    }, 500); // Reduced delay for immediate effect
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

// Mount all
document.addEventListener("DOMContentLoaded", ()=>{
  // Initialize loading screen first
  initLoadingScreen();
  
  // Initialize dynamic text effects immediately for better responsiveness
  setTimeout(() => {
    initDynamicTextEffects();
  }, 100);
  
  // Initialize other features after loading
  setTimeout(() => {
    renderPhilosophy();

    // G1
    renderList("#g1DayLoop", COVA_DATA.g1.dayLoop);
    renderOrdered("#g1ThreeDay", COVA_DATA.g1.threeDay);
    renderList("#g1Monthly", COVA_DATA.g1.monthly);
    renderList("#g1Checkbell", COVA_DATA.g1.checkbell);

    // G2
    renderList("#g2DayLoop", COVA_DATA.g2.dayLoop);
    renderOrdered("#g2ThreeDay", COVA_DATA.g2.threeDay);
    renderList("#g2Monthly", COVA_DATA.g2.monthly);
    renderList("#g2Gates", COVA_DATA.g2.gates);

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
  }, 100);
});