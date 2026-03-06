// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Reveal Elements on Scroll using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Number Counter Animation for Stats
const statsCards = document.querySelectorAll('.stat-number');
let animated = false;

const startCounters = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animated = true;
            statsCards.forEach(stat => {
                const targetText = stat.innerText;
                const hasPlus = targetText.includes('+');
                const hasEuro = targetText.includes('€');
                const hasB = targetText.includes('B');
                const hasPercent = targetText.includes('%');
                
                // Extract only numbers for the counter logic
                let targetNum = targetText.replace(/[^0-9]/g, '');
                targetNum = parseInt(targetNum);
                
                let count = 0;
                let inc = targetNum / 50; 
                
                if(targetNum === 0 || isNaN(targetNum)) return;

                const updateCount = () => {
                    count += inc;
                    if (count < targetNum) {
                        stat.innerText = (hasEuro ? '€' : '') + Math.ceil(count) + (hasB ? 'B' : '') + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
                        setTimeout(updateCount, 30);
                    } else {
                        stat.innerText = targetText; // Ensure exact final text
                    }
                };
                
                updateCount();
            });
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if(statsSection) {
    startCounters.observe(statsSection);
}
