/**
 * FlowLab Main JavaScript
 * 공통 기능 및 인터랙션
 * ========================================
 */

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', () => {

  initNavbar();
  initMobileMenu();
  initScrollAnimations();
});



/**
 * 네비게이션 바 스크롤 효과
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // 초기 상태 체크
}

/**
 * 모바일 메뉴 토글
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // 링크 클릭 시 메뉴 닫기
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

/**
 * 스크롤 기반 애니메이션 (Intersection Observer)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;

        setTimeout(() => {
          el.classList.add('animate-fadeInUp');
          el.style.opacity = '1';
        }, delay);

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * 부드러운 스크롤 (앵커 링크)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
