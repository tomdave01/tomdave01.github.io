document.addEventListener('DOMContentLoaded', function() {
    
    const startButton = document.querySelector('.start-button');
    
    const aboutSection = document.getElementById('about');
    
    startButton.addEventListener('click', function() {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const originalText = typewriter.textContent;
        typewriter.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typeWriter(typewriter, originalText, 100);  // 100ms between characters
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.getElementById('about'));
    }

    const sections = document.querySelectorAll('.game-section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null, 
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const targetId = entry.target.id;
            const navItem = document.querySelector(`.nav-item[href="#${targetId}"]`);
            
            if (navItem) {
                if (entry.isIntersecting) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

function typeWriter(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    
    const body = document.body;
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-pixel"></div>
        <p class="loading-text">LOADING...</p>
    `;
    body.prepend(loadingScreen);
    
    window.addEventListener('load', function() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            window.scrollBy(0, 1);
        }, 300);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-stack .card');
    const leftArrow = document.querySelector('.card-stack .arrow.left');
    const rightArrow = document.querySelector('.card-stack .arrow.right');
    let currentIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    if (cards.length) {
        showCard(currentIndex);
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        });
    }
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        });
    }
});

