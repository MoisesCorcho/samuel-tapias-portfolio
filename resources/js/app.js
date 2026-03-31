import './bootstrap';

import Alpine from 'alpinejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'motion';

gsap.registerPlugin(ScrollTrigger);

window.Alpine = Alpine;
Alpine.start();

// ─── Utility: split text into char spans ─────────────────────────────────────
function splitTextToChars(el) {
    const text = el.textContent.trim();
    el.innerHTML = '';
    el.setAttribute('aria-label', text);
    return text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.setAttribute('aria-hidden', 'true');
        el.appendChild(span);
        return span;
    });
}

// ─── Hero Animations ──────────────────────────────────────────────────────────
function initHeroAnimations() {
    const heroSection = document.querySelector('#hero-section');
    if (!heroSection) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Navbar entrance
    tl.from('.site-navbar', { y: -80, opacity: 0, duration: 0.8 }, 0);

    // Tag line badge
    const badge = heroSection.querySelector('.hero-badge');
    if (badge) {
        tl.from(badge, { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    }

    // Split and animate title characters — NO rotateX (causes blur + overflow clip)
    const titleEl = heroSection.querySelector('.hero-title');
    if (titleEl) {
        const chars = splitTextToChars(titleEl);
        tl.from(chars, {
            y: 50,
            opacity: 0,
            duration: 0.55,
            stagger: 0.025,
            ease: 'power3.out',
        }, 0.4);
    }

    // Name — animate as whole element (DO NOT split — gradient-text breaks with char spans)
    const nameEl = heroSection.querySelector('.hero-name');
    if (nameEl) {
        tl.from(nameEl, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
        }, 0.75);
    }

    // Subtitle paragraph
    const subtitleEl = heroSection.querySelector('.hero-subtitle');
    if (subtitleEl) {
        tl.from(subtitleEl, { y: 30, opacity: 0, duration: 0.7 }, 1.1);
    }

    // CTA Button
    const ctaEl = heroSection.querySelector('.hero-cta');
    if (ctaEl) {
        tl.from(ctaEl, { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, 1.3);
    }

    // Social icons stagger
    const socialIcons = heroSection.querySelectorAll('.hero-social a');
    if (socialIcons.length) {
        tl.from(socialIcons, {
            y: 12,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
        }, 1.4);
    }

    // Photo container
    const photoContainer = heroSection.querySelector('.hero-photo-container');
    if (photoContainer) {
        tl.from(photoContainer, {
            x: 60,
            opacity: 0,
            duration: 1.0,
            ease: 'power2.out',
        }, 0.5);
    }

    // Tech badge pills stagger
    const techBadges = heroSection.querySelectorAll('.tech-badge');
    if (techBadges.length) {
        tl.from(techBadges, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: 'power2.out',
        }, 1.5);
    }

    // Decorative floating orbs
    const orbs = document.querySelectorAll('.hero-orb');
    orbs.forEach((orb, i) => {
        gsap.to(orb, {
            y: i % 2 === 0 ? -20 : 20,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
        });
    });
}

// ─── Scroll Animations ────────────────────────────────────────────────────────
function initScrollAnimations() {

    // Generic fade-up for section headers
    gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });
    });

    // Stagger cards
    gsap.utils.toArray('.stagger-parent').forEach((parent) => {
        const children = parent.querySelectorAll('.stagger-child');
        if (!children.length) return;
        gsap.from(children, {
            scrollTrigger: {
                trigger: parent,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
        });
    });

    // Slide in from left
    gsap.utils.toArray('.reveal-left').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            x: -60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        });
    });

    // Slide in from right
    gsap.utils.toArray('.reveal-right').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        });
    });

    // About images stagger with scale
    const aboutImages = document.querySelectorAll('.about-img-item');
    if (aboutImages.length) {
        gsap.from(aboutImages, {
            scrollTrigger: {
                trigger: '.about-images-grid',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            scale: 0.85,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
        });
    }

    // Counter animations
    const counters = document.querySelectorAll('.count-up');
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: function () {
                        counter.textContent = Math.round(this.targets()[0].val);
                    },
                });
            },
        });
    });

    // Portfolio cards — GSAP entrance (gsap.from so final state is always natural/visible)
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
        const cards = portfolioSection.querySelectorAll('.portfolio-card');
        if (cards.length) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: portfolioSection,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                clearProps: 'opacity,transform',
            });
        }
    }

    // Section divider lines
    gsap.utils.toArray('.section-line').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.0,
            ease: 'power3.out',
        });
    });
}

// ─── Navbar Scroll Effect ─────────────────────────────────────────────────────
function initNavbarScroll() {
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;

    let lastY = 0;

    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            const currentY = self.scroll();
            if (currentY > 80) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            // Hide on scroll down, show on scroll up (after 200px)
            if (currentY > 200) {
                if (currentY > lastY) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            }
            lastY = currentY;
        },
    });
}

// ─── Magnetic Button Effect ───────────────────────────────────────────────────
function initMagneticButtons() {
    const magneticEls = document.querySelectorAll('.magnetic');
    magneticEls.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.3,
                ease: 'power2.out',
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ─── Parallax on hero background ─────────────────────────────────────────────
function initParallax() {
    const heroBg = document.querySelector('.hero-parallax-bg');
    if (!heroBg) return;
    gsap.to(heroBg, {
        scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
        y: 120,
        ease: 'none',
    });
}

// ─── Portfolio card hover glow + 3D tilt ──────────────────────────────────────
function initCardHovers() {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Cursor glow
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            // 3D tilt
            const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
            const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            gsap.to(card, { rotateX, rotateY, transformPerspective: 900, duration: 0.35, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

// ─── Portfolio filter pill (sliding background indicator) ─────────────────────
function initPortfolioFilterPill() {
    const pill    = document.getElementById('filter-pill');
    const wrapper = document.getElementById('filter-tabs-wrapper');
    if (!pill || !wrapper) return;

    // Wait one tick so flex layout is fully painted
    requestAnimationFrame(() => {
        const allTab     = wrapper.querySelector('[data-tab="all"]');
        if (!allTab) return;
        const tabRect     = allTab.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        gsap.set(pill, {
            x:      tabRect.left - wrapperRect.left,
            y:      tabRect.top  - wrapperRect.top,
            width:  tabRect.width,
            height: tabRect.height,
        });
    });
}

// ─── Portfolio filter with GSAP card animations ───────────────────────────────
function _addFilterRipple(btn, e) {
    const ripple = document.createElement('span');
    ripple.className = 'filter-ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top  = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

window.portfolioFilter = function(tab, event) {
    const section = document.getElementById('portfolio');
    if (!section) return;

    const alpineData = Alpine.$data(section);
    if (alpineData.selectedTab === tab) return; // already active
    alpineData.selectedTab = tab;

    // Move pill
    const pill    = document.getElementById('filter-pill');
    const wrapper = document.getElementById('filter-tabs-wrapper');
    if (pill && wrapper && event) {
        const btn         = event.currentTarget;
        const tabRect     = btn.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        gsap.to(pill, {
            x:      tabRect.left - wrapperRect.left,
            width:  tabRect.width,
            duration: 0.4,
            ease: 'power3.inOut',
        });
        _addFilterRipple(btn, event);
    }

    // Determine which cards enter / leave
    const allCards = document.querySelectorAll('[data-categories]');
    const hiding   = [];
    const showing  = [];

    allCards.forEach((card) => {
        const cats      = JSON.parse(card.dataset.categories || '[]');
        const visible   = !card.classList.contains('hidden');
        const shouldShow = tab === 'all' || cats.includes(tab);
        if (visible  && !shouldShow) hiding.push(card);
        if (!visible &&  shouldShow) showing.push(card);
    });

    function animateIn(cards) {
        if (!cards.length) return;
        cards.forEach((c) => {
            c.classList.remove('hidden');
            gsap.set(c, { opacity: 0, scale: 0.85, y: 30 });
        });
        gsap.to(cards, {
            scale: 1, opacity: 1, y: 0,
            stagger: 0.07, duration: 0.45, ease: 'back.out(1.5)',
            onComplete() {
                gsap.set(cards, { clearProps: 'all' });
                const badges = cards.map((c) => c.querySelector('.category-badge')).filter(Boolean);
                if (badges.length) {
                    gsap.from(badges, { scale: 0, duration: 0.3, stagger: 0.05, ease: 'back.out(1.7)', delay: 0.05 });
                }
            },
        });
    }

    if (hiding.length) {
        gsap.to(hiding, {
            scale: 0.85, opacity: 0, y: 20,
            stagger: 0.04, duration: 0.25,
            onComplete() {
                hiding.forEach((c) => {
                    c.classList.add('hidden');
                    gsap.set(c, { clearProps: 'all' });
                });
                animateIn(showing);
            },
        });
    } else {
        animateIn(showing);
    }
};

// ─── Hero Particle Network (interactive canvas background) ────────────────────
function initHeroParticles() {
    const canvas = document.getElementById('hero-bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    const mouse = { x: -9999, y: -9999 };

    const PARTICLE_COUNT  = 90;
    const CONNECT_DIST    = 140;
    const MOUSE_RADIUS    = 160;
    const RIPPLE_PUSH     = 160;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Particle class ────────────────────────────────────────────────────────
    class Particle {
        constructor() { this.spawn(); }
        spawn() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 1.1;
            this.vy = (Math.random() - 0.5) * 1.1;
            this.r  = Math.random() * 1.8 + 0.8;
            this.a  = Math.random() * 0.45 + 0.15;
        }
        update() {
            // Damping suave — mantiene movimiento continuo
            this.vx *= 0.995;
            this.vy *= 0.995;
            // Velocidad mínima para que nunca se detengan
            const speed = Math.hypot(this.vx, this.vy);
            if (speed < 0.3) {
                const angle = Math.random() * Math.PI * 2;
                this.vx += Math.cos(angle) * 0.15;
                this.vy += Math.sin(angle) * 0.15;
            }
            this.x  += this.vx;
            this.y  += this.vy;
            // Wrap edges
            if (this.x < -10) this.x = W + 10;
            if (this.x > W + 10) this.x = -10;
            if (this.y < -10) this.y = H + 10;
            if (this.y > H + 10) this.y = -10;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245,158,11,${this.a})`;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    // ── Ripple pool ───────────────────────────────────────────────────────────
    const ripples = [];

    // ── Mouse events — en hero-section para capturar toda el área ────────────
    const heroSection = document.getElementById('hero-section');
    const eventTarget = heroSection || canvas;

    eventTarget.addEventListener('mousemove', (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
    });
    eventTarget.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    // ── Click: ripple + atraer partículas ─────────────────────────────────────
    eventTarget.addEventListener('click', (e) => {
        const r  = canvas.getBoundingClientRect();
        const cx = e.clientX - r.left;
        const cy = e.clientY - r.top;

        // Spawn ripple rings
        ripples.push({ x: cx, y: cy, r: 0, maxR: 130, opacity: 0.7, ring: 1 });
        ripples.push({ x: cx, y: cy, r: 0, maxR: 80,  opacity: 0.4, ring: 2 });

        // Atraer partículas cercanas hacia el punto de click para que se unan
        particles.forEach((p) => {
            const dx   = cx - p.x;
            const dy   = cy - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < RIPPLE_PUSH && dist > 0) {
                const force = (RIPPLE_PUSH - dist) / RIPPLE_PUSH * 3.5;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }
        });
    });

    // ── Draw connections ──────────────────────────────────────────────────────
    function drawEdges() {
        for (let i = 0; i < particles.length; i++) {
            const pi = particles[i];

            // Particle-to-particle
            for (let j = i + 1; j < particles.length; j++) {
                const pj   = particles[j];
                const dx   = pi.x - pj.x;
                const dy   = pi.y - pj.y;
                const dist = Math.hypot(dx, dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(pi.x, pi.y);
                    ctx.lineTo(pj.x, pj.y);
                    ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
                    ctx.lineWidth   = 0.6;
                    ctx.stroke();
                }
            }

            // Particle-to-mouse
            const mdx   = pi.x - mouse.x;
            const mdy   = pi.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < MOUSE_RADIUS) {
                const alpha = (1 - mdist / MOUSE_RADIUS) * 0.55;
                ctx.beginPath();
                ctx.moveTo(pi.x, pi.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(251,191,36,${alpha})`;
                ctx.lineWidth   = 0.8;
                ctx.stroke();
            }
        }
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    function loop() {
        requestAnimationFrame(loop);
        ctx.clearRect(0, 0, W, H);

        // Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
            const rp = ripples[i];
            rp.r       += 2.8;
            rp.opacity -= 0.012;
            if (rp.opacity <= 0) { ripples.splice(i, 1); continue; }
            ctx.beginPath();
            ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(245,158,11,${rp.opacity})`;
            ctx.lineWidth   = rp.ring === 1 ? 1.5 : 0.8;
            ctx.stroke();
        }

        drawEdges();
        particles.forEach((p) => { p.update(); p.draw(); });
    }

    loop();
}

// ─── Noise Circles (SimplexNoise + GSAP scrub) ───────────────────────────────
function initNoiseCircles() {
    const container = document.getElementById('noise-circles');
    if (!container || typeof SimplexNoise === 'undefined') return;

    const simplex = new SimplexNoise();
    // Fewer circles on mobile to preserve performance
    const COUNT = window.innerWidth < 768 ? 800 : 2500;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < COUNT; i++) {
        const div = document.createElement('div');
        div.classList.add('noise-circle');

        const n1 = simplex.noise2D(i * 0.003,  i * 0.0033);
        const n2 = simplex.noise2D(i * 0.002,  i * 0.001);

        div.style.transform  = `translate(${n2 * 260}px) rotate(${n2 * 270}deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`;
        div.style.boxShadow  = `0 0 0 .2px hsla(${Math.floor(i * 0.3)}, 75%, 65%, 0.45)`;

        fragment.appendChild(div);
    }
    container.appendChild(fragment);

    const circles = container.querySelectorAll('.noise-circle');

    // Sequential reveal tied to scroll — faithful to the original technique
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            scrub: 0.7,
            start: 'top 75%',
            end:   'bottom 25%',
        },
    });

    circles.forEach((circle) => tl.to(circle, { opacity: 1 }));
}

// ─── Text Scramble ────────────────────────────────────────────────────────────
function initTextScramble() {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

    function scramble(el) {
        const original = el.getAttribute('data-original') || el.textContent.trim();
        if (!el.getAttribute('data-original')) el.setAttribute('data-original', original);

        let frame = 0;
        const totalFrames = original.length * 4;

        const interval = setInterval(() => {
            el.textContent = original.split('').map((char, i) => {
                if (char === ' ') return ' ';
                if (i < Math.floor(frame / 4)) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');
            frame++;
            if (frame >= totalFrames) {
                clearInterval(interval);
                el.textContent = original;
            }
        }, 30);
    }

    document.querySelectorAll('[data-scramble]').forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => scramble(el),
        });
    });
}

// ─── Clip-path Reveal ─────────────────────────────────────────────────────────
function initClipReveal() {
    document.querySelectorAll('[data-clip-reveal]').forEach((el) => {
        gsap.fromTo(el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
}

// ─── Parallax Background Text ─────────────────────────────────────────────────
function initParallaxBgText() {
    document.querySelectorAll('[data-parallax-bg]').forEach((el) => {
        gsap.to(el, {
            yPercent: -25,
            ease: 'none',
            scrollTrigger: {
                trigger: el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
        });
    });
}

// ─── SVG Squiggles Background (parametrizable) ────────────────────────────────
function initVgSquiggles(sectionId = 'videogame', svgId = 'vg-squiggles-stage', bgColor = '#0a0a1a') {
    const section = document.getElementById(sectionId);
    const svg     = document.getElementById(svgId);
    if (!section || !svg) return;

    const BG_COLOR  = bgColor;
    const VG_COLORS = ['#00d4ff', '#ff0080', '#39ff14', '#f7df1e', '#ff6b35', '#a855f7'];

    function randomColor() {
        return VG_COLORS[Math.floor(Math.random() * VG_COLORS.length)];
    }

    function onResize() {
        svg.setAttribute('width',  String(section.offsetWidth));
        svg.setAttribute('height', String(section.offsetHeight));
    }
    onResize();
    window.addEventListener('resize', onResize);

    function buildPath(s, grid) {
        let x = s.x, y = s.y, dx = s.directionX, dy = s.directionY;
        const parts = ['M', x, y, 'Q'];
        let step = 0;

        function newDir(axis, goAnywhere) {
            const key = 'direction' + axis.toUpperCase();
            if (!goAnywhere && s[key] !== 0) return s[key];
            return Math.random() < 0.5 ? -1 : 1;
        }

        while (step < s.sections * 2) {
            step++;
            x += (dx * (step / 30)) * grid;
            y += (dy * (step / 30)) * grid;
            if (step !== 1) parts.push(',');
            parts.push(x, y);
            if (step % 2 !== 0) {
                dx = dx === 0 ? newDir('x', step > 8) : 0;
                dy = dy === 0 ? newDir('y', step > 8) : 0;
            }
        }
        return parts.join(' ');
    }

    function spawnSquiggle(settings, grid) {
        const pathStr  = buildPath(settings, grid);
        const count    = 3;
        let completed  = 0;

        for (let i = 0; i < count; i++) {
            const isEraser = i === count - 1;
            const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            el.setAttribute('d', pathStr);
            el.style.fill         = 'none';
            el.style.stroke       = isEraser ? BG_COLOR : randomColor();
            el.style.strokeLinecap = 'round';
            el.style.strokeWidth  = '0px';

            const totalLen = el.getTotalLength();
            const chunkLen = totalLen / 6;
            el.style.strokeDasharray  = `${chunkLen}, ${totalLen + chunkLen}`;
            el.style.strokeDashoffset = `${chunkLen}`;

            svg.appendChild(el);

            const proxy = { offset: chunkLen, width: 0 };
            gsap.to(proxy, {
                offset:   -totalLen,
                width:    settings.sections * 0.9,
                duration: settings.sections * 0.1,
                ease:     'power1.out',
                delay:    i * (settings.sections * 0.01),
                onUpdate() {
                    el.style.strokeDashoffset = `${proxy.offset}`;
                    el.style.strokeWidth      = `${proxy.width}px`;
                },
                onComplete() {
                    el.remove();
                    completed++;
                },
            });
        }
    }

    let lastMousePos = null;
    let direction    = null;

    function getPos(e) {
        const rect = section.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function createFromMouse(pos) {
        let sections = 4;
        if (lastMousePos) {
            const newDir = { x: 0, y: 0 };
            const xAmt = Math.abs(lastMousePos.x - pos.x);
            const yAmt = Math.abs(lastMousePos.y - pos.y);
            if (xAmt > yAmt) {
                newDir.x = lastMousePos.x - pos.x < 0 ? 1 : -1;
                sections += Math.round(xAmt / 4);
            } else {
                newDir.y = lastMousePos.y - pos.y < 0 ? 1 : -1;
                sections += Math.round(yAmt / 4);
            }
            direction = newDir;
        }
        if (direction && lastMousePos) {
            spawnSquiggle({
                x:          lastMousePos.x,
                y:          lastMousePos.y,
                directionX: direction.x,
                directionY: direction.y,
                sections:   Math.min(sections, 20),
            }, 10 + Math.random() * (Math.min(sections, 20) * 1.5));
        }
        lastMousePos = pos;
    }

    function burst(fromMouse) {
        for (let i = 0; i < 5; i++) {
            const dx = Math.random() > 0.5 ? 1 : -1;
            spawnSquiggle({
                x:          fromMouse && lastMousePos ? lastMousePos.x : section.offsetWidth  / 2,
                y:          fromMouse && lastMousePos ? lastMousePos.y : section.offsetHeight / 2,
                directionX: dx,
                directionY: 0,
                sections:   5 + Math.round(Math.random() * 15),
            }, 15 + Math.random() * 25);
        }
    }

    // Mousemove always triggers squiggles (no hold needed — matches original behaviour)
    section.addEventListener('mousedown', e  => { lastMousePos = getPos(e); });
    section.addEventListener('mousemove', e  => {
        const pos = getPos(e);
        for (let i = 0; i < 3; i++) createFromMouse(pos);
    });
    section.addEventListener('mouseup',   ()  => burst(true));

    section.addEventListener('touchstart', e => {
        lastMousePos = getPos(e.changedTouches[0]);
    }, { passive: true });
    section.addEventListener('touchmove', e => {
        e.preventDefault();
        const pos = getPos(e.changedTouches[0]);
        for (let i = 0; i < 3; i++) createFromMouse(pos);
    }, { passive: false });
    section.addEventListener('touchend', () => burst(true));
}

// ─── Videogame Section ────────────────────────────────────────────────────────
function initVideogameSection() {
    const section = document.querySelector('#videogame');
    if (!section) return;

    // ── Screenshot gallery ───────────────────────────────────────────────────
    const gallery = section.querySelector('#vg-gallery');
    if (gallery) {
        const shots = Array.from(gallery.querySelectorAll('.vg-screenshot'));
        const dots  = Array.from(gallery.querySelectorAll('.vg-gallery-dot'));
        let current = 0;
        let autoTimer;

        function showSlide(index) {
            shots[current].classList.remove('vg-screenshot--active');
            dots[current].classList.remove('vg-gallery-dot--active');
            current = index;
            shots[current].classList.add('vg-screenshot--active');
            dots[current].classList.add('vg-gallery-dot--active');
        }

        function nextSlide() {
            showSlide((current + 1) % shots.length);
        }

        autoTimer = setInterval(nextSlide, 3500);

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                clearInterval(autoTimer);
                showSlide(i);
                autoTimer = setInterval(nextSlide, 3500);
            });
        });
    }

    // ── Stagger entrance of .vg-animate-in elements ─────────────────────────
    const animEls = section.querySelectorAll('.vg-animate-in');
    if (animEls.length) {
        gsap.to(animEls, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
        });
    }

    // ── Title pixel glitch — repeats every 4s while section is visible ─────
    const title = section.querySelector('.vg-title');
    if (title) {
        const originalShadow = title.style.textShadow;
        let glitchLoop = null;

        function runGlitch() {
            let count = 0;
            const burst = setInterval(() => {
                if (count >= 8) {
                    clearInterval(burst);
                    title.style.textShadow = originalShadow;
                    return;
                }
                title.style.textShadow = count % 2 === 0
                    ? `${4 + count}px 4px 0px #ff0080, -4px -4px 0px #00d4ff`
                    : `4px 4px 0px #ff0080, 8px 8px 0px rgba(255,0,128,0.3)`;
                count++;
            }, 80);
        }

        // IntersectionObserver — immune to GSAP ScrollTrigger refreshes
        // (pins in prior sections can cause ScrollTrigger to mis-fire onLeave)
        const glitchObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runGlitch();
                    if (!glitchLoop) {
                        glitchLoop = setInterval(runGlitch, 4000);
                    }
                } else {
                    clearInterval(glitchLoop);
                    glitchLoop = null;
                    title.style.textShadow = originalShadow;
                }
            });
        }, { threshold: 0.3 });

        glitchObserver.observe(title);
    }

    // ── CRT wipe transition on enter ────────────────────────────────────────
    gsap.fromTo(section,
        { clipPath: 'inset(0 100% 0 0)' },
        {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'steps(12)',
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        }
    );

    // ── Scroll indicator hide when leaving section ──────────────────────────
    const scrollIndicator = document.getElementById('vg-scroll-indicator');
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 0.9,
            ease: 'sine.inOut',
        });
        ScrollTrigger.create({
            trigger: section,
            start: 'bottom 80%',
            onEnter: () => gsap.to(scrollIndicator, { opacity: 0, duration: 0.4 }),
            onLeaveBack: () => gsap.to(scrollIndicator, { opacity: 1, duration: 0.4 }),
        });
    }

    // ── Scroll-out: pixel elements fly upward ───────────────────────────────
    gsap.to(section.querySelector('.container'), {
        y: -40,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'bottom 60%',
            end: 'bottom top',
            scrub: 1,
        },
    });
}

// ─── Videogame Section — Pixel Fireworks Canvas ───────────────────────────────
function initVgFireworks() {
    const section = document.getElementById('videogame');
    const canvas  = document.getElementById('vg-fireworks-canvas');
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    // ── Config ────────────────────────────────────────────────────────────────
    const PX       = 4;      // pixel grid size
    const GRAVITY  = 0.10;
    const FRICTION = 0.986;
    const TRAIL    = 10;
    const STARS    = 200;
    const MAX_R    = 24;
    const MAX_P    = 5000;
    const HOLD_MS  = 3200;   // ms formation particles hold their position

    const PALETTE = [
        '#00d4ff', '#ff0080', '#39ff14', '#f59e0b',
        '#f7df1e', '#ff6b35', '#ffffff', '#c084fc',
        '#4040FF', '#FFD700', '#FF60B0', '#00FFFF',
    ];

    const rand    = (a, b) => Math.random() * (b - a) + a;
    const randInt = (a, b) => Math.floor(rand(a, b + 1));
    const rColor  = ()     => PALETTE[randInt(0, PALETTE.length - 1)];
    const lerp    = (a, b, t) => a + (b - a) * t;
    const dist2   = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // ── State ─────────────────────────────────────────────────────────────────
    let W = 0, H = 0;
    let stars     = [];
    let rockets   = [];
    let particles = [];
    let animId    = null;
    let running   = false;
    let nextLaunch      = 0;
    let nextShapeLaunch = 0;

    // ── Audio Engine ──────────────────────────────────────────────────────────
    const Audio = {
        ac: null, master: null, ready: false,

        init() {
            if (this.ac) return;
            try {
                this.ac     = new (window.AudioContext || window.webkitAudioContext)();
                this.master = this.ac.createGain();
                this.master.gain.value = 0.22;
                this.master.connect(this.ac.destination);
                this.ready  = true;
            } catch (_) {}
        },

        _noise(dur, bandF1, bandF2, gainPeak) {
            if (!this.ready) return;
            const now = this.ac.currentTime;
            try {
                const buf  = this.ac.createBuffer(1, this.ac.sampleRate * dur, this.ac.sampleRate);
                const data = buf.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                    const t = i / this.ac.sampleRate;
                    data[i] = (Math.random() * 2 - 1)
                        * (1 - Math.exp(-t * 30))
                        * Math.exp(-t * 2.8)
                        * 0.5;
                }
                const src = this.ac.createBufferSource();
                src.buffer = buf;
                const filt = this.ac.createBiquadFilter();
                filt.type = 'bandpass'; filt.Q.value = 2;
                filt.frequency.setValueAtTime(bandF1, now);
                filt.frequency.exponentialRampToValueAtTime(bandF2, now + dur * 0.6);
                const g = this.ac.createGain();
                g.gain.setValueAtTime(gainPeak, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + dur);
                src.connect(filt); filt.connect(g); g.connect(this.master);
                src.start(); src.stop(now + dur);
            } catch (_) {}
        },

        launch() {
            if (!this.ready) return;
            this._noise(0.7, 400, 3000, 0.6);
            try {
                const now = this.ac.currentTime;
                const osc = this.ac.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(2600, now + 0.7);
                const g = this.ac.createGain();
                g.gain.setValueAtTime(0.08, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
                osc.connect(g); g.connect(this.master);
                osc.start(); osc.stop(now + 0.7);
            } catch (_) {}
        },

        // Regular firework explosion — boom + crackle
        explode() {
            if (!this.ready) return;
            const now = this.ac.currentTime;
            try {
                const boom = this.ac.createOscillator();
                boom.type = 'sine';
                boom.frequency.setValueAtTime(150, now);
                boom.frequency.exponentialRampToValueAtTime(15, now + 0.5);
                const bGain = this.ac.createGain();
                bGain.gain.setValueAtTime(0.35, now);
                bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                const lp = this.ac.createBiquadFilter();
                lp.type = 'lowpass'; lp.frequency.value = 260;
                boom.connect(lp); lp.connect(bGain); bGain.connect(this.master);
                boom.start(); boom.stop(now + 0.5);

                // crackle burst
                const crk = this.ac.createBuffer(1, this.ac.sampleRate * 0.2, this.ac.sampleRate);
                const cd  = crk.getChannelData(0);
                for (let i = 0; i < cd.length; i++) {
                    const t = i / this.ac.sampleRate;
                    cd[i] = (Math.random() * 2 - 1) * Math.exp(-t * 15);
                }
                const cSrc = this.ac.createBufferSource();
                cSrc.buffer = crk;
                const cFilt = this.ac.createBiquadFilter();
                cFilt.type = 'highpass'; cFilt.frequency.value = 1000;
                const cGain = this.ac.createGain();
                cGain.gain.setValueAtTime(0.2, now);
                cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                cSrc.connect(cFilt); cFilt.connect(cGain); cGain.connect(this.master);
                cSrc.start();
            } catch (_) {}
        },

        // Formation shape explosion — softer, higher-pitched sparkle disperse
        formation() {
            if (!this.ready) return;
            const now = this.ac.currentTime;
            try {
                const osc = this.ac.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(2400, now + 0.3);
                const g = this.ac.createGain();
                g.gain.setValueAtTime(0.12, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(g); g.connect(this.master);
                osc.start(); osc.stop(now + 0.35);
                this._noise(0.25, 2000, 6000, 0.08);
            } catch (_) {}
        },

        // Single crackle tick — short noise burst, highpass filtered
        _crackle() {
            if (!this.ready) return;
            try {
                const noise = this.ac.createBuffer(1, this.ac.sampleRate * 0.05, this.ac.sampleRate);
                const data  = noise.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noise.length * 0.3));
                }
                const src    = this.ac.createBufferSource();
                src.buffer   = noise;
                const filter = this.ac.createBiquadFilter();
                filter.type  = 'highpass';
                filter.frequency.value = 3000;
                const gain       = this.ac.createGain();
                gain.gain.value  = 0.07;
                src.connect(filter); filter.connect(gain); gain.connect(this.master);
                src.start();
            } catch (_) {}
        },

        // Shape dissolve — papeletas/chisporroteo: burst of crackle ticks
        dissolve() {
            if (!this.ready) return;
            const count  = 12 + Math.floor(Math.random() * 6);   // 12–17 ticks
            const spread = 320;                                    // total duration ms
            for (let i = 0; i < count; i++) {
                // Non-uniform spacing: more dense at start, sparse at end
                const t = (i / count) ** 1.6 * spread;
                setTimeout(() => this._crackle(), t);
            }
        },
    };

    // Unlock audio on first scroll or click inside section
    let audioUnlocked = false;
    function unlockAudio() {
        if (audioUnlocked) return;
        audioUnlocked = true;
        Audio.init();
        section.removeEventListener('click',  unlockAudio);
        window .removeEventListener('scroll', unlockAudio);
    }
    section.addEventListener('click',  unlockAudio);
    window .addEventListener('scroll', unlockAudio, { passive: true, once: true });

    // ── Canvas resize ─────────────────────────────────────────────────────────
    function resize() {
        W = section.offsetWidth;
        H = section.offsetHeight;
        canvas.width  = W;
        canvas.height = H;
        stars = Array.from({ length: STARS }, () => ({
            x:  rand(0, W),
            y:  rand(0, H),
            br: rand(0, Math.PI * 2),
            sp: rand(0.02, 0.06),
            sz: randInt(1, 2),
        }));
    }

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    // ── Shape generators ──────────────────────────────────────────────────────
    function genCircle(cx, cy, r, n) {
        const pts = [];
        for (let i = 0; i < n; i++) {
            const a = (Math.PI * 2 * i) / n;
            pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
        }
        return pts;
    }

    function genStar(cx, cy, or, ir, n) {
        const pts = [];
        for (let i = 0; i < n * 2; i++) {
            const a = (Math.PI * 2 * i) / (n * 2) - Math.PI / 2;
            const r = i % 2 === 0 ? or : ir;
            pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
        }
        return pts;
    }

    // ── Rocket helpers ────────────────────────────────────────────────────────
    function spawnRocket() {
        if (rockets.length >= MAX_R) return;
        rockets.push({
            x:       rand(W * 0.08, W * 0.92),
            y:       H + 10,
            targetY: rand(H * 0.05, H * 0.50),
            color:   rColor(),
            speed:   rand(16, 22),
            trail:   [],
            done:    false,
            targets: null,
        });
        Audio.launch();
    }

    // Launch a shape: splits pts into groups, each group = one rocket
    function launchShape(pts, color) {
        const groups = Math.min(8, Math.ceil(pts.length / 25));
        const size   = Math.ceil(pts.length / groups);
        for (let g = 0; g < groups; g++) {
            setTimeout(() => {
                if (!running) return;
                const group = pts.slice(g * size, (g + 1) * size);
                const ax    = group.reduce((s, p) => s + p.x, 0) / group.length;
                const ay    = group.reduce((s, p) => s + p.y, 0) / group.length;
                if (rockets.length < MAX_R) {
                    rockets.push({
                        x:       ax,
                        y:       H + 10,
                        targetY: ay,
                        color,
                        speed:   rand(16, 22),
                        trail:   [],
                        done:    false,
                        targets: group,
                    });
                    Audio.launch();
                }
            }, g * 65);
        }
    }

    // Schedule a random shape (circle or star)
    function spawnShape() {
        const cx    = rand(W * 0.15, W * 0.85);
        const cy    = rand(H * 0.10, H * 0.52);
        const color = rColor();
        const pts   = Math.random() < 0.55
            ? genCircle(cx, cy, rand(55, Math.min(130, W * 0.12)), 40)
            : genStar(cx, cy, rand(70, Math.min(150, W * 0.14)), rand(30, 60), 5);
        launchShape(pts, color);
    }

    function explodeRocket(r) {
        r.done = true;

        if (r.targets && r.targets.length) {
            // Formation explosion — particles fly to shape targets
            Audio.formation();
            r.targets.forEach((tg) => {
                if (particles.length >= MAX_P) return;
                particles.push({
                    x:       r.x + rand(-12, 12),
                    y:       r.y + rand(-12, 12),
                    tx:      tg.x,
                    ty:      tg.y,
                    color:   r.color,
                    vx:      rand(-9, 9),
                    vy:      rand(-9, 9),
                    phase:   'flying',
                    holdMs:  HOLD_MS,
                    life:    255,
                    maxLife: 255,
                    size:    PX,
                    shimmer: rand(0, Math.PI * 2),
                    isFormation: true,
                    dissolved: false,
                });
            });
        } else {
            // Regular radial explosion
            Audio.explode();
            const count = randInt(60, 90);
            for (let p = 0; p < count; p++) {
                if (particles.length >= MAX_P) break;
                const angle = (Math.PI * 2 * p / count) + rand(-0.12, 0.12);
                const speed = rand(3, 11);
                particles.push({
                    x:       r.x,
                    y:       r.y,
                    color:   Math.random() < 0.15 ? '#ffffff' : r.color,
                    vx:      Math.cos(angle) * speed,
                    vy:      Math.sin(angle) * speed,
                    life:    rand(70, 130),
                    maxLife: 130,
                    size:    rand(PX * 0.4, PX),
                    shimmer: rand(0, Math.PI * 2),
                    isFormation: false,
                });
            }
        }
    }

    // ── Main render loop ──────────────────────────────────────────────────────
    function draw() {
        if (!running) return;
        animId = requestAnimationFrame(draw);

        const now = performance.now();

        // Dark space background — slight trail effect
        ctx.fillStyle = 'rgba(1, 4, 22, 0.88)';
        ctx.fillRect(0, 0, W, H);

        // ── Stars ────────────────────────────────────────────────────────────
        for (const s of stars) {
            s.br += s.sp;
            const a  = (Math.sin(s.br) + 1) / 2;
            const fc = a > 0.72 ? '#ffffff' : a > 0.42 ? '#00d4ff' : '#9966ff';
            ctx.globalAlpha = a * 0.85;
            ctx.fillStyle   = fc;
            const px = Math.floor(s.x / PX) * PX;
            const py = Math.floor(s.y / PX) * PX;
            ctx.fillRect(px, py, s.sz * PX, s.sz * PX);
        }
        ctx.globalAlpha = 1;

        // ── Auto-launch regular rockets ───────────────────────────────────────
        if (now >= nextLaunch) {
            spawnRocket();
            nextLaunch = now + rand(1800, 4500);
        }

        // ── Auto-launch shape rockets ─────────────────────────────────────────
        if (now >= nextShapeLaunch) {
            spawnShape();
            nextShapeLaunch = now + rand(10000, 18000);
        }

        // ── Rockets ───────────────────────────────────────────────────────────
        for (let i = rockets.length - 1; i >= 0; i--) {
            const r = rockets[i];
            if (r.done) { rockets.splice(i, 1); continue; }

            r.trail.unshift({ x: r.x, y: r.y });
            if (r.trail.length > TRAIL) r.trail.pop();
            r.y    -= r.speed;
            r.speed *= 0.982;

            for (let t = 0; t < r.trail.length; t++) {
                const tp = r.trail[t];
                ctx.globalAlpha = (1 - t / r.trail.length) * 0.65;
                ctx.fillStyle   = r.color;
                ctx.fillRect(
                    Math.floor(tp.x / PX) * PX,
                    Math.floor(tp.y / PX) * PX,
                    PX, PX * 1.4,
                );
            }
            ctx.globalAlpha = 1;

            ctx.save();
            ctx.shadowColor = r.color;
            ctx.shadowBlur  = 14;
            ctx.fillStyle   = r.color;
            ctx.beginPath(); ctx.arc(r.x, r.y, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, Math.PI * 2); ctx.fill();
            ctx.restore();

            if (r.y <= r.targetY || r.speed < 2) explodeRocket(r);
        }

        // ── Particles ─────────────────────────────────────────────────────────
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.shimmer += 0.22;

            if (p.isFormation) {
                // ── Formation particle — phase state machine ──────────────────
                if (p.phase === 'flying') {
                    const d = dist2(p.x, p.y, p.tx, p.ty);
                    if (d > 3) {
                        const spd = Math.min(d * 0.20, 22);
                        p.vx = lerp(p.vx, ((p.tx - p.x) / d) * spd, 0.18);
                        p.vy = lerp(p.vy, ((p.ty - p.y) / d) * spd, 0.18);
                        p.x += p.vx;
                        p.y += p.vy;
                    } else {
                        p.x = p.tx;
                        p.y = p.ty;
                        p.phase = 'holding';
                    }
                } else if (p.phase === 'holding') {
                    p.x = p.tx;
                    p.y = p.ty;
                    p.holdMs -= 16;
                    if (p.holdMs <= 0) {
                        p.phase = 'falling';
                        p.vx = rand(-2, 2);
                        p.vy = rand(-1, 1);
                        if (!p.dissolved) { p.dissolved = true; Audio.dissolve(); }
                    }
                } else {
                    // falling
                    p.vy += GRAVITY;
                    p.vx *= FRICTION;
                    p.vy *= FRICTION;
                    p.x  += p.vx;
                    p.y  += p.vy;
                    p.life -= 2.2;
                }

                if (p.life <= 0 || p.y > H + 80) { particles.splice(i, 1); continue; }

                const sh = (Math.sin(p.shimmer) + 1) / 2;

                if (p.phase === 'flying' || p.phase === 'holding') {
                    ctx.save();
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur  = 8 + sh * 6;
                    ctx.globalAlpha = p.phase === 'holding' ? 0.82 + sh * 0.18 : 0.9;
                    ctx.fillStyle   = sh > 0.8 ? '#ffffff' : p.color;
                    ctx.fillRect(
                        Math.floor(p.x / PX) * PX,
                        Math.floor(p.y / PX) * PX,
                        p.size, p.size,
                    );
                    ctx.restore();
                } else {
                    ctx.globalAlpha = (p.life / p.maxLife);
                    ctx.fillStyle   = p.color;
                    ctx.fillRect(
                        Math.floor(p.x / PX) * PX,
                        Math.floor(p.y / PX) * PX,
                        p.size, p.size,
                    );
                    ctx.globalAlpha = 1;
                }

            } else {
                // ── Regular particle — gravity + fade ─────────────────────────
                p.vy += GRAVITY;
                p.vx *= FRICTION;
                p.vy *= FRICTION;
                p.x  += p.vx;
                p.y  += p.vy;
                p.life -= 1.6;

                if (p.life <= 0 || p.y > H + 80) { particles.splice(i, 1); continue; }

                const ratio = p.life / p.maxLife;
                const sh    = (Math.sin(p.shimmer) + 1) / 2;
                ctx.globalAlpha = ratio;
                ctx.fillStyle   = sh > 0.75 && Math.random() < 0.15 ? '#ffffff' : p.color;
                ctx.fillRect(
                    Math.floor(p.x / PX) * PX,
                    Math.floor(p.y / PX) * PX,
                    p.size, p.size,
                );
                ctx.globalAlpha = 1;
            }
        }
        ctx.globalAlpha = 1;

        // ── CRT scanlines overlay ─────────────────────────────────────────────
        ctx.fillStyle = 'rgba(0,0,0,0.018)';
        for (let y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);

        // ── Vignette ──────────────────────────────────────────────────────────
        const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.85);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, W, H);
    }

    // ── Lifecycle: pause when off-screen ─────────────────────────────────────
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                running         = true;
                nextLaunch      = performance.now() + 400;
                nextShapeLaunch = performance.now() + rand(5000, 9000);
                draw();
            } else {
                running = false;
                if (animId) { cancelAnimationFrame(animId); animId = null; }
            }
        });
    }, { threshold: 0.05 });

    io.observe(section);
}

// ─── Experience Section — Star Field ─────────────────────────────────────────
function initExpStars() {
    const sm = document.getElementById('exp-stars-sm');
    const md = document.getElementById('exp-stars-md');
    const lg = document.getElementById('exp-stars-lg');
    if (!sm || !md || !lg) return;

    /**
     * Generates N random box-shadow values spread across a 2000×2000px canvas.
     * The same shadow is applied to both the element and its ::after (via CSS var)
     * to create a seamless infinite scroll loop.
     */
    function multipleBoxShadow(n) {
        const shadows = [];
        for (let i = 0; i < n; i++) {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            shadows.push(`${x}px ${y}px #FFF`);
        }
        return shadows.join(', ');
    }

    sm.style.setProperty('--exp-shadow-sm', multipleBoxShadow(700));
    md.style.setProperty('--exp-shadow-md', multipleBoxShadow(200));
    lg.style.setProperty('--exp-shadow-lg', multipleBoxShadow(100));
}

// ─── Experience Section — Expandable Cards ───────────────────────────────────
function initExperienceSection() {
    const options = document.querySelectorAll('#experience .exp-option');
    if (!options.length) return;

    const timelines = new Map();

    function startScroll(option) {
        const wrap  = option.querySelector('.exp-desc-wrap');
        const inner = option.querySelector('.exp-desc-inner');
        if (!wrap || !inner) return;

        // Compensate for the mask-gradient fade zone (bottom 35% of wrap)
        // so the last line scrolls into the fully-opaque area, not the fade zone
        const overflow = inner.scrollHeight - wrap.clientHeight * 0.65;
        if (overflow <= 12) return;

        stopScroll(option);

        const scrollDuration = Math.min(Math.max(overflow / 18, 3), 24);
        const returnDuration = Math.max(scrollDuration * 0.35, 1.2);

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        tl.to(inner, { y: -overflow, duration: scrollDuration, ease: 'none',         delay: 1.8 })
          .to(inner, { y: 0,         duration: returnDuration, ease: 'power2.inOut', delay: 2   });

        timelines.set(option, tl);
    }

    function stopScroll(option) {
        const tl    = timelines.get(option);
        const inner = option.querySelector('.exp-desc-inner');
        if (tl)    { tl.kill(); timelines.delete(option); }
        if (inner) { gsap.set(inner, { y: 0 }); }
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            const prev = document.querySelector('#experience .exp-option.active');
            if (prev && prev !== option) stopScroll(prev);

            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');

            // Wait for expand transition (0.5s) + fade-in (0.25s delay + 0.35s) before measuring
            setTimeout(() => startScroll(option), 700);
        });
    });

    // Kick off scroll for the initially active card after page load settles
    const initial = document.querySelector('#experience .exp-option.active');
    if (initial) setTimeout(() => startScroll(initial), 900);
}

// ─── About Quote Word Bounce ───────────────────────────────────────────────────
function initQuoteWave() {
    const el = document.getElementById('about-quote-text');
    if (!el) return;

    const JUMP  = 0.5; // seconds each word takes to jump and land
    const PAUSE = 2;   // seconds of rest at the end before repeating

    const words = el.textContent.trim().split(/\s+/).filter(Boolean);
    const cycle = +(words.length * JUMP + PAUSE).toFixed(2);

    el.innerHTML = words.map((word, i) =>
        `<span class="bounce-word" style="animation-delay:${(i * JUMP).toFixed(2)}s; animation-duration:${cycle}s">${word}</span>`
    ).join(' ');
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // initNoiseCircles(); // disabled — about section background
    initHeroParticles();
    initHeroAnimations();
    initScrollAnimations();
    initNavbarScroll();
    initMagneticButtons();
    initParallax();
    initCardHovers();
    initPortfolioFilterPill();
    initTextScramble();
    initClipReveal();
    initParallaxBgText();
    // initVgSquiggles(); // disabled — background effect preserved but inactive
    initVgFireworks();
    initVideogameSection();
    initExpStars();
    initExperienceSection();
    initQuoteWave();
});
