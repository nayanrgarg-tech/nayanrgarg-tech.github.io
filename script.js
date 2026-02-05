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
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.story-block, .project-tile');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

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
                    document.body.removeChild(particle);
                }, 1000);
            }
        });
    }

    // Console Easter egg
    console.log('%c🚀 Hey there! Welcome to the console!', 'font-size: 20px; color: #ff6b6b; font-weight: bold;');
    console.log('%cIf you\'re here, you must love code as much as I do!', 'font-size: 14px; color: #4ecdc4;');
    console.log('%cTry the Konami code on the page: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #ffe66d;');

});
