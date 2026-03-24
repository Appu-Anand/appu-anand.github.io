document.addEventListener('DOMContentLoaded', () => {

    // Init Lucide icons
    lucide.createIcons();

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileBackdrop = document.querySelector('.mobile-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const iconMenu = mobileBtn.querySelector('.icon-menu');
    const iconClose = mobileBtn.querySelector('.icon-close');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        mobileBackdrop.classList.add('active');
        iconMenu.style.display = 'none';
        iconClose.style.display = '';
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        mobileBackdrop.classList.remove('active');
        iconMenu.style.display = '';
        iconClose.style.display = 'none';
        document.body.style.overflow = '';
    };

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    mobileBackdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });


    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => observer.observe(el));


    // --- Animated Counters ---
    const statsSection = document.querySelector('.hero-stats');
    let hasAnimatedStats = false;

    const animateValue = (el, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                document.querySelectorAll('.stat-number').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateValue(counter, 0, target, 1800);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) statsObserver.observe(statsSection);


    // --- Typewriter Effect ---
    const typewriterEl = document.querySelector('.typewriter-text');
    if (typewriterEl) {
        const roles = [
            'Data Analyst',
            'Business Strategist',
            'BI Developer',
            'Python Developer',
            'Insight Engineer'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const deletingSpeed = 55;
        const pauseAfterType = 1800;
        const pauseAfterDelete = 400;

        const type = () => {
            const current = roles[roleIndex];
            if (!isDeleting) {
                typewriterEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isDeleting = true;
                    setTimeout(type, pauseAfterType);
                    return;
                }
                setTimeout(type, typingSpeed);
            } else {
                typewriterEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, pauseAfterDelete);
                    return;
                }
                setTimeout(type, deletingSpeed);
            }
        };
        setTimeout(type, 800);
    }


    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });


    // --- Back To Top Button ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // --- Contact Form Feedback ---
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Visual loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';

            // Simulate send (replace with real fetch/FormData if backend available)
            setTimeout(() => {
                submitBtn.style.display = 'none';
                formSuccess.classList.add('show');
                form.reset();

                // Re-enable after 5s
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    submitBtn.style.display = '';
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').textContent = 'Send Message';
                }, 5000);
            }, 1200);
        });
    }


    // --- Hover tilt on project cards (subtle) ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
