// COVA Light 웹사이트 JavaScript 기능

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    renderAllContent();
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
    const themeButton = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeButton) themeButton.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeButton) themeButton.textContent = '🌙';
    }
    
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    console.log(`Theme switched to ${newTheme}`);
}

// 모든 콘텐츠 렌더링
function renderAllContent() {
    renderPhilosophy();
    renderGrade1();
    renderGrade2();
    renderKickOff();
    renderStepZero();
    renderKPI();
    renderFAQ();
}

// 철학 섹션 렌더링
function renderPhilosophy() {
    const container = document.getElementById('philosophyContent');
    if (!container) return;
    
    container.innerHTML = covaData.philosophy.content;
}

// 고1 커리큘럼 렌더링
function renderGrade1() {
    const data = covaData.grade1;
    
    // 하루 루프
    const dayLoopEl = document.getElementById('g1DayLoop');
    if (dayLoopEl) {
        dayLoopEl.innerHTML = data.dayLoop.map(item => `<li>${item}</li>`).join('');
    }
    
    // 3일 루프
    const threeDayEl = document.getElementById('g1ThreeDay');
    if (threeDayEl) {
        threeDayEl.innerHTML = data.threeDay.map(item => `<li>${item}</li>`).join('');
    }
    
    // 월별 커리큘럼
    const monthlyEl = document.getElementById('g1Monthly');
    if (monthlyEl) {
        monthlyEl.innerHTML = data.monthly.map(item => `<li>${item}</li>`).join('');
    }
    
    // 체크벨
    const checkbellEl = document.getElementById('g1Checkbell');
    if (checkbellEl) {
        checkbellEl.innerHTML = data.checkbell.map(item => `<li>${item}</li>`).join('');
    }
}

// 고2 커리큘럼 렌더링
function renderGrade2() {
    const data = covaData.grade2;
    
    // 하루 루프
    const dayLoopEl = document.getElementById('g2DayLoop');
    if (dayLoopEl) {
        dayLoopEl.innerHTML = data.dayLoop.map(item => `<li>${item}</li>`).join('');
    }
    
    // 3일 루프
    const threeDayEl = document.getElementById('g2ThreeDay');
    if (threeDayEl) {
        threeDayEl.innerHTML = data.threeDay.map(item => `<li>${item}</li>`).join('');
    }
    
    // 월별 커리큘럼
    const monthlyEl = document.getElementById('g2Monthly');
    if (monthlyEl) {
        monthlyEl.innerHTML = data.monthly.map(item => `<li>${item}</li>`).join('');
    }
    
    // 루프 게이트
    const gatesEl = document.getElementById('g2Gates');
    if (gatesEl) {
        gatesEl.innerHTML = data.gates.map(item => `<li>${item}</li>`).join('');
    }
}

// Kick-Off 렌더링
function renderKickOff() {
    const kickoffData = covaData.kickoff;
    
    // 고1 질문 매트릭스
    const kickG1El = document.getElementById('kickG1');
    if (kickG1El) {
        let html = '<thead><tr><th>주차</th><th>관찰</th><th>분석</th><th>표현</th></tr></thead><tbody>';
        kickoffData.grade1Questions.forEach(row => {
            html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
        });
        html += '</tbody>';
        kickG1El.innerHTML = html;
    }
    
    // 고2 질문 매트릭스
    const kickG2El = document.getElementById('kickG2');
    if (kickG2El) {
        let html = '<thead><tr><th>주차</th><th>계획</th><th>실행</th><th>평가</th></tr></thead><tbody>';
        kickoffData.grade2Questions.forEach(row => {
            html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
        });
        html += '</tbody>';
        kickG2El.innerHTML = html;
    }
}

// Step-Zero 렌더링
function renderStepZero() {
    const data = covaData.stepZero;
    
    // 하루 루틴
    const dailyEl = document.getElementById('szDaily');
    if (dailyEl) {
        dailyEl.innerHTML = data.daily.map(item => `<li>${item}</li>`).join('');
    }
    
    // 루브릭
    const rubricEl = document.getElementById('szRubric');
    if (rubricEl) {
        rubricEl.innerHTML = data.rubric.map(item => `<li>${item}</li>`).join('');
    }
    
    // 12주 흐름
    const flow12wEl = document.getElementById('sz12w');
    if (flow12wEl) {
        flow12wEl.innerHTML = data.flow12w.map(item => `<li>${item}</li>`).join('');
    }
}

// KPI 렌더링
function renderKPI() {
    const data = covaData.kpi;
    
    // 공통 KPI
    const commonEl = document.getElementById('kpiCommon');
    if (commonEl) {
        commonEl.innerHTML = data.common.map(item => `<li>${item}</li>`).join('');
    }
    
    // 고2 추가 KPI
    const g2El = document.getElementById('kpiG2');
    if (g2El) {
        g2El.innerHTML = data.grade2.map(item => `<li>${item}</li>`).join('');
    }
}

// FAQ 렌더링
function renderFAQ() {
    const container = document.getElementById('faqList');
    if (!container) return;
    
    container.innerHTML = covaData.faq.map(item => `
        <details>
            <summary>${item.question}</summary>
            <div>${item.answer}</div>
        </details>
    `).join('');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 테마 토글
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 모바일 네비게이션
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            console.log('Mobile navigation toggled');
        });
        
        // 네비게이션 링크 클릭시 모바일 메뉴 닫기
        navList.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navList.classList.remove('active');
            }
        });
    }
    
    // 외부 클릭시 모바일 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (navList && !navToggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
        }
    });
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
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const offsetTop = element.offsetTop - headerHeight - 20;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 스크롤 애니메이션 (선택사항)
function addScrollAnimations() {
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
    document.querySelectorAll('.section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 페이지 로드 완료 후 애니메이션 적용
window.addEventListener('load', () => {
    addScrollAnimations();
    console.log('COVA Light initialized');
});

// 유틸리티 함수들
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
}

function createProgressBar(current, total) {
    const percentage = (current / total) * 100;
    return `
        <div style="background: var(--border); border-radius: 10px; height: 8px; overflow: hidden;">
            <div style="background: var(--accent); height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
        </div>
        <small style="color: var(--muted);">${current}/${total} (${percentage.toFixed(1)}%)</small>
    `;
}

// 로컬 스토리지 헬퍼
function saveProgress(key, data) {
    localStorage.setItem(`cova_${key}`, JSON.stringify(data));
}

function loadProgress(key) {
    const data = localStorage.getItem(`cova_${key}`);
    return data ? JSON.parse(data) : null;
}

// 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('COVA Light Error:', e.error);
});

// 개발 모드 디버깅
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.covaDebug = {
        data: covaData,
        toggleTheme,
        scrollToElement,
        saveProgress,
        loadProgress
    };
    console.log('COVA Light Debug Mode - window.covaDebug available');
}