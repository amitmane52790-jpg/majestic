/**
 * MAJESTIQUE LIVING - Premium Real Estate Website
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initStickyHeader();
    initMobileNavigation();
    initSmoothScrolling();
    initHeroSlider();
    initProjectTabs();
    initScrollAnimations();
    initCounterAnimation();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
});

/**
 * ============================================
 * PRELOADER
 * ============================================
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 2000);
    });
}

/**
 * ============================================
 * STICKY HEADER
 * ============================================
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const scrollTop = window.scrollY;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * ============================================
 * MOBILE NAVIGATION
 * ============================================
 */
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !nav) return;
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

/**
 * ============================================
 * SMOOTH SCROLLING
 * ============================================
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ============================================
 * HERO SLIDER
 * ============================================
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    const currentSlideEl = document.querySelector('.slider-counter .current-slide');
    const totalSlidesEl = document.querySelector('.slider-counter .total-slides');
    
    if (!slides.length) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    const totalSlides = slides.length;
    
    // Update total slides display
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides.toString().padStart(2, '0');
    }
    
    function updateSlider(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        
        if (currentSlideEl) {
            currentSlideEl.textContent = (currentIndex + 1).toString().padStart(2, '0');
        }
    }
    
    function nextSlide() {
        updateSlider(currentIndex + 1);
    }
    
    function prevSlide() {
        updateSlider(currentIndex - 1);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 6000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }
    
    startAutoPlay();
}

/**
 * ============================================
 * PROJECT TABS
 * ============================================
 */
function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const showcaseItems = document.querySelectorAll('.project-showcase-item');
    
    if (!tabBtns.length || !showcaseItems.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectIndex = parseInt(this.getAttribute('data-project'));
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update showcase
            showcaseItems.forEach((item, i) => {
                item.classList.toggle('active', i === projectIndex);
            });
        });
    });
}

/**
 * ============================================
 * SCROLL ANIMATIONS (Intersection Observer)
 * ============================================
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const siblings = entry.target.parentElement.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
                const siblingIndex = Array.from(siblings).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, siblingIndex * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * ============================================
 * COUNTER ANIMATION
 * ============================================
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOut * target);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    };
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * ============================================
 * TESTIMONIAL SLIDER
 * ============================================
 */
function initTestimonialSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let autoPlayInterval;
    
    const totalSlides = cards.length;
    
    function updateSlider(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 6000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
            resetAutoPlay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
            resetAutoPlay();
        });
    });
    
    track.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                updateSlider(currentIndex + 1);
            } else {
                updateSlider(currentIndex - 1);
            }
        }
    }, { passive: true });
    
    startAutoPlay();
}

/**
 * ============================================
 * CONTACT FORM
 * ============================================
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!validateForm(data)) {
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('success', 'Thank you for your inquiry! Our team will contact you within 24 hours.');
            form.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateForm(data) {
    const errors = [];
    
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push('Please enter a valid first name');
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push('Please enter a valid last name');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (minimum 10 characters)');
    }
    
    if (errors.length > 0) {
        showNotification('error', errors.join('<br>'));
        return false;
    }
    
    return true;
}

/**
 * ============================================
 * NOTIFICATION SYSTEM
 * ============================================
 */
function showNotification(type, message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconClass = type === 'success' ? 'check-circle' : 'exclamation-circle';
    notification.innerHTML = `
        <i class="fas fa-${iconClass}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 20px 24px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        z-index: 9999;
        animation: slideIn 0.4s ease;
        font-family: var(--font-body);
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            margin-left: auto;
            opacity: 0.8;
        }
        .notification-close:hover { opacity: 1; }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 6000);
}

/**
 * ============================================
 * BACK TO TOP BUTTON
 * ============================================
 */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ============================================
 * ACTIVE NAV LINK
 * ============================================
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

initActiveNavLink();
