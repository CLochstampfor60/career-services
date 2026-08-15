// =====================
// Animated Counter Logic
// =====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    counters.forEach(counter => {
        // Guard: only animate each counter once (metrics section can re-enter view).
        if (counter.dataset.counted === 'true') return;
        counter.dataset.counted = 'true';

        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;

        const render = (value) => {
            if (decimals > 0) {
                counter.textContent = value.toFixed(decimals) + suffix;
            } else {
                counter.textContent = Math.floor(value).toLocaleString() + suffix;
            }
        };

        // Fallback: no GSAP or reduced motion -> snap to final value.
        if (prefersReduced || typeof gsap === 'undefined') {
            render(target);
            return;
        }

        // GSAP tween for smooth easing on a proxy object.
        const proxy = { value: 0 };
        gsap.to(proxy, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => render(proxy.value),
            onComplete: () => render(target)
        });
    });
}

// =====================
// Scroll Reveal Logic
// =====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gsapReady = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

    // Fallback: reduced motion, or GSAP failed to load (e.g. CDN blocked).
    // Reveal everything immediately and still run the counters.
    if (prefersReduced || !gsapReady) {
        revealElements.forEach(el => el.classList.add('visible'));
        animateCounters();
        return;
    }

    // GSAP now owns the reveal animation via inline styles.
    document.documentElement.classList.add('js-gsap');
    gsap.registerPlugin(ScrollTrigger);

    revealElements.forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true
                },
                onStart: () => {
                    el.classList.add('visible');
                    // Trigger counters the moment the metrics section reveals.
                    if (el.querySelector('.counter-value')) {
                        animateCounters();
                    }
                }
            }
        );
    });

    // Ensure correct positions after fonts/images shift layout.
    ScrollTrigger.refresh();
}

// =====================
// Carousel Logic
// =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(n) {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}

// =====================
// Research Mini-Carousels (container-scoped)
// Each carousel acts only on the .cova-carousel-item children of its own
// container id, so multiple carousels (COVA "Pipeline in Action" and
// COVA-X "Scaling to 10K+") stay independent — and never collide with the
// File System project's global .carousel-item carousel above.
// =====================
function moveCarousel(containerId, dir) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = container.querySelectorAll('.cova-carousel-item');
    if (items.length === 0) return;
    let idx = Array.from(items).findIndex(item => item.classList.contains('active'));
    if (idx < 0) idx = 0;
    items[idx].classList.remove('active');
    idx = (idx + dir + items.length) % items.length;
    items[idx].classList.add('active');
}

// =====================
// Theme Toggle Logic
// =====================
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    initScrollReveal();

    const themeToggleBtn = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const htmlElement = document.documentElement;

    // Announce the toggle's state, not just its purpose: "Toggle dark mode"
    // alone never tells a screen-reader user which mode is currently active.
    function syncThemeButtonState(isDark) {
        themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // The sun/moon markup is authored for light mode, so a restored dark
    // session has to be reconciled here — otherwise the button would show
    // the moon (and announce "switch to dark") on an already-dark page.
    function syncThemeIcons(isDark) {
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
    }

    const startsDark = htmlElement.classList.contains('dark');
    syncThemeIcons(startsDark);
    syncThemeButtonState(startsDark);

    themeToggleBtn.addEventListener('click', function() {
        const isDark = htmlElement.classList.toggle('dark');
        syncThemeIcons(isDark);
        syncThemeButtonState(isDark);
        updateChartTheme(isDark);
        // Persist the explicit choice. Written on toggle only, so a reader
        // who never touches the button leaves no storage behind.
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) { /* storage unavailable — theme lasts this session only */ }
    });

    // =====================
    // Chart.js Configuration
    // =====================
    const ctx = document.getElementById('skillDistributionChart');
    let myRadarChart;
    const skillData = {
        labels: ['AI/ML Research', 'Compliance', 'IR/Hardening', 'Network Sec', 'AppSec'],
        datasets: [{
            label: 'Skill Strength (1-10)',
            data: [8, 9, 7, 7, 6],
            backgroundColor: 'rgba(129, 140, 248, 0.4)',
            borderColor: '#818CF8',
            borderWidth: 2,
            pointBackgroundColor: '#6670F0'
        }]
    };

    function getChartOptions(isDark) {
        const textColor = isDark ? '#f1f5f9' : '#1e293b';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        return {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: { 
                legend: { display: false }, 
                tooltip: { callbacks: { label: function(context) { return context.dataset.label + ': ' + context.raw; } } } 
            },
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    suggestedMin: 0,
                    suggestedMax: 10,
                    pointLabels: { font: { size: 11, weight: 'bold' }, color: textColor },
                    ticks: { display: false }
                }
            }
        };
    }

    if (ctx) {
        // Built from the live theme rather than a hard-coded `false`. That
        // constant was correct only while the page always started light;
        // with a restored dark session it would paint slate-800 axis labels
        // onto the dark card (1.3:1) until the toggle was pressed.
        myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: skillData,
            options: getChartOptions(htmlElement.classList.contains('dark'))
        });
    }
    
    function updateChartTheme(isDark) {
        if (myRadarChart) {
            myRadarChart.options = getChartOptions(isDark);
            myRadarChart.update();
        }
    }

    // =====================
    // Navigation Scrolling
    // =====================
    // =====================
    // =====================
    // Back to Top
    // Focus is moved to #main-content after scrolling so keyboard and
    // screen-reader users resume from the top rather than where they were.
    // =====================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        const mainContent = document.getElementById('main-content');
        let ticking = false;
        const SHOW_AFTER = 800;

        function syncBackToTop() {
            const show = window.scrollY > SHOW_AFTER;
            backToTop.classList.toggle('invisible', !show);
            backToTop.classList.toggle('opacity-0', !show);
            backToTop.classList.toggle('opacity-100', show);
            backToTop.classList.toggle('is-visible', show);
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) { ticking = true; window.requestAnimationFrame(syncBackToTop); }
        }, { passive: true });
        syncBackToTop();

        backToTop.addEventListener('click', () => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
            if (mainContent) mainContent.focus({ preventScroll: true });
        });
    }

    // Mobile Menu Toggle
    // The same <nav> is the desktop bar and the mobile dropdown; only its
    // `hidden` class differs, so there is one set of links to maintain.
    // =====================
    const menuToggle = document.getElementById('menuToggle');
    const primaryNav = document.getElementById('primaryNav');
    const menuIconOpen = document.getElementById('menuIconOpen');
    const menuIconClose = document.getElementById('menuIconClose');

    function setMenu(open) {
        if (!primaryNav || !menuToggle) return;
        primaryNav.classList.toggle('hidden', !open);
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        if (menuIconOpen && menuIconClose) {
            menuIconOpen.classList.toggle('hidden', open);
            menuIconClose.classList.toggle('hidden', !open);
        }
    }

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', () => {
            setMenu(primaryNav.classList.contains('hidden'));
        });
        // Close on Escape, and on tapping outside the header.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });
        document.addEventListener('click', (e) => {
            if (window.innerWidth >= 1024) return;
            if (primaryNav.classList.contains('hidden')) return;
            if (!e.target.closest('header')) setMenu(false);
        });
        // Reset to the desktop bar if the viewport grows past the md breakpoint.
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) setMenu(false);
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            // Collapse the mobile panel first so the sticky header measures correctly.
            if (window.innerWidth < 1024) setMenu(false);
            if (targetElement) {
                const offset = document.querySelector('header').offsetHeight + 20;
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});
