document.getElementById('year').textContent = new Date().getFullYear();

/* FAQ Accordion */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/* Custom Cursor */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .work-card, .pricing-card, .testimonial-card, input, select, textarea');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
});

const viewElements = document.querySelectorAll('.work-image');
viewElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.classList.add('viewing');
        follower.classList.remove('hovering');
    });
    el.addEventListener('mouseleave', () => {
        follower.classList.remove('viewing');
    });
});

/* Magnetic Buttons */
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

/* Header Scroll */
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

/* Mobile Menu */
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
    });
});

/* Scroll Reveal */
const revealElements = document.querySelectorAll('.section-header, .service-card, .work-card, .work-card-full, .process-item, .about-quote, .about-text, .stat, .testimonial-card, .pricing-card, .contact-heading, .contact-text, .contact-glow, .contact-form, .footer-brand, .footer-links, .why-card, .client-logo, .cta-content, .footer-brand-large, .footer-social, .filter-btn, .showcase-item, .case-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

/* Stats Counter */
const stats = document.querySelectorAll('.stat-number');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeProgress * target);
                    stat.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

/* Testimonial Drag Scroll */
const track = document.getElementById('testimonial-track');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
});

/* Smooth Scroll for Anchors */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* Contact Form */
const form = document.getElementById('contact-form');
const successModal = document.getElementById('form-success');
const successClose = document.getElementById('success-close');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    console.log('Form submitted:', data);

    successModal.classList.add('active');
    form.reset();
});

successClose.addEventListener('click', () => {
    successModal.classList.remove('active');
});

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

/* Service Card Hover Effect */
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        serviceCards.forEach(c => c.style.zIndex = '1');
        card.style.zIndex = '2';
    });
});

/* Work Filters */
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card-full');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        workCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    });
});

/* Lightbox */
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <div class="lightbox-content">
        <span class="lightbox-caption"></span>
    </div>
`;
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.lightbox-content');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.showcase-item').forEach(item => {
    item.addEventListener('click', () => {
        const text = item.textContent.trim();
        lightboxContent.querySelector('span').textContent = text;
        lightbox.classList.add('active');
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});