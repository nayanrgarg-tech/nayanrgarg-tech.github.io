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

    // Add hover effect sound feedback (visual only, no actual sound)
    const cards = document.querySelectorAll('.story-block, .project-tile, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Easter egg: Konami code detection
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
        
        if (konamiCode.join(',').includes(konamiSequence.join(','))) {
            triggerEasterEgg();
            konamiCode = [];
        }
    });

    function triggerEasterEgg() {
        const body = document.body;
        const originalBg = body.style.background;
        
        // Rainbow flash effect
        body.style.transition = 'background 0.5s';
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a29bfe', '#fd79a8'];
        let colorIndex = 0;
        
        const flashInterval = setInterval(() => {
            body.style.background = colors[colorIndex % colors.length];
            colorIndex++;
            if (colorIndex > 10) {
                clearInterval(flashInterval);
                body.style.background = originalBg;
                alert('🎉 You found the secret! Achievement unlocked: Code Master! 🎉');
            }
        }, 200);
    }

    // Add animation to metrics on scroll
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

    // Animate story blocks, project tiles, and subsection headers
    const animatedElements = document.querySelectorAll('.story-block, .project-tile, .subsection-header, .contact-card, .video-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroZone = document.querySelector('.hero-zone');
        if (heroZone && scrolled < window.innerHeight) {
            heroZone.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        }
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
        header.style.transform = 'scale(0.9)';
        header.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        headerObserver.observe(header);
    });

    // Add stagger animation to facts list
    const factItems = document.querySelectorAll('.facts-listing li');
    const factsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });

    const factsList = document.querySelector('.facts-listing');
    if (factsList) {
        factItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        factsObserver.observe(factsList);
    }

    // Fun cursor trail effect on hero section (optional)
    const heroZone = document.querySelector('.hero-zone');
    if (heroZone) {
        heroZone.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.95) {  // Only occasionally create particles
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = e.pageX + 'px';
                particle.style.top = e.pageY + 'px';
                particle.style.width = '5px';
                particle.style.height = '5px';
                particle.style.background = ['#ff6b6b', '#4ecdc4', '#ffe66d'][Math.floor(Math.random() * 3)];
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1';
                particle.style.opacity = '0.7';
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.transition = 'all 1s ease-out';
                    particle.style.opacity = '0';
                    particle.style.transform = 'translateY(-50px) scale(0.5)';
                }, 10);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        document.body.removeChild(particle);
                    }
                }, 1000);
            }
        });
    }

    // Console Easter egg
    console.log('%c🚀 Hey there! Welcome to the console!', 'font-size: 20px; color: #ff6b6b; font-weight: bold;');
    console.log('%cIf you are here, you must love code as much as I do!', 'font-size: 14px; color: #4ecdc4;');
    console.log('%cTry the Konami code on the page: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #ffe66d;');

});
