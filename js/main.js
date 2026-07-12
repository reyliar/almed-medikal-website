/* ============================================================
   ALMED MEDIKAL - 2026 INTERACTIVE SCRIPTS
   ============================================================ */

// === Hero Mavi Partikül Sistemi ===
(function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'heroParticleCanvas';
    canvas.className = 'hero-particles';
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const MAX = 60;
    let animId;
    
    function resize() {
        const rect = hero.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset(true);
        }
        reset(init) {
            this.x = Math.random() * canvas.width;
            this.y = init ? Math.random() * canvas.height : -15;
            this.size = Math.random() * 3 + 1.5;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.55 + 0.2;
            this.hue = Math.random() * 50 + 200;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.005;
        }
        update() {
            this.y += this.speedY;
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * 0.4;
            if (this.y > canvas.height + 15) {
                this.reset(false);
            }
            if (this.x < -15) this.x = canvas.width + 15;
            if (this.x > canvas.width + 15) this.x = -15;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 55%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < MAX; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(210, 50%, 55%, ${0.08 * (1 - dist/100)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        animId = requestAnimationFrame(animate);
    }
    animate();
})();

// === Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    }
    setTimeout(initHeroAnim, 900);
});

// === Hero Animation ===
function initHeroAnim() {
    const brand = document.querySelector('.hero-brand');
    const logo = brand?.querySelector('img');
    const text = brand?.querySelector('.brand-text');
    if (!logo || !text) return;
    
    // Başlangıç: logo ve text gizli
    logo.style.opacity = '0';
    text.style.opacity = '0';
    text.style.clipPath = 'inset(0 100% 0 0)';
    
    // Logo'nun orijinal pozisyonunu kaydet
    const finalRect = logo.getBoundingClientRect();
    
    // Rozet ortası = ekran merkezi
    const centerX = window.innerWidth / 2;
    const finalX = finalRect.left + finalRect.width / 2;
    const offsetX = centerX - finalX;
    
    // Logo'yu ANINDA merkeze ve yukarı taşı (transition OLMADAN)
    logo.style.transition = 'none';
    logo.style.transform = `translate(${offsetX}px, -100px)`;
    logo.style.opacity = '1';
    
    // Force reflow
    logo.offsetHeight;
    
    // 1. Yukarıdan merkeze düş
    logo.style.transition = 'transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
    logo.style.transform = `translate(${offsetX}px, 6px)`;
    
    setTimeout(() => {
        logo.style.transition = 'transform 0.3s ease-out';
        logo.style.transform = `translate(${offsetX}px, 0)`;
    }, 600);
    
    // 2. Merkezden sola kay + Medikal reveal
    setTimeout(() => {
        logo.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        logo.style.transform = 'translate(0, 0)';
        
        text.style.transition = 'clip-path 0.7s ease-out, opacity 0.1s ease';
        text.style.clipPath = 'inset(0 0 0 0)';
        text.style.opacity = '1';
    }, 1400);
}

// === Expandable Categories ===
function toggleCategory(card) {
    const detail = card.querySelector('.category-detail');
    const arrow = card.querySelector('.cat-arrow');
    if (!detail) return;
    const isOpen = detail.classList.contains('open');
    document.querySelectorAll('.category-detail.open').forEach(d => {
        if (d !== detail) { d.classList.remove('open'); d.previousElementSibling?.querySelector('.cat-arrow')?.classList.remove('rotated'); }
    });
    detail.classList.toggle('open');
    arrow?.classList.toggle('rotated');
}

// === Expandable List Items ===
function toggleListItem(li) {
    const detail = li.querySelector('.li-detail');
    const arrow = li.querySelector('.li-arrow i');
    if (!detail) return;
    const isOpen = detail.classList.contains('open');
    document.querySelectorAll('.li-detail.open').forEach(d => {
        if (d !== detail) { d.classList.remove('open'); d.parentElement?.querySelector('.li-arrow i')?.classList.remove('rotated'); }
    });
    detail.classList.toggle('open');
    arrow?.classList.toggle('rotated');
}

// === Navbar Scroll ===
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// === Mobile Menu ===
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// === Scroll Reveal ===
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
}

// === 3D Tilt on Product Images ===
function initProductTilt() {
    const cards = document.querySelectorAll('.showcase-card, .product-detail-card');
    if (!cards.length) return;
    cards.forEach(card => {
        const img = card.querySelector('.showcase-img-wrap img, .product-detail-img img');
        if (!img) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cX = rect.width / 2;
            const cY = rect.height / 2;
            const rY = ((x - cX) / cX) * 8;
            const rX = ((y - cY) / cY) * -5;
            img.style.transform = `scale(1.05) rotateY(${rY}deg) rotateX(${rX}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) rotateY(0) rotateX(0)';
        });
    });
}

// === Product Filter ===
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.showcase-card, .product-detail-card');
    if (!filterBtns.length || !cards.length) return;
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

// === Smooth Scroll ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// === Counter Animation ===
function initCounters() {
    const counters = document.querySelectorAll('.trust-number[data-target]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();
                (function update(now) {
                    const p = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(target * eased);
                    if (p < 1) requestAnimationFrame(update);
                    else el.textContent = target;
                })(start);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

// === Scroll Hide/Show Header ===
(function initScrollHeader() {
    const topBar = document.querySelector('.top-bar');
    const navbar = document.querySelector('.navbar');
    if (!topBar || !navbar) return;
    
    let lastScroll = 0;
    let ticking = false;
    const delta = 5;
    
    function getHeaderHeight() {
        return topBar.offsetHeight + navbar.offsetHeight;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                const totalH = getHeaderHeight();
                if (Math.abs(currentScroll - lastScroll) < delta) {
                    ticking = false;
                    return;
                }
                if (currentScroll > lastScroll && currentScroll > totalH) {
                    // Aşağı kaydırma → tamamen gizle
                    topBar.style.transform = `translateY(-${topBar.offsetHeight}px)`;
                    navbar.style.transform = `translateY(-${totalH}px)`;
                } else {
                    // Yukarı kaydırma → göster
                    topBar.style.transform = 'translateY(0)';
                    navbar.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// === Photo Album ===
(function initAlbum() {
    const album = document.querySelector('[data-album]');
    if (!album) return;
    
    const track = album.querySelector('.album-track');
    const slides = album.querySelectorAll('.album-slide');
    const prevBtn = album.querySelector('[data-album-prev]');
    const nextBtn = album.querySelector('[data-album-next]');
    const dotsContainer = album.querySelector('[data-album-dots]');
    const progressBar = album.querySelector('[data-album-bar]');
    const total = slides.length;
    const interval = 5000;
    let current = 0;
    let autoTimer;
    let progressTimer;
    let progressStart;
    
    // Create dots
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('button');
    
    function update() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    
    function startProgress() {
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            progressBar.offsetHeight; // force reflow
            progressBar.style.transition = `width ${interval}ms linear`;
            progressBar.style.width = '100%';
        }
    }
    
    function goTo(index) {
        current = ((index % total) + total) % total;
        update();
        resetAuto();
    }
    
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    
    function startAuto() {
        startProgress();
        autoTimer = setInterval(next, interval);
    }
    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }
    
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    
    update();
    startAuto();
})();

// === Init All ===
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initProductTilt();
    initProductFilter();
    initSmoothScroll();
    initCounters();
});
