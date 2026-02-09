// Simple interactivity for the website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll enhancement
    const navLinks = document.querySelectorAll('.navigation-bar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Add hover effect for cards
    const cards = document.querySelectorAll('.story-block, .project-tile, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.story-block, .project-tile, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add slide-in effect for section headers
    const sectionHeaders = document.querySelectorAll('.segment-header');
    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });

    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'scale(0.95)';
        header.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        headerObserver.observe(header);
    });

});
