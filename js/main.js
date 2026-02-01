/**
 * FlowLab Main JavaScript - Cosmic Flow Edition
 * 공통 기능 및 인터랙션
 * ========================================
 */

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initParallaxEffect();
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
    rootMargin: '0px 0px -80px 0px',
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
 * Hero 배경 요소 Parallax 효과
 */
function initParallaxEffect() {
  const meshOrbs = document.querySelectorAll('.mesh-orb');
  const geoShapes = document.querySelectorAll('.geo-shape');

  if (!meshOrbs.length && !geoShapes.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  // 마우스 위치 추적
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // 부드러운 애니메이션 루프
  function animate() {
    // 이징 적용
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    // Mesh Orbs에 적용 (다른 강도로)
    meshOrbs.forEach((orb, index) => {
      const factor = (index + 1) * 15;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });

    // Geo Shapes에 적용
    geoShapes.forEach((shape, index) => {
      const factor = (index + 1) * 8;
      shape.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
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
