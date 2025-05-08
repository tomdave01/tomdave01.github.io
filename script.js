document.addEventListener('DOMContentLoaded', function() {
    // Get the start button
    const startButton = document.querySelector('.start-button');
    
    // Get the about section
    const aboutSection = document.getElementById('about');
    
    // Add click event listener to the button
    startButton.addEventListener('click', function() {
        // Scroll to the about section smoothly
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    /*// Add sound effects for button clicks
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const audio = new Audio('sounds/blip.mp3'); // Create sound files
            audio.play();
        });
    });*/
    
    // Add typewriter effect to "SPECIALIZING IN:" text
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const originalText = typewriter.textContent;
        typewriter.textContent = '';  // Clear it initially
        
        // Start the effect when the about section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay for better effect
                    setTimeout(() => {
                        typeWriter(typewriter, originalText, 100);  // 100ms between characters
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.getElementById('about'));
    }
});

// Add typewriter effect to terminal text
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

// Improve mobile experience
document.addEventListener('DOMContentLoaded', function() {
    // Existing code remains...
    
    // Add a loading screen
    const body = document.body;
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-pixel"></div>
        <p class="loading-text">LOADING...</p>
    `;
    body.prepend(loadingScreen);
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    });
    
    // Fix iOS scroll issues
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
    
    // Better touch feedback for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.03)';
        }, {passive: true});
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        }, {passive: true});
    });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Force redraw after orientation change
        setTimeout(function() {
            window.scrollBy(0, 1);
        }, 300);
    });
});