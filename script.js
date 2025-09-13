// COVA 웹사이트 JavaScript 기능

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    renderPhilosophySection();
    renderCurriculumFeatures();
    renderContactInfo();
    setupEventListeners();
    setupSmoothScrolling();
});

// 테마 관리
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
}

function setTheme(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = '🌙';
    }
    
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    console.log(`Theme switched to ${newTheme}`);
}

// 교육 철학 섹션 렌더링
function renderPhilosophySection() {
    const container = document.getElementById('philosophy-grid');
    if (!container) return;

    container.innerHTML = covaData.philosophy.map((item, index) => `
        <div class="philosophy-card" data-testid="card-philosophy-${index}">
            <div class="philosophy-icon">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// 커리큘럼 특징 렌더링
function renderCurriculumFeatures() {
    // 고1 특징
    const grade10Container = document.getElementById('grade10-features');
    if (grade10Container) {
        grade10Container.innerHTML = covaData.grade10Features.map(feature => `
            <div class="feature-item">
                <div class="feature-icon grade10-icon">${feature.icon}</div>
                <span class="feature-text">${feature.text}</span>
            </div>
        `).join('');
    }

    // 고2 특징
    const grade11Container = document.getElementById('grade11-features');
    if (grade11Container) {
        grade11Container.innerHTML = covaData.grade11Features.map(feature => `
            <div class="feature-item">
                <div class="feature-icon grade11-icon">${feature.icon}</div>
                <span class="feature-text">${feature.text}</span>
            </div>
        `).join('');
    }
}

// 연락처 정보 렌더링
function renderContactInfo() {
    const container = document.getElementById('contact-details');
    if (!container) return;

    container.innerHTML = covaData.contactInfo.map(info => `
        <div class="contact-item">
            <div class="contact-icon">${info.icon}</div>
            <div class="contact-info-content">
                <h4>${info.title}</h4>
                <p>${info.content}</p>
                <p class="description">${info.description}</p>
            </div>
        </div>
    `).join('');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 테마 토글
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // 모바일 메뉴
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            console.log('Mobile menu clicked');
            // TODO: 모바일 메뉴 구현
        });
    }

    // 히어로 섹션 버튼들
    const learnMoreBtn = document.querySelector('[data-testid="button-learn-more"]');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            console.log('Learn more clicked');
            scrollToElement('#curriculum');
        });
    }

    const contactBtn = document.querySelector('[data-testid="button-contact"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            console.log('Contact clicked');
            scrollToElement('#contact');
        });
    }

    // 커리큘럼 상세 버튼들
    const grade10Details = document.querySelector('[data-testid="button-grade10-details"]');
    if (grade10Details) {
        grade10Details.addEventListener('click', () => {
            console.log('Grade 10 details clicked');
            // TODO: 고1 상세 정보 모달 또는 페이지
        });
    }

    const grade11Details = document.querySelector('[data-testid="button-grade11-details"]');
    if (grade11Details) {
        grade11Details.addEventListener('click', () => {
            console.log('Grade 11 details clicked');
            // TODO: 고2 상세 정보 모달 또는 페이지
        });
    }

    // 체험 수업 신청 버튼
    const trialClassBtn = document.querySelector('[data-testid="button-trial-class"]');
    if (trialClassBtn) {
        trialClassBtn.addEventListener('click', () => {
            console.log('Trial class clicked');
            // TODO: 체험 수업 신청 폼 또는 연락처로 스크롤
            scrollToElement('#contact');
        });
    }

    // 연락처 폼 제출
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // 철학 카드 클릭 이벤트
    document.addEventListener('click', (e) => {
        const philosophyCard = e.target.closest('.philosophy-card');
        if (philosophyCard) {
            const index = philosophyCard.getAttribute('data-testid')?.split('-')[2];
            console.log(`Philosophy card ${index} clicked`);
            // TODO: 철학 상세 설명 모달 또는 애니메이션
        }
    });
}

// 연락처 폼 처리
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    console.log('Form submitted:', data);
    
    // TODO: 실제 폼 제출 로직 구현
    alert('문의가 접수되었습니다. 곧 연락드리겠습니다.');
    
    // 폼 초기화
    e.target.reset();
}

// 부드러운 스크롤 설정
function setupSmoothScrolling() {
    // 네비게이션 링크들에 부드러운 스크롤 적용
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToElement(this.getAttribute('href'));
            }
        });
    });
}

// 요소로 부드럽게 스크롤
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const offsetTop = element.offsetTop - 80; // 네비게이션 높이 고려
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 스크롤 시 네비게이션 배경 조정
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = document.documentElement.classList.contains('dark') 
            ? 'rgba(8, 12, 16, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = document.documentElement.classList.contains('dark') 
            ? 'rgba(8, 12, 16, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)';
    }
});

// 페이지 로드 애니메이션 (선택사항)
function addPageLoadAnimations() {
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들 선택
    document.querySelectorAll('.philosophy-card, .curriculum-card, .contact-form-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 페이지 로드 완료 후 애니메이션 적용
window.addEventListener('load', addPageLoadAnimations);